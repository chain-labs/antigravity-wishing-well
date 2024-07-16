import Button from "@/components/Button";
import { useAccount } from "wagmi";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";

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

  return (
    <>
      <Button
        className="h-fit lg:w-fit leading-[16px]"
        onClick={
          !loading
            ? account.isConnected
              ? handleRegister
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
            ? loading
              ? !error
                ? "Checking your Registration"
                : "Recheck"
              : !isRegistered
                ? registerIdle
                  ? "REGISTER NOW"
                  : "Registering..."
                : ""
            : "CONNECT WALLET"
        }
        loading={account.isConnected && loading}
        iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
        iconPosition="start"
        variants={
          !account.isConnected && !isRegistered && registerIdle
            ? {
                hover: {
                  animationName: "wiggle",
                  animationDuration: "1s",
                  animationFillMode: "forwards",
                  animationTimingFunction: "linear",
                },
              }
            : {}
        }
      />{" "}
    </>
  );
};
