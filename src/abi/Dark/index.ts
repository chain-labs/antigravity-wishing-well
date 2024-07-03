import { TEST_NETWORK } from '@/constants';
import { baseSepolia, pulsechain, sepolia } from 'viem/chains';
import { useAccount } from 'wagmi';

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from './abi.json';

const useDarkContract = (): IContract => {
  const account = useAccount();
  if (TEST_NETWORK) {
    if (account.chain?.id === baseSepolia.id) {
      // Change the address here
      return {
        address: '0x8f7d987620C65cffac0d625DDE108525e4d0CEE1',
        abi,
      };
    } else if (account.chain?.id === sepolia.id) {
      return {
        address: '0xB747729CC90281B3da088cf43C9d718e6D7ae16E',
        abi,
      };
    }
  } else {
    if (account.chain?.id === pulsechain.id) {
      // Change the address here
      return {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        abi,
      };
    }
  }

  return {};
};

export default useDarkContract;
