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
    treasury?: Address;
    jackpot?: Address;
    evilAddress?: Address;
  }
> = {
  [sepolia.id]: {
    miningRig: "0x020d3Ca9605bb17CC17Ea0DB2bFfed3fA0869fCF",
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
    // antigravity: "0xbf4d8CD1563E222e62354aE7daa64739FccE310f",
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    dark: "0x20E070c2e6eB00bC0ACFD801778a1BE24D5423c1",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    fuelCell: "0x77fB461abB743497dc23EB1e2a4fdEfAc35aFfea",
    launchControlCenter: "0x09d12a40EbeA8F7860a32973D514E6b55d279a2c",
    journeyPhaseManager: "0xA2893EBA6461c7e9142Bd5781E53782927894d61",
    evilAddress: "0x86E29Dbd64F36a66d0Ddb96E2FF2A9d571fb41dB",
    treasury: "0xB52C954442f021D85Bd36103e742A07825a1af72",
    jackpot: "0x3446Fd1cAd7ABA32b998B757767Be19569f866d6",
    darkFaucet: "0x1792dedc1A50849041C063BFB686b8350DF9CD73",
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
