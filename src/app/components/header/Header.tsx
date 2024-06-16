import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { UserConnected } from "./UserConnected";
import IMAGEKIT from "../../home/images";
import { motion } from "framer-motion";
import { RegisterButton } from "./RegisterButton";
import P from "../HTML/P";
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
import {
	useAccount,
	usePublicClient,
	useReadContract,
	useTransactionReceipt,
	useWriteContract,
} from "wagmi";

// Use a function to get the latest block number
async function getLatestBlockNumber(publicClient: PublicClient) {
	const block = await publicClient.getBlockNumber();
	return block;
}

const Header = () => {
	const [isRegistered, setIsRegistered] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	// const [payableAmount, setPayableAmount] = useState(0);
	const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
	const [poll, setPoll] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const AntiGravity = useContract();
	const publicClient = usePublicClient();
	const { openConnectModal } = useConnectModal();

	const [isOpen, setIsOpen] = useState(false);
	// const [currentChain, setCurrentChain] = useState("");

	const account = useAccount();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

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
		<motion.header
			whileInView={{ y: 0 }}
			initial={{ y: -100 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: 1.5 }}
			className="flex flex-col h-full w-full items-center justify-center gap-3 z-50 font-extrabold"
		>
			<div className="flex text-agwhite w-full md:w-3/4 h-14 lg:h-[72px] rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
				<div className="w-full h-full bg-agblack flex items-center justify-between rounded-lg gap-6 px-4">
					{/* Desktop View */}
					<div className="hidden md:flex md:flex-grow md:items-center h-full md:justify-between md:gap-x-6">
						<div
							className="flex items-center cursor-pointer"
							onClick={scrollToTop}
						>
							<div className="w-[37px] h-[37px] md:w-[45px] md:h-[45px] relative">
								<Image src={IMAGEKIT.HELMET} alt="icon" fill />
							</div>
							<p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
								ANTIGRAVITY
							</p>
						</div>
						<div
							className={`relative flex justify-center items-center font-extrabold text-lg font-sans gap-[16px] oveflow-hidden`}
						>
							<a href="/wishwell">
								<P uppercase gradient extrabold>
									Wishwell
								</P>
							</a>
							<a href="/mining">
								<P uppercase gradient extrabold>
									Mining
								</P>
							</a>
							<a href="/collective">
								<P uppercase gradient extrabold>
									Collective
								</P>
							</a>
							<a
								target="_blank"
								href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
							>
								<P uppercase gradient extrabold>
									WHITEPAPER
								</P>
							</a>
							{account.isConnected ? (
								<>
									<div className="w-[2px] h-[2.5rem] bg-gradient-to-b from-white via-[#999999] to-[#999999] rounded-full" />
									<UserConnected />
								</>
							) : (
								<RegisterButton
									loading={loading}
									error={error}
									registerIdle={registerIdle}
									handleLogin={handleLogin}
									setError={setError}
									handleRegister={handleRegister}
									isRegistered={isRegistered}
								/>
							)}
						</div>
					</div>
					{/* Mobile View */}
					<div
						className="flex md:hidden items-center cursor-pointer"
						onClick={scrollToTop}
					>
						<div className="w-[37px] h-[37px] md:w-[45px] md:h-[45px] relative">
							<Image src={IMAGEKIT.HELMET} alt="icon" fill />
						</div>
						<p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
							ANTIGRAVITY
						</p>
					</div>
					<div className="flex md:hidden">
						{isOpen ? (
							<IoCloseCircleOutline
								className="cursor-pointer"
								width={24}
								height={24}
								onClick={toggleMenu}
							/>
						) : (
							<IoMenu
								className="cursor-pointer"
								width={24}
								height={24}
								onClick={toggleMenu}
							/>
						)}
					</div>
				</div>
			</div>
			{isOpen ? (
				<div className="flex md:hidden w-full justify-center">
					<div className="flex text-agwhite w-full lg:h-16 rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
						<div className="w-full h-full bg-agblack px-8 flex flex-col items-center justify-center rounded-lg gap-6 py-4">
							{account.isConnected && <UserConnected />}
							<a href="/wishwell">
								<P uppercase gradient extrabold>
									Wishwell
								</P>
							</a>
							<a href="/mining">
								<P uppercase gradient extrabold>
									Mining
								</P>
							</a>
							<a href="/collective">
								<P uppercase gradient extrabold>
									Collective
								</P>
							</a>
							<a
								target="_blank"
								href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
							>
								<P uppercase gradient extrabold>
									WHITEPAPER
								</P>
							</a>
						</div>
					</div>
				</div>
			) : null}
		</motion.header>
	);
};

export default Header;