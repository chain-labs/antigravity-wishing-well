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
    miningRig: "0x6C8Dd5950760583f0D6422D4b083Cc376b5cBfc2",
    darkX: "0x7F47b1869D0a86b30F28eC0Cc0BBE568f51F43Ac",
    darkClaim: "0x5B721c1339F17801589cCD11A5a80CFa2DCCB530",
    dark: "0x5Fb90651902343A7c12E36991A2a4e5C85242CdB",
    wishwell: "0xeEF812Fd0A1cd72A1D1Fae0B8b01B21220e3E09E",
  },
  [baseSepolia.id]: {
    miningRig: "0x2263Cc09b146d153AFf22841471201618bD628B5",
    darkX: "0xBaD5d5603B4B59Df9f7A2dF17b90B40a44630E2F",
    wishwell: "0x0F889D71647dc02F7Cb3E442646B4103C4Adc28c",
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
