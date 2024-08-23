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

  const getButtonText = () => {
    if (account.isConnected) {
      if (loading) {
        if (!error) {
          return "Checking you Registration";
        } else return "Recheck";
      } else {
        if (!isRegistered) {
          if (registerIdle) {
            return "REGISTER NOW";
          } else return "Registering...";
        }
        return "Already Registered";
      }
    } else return "CONNECT WALLET";
  };

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
        innerText={getButtonText()}
        loading={(account.isConnected && loading) || !registerIdle}
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
