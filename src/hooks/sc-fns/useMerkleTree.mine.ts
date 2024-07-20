import React, { useEffect, useMemo } from "react";
import KECCAK256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { encodeAbiParameters, zeroAddress } from "viem";

type Props = {};

/**
 * Hook to utilize a merkle tree as a utility for mining functionality of $DarkX tokens
 *
 * @param {Array<string>} addresses
 * @returns {{ tree: any; root: any; generateProof: (candidate: string) => any; }}
 */
const useMerkleTree = (addresses: Array<string>) => {
  const buf2hex = (x: any) => "0x" + x.toString("hex");

  const list = useMemo(() => {
    if (addresses.length === 1) {
      return [zeroAddress, addresses[0]];
    } else {
      return addresses;
    }
  }, [addresses]);

  /**
   * Util Function to generate leaf for an item provided
   *
   * @param {string} item
   * @returns {*}
   */
  function generateLeaf(item: string) {
    return KECCAK256(
      encodeAbiParameters([{ type: "address" }], [item as `0x${string}`]),
    );
  }

  const tree = useMemo(() => {
    const leaves = list.map((item) => generateLeaf(item));
    return new MerkleTree(leaves, KECCAK256, { sortPairs: true });
  }, [list]);

  const root = useMemo(() => {
    return buf2hex(tree.getRoot());
  }, [tree]);

  /**
   * Utility function from the useMerkleTree hook to generate merkle proof for a given address.
   *
   * @param {string} candidate
   * @returns {*}
   */
  const generateProof = (candidate: string) => {
    if (candidate === "" || candidate === undefined) return [];
    const queryAccount = list.find(
      (acc) => acc.toLowerCase() === candidate.toLowerCase(),
    );
    const leaf = buf2hex(
      generateLeaf((queryAccount || candidate) as `0x${string}`),
    );

    const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
    return proof;
  };

  return { tree, root, generateProof };
};

export default useMerkleTree;
