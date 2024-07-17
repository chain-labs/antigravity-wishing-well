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
import { useGQLFetch } from "../useGraphQLClient";

type Props = {};

const useWishwell = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [registering, setIsRegistering] = useState<boolean>(false);
  // const [payableAmount, setPayableAmount] = useState(0);
  const [tokenId, setTokenId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [poll, setPoll] = useState<boolean>(false);
  const [nftURI, setNftURI] = useState("");
  const account = useAccount();
  const AntiGravity = useContract();

  useEffect(() => {
    if (account.address && account.chainId) {
      setLoading(true);
      setIsRegistered(false);
      setIsSuccess(false);
      setPoll(false);
    }
  }, [account.address, account.chainId]);

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

  const { data: tokenData, isError } = useGQLFetch<{
    users: { address: string; wishwellId: { tokenId: string } }[];
  }>(
    ["tokenIDs", account.address as string],
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
    account.chainId || (TEST_NETWORK ? sepolia.id : pulsechain.id),
    { address: account.address },
    {
      enabled:
        account.isConnected && !error && checkCorrectNetwork(account.chainId),
    },
  );

  useEffect(() => {
    if (tokenData) {
      const tokenId = tokenData?.users?.[0]?.wishwellId?.tokenId;
      if (tokenId) {
        setTokenId(tokenId);
        setIsRegistered(true);
        setPoll(true);
      } else {
        setIsRegistered(false);
        setLoading(false);
      }
    } else {
      setIsRegistered(false);
      setLoading(false);
    }
    if (isError) {
      console.log("Error in Fetching token IDs from Subgraph");
      setError(true);
    }
  }, [tokenData, isError]);

  useEffect(() => {
    if (Number(tokenId) > 0) {
      setIsRegistered(true);
    }
  }, [tokenId]);

  const getNFTURI = () => {
    let tokenIdTemp = Number(tokenId) || 0;
    let blockchain = "pulsechain";
    if (!tokenIdTemp) {
      if (TEST_NETWORK) {
        if (account.chainId === sepolia.id) {
          tokenIdTemp = Number(wishwellPulsechainTokenId);
          blockchain = "pulsechain";
        } else if (account.chainId === baseSepolia.id) {
          tokenIdTemp = Number(wishwellBaseTokenId);
          blockchain = "base";
        }
      } else {
        if (account.chainId === pulsechain.id) {
          tokenIdTemp = Number(wishwellPulsechainTokenId);
          blockchain = "pulsechain";
        } else if (account.chainId === base.id) {
          tokenIdTemp = Number(wishwellBaseTokenId);
          blockchain = "base";
        }
      }
    }
    if (tokenIdTemp) {
      mutateNFTData({
        tokenId: tokenIdTemp,
        era: 1,
        blockchain,
      });
      setIsSuccess(true);
      setIsRegistered(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      console.log("updating user data");
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
      console.log({ wishwellPoints: userData.wishwellPoints });

      if (userData.wishwellPoints > 0) {
        getNFTURI();
      }
    }
  }, [userData]);

  useEffect(() => {
    if (isRegistered) {
      let timer: any;
      if (poll) {
        hydrateData(true);
        timer = setInterval(() => {
          hydrateData(true);
        }, POLL_TIME ?? 30000);
      }

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [poll, isRegistered]);

  const hydrateData = async (poll?: boolean) => {
    if (!account.isConnected) return;
    if (!poll && checkCorrectNetwork(account.chainId)) {
      console.log("setting false");
      setLoading(true);
      setIsRegistered(false);
      setIsSuccess(false);
    }
    if (isSuccess) {
      setPoll(false);
      return;
    }
    console.log("polling");
    if (wishwellPoints > 0) {
      setLoading(false);
      getNFTURI();
    } else {
      mutateUserData({ walletAddress: account.address });
    }
  };

  useEffect(() => {
    if (NFTData) {
      setNftURI(NFTData.url);
    }
  }, [NFTData]);

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
      hydrateData(false);
      setIsRegistered(true);
      setIsRegistering(false);
    }
  }, [registerReceipt]);

  return {
    tokenId,
    hydrateData,
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
