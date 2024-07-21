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
    miningRig: "0x3C5356d376Cdf0E576dc7c130EF8Fa3c9a069c25",
    darkX: "0xbf1eF0A94bC6efdb9e1B7C0a6E5DD99dd11dA06d",
    darkClaims: "0xff93D546924DfFE5d670B17238c614d789e4711e",
    dark: "0x1beF21c7509d54ddBC0992bf56639A61eCD9934d",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
  },
  [baseSepolia.id]: {
    miningRig: "0x872de1484eF73cB31BAA2d4E0C28a62Af01dfe15",
    darkX: "0xbD26E8FBE2e772E76bc3570b6000F0c17f510aFb",
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
