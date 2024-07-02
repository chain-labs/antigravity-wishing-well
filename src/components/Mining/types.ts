import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type TokenDropdownTypes = {
  label: string;
  USDvalue: number;
  tokenContract: string;
  icon: string | StaticImport;
};

export type IToken = TokenDropdownTypes & {
  chainId: number;
  decimals: number;
};

export type StateType = "Mining" | "Claiming";
