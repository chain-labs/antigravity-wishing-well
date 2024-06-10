import Image from "next/image";
import Header from "../Header";
import Registered from "./Registered";
import IMAGEKIT from "../images";
import Success from "./Success";
import Main from "./main";

interface RegisterProps {
  handleLogin: (args0: React.MouseEvent) => void;
  isRegistered: boolean;
  handleRegister: (args0: React.MouseEvent) => void;
  isSuccess: boolean;
  tokenId: BigInt;
  loading: boolean;
  registerIdle: boolean;
  error: boolean;
  setError: (args0: boolean) => void;
  setPoll: (args0: boolean) => void;
}

const Register = ({
  handleLogin,
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
  return (
    <div className="flex flex-col relative min-h-screen sm:min-h-full sm:items-center flex-1">
      <Image
        src={!isRegistered ? IMAGEKIT.HERO_LANDING : IMAGEKIT.REGISTERED}
        alt="bg_hero_reg"
        className="object-cover object-landing-bg"
        fill
        priority
      />
      <div className="fixed top-0 w-full z-50 items-center pt-12 px-4">
        {/* <Header /> */}
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
