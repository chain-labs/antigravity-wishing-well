import useContract from "@/abi/wishwell";
import {
  API_ENDPOINT,
  POLL_TIME,
  PROXY_API_ENDPOINT,
  TEST_NETWORK,
} from "@/constants";
import { getApiNetwork } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { PublicClient } from "viem";
import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { errorToast, generalToast, successToast } from "../frontend/toast";
import { checkCorrectNetwork } from "@/components/RainbowKit";
import { gqlFetcher } from "@/api/graphqlClient";
import { gql } from "graphql-request";
import { useRestPost } from "../useRestClient";
import { UserData } from "@/components/Home/components/header/UserConnected";
import useUserData from "@/app/(client)/store";

type Props = {};

const useWishwell = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [registering, setIsRegistering] = useState<boolean>(false);
  // const [payableAmount, setPayableAmount] = useState(0);
  const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [poll, setPoll] = useState<boolean>(true);
  const [nftURI, setNftURI] = useState("");
  const account = useAccount();
  const AntiGravity = useContract();

  // Use a function to get the latest block number
  async function getLatestBlockNumber(publicClient: PublicClient) {
    const block = await publicClient.getBlockNumber();
    return block;
  }

  const { data: userData, mutate: mutateUserData } = useRestPost<UserData>(
    ["user"],
    "/api/user",
  );

  const {
    mutation: storeUserData,
    wishwellBaseTokenId,
    wishwellPulsechainTokenId,
    wishwellPoints,
  } = useUserData();

  const { data: NFTData, mutate: mutateNFTData } = useRestPost<any>(
    ["generate-nft"],
    "/api/generate-nft",
  );

  useEffect(() => {
    if (userData) {
      storeUserData({
        walletAddress: userData.walletAddress,
        rank: userData.rank,
        wishwellPulsechainTokenId: userData.wishwellPulsechainTokenId,
        wishwellBaseTokenId: userData.wishwellBaseTokenId,
        antigravityBaseTokenId: userData.antigravityBaseTokenId,
        antigravityPulsechainTokenId: userData.antigravityPulsechainTokenId,
        wishwellPoints: userData.wishwellPoints,
        miningPoints: userData.miningPoints,
        totalPoints: userData.totalPoints,
      });
      let tokenId = "0";
      let blockchain = "pulsechain";

      if (TEST_NETWORK) {
        if (account.chainId === sepolia.id) {
          tokenId = userData.wishwellPulsechainTokenId;
          blockchain = "pulsechain";
        } else if (account.chainId === baseSepolia.id) {
          tokenId = userData.wishwellBaseTokenId;
          blockchain = "base";
        }
      } else {
        if (account.chainId === pulsechain.id) {
          tokenId = userData.wishwellPulsechainTokenId;
          blockchain = "pulsechain";
        } else if (account.chainId === base.id) {
          tokenId = userData.wishwellBaseTokenId;
          blockchain = "base";
        }
      }
      mutateNFTData({
        tokenId: Number(tokenId),
        era: 1,
        blockchain,
      });
    }
  }, [userData]);

  const getTokenIds = async (poll?: boolean) => {
    if (!account.isConnected) return;
    if (!poll && checkCorrectNetwork(account.chainId)) {
      setLoading(true);
      setIsRegistered(false);
      setIsSuccess(false);
    }

    try {
      const tokensResponse = await gqlFetcher<any>(
        gql`
          query TokenIds($address: Bytes) {
            users(where: { address_contains: $address }, first: 1) {
              address
              wishwellId {
                tokenId
              }
            }
          }
        `,
        { address: account.address },
        account.chainId || pulsechain.id,
      );

      if (tokensResponse.users[0]?.wishwellId?.tokenId) {
        setIsRegistered(true);
        mutateUserData({ walletAddress: account.address?.toLowerCase() });
        if (wishwellPoints) {
          let tokenId = "0";
          let blockchain = "pulsechain";

          if (TEST_NETWORK) {
            if (account.chainId === sepolia.id) {
              tokenId = wishwellPulsechainTokenId;
              blockchain = "pulsechain";
            } else if (account.chainId === baseSepolia.id) {
              tokenId = wishwellBaseTokenId;
              blockchain = "base";
            }
          } else {
            if (account.chainId === pulsechain.id) {
              tokenId = wishwellPulsechainTokenId;
              blockchain = "pulsechain";
            } else if (account.chainId === base.id) {
              tokenId = wishwellBaseTokenId;
              blockchain = "base";
            }
          }
          mutateNFTData({
            tokenId: Number(tokenId),
            era: 1,
            blockchain,
          });
          setIsSuccess;
        }

        // const contribution = parseFloat(contributionData.data.data.value);
      } else {
        setIsRegistered(false);
        setIsSuccess(false);
      }
    } catch (err) {
      errorToast("Unable to check your registration now! Try Again");
      setError(true);
      setIsRegistered(false);
      setIsSuccess(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userData) {
      const contribution = userData?.wishwellPoints;

      // console.log({ contribution });
      if (Number(contribution) > 0) {
        setIsSuccess(true);
      } else setIsSuccess(false);
    }
  }, [userData]);

  useEffect(() => {
    if (account.address && checkCorrectNetwork(account.chain?.id) && !error) {
      getTokenIds(false);
    } else {
      setIsRegistered(false);
      setIsSuccess(false);
    }
  }, [account.address, account.chainId, error]);

  useEffect(() => {
    if (NFTData) {
      setNftURI(NFTData.url);
    }
  }, NFTData);

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
  } = useWriteContract();

  const { data: registerReceipt, isFetched: registerFetched } =
    useTransactionReceipt({
      hash: registerHash,
    });

  const registerFn = async () => {
    setIsRegistering(true);
    generalToast("Getting you registered!", {
      duration: 10000,
    });

    await register({
      // @ts-ignore
      address: AntiGravity?.address,
      abi: AntiGravity?.abi,
      functionName: "register",
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
      errorToast(errorMessage, {
        duration: 3000,
      });
      setIsRegistering(false);
      setIsRegistered(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (registerReceipt) {
      successToast("Registered successful", {
        duration: 3000,
      });
      getTokenIds(false);
      setIsRegistered(true);
      setIsRegistering(false);
    }
  }, [registerReceipt]);

  return {
    tokenId,
    getTokenIds,
    isRegistered,
    isSuccess,
    loading,
    error,
    nftURI,
    setError,
    poll,
    registerKit: {
      registerFn,
      registerError,
      register,
      registerIdle: !registering,
      registerFetched,
    },
  };
};

export default useWishwell;
