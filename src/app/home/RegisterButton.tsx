import Button from "@/components/Button";
import { TEST_NETWORK } from "@/constants";
import { checkCorrectNetwork } from "@/utils";
import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import { baseSepolia, pulsechain } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

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
    <Button
      className="w-full lg:w-fit"
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
    >
      {(account.address && loading && !error) || !registerIdle ? (
        <div className="animate-[spin_2s_ease-out_infinite]">
          <FiLoader />
        </div>
      ) : (
        <div className="relative h-6 w-6">
          <Image
            src={
              account.isConnected
                ? "https://ik.imagekit.io/xlvg9oc4k/Antigravity/pen.svg"
                : "https://ik.imagekit.io/xlvg9oc4k/Antigravity/wallet.svg"
            }
            className="w-6 h-6 lg:w-8 lg:h-8 mr-2"
            alt="wallet_icon"
            fill
          />
        </div>
      )}
      {account.isConnected
        ? checkCorrectNetwork(Number(account.chainId))
          ? loading
            ? !error
              ? "Checking your Registration"
              : "Recheck"
            : !isRegistered
            ? registerIdle
              ? "REGISTER NOW"
              : "Registering..."
            : ""
          : "Change Network"
        : "CONNECT WALLET"}
    </Button>
  );
};
