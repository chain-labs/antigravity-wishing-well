import Image from "next/image";
import Header from "@/components/Home/components/header/Header";
import WalletNotConnectedHero from "@/components/Wishwell/components/WalletNotConnectedHero";
import { Dispatch } from "react";

export default function WalletNotConnected({
  registrationKit,
}: {
  registrationKit: {
    loading: boolean;
    error: boolean;
    registerIdle: boolean;
    setError: Dispatch<React.SetStateAction<boolean>>;
    handleRegister: any;
    isRegistered: boolean;
  };
}) {
  return (
    <>
      <WalletNotConnectedHero registrationKit={registrationKit} />
    </>
  );
}
