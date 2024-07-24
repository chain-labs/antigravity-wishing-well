import { sepolia } from "viem/chains";
import { CONTRACTS } from "../config";
import ABI from "./abi.json";
const abi = ABI;
const address: `0x${string}` = CONTRACTS[sepolia.id].wishWell;

const SepoliaAG = { abi, address };

export default SepoliaAG;
