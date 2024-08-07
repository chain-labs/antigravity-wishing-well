"use client";
import { create } from "zustand";

export type StoreUserData = {
  walletAddress: string;
  rank: string;
  wishwellPulsechainTokenId: string;
  wishwellBaseTokenId: string;
  antigravityBaseTokenId: string;
  antigravityPulsechainTokenId: string;
  nftURLera1: string;
  nftURLera2: string;
  wishwellPoints: number;
  miningPoints: number;
  totalPoints: number;
  darkBalance: number;
  mutation: (state: Partial<StoreUserData>) => void;
};

const useUserData = create<StoreUserData>((set) => ({
  walletAddress: "",
  rank: "",
  wishwellPulsechainTokenId: "0",
  wishwellBaseTokenId: "0",
  antigravityBaseTokenId: "0",
  antigravityPulsechainTokenId: "0",
  nftURLera1: "",
  nftURLera2: "",
  wishwellPoints: 0,
  miningPoints: 0,
  totalPoints: 0,
  darkBalance: 0,
  mutation: (state: Partial<StoreUserData>) =>
    set((prevState) => ({ ...prevState, ...state })),
}));

export default useUserData;
