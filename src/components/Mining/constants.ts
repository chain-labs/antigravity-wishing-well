import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { IToken } from "./types";

export const TOKEN_OPTIONS: IToken[] = [
  {
    symbol: "USDC",
    address: "0xfC7A9aa6C62e92e01A379223291656718803896b",
    pool: "",
    name: "",
    USDvalue: 1,
    logoURI: IMAGEKIT_ICONS.USDC_COLOR,
    chainId: 11155111,
    decimals: 6,
  },
  {
    symbol: "MEME1",
    address: "0x49A8741a46C4b4b99525FFB88123E1Ea59CA5925",
    pool: "",
    name: "",
    USDvalue: 0.0195,
    logoURI: IMAGEKIT_ICONS.MEME_COLOR,
    chainId: 11155111,
    decimals: 18,
  },
  {
    symbol: "MEME2",
    address: "0x5CD3f6f083e51F2fe3477D8fFB828eb36702c5Cd",
    pool: "",
    name: "",
    USDvalue: 0.000000000029,
    logoURI: IMAGEKIT_ICONS.MEME_COLOR,
    chainId: 11155111,
    decimals: 18,
  },
  {
    symbol: "WETH",
    address: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
    pool: "",
    name: "",
    USDvalue: 2.3,
    logoURI: IMAGEKIT_ICONS.WETH_COLOR,
    chainId: 11155111,
    decimals: 18,
  },
];

export const ADDRESS_LIST = [
  "0x049D67388852DE0Cef5E1C4FdC91096cDc0a38dF",
  "0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d",
  "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
  "0x7216dA0a7c628953aC021E5e617C98998FC28CA3",
];

export const CLAIM_LISTS = {
  accounts: [
    "0xBd8973725443bf5498EF92083502465E00f2C7C7",
    "0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d",
    "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
    "0x7216dA0a7c628953aC021E5e617C98998FC28CA3",
  ],
  points: [
    "100000000000000000000000",
    "100000000000000000000000",
    "200000000000000000000000",
    "300000000000000000000000",
  ],
  nonces: ["1", "2", "3", "4"],
};

export const MULTIPLIER = 33;
