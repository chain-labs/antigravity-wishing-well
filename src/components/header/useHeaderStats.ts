import useDarkContract from "@/abi/Dark";
import useLCC_Contract from "@/abi/LaunchControlCenter";
import { useEffect, useMemo, useState } from "react";
import { formatUnits, zeroAddress } from "viem";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "@wagmi/core";
import useJPMContract from "@/abi/JourneyPhaseManager";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";
import { useUserData } from "@/app/(client)/store";
import useTreasuryContract from "@/abi/Treasury";
import { config, TESTCHAINS } from "../RainbowKit";

const useHeaderStats = () => {
  const LCC_Contract = useLCC_Contract();
  const TreasuryContract = useTreasuryContract();
  const JPM_Contract = useJPMContract();
  const DarkContract = useDarkContract();
  const account = useAccount();
  const { mutation } = useUserData();

  const [darkBalance, setDarkBalance] = useState<string>();
  const [treasuryBalance, setTreasuryBalance] = useState<string>();

  useEffect(() => {
    let timer: any = undefined;
    if (
      DarkContract.address !== zeroAddress &&
      LCC_Contract.address !== zeroAddress
    ) {
      timer = setInterval(() => {
        readContract(config, {
          abi: DarkContract.abi,
          address: DarkContract.address as `0x${string}`,
          functionName: "balanceOf",
          chainId: TEST_NETWORK ? TESTCHAINS[0].id : pulsechain.id,
          args: [`${TreasuryContract.address}`],
        }).then((treasuryBalance) => {
          setTreasuryBalance(formatUnits(treasuryBalance as bigint, 18));
        });
      }, 6000);

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [DarkContract, LCC_Contract, config]);

  useEffect(() => {
    let timer = undefined;
    if (account.address && DarkContract.address !== zeroAddress) {
      timer = setInterval(() => {
        readContract(config, {
          abi: DarkContract.abi,
          address: DarkContract.address as `0x${string}`,
          functionName: "balanceOf",
          chainId: TEST_NETWORK ? TESTCHAINS[0].id : pulsechain.id,
          args: [account.address as `0x${string}`],
        }).then((data) => {
          const balance = formatUnits(data as bigint, 18);
          mutation({ darkBalance: Number(balance) });
          setDarkBalance(balance);
        });
      }, 4000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [account.address, DarkContract, config]);

  return {
    darkBalance,
    treasuryBalance,
  };
};

export default useHeaderStats;
