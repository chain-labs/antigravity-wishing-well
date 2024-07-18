import { baseSepolia } from "viem/chains";
import ABI from "./abi.json";
import { CONTRACTS } from "../config";
const abi = ABI;
const address: `0x${string}` = CONTRACTS[baseSepolia.id].wishwell;

const BaseSepoliaAG = { abi, address };

export default BaseSepoliaAG;
