import { pulsechain } from "viem/chains";
import ABI from "./abi.json";
import { CONTRACTS } from "../config";
const abi = ABI;
const address: `0x${string}` = CONTRACTS[pulsechain.id].wishWell;

const PulsechainAG = { abi, address };

export default PulsechainAG;
