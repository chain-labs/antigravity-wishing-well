import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Header from "../Header";
import Registered from "./Registered";
import IMAGEKIT from "../images";
import Success from "./Success";
import Main from "./main";

interface RegisterProps {
  isRegistered: boolean;
  handleRegister: () => void;
  isSuccess: boolean;
  tokenId: BigInt;
  loading: boolean;
  registerIdle: boolean;
  error: boolean;
  setError: (args0: boolean) => void;
  setPoll: (args0: boolean) => void;
}

const Register = ({
  isRegistered,
  handleRegister,
  isSuccess,
  tokenId,
  loading,
  registerIdle,
  error,
  setError,
  setPoll,
}: RegisterProps) => {
  const { openConnectModal } = useConnectModal();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen sm:min-h-full sm:items-center flex-1">
          <Image
            src={!isRegistered ? IMAGEKIT.HERO_LANDING : IMAGEKIT.REGISTERED}
            alt="bg_hero_reg"
            className="object-cover object-landing-bg"
            fill
            priority
          />
      <div className="fixed top-0 w-full z-50 items-center lg:justify-around pt-12 px-2">
        <Header />
      </div>


      {!isRegistered && !isSuccess ? (
        <Main
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          loading={loading}
          isRegistered={isRegistered}
          registerIdle={registerIdle}
          error={error}
          setError={setError}
        />
      ) : isSuccess ? (
        <Success tokenId={tokenId} />
      ) : (
        <Registered setPoll={setPoll} />
      )}
    </div>
  );
};

export default Register;
