"use client";

import Newsletter from "@/components/Home/sections/Newsletter";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import MiningHero from "@/components/Mining/MiningHero";
import { useAccount } from "wagmi";
import Footer from "@/components/Home/sections/Footer";

export default function MiningPage() {
  const account = useAccount();

  // useEffect(() => {
  // 	const interval = setInterval(() => {
  // 		miningNotif("0x...5678 just mined 2,000 DarkX tokens!");
  // 	}, 5000);

  // 	const interval2 = setInterval(() => {
  // 		successToast("0x...5678 just mined 2,000 DarkX tokens!");
  // 	}, 10000);
  // 	const interval3 = setInterval(() => {
  // 		errorToast("0x...5678 just mined 2,000 DarkX tokens!");
  // 	}, 10000);
  // 	const interval4 = setInterval(() => {
  // 		warningToast("0x...5678 just mined 2,000 DarkX tokens!");
  // 	}, 10000);
  // 	const interval5 = setInterval(() => {
  // 		generalToast("0x...5678 just mined 2,000 DarkX tokens!");
  // 	}, 10000);

  // 	return () => {
  // 		clearInterval(interval);
  // 		clearInterval(interval2);
  // 		clearInterval(interval3);
  // 		clearInterval(interval4);
  // 		clearInterval(interval5);
  // 	};
  // }, []);

  return (
    <>
      <MiningHero />
      {account.isConnected && <Leaderboard accountIsConnected typeOfLeaderboard="era2Leaderboard" />}
      <Newsletter />
      <Footer />
    </>
  );
}
