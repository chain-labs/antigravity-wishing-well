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
    launchControlCenter?: Address;
    fuelCell?: Address;
    journeyPhaseManager?: Address;
    darkFaucet?: Address;
  }
> = {
  [sepolia.id]: {
    miningRig: "0x020d3Ca9605bb17CC17Ea0DB2bFfed3fA0869fCF",
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    dark: "0xE441c53319332bac6e1ea79491B65aF42C2CBa11",
    fuelCell: "0x2112BF237bC033e2C0a9318c00A2c33639051F24",
    journeyPhaseManager: "0x390E7AF57779A6a672054533beEd7b0dF7eD0bD9",
    launchControlCenter: "0x7D1a660C0F6385D12A74356fc361613344A1B135",
    darkFaucet: "0xd790fE4955C6F3C895e5a9a4849779D84d40cC2f",
  },
  [baseSepolia.id]: {
    miningRig: "0x8Dea737AE483153c69934ff8a5c7E3D448c2DB4C",
    darkX: "0xdE87E198D2A5d6894a03AfCb34876601A6dd226f",
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
