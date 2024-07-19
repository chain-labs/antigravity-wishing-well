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
    miningRig: "0x6AA2Ad3E568150E0272Fdc655df344337eB616d4",
    darkX: "0xEf11BC432F35A64923D81481985d2Fd292065587",
    darkClaims: "0x965ecCcBc65e6943eAc5C8f12a76E19Cc9c89C95",
    dark: "0x430E5dADD27468347A2ACB53Eb6d81727d60d3E8",
    wishWell: "0xF432a31C55084C15042e14838199FF374C8F40c1",
  },
  [baseSepolia.id]: {
    miningRig: "0x8c273802e8fBD837Ea90CeF152AE6c3F571A2B2D",
    darkX: "0x5be754a2BE85C06630aC8417604ED49649E98B50",
    wishWell: "0xcEA3eEBa807dCeA35FDF344A2c6F24B4E92f2192",
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
