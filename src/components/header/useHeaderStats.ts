import useDarkContract from "@/abi/Dark";
import useLCC_Contract from "@/abi/LaunchControlCenter";
import { useEffect, useMemo, useState } from "react";
import { formatUnits, zeroAddress } from "viem";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "@wagmi/core";
import useJPMContract from "@/abi/JourneyPhaseManager";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";
import useUserData from "@/app/(client)/store";

const useHeaderStats = () => {
  const config = useConfig();
  const LCC_Contract = useLCC_Contract();
  const JPM_Contract = useJPMContract();
  const DarkContract = useDarkContract();
  const account = useAccount();
  const { mutation } = useUserData();

  const [darkBalance, setDarkBalance] = useState<string>();
  const [treasuryBalance, setTreasuryBalance] = useState<string>();
  const [journey, setJourney] = useState("");

  useEffect(() => {
    let timer: any = undefined;
    if (
      DarkContract.address !== zeroAddress &&
      LCC_Contract.address !== zeroAddress
    ) {
      timer = setInterval(() => {
        readContract(config, {
          abi: LCC_Contract.abi,
          address: LCC_Contract.address as `0x${string}`,
          functionName: "treasury",
          chainId: TEST_NETWORK ? sepolia.id : pulsechain.id,
          args: [],
        }).then((treasury) => {
          readContract(config, {
            abi: DarkContract.abi,
            address: DarkContract.address as `0x${string}`,
            functionName: "balanceOf",
            chainId: TEST_NETWORK ? sepolia.id : pulsechain.id,
            args: [treasury],
          }).then((treasuryBalance) => {
            setTreasuryBalance(formatUnits(treasuryBalance as bigint, 18));
          });
        });
      }, 4000);

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [DarkContract, LCC_Contract, config]);

  useEffect(() => {
    let timer: any = undefined;
    if (JPM_Contract.address !== zeroAddress) {
      timer = setInterval(() => {
        readContract(config, {
          abi: JPM_Contract.abi,
          address: JPM_Contract.address as `0x${string}`,
          functionName: "currentJourney",
          chainId: TEST_NETWORK ? sepolia.id : pulsechain.id,
          args: [],
        }).then((journey) => {
          setJourney((journey as bigint).toString());
        });
      }, 4000);

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [JPM_Contract, config]);

  useEffect(() => {
    let timer = undefined;
    if (account.address && DarkContract.address !== zeroAddress) {
      timer = setInterval(() => {
        readContract(config, {
          abi: DarkContract.abi,
          address: DarkContract.address as `0x${string}`,
          functionName: "balanceOf",
          chainId: TEST_NETWORK ? sepolia.id : pulsechain.id,
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
    journey,
  };
};

export default useHeaderStats;
