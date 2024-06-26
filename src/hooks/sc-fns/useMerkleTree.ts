import React, { useEffect, useMemo } from "react";
import KECCAK256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { encodeAbiParameters } from "viem";

type Props = {};

const useMerkleTree = (list: Array<string>) => {
  const buf2hex = (x: any) => "0x" + x.toString("hex");

  function generateLeaf(item: string) {
    return KECCAK256(
      encodeAbiParameters([{ type: "address" }], [item as `0x${string}`])
    );
  }

  const tree = useMemo(() => {
    const leaves = list.map((item) => generateLeaf(item));
    return new MerkleTree(leaves, KECCAK256, { sortPairs: true });
  }, [list]);

  const root = useMemo(() => {
    return buf2hex(tree.getRoot());
  }, [tree]);

  const generateProof = (candidate: string) => {
    const leaf = buf2hex(generateLeaf(candidate as `0x${string}`));
    const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
    console.log({ proof });

    return proof;
  };

  return { tree, root, generateProof };
};

export default useMerkleTree;
