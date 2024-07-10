import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type TokenDropdownTypes = {
  symbol: string;
  USDvalue?: number;
  address: string;
  logoURI: string | StaticImport;
};

export type IToken = TokenDropdownTypes & {
  name: string;
  chainId: number;
  decimals: number;
  pool: string;
};

export type StateType = "Mining" | "Claiming";
