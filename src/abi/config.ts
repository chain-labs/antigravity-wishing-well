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
    miningRig: "0x811a8213dc51D71D4eb37ced3A336B33029D45Fd",
    darkX: "0x4079d6A097417b4e9C6f4cEC9132a46f60b09353",
    darkClaims: "0x6f2070464BFc19d84720dD800Ba753eC9C1B65D6",
    dark: "0xb9ba071cd8BD2E3298C23232e55b92D1DD09782B",
    wishWell: "0x581377a83161765e6C5F53A476603B3E80E1275D",
  },
  [baseSepolia.id]: {
    miningRig: "0x73752740Ba6DFBD634F5f8c67b22f411C5E4a5dA",
    darkX: "0x0e4007B69b83dfD48EEA543623f5A063aCD3431d",
    wishWell: "0x031324da471A9CEad4f6055444EEFdeF57a80c48",
  },
  [pulsechain.id]: {
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
    miningRig: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    darkX: "0x5ecc92CE4B271C32c6DFBC23bd3b15EcC54ea9B6",
    darkClaims: "0x77EF0D01DC623A4Ac0A87aFCfc66d51E6194067d",
    dark: "0x87710D5d5815C2A0fc39752Ff73f87812760Bb6E",
  },
  [base.id]: {
    wishWell: "0x332211a407489f497cd58bac7db3f10da5da47ff",
    miningRig: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    darkX: "0x6a3282ec6a687105e1B71327bf6B2e7db9A7e889",
  },
};
