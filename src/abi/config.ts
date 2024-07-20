import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";

type Address = `0x${string}`;

export const CONTRACTS: Record<
  number,
  {
    wishWell: Address;
    miningRig: Address;
    darkX: Address;
    darkClaims?: Address;
    dark?: Address;
  }
> = {
  [sepolia.id]: {
    miningRig: "0xE6E812179197B72f2d4cEf0755EB18616d029Ee8",
    darkX: "0x8cad8C12CDAA74a37973da9aCE61d251CEb18428",
    darkClaims: "0xBd9B0a9Ebd573f39dfB1b394AC15d7C292e463d6",
    dark: "0x39064927a316c5F9f133ebAB22369dBDB5E3155d",
    wishWell: "0x4CE4D2Cc0Db26Ff0620fB8999591Ad9187FE042b",
  },
  [baseSepolia.id]: {
    miningRig: "0xc98399eBD716ce88a588EcdB3A5eD0E0c25E6B08",
    darkX: "0x0559b62E5504737ce89938087080a326De2bc1B7",
    wishWell: "0xEA9B9E3fd0a404868588A6aE3F3Da9f3CF4114Eb",
  },
  [pulsechain.id]: {
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
    miningRig: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    darkX: "0x5ecc92CE4B271C32c6DFBC23bd3b15EcC54ea9B6",
    darkClaims: "0x77EF0D01DC623A4Ac0A87aFCfc66d51E6194067d",
    dark: "0x87710D5d5815C2A0fc39752Ff73f87812760Bb6E",
  },
  [base.id]: {
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
    miningRig: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    darkX: "0x6a3282ec6a687105e1B71327bf6B2e7db9A7e889",
  },
};
