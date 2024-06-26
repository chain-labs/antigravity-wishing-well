import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type TokenDropdownTypes = {
  label: string;
  USDvalue: number;
  tokenContract: string;
  lightIcon: string | StaticImport;
  darkIcon: string | StaticImport;
};
