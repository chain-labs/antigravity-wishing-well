import { getTokenIds } from "@/utils";
import { MutateOptions } from "@tanstack/react-query";
import { pulsechain } from "viem/chains";
import { UseAccountReturnType } from "wagmi";
// import { UserData } from "./UserConnected";
import { UserData } from "./UserConnected";
import { StoreUserData } from "@/app/(client)/store";

export const hydrateUserAndNFT = async (
  account: UseAccountReturnType,
  fetchUserFn: (
    variables: Record<string, any>,
    options?:
      | MutateOptions<UserData, any, Record<string, any>, unknown>
      | undefined,
  ) => Promise<UserData>,
  mutateNFTData1: (
    variables: Record<string, any>,
    options?: MutateOptions<any, any, Record<string, any>, unknown> | undefined,
  ) => Promise<any>,
  mutateNFTData2: (
    variables: Record<string, any>,
    options?: MutateOptions<any, any, Record<string, any>, unknown> | undefined,
  ) => Promise<any>,
  storeUser: (state: Partial<StoreUserData>) => void,
) => {
  const userData = await fetchUserFn({
    walletAddress: account.address,
  });
  const { wishwellTokenId, miningTokenId, blockchain } = getTokenIds(
    userData,
    account.chainId || pulsechain.id,
  );

  const era1NFT = wishwellTokenId
    ? await mutateNFTData1({
        tokenId: wishwellTokenId,
        era: 1,
        blockchain,
      })
    : "";

  const era2NFT = miningTokenId
    ? await mutateNFTData2({
        tokenId: miningTokenId,
        era: 2,
        blockchain,
      })
    : "";

  const {
    antigravityBaseTokenId,
    antigravityPulsechainTokenId,
    wishwellBaseTokenId,
    wishwellPulsechainTokenId,
    miningPoints,
    wishwellPoints,
    totalPoints,
    rank,
    walletAddress,
  } = userData;

  await storeUser({
    antigravityBaseTokenId,
    antigravityPulsechainTokenId,
    wishwellBaseTokenId,
    wishwellPulsechainTokenId,
    wishwellPoints,
    miningPoints,
    totalPoints,
    rank,
    walletAddress,
    nftURLera1: era1NFT.url,
    nftURLera2: era2NFT.url,
  });
};
