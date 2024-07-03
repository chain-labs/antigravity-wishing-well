import useContract from "@/abi/wishwell";
import { POLL_TIME, PROXY_API_ENDPOINT, TEST_NETWORK } from "@/constants";
import { checkCorrectNetwork, getApiNetwork } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PublicClient, parseAbiItem } from "viem";
import { base } from "viem/chains";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";

type Props = {};

const useWishwell = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [payableAmount, setPayableAmount] = useState(0);
  const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [poll, setPoll] = useState<boolean>(true);
  const account = useAccount();
  const AntiGravity = useContract();
  const publicClient = usePublicClient();

  // Use a function to get the latest block number
  async function getLatestBlockNumber(publicClient: PublicClient) {
    const block = await publicClient.getBlockNumber();
    return block;
  }

  const getTokenIds = async (poll?: boolean) => {
    if (!account.isConnected) return;
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
      // console.log({ filter, logs, tokenId, latestBlock });
    }

    setTokenId(tokenId ?? BigInt(0));
    if (tokenId) {
      try {
        // Check contribution in wishwell
        const contributionData = await axios.get(
          `${PROXY_API_ENDPOINT}contribution/${tokenId}?blockchain=${getApiNetwork(
            Number(account?.chainId),
          )}`,
        );
        const contribution = parseFloat(contributionData.data.data.value);

        // console.log({ contribution });

        setLoading(false);
        if (contribution > 0) {
          setIsSuccess(true);
        } else {
          setIsRegistered(true);
        }
      } catch (err) {
        toast.error("Something went wrong. Try Again!", { duration: 3000 });
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
    if (account) {
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
    }
  }, [poll, account]);

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

  const registerFn = async () => {
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
      let errorMessage = "";
      // @ts-ignore
      if (registerError.cause.code === 4001) {
        errorMessage = "Transaction was rejected. Approve to continue";
      } else {
        errorMessage = "Something went wrong";
      }
      toast.error(errorMessage, {
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
      getTokenIds(false);
      setIsRegistered(true);
    }
  }, [registerFetched]);

  return {
    tokenId,
    getTokenIds,
    isRegistered,
    isSuccess,
    loading,
    error,
    setError,
    poll,
    registerKit: {
      registerFn,
      registerError,
      register,
      registerIdle,
      registerFetched,
    },
  };
};

export default useWishwell;
