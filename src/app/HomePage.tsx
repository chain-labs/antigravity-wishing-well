"use client";

import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactLenis from "@studio-freight/react-lenis";
import Hero from "./sections/Hero";
import Header from "./home/Header";
import CanvasRendering from "./components/saturn/CanvasRendering";
import StarFieldCanvas from "./components/background/Starfeild";
import Countdown from "./sections/Countdown";
import Newsletter from "./sections/Newsletter";
import Footer from "./sections/Footer";
import Testimonials from "./sections/Testimonials";
import Eras from "./sections/Eras";
import Leaderboard from "./sections/Leaderboard";
import NFTReceipt from "./sections/NFTReceipt";
import {
	useAccount,
	usePublicClient,
	useReadContract,
	useTransactionReceipt,
	useWriteContract,
} from "wagmi";
import toast from "react-hot-toast";
import useContract from "@/abi";
import { PublicClient, parseAbiItem } from "viem";
import axios from "axios";
import {
	POLL_TIME,
	PROXY_API_ENDPOINT,
	TEST_NETWORK,
	TIMER,
} from "@/constants";
import { checkCorrectNetwork, getApiNetwork } from "@/utils";
import { base } from "viem/chains";
import { useConnectModal } from "@rainbow-me/rainbowkit";

// Use a function to get the latest block number
async function getLatestBlockNumber(publicClient: PublicClient) {
	const block = await publicClient.getBlockNumber();
	return block;
}

// const Hero = dynamic(() => import("./sections/Hero"), {
// 	ssr: false,
// 	loading: () => <>{console.log("loading hero")}</>,
// });

export default function HomePage() {
	const [isRegistered, setIsRegistered] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	// const [payableAmount, setPayableAmount] = useState(0);
	const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [poll, setPoll] = useState<boolean>(false);
	const account = useAccount();
	const AntiGravity = useContract();
	const publicClient = usePublicClient();
	const { openConnectModal } = useConnectModal();

	const handleLogin = (e: React.MouseEvent) => {
		e.preventDefault();
		if (openConnectModal) {
			openConnectModal();
		}
	};

	const getTokenIds = async (poll?: boolean) => {
		if (publicClient === undefined) return;
		if (!poll && checkCorrectNetwork(Number(account.chainId))) {
			setLoading(true);
			setIsRegistered(false);
			setIsSuccess(false);
		}
		// note: using the public client which is already set to ensure another conditional logic is not needed to set the http transport.
		// const publicClient =  createPublicClient({
		//   chain: account.chain,
		//   transport: http("https://base-sepolia.g.alchemy.com/v2/Ck1jBlebtn6A92-eXG1tnievZs0kfS9F"),
		// });

		const fromBlockNumber = TEST_NETWORK
			? process.env.NEXT_PUBLIC_BASE_SEPOLIA_FROM_BLOCK_NUMBER
			: account.chainId == base.id
				? process.env.NEXT_PUBLIC_BASE_FROM_BLOCK_NUMBER
				: process.env.NEXT_PUBLIC_PLS_FROM_BLOCK_NUMBER;

		if (fromBlockNumber === undefined)
			throw Error("Please set the enviornment variable for Block Number");

		const chunkSize = 50000; // Define the chunk size as per the RPC limit
		let currentBlock = BigInt(fromBlockNumber); // Start from this block number
		let latestBlock; // Variable to store the latest block number
		let tokenId; // Variable to store tokenId when found

		latestBlock = await getLatestBlockNumber(publicClient); // Initialize the latest block
		while (currentBlock <= latestBlock) {
			// Calculate the end block for the current chunk
			const endBlock = Math.min(
				parseInt(currentBlock.toString()) +
					parseInt(chunkSize.toString()),
				parseInt(latestBlock.toString())
			);

			// Create the event filter for the current block range
			const filter = await publicClient.createEventFilter({
				address: AntiGravity?.address,
				event: parseAbiItem(
					"event Transfer(address indexed from, address indexed to, uint256 indexed id)"
				),
				args: {
					to: account.address,
				},
				fromBlock: BigInt(currentBlock),
				toBlock: BigInt(endBlock),
			});

			// Fetch logs using the filter
			const logs = await publicClient.getFilterLogs({ filter });

			if (logs.length > 0) {
				tokenId = logs[0]?.args.id;
				if (tokenId) {
					break; // Exit the loop if tokenId is found
				}
			}
			// Update currentBlock for the next iteration
			currentBlock = BigInt((endBlock + 1).toString());

			// Refresh latest block number to ensure it includes recent blocks
			latestBlock = await getLatestBlockNumber(publicClient);
		}
		setTokenId(tokenId ?? BigInt(0));
		if (tokenId) {
			try {
				const contributionData = await axios.get(
					`${PROXY_API_ENDPOINT}contribution/${tokenId}?blockchain=${getApiNetwork(
						Number(account?.chainId)
					)}`
				);
				const contribution = parseFloat(
					contributionData.data.data.value
				);

				setLoading(false);
				if (contribution > 0) {
					setIsSuccess(true);
				} else {
					setIsRegistered(true);
				}
			} catch (err) {
				toast.error("Something went wrong. Try Again!", {
					duration: 3000,
				});
				setError(true);
				console.error({ err });
			}
		} else {
			setLoading(false);
			setIsSuccess(false);
			setIsRegistered(false);
		}
	};

	useEffect(() => {
		if (
			account.address &&
			checkCorrectNetwork(account.chain?.id) &&
			!error
		) {
			getTokenIds(false);
		} else {
			setIsRegistered(false);
			setIsSuccess(false);
		}
	}, [account.address, account.chainId, error]);

	useEffect(() => {
		let timer: any;
		if (poll) {
			getTokenIds(true);

			timer = setInterval(() => {
				getTokenIds(true);
			}, POLL_TIME ?? 30000);
		}

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [poll]);

	const balance = useReadContract({
		...AntiGravity,
		functionName: "balanceOf",
		args: [account.address as `0x${string}`],
		query: {
			enabled: account.isConnected,
		},
	});

	useEffect(() => {
		if (balance.isFetched) {
			if ((balance.data as number) > 0) {
				if (!loading) {
					setIsRegistered(true);
					return;
				}
			}
		}
		setIsRegistered(false);
	}, [balance.isFetched, balance.data, loading]);

	const {
		data: registerHash,
		error: registerError,
		writeContract: register,
		isIdle: registerIdle,
		isPending: registerPending,
	} = useWriteContract();

	const {
		data: registerReceipt,
		isFetching: registerFetching,
		isLoading: registerLoading,
		isFetched: registerFetched,
	} = useTransactionReceipt({
		hash: registerHash,
	});

	const handleRegister = async () => {
		toast.loading("Getting you registered!", {
			duration: 10000,
		});

		await register({
			// @ts-ignore
			address: AntiGravity?.address,
			abi: AntiGravity?.abi,
			functionName: "register",
			// args: [`${payableAmount}`],
		});
	};

	useEffect(() => {
		if (registerError) {
			console.log({ registerError });
			toast.error("Something Went Wrong", {
				duration: 3000,
			});
			setIsRegistered(false);
		}
	}, [registerError]);

	useEffect(() => {
		if (registerFetched) {
			toast.success("Registered successful", {
				duration: 3000,
			});
			setIsRegistered(true);
		}
	}, [registerFetched]);
	return (
		// <ReactLenis
		// 	root
		// 	options={{ lerp: 0.1, duration: 0.5,  }}
		// >
		<div className="bg-agblack min-h-[100vh]">
			<div className="flex flex-col min-h-screen min-w-screen overflow-hidden">
				<div className="relative z-0 flex flex-col min-h-screen">
					<div className="fixed top-0 w-full z-50 items-center pt-12 px-4">
						<Header
							loading={loading}
							error={error}
							registerIdle={registerIdle}
							handleLogin={handleLogin}
							handleRegister={handleRegister}
							isRegistered={isRegistered}
							setError={setError}
						/>
					</div>
					<div className="z-100">
						<Hero />
						<Leaderboard />
						<Testimonials />
						<NFTReceipt />
						<Eras />
						<Countdown />
						<Newsletter />
						<Footer />
					</div>
					<div className="w-full h-[100vh] 10 fixed top-0 left-0 -z-[1]">
						{/* <CanvasRendering />
						<StarFieldCanvas
							count={100}
							xRange={100}
							yRange={100}
							zRange={100}
							speed={0.1}
						/> */}
					</div>
				</div>
			</div>
		</div>
		// </ReactLenis>
	);
}
