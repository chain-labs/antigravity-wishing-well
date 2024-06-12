import Button from "@/stories/Button";
import { TEST_NETWORK } from "@/constants";
import { checkCorrectNetwork } from "@/utils";
import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import { baseSepolia, pulsechain } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import IMAGEKIT from "../../home/images";

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
				className="w-full lg:w-fit text-[16px] rounded-[4px] font-bold"
				size="small"
				onClick={
					!loading
						? account.isConnected
							? checkCorrectNetwork(Number(account.chainId))
								? handleRegister
								: () =>
										switchChain.switchChain({
											chainId: TEST_NETWORK
												? baseSepolia.id
												: pulsechain.id,
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
									? "Checking your Registration"
									: "Recheck"
								: !isRegistered
									? registerIdle
										? "REGISTER NOW"
										: "Registering..."
									: ""
							: "Change Network"
						: "CONNECT WALLET"
				}
				iconSrc={require("@/app/assets/icons/wallet.svg")}
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
