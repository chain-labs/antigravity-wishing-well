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
    "miningRig": "0x6633475079efAC0179EEc0d68cd94A82862cc16a",
    "darkX": "0xD81063553A7389449b8E3de549408781173d2390",
    "darkClaims": "0xA54bb930769D07Eefa84531Eb5f0deF434eD212b",
    "dark": "0x030030F2ac87768203e68EbcdAA9E0d620101420",
    "wishWell": "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0"
},
  [baseSepolia.id]: {
    "miningRig": "0x84EbE4eC2B9AcB5c8fb48da9A118F3917E5e8717",
    "darkX": "0x38c6eA91B34b17Df5468Acd5De4750791c3ed366",
    "wishWell": "0xC8A96A9163C2D11e2002C589a5DC7Ee4267499e2"
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
