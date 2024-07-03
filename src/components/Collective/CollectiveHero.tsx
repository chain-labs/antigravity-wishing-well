"use client";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import { RegisterButton } from "@/components/Home/components/header/RegisterButton";
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useContract from "@/abi/wishwell";
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
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Leaderboard from "./Leaderboard";
import { motion } from "framer-motion";

// Use a function to get the latest block number
async function getLatestBlockNumber(publicClient: PublicClient) {
  const block = await publicClient.getBlockNumber();
  return block;
}

export default function CollectiveHero() {
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
        parseInt(currentBlock.toString()) + parseInt(chunkSize.toString()),
        parseInt(latestBlock.toString()),
      );

      // Create the event filter for the current block range
      const filter = await publicClient.createEventFilter({
        address: AntiGravity?.address,
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 indexed id)",
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
            Number(account?.chainId),
          )}`,
        );
        const contribution = parseFloat(contributionData.data.data.value);

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
    if (account.address && checkCorrectNetwork(account.chain?.id) && !error) {
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
    <div className="relative flex flex-col justify-start items-center w-full h-fit lg:h-screen bg-gradient-to-b from-[#000000A8] to-[#00000000] gap-[24px] p-[16px] pt-[100px] lg:pt-[200px]">
      <div className="flex flex-col justify-center items-center gap-[16px]">
        <H1
          className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]"
          center
        >
          Every Flood Starts
          <br /> with a Drop.
        </H1>
        <P center>
          There are roughly 7 billion people on earth. It only takes 2 billion
          drops of water to start a flood.
        </P>
        <RegisterButton
          loading={loading}
          error={error}
          registerIdle={registerIdle}
          handleLogin={handleLogin}
          setError={setError}
          handleRegister={handleRegister}
          isRegistered={isRegistered}
        />
      </div>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: "100vh" }}
        transition={{ duration: 1, type: "spring", bounce: 0.25, delay: 1.5 }}
        className="hidden lg:block w-full h-fit max-w-[1200px]"
      >
        <Leaderboard accountIsConnected />
      </motion.div>
      <Image
        src={IMAGEKIT_IMAGES.COLLECTIVE_HERO_BG}
        alt="Collective Hero Background"
        height={1080}
        width={1920}
        className="absolute inset-0 -z-[1] w-[1920px] h-full lg:h-screen object-[70%_10%] object-none lg:object-cover"
      />
    </div>
  );
}
