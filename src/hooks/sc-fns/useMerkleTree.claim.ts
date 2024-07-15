import React, { useEffect, useMemo } from "react";
import KECCAK256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { encodeAbiParameters } from "viem";

type Props = {};

/**
 * Hook to utilize a merkle tree as a utility for claiming functionality of $DarkX token
 *
 * @param {Array<string>} accounts
 * @param {Array<string>} points
 * @param {Array<string>} nonces
 * @returns {{ tree: any; root: any; generateProof: (candidate: string) => any; }}
 */
const useMerkleTree = (
  accounts: Array<string>,
  points: Array<string>,
  nonces: Array<string>,
) => {
  const buf2hex = (x: any) => "0x" + x.toString("hex");

  /**
   * Util Function to generate leaf for an item provided
   *
   * @param {string} account
   * @param {string} point
   * @param {string} nonce
   * @returns {*}
   */
  function generateLeaf(account: string, point: string, nonce: string) {
    return KECCAK256(
      encodeAbiParameters(
        [{ type: "address" }, { type: "uint256" }, { type: "uint256" }],
        [account as `0x${string}`, BigInt(point), BigInt(nonce)],
      ),
    );
  }

  const tree = useMemo(() => {
    const leaves = accounts.map((acc, index) =>
      generateLeaf(acc, points[index], nonces[index]),
    );
    return new MerkleTree(leaves, KECCAK256, { sortPairs: true });
  }, [accounts, points, nonces]);

  const root = useMemo(() => {
    return buf2hex(tree.getRoot());
  }, [tree]);

  /**
   * Utility function from the useMerkleTree hook to generate merkle proof for a given address, point and nonce combination for claiming functionality.
   *
   * @param {string} account
   * @param {string} point
   * @param {string} nonce
   * @returns {*}
   */
  const generateProof = (account: string, point: string, nonce: string) => {
    if (!point && !nonce) {
      return [];
    }
    const queryAccount = accounts.find(
      (acc) => acc.toLowerCase() === account.toLowerCase(),
    );
    console.log({ queryAccount });
    const leaf = buf2hex(generateLeaf(queryAccount || account, point, nonce));
    const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
    console.log({ root });

    return proof;
  };

  return { tree, root, generateProof };
};

export default useMerkleTree;
