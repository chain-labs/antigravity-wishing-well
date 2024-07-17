"use client";
import { create } from "zustand";

type UserData = {
  walletAddress: string;
  rank: string;
  wishwellPulsechainTokenId: string;
  wishwellBaseTokenId: string;
  antigravityBaseTokenId: string;
  antigravityPulsechainTokenId: string;
  nftURL: string;
  wishwellPoints: number;
  miningPoints: number;
  totalPoints: number;
  mutation: (state: Partial<UserData>) => void;
};

const useUserData = create<UserData>((set) => ({
  walletAddress: "",
  rank: "",
  wishwellPulsechainTokenId: "0",
  wishwellBaseTokenId: "0",
  antigravityBaseTokenId: "0",
  antigravityPulsechainTokenId: "0",
  nftURL: "",
  wishwellPoints: 0,
  miningPoints: 0,
  totalPoints: 0,
  mutation: (state: Partial<UserData>) =>
    set((prevState) => ({ ...prevState, ...state })),
}));

export default useUserData;
