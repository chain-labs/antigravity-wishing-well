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
    miningRig: "0xCC66A215a78a1ad3CCCaBf47957284FED064d1fA",
    darkX: "0xE4C8B8c8BDD62c0F5B7820E6feE5164Ed6e4d739",
    darkClaims: "0xc2c5e952eA6a02A8c965C7df5E2b4DbFE2696Cc1",
    dark: "0x9e8a3B0E0bf7A39bd2c886f4e13b3B82148beE7a",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
  },
  [baseSepolia.id]: {
    miningRig: "0x16d70b9255A60eC97B1Fd3fA5BE4E1561f22d18E",
    darkX: "0xc9141B6EC981CC1cb1C84d983f63DEAB3cb940E6",
    wishWell: "0xC8A96A9163C2D11e2002C589a5DC7Ee4267499e2",
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
