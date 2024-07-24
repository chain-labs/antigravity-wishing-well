import { base } from "viem/chains";
import ABI from "./abi.json";
import { CONTRACTS } from "../config";
const abi = ABI;
const address: `0x${string}` = CONTRACTS[base.id].wishWell;

const BaseAG = { abi, address };

export default BaseAG;
