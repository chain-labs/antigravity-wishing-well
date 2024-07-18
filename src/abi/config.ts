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
    miningRig: "0x93f68EF696DD8A20b69973464a6eb1cf94B76F13",
    darkX: "0x7849E7e0DD18b748D1E41341bDa61ABB802CBD05",
    darkClaim: "0xc6f2bb1D9B90eF06583F094720EC2228DF729615",
    dark: "0xbE60cC5b849a2fEbFf363f163a6e1e28Bc2B021E",
    wishwell: "0xf8C20D4F7A4BDc4cfD7772ef132fdB54384227B1",
  },
  [baseSepolia.id]: {
    miningRig: "0x410CD62B26fBA39850dAc88Cd5073D47006E8465",
    darkX: "0x89F57eff56b99dE47F6EbAFABeA8E08B96534893",
    wishwell: "0xD26E0578b1369De06c9F37fA7E542a43c04Dfb21",
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
