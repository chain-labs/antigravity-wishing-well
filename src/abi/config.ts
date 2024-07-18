import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";

type Address = `0x${string}`;

export const CONTRACTS: Record<
  number,
  {
    wishwell: Address;
    miningRig: Address;
    darkX: Address;
    darkClaim?: Address;
    dark?: Address;
  }
> = {
  [sepolia.id]: {
    wishwell: "0xd5969B2de5C6b738243833dEa99Bb289ddBEDD72",
    miningRig: "0xbe0EC9Ea1dd76c0B4f4b613Cd63f8d53c39eD20b",
    darkX: "0x5ecc92CE4B271C32c6DFBC23bd3b15EcC54ea9B6",
    darkClaim: "0x77EF0D01DC623A4Ac0A87aFCfc66d51E6194067d",
    dark: "0x87710D5d5815C2A0fc39752Ff73f87812760Bb6E",
  },
  [baseSepolia.id]: {
    wishwell: "0x8d4b5AD077540Df22C7e717239dB3f49C6BB02C2",
    miningRig: "0xdfaB742eCe2F558F2234f24d4E08c3e5f53EEb67",
    darkX: "0x6a3282ec6a687105e1B71327bf6B2e7db9A7e889",
  },
  [pulsechain.id]: {
    wishwell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
    miningRig: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    darkX: "0x5ecc92CE4B271C32c6DFBC23bd3b15EcC54ea9B6",
    darkClaim: "0x77EF0D01DC623A4Ac0A87aFCfc66d51E6194067d",
    dark: "0x87710D5d5815C2A0fc39752Ff73f87812760Bb6E",
  },
  [base.id]: {
    wishwell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
    miningRig: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    darkX: "0x6a3282ec6a687105e1B71327bf6B2e7db9A7e889",
  },
};
