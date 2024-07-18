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
    miningRig: "0x143ef5A42648BDfD9d9e2c215DF5db1C725DBA56",
    darkX: "0x557AD3C124F9456c05F114cD15f5a3767e3E99A2",
    darkClaim: "0xcf674Aa51e88ad37fA840c3Ae20F8E4DFF8eE6b9",
    dark: "0xA8E98748Efa860ff9C7B88F9155aADDaDe55DCBa",
    wishwell: "0xb06b9D03AFEE69a4865fE3140A5860b93CD4d1A4",
  },
  [baseSepolia.id]: {
    miningRig: "0xf8A6cfF818CaeE6Ee0De3d73C5EbEd1d79ef5648",
    darkX: "0x597426A9a7f3ac00a3A987C3b4AbfB75718316fF",
    wishwell: "0x9e5df5f6234B5c3f655f59cdCD3Df875F75537Df",
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
