import Button from '@/components/Button';
import { TEST_NETWORK } from '@/constants';
import { checkCorrectNetwork } from '@/utils';
import Image from 'next/image';
import { FiLoader } from 'react-icons/fi';
import { baseSepolia, pulsechain } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';
import IMAGEKIT from '../../../../app/home/images';
import { IMAGEKIT_ICONS } from '@/assets/imageKit';
import { useEffect } from 'react';

interface RegisterButtonProps {
  loading: boolean;
  error: boolean;
  registerIdle: boolean;
  handleLogin: (args0: React.MouseEvent) => void;
  setError: (value: boolean) => void;
  handleRegister: (args0: React.MouseEvent) => void;
  isRegistered: boolean;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({
  loading,
  error,
  registerIdle,
  handleLogin,
  setError,
  handleRegister,
  isRegistered,
}) => {
  const account = useAccount();
  const switchChain = useSwitchChain();

  return (
    <>
      <Button
        className="h-fit lg:w-fit leading-[16px]"
        onClick={
          !loading
            ? account.isConnected
              ? checkCorrectNetwork(Number(account.chainId))
                ? handleRegister
                : () =>
                    switchChain.switchChain({
                      chainId: TEST_NETWORK ? baseSepolia.id : pulsechain.id,
                    })
              : handleLogin
            : !account.isConnected
              ? handleLogin
              : error
                ? () => {
                    setError(false);
                  }
                : () => {}
        }
        innerText={
          account.isConnected
            ? checkCorrectNetwork(Number(account.chainId))
              ? loading
                ? !error
                  ? 'Checking your Registration'
                  : 'Recheck'
                : !isRegistered
                  ? registerIdle
                    ? 'REGISTER NOW'
                    : 'Registering...'
                  : ''
              : 'Change Network'
            : 'CONNECT WALLET'
        }
        loading={
          account.isConnected &&
          checkCorrectNetwork(Number(account.chainId)) &&
          loading
        }
        iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
        iconPosition="start"
      />
      {/* {(account.address && loading && !error) || !registerIdle ? (
				<div className="animate-[spin_2s_ease-out_infinite]">
					<FiLoader />
				</div>
			) */}
    </>
  );
};
