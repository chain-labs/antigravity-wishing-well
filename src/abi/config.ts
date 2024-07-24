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
    miningRig: "0x020d3Ca9605bb17CC17Ea0DB2bFfed3fA0869fCF",
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    dark: "0x4dd57D15c12fE104D3245b20E7E69EE8620662C9",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
  },
  [baseSepolia.id]: {
    miningRig: "0x8Dea737AE483153c69934ff8a5c7E3D448c2DB4C",
    darkX: "0xdE87E198D2A5d6894a03AfCb34876601A6dd226f",
    wishWell: "0xC8A96A9163C2D11e2002C589a5DC7Ee4267499e2",
  },
  [pulsechain.id]: {
    miningRig: "0x1Eca1A64E18E72c46971a80D91F015a569FE9FBd",
    darkX: "0xCC18F40724971Be55AB5508607d8024Ee9Bf8796",
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
  },
  [base.id]: {
    miningRig: "0x698Ae58B7AB13ad232A84d684e8111D2c6A6d904",
    darkX: "0xb070db7dCad8F5081c3e9033633782258fCa811c",
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
  },
};
