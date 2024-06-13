import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { UserConnected } from "./UserConnected";
import IMAGEKIT from "../../home/images";
import { motion } from "framer-motion";
import { RegisterButton } from "./RegisterButton";
import P from "../HTML/P";

type HeaderProps = {
	loading: boolean;
	error: boolean;
	registerIdle: boolean;
	handleLogin: (args0: React.MouseEvent) => void;
	handleRegister: (args0: React.MouseEvent) => void;
	isRegistered: boolean;
	setError: (args0: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
	loading,
	error,
	registerIdle,
	handleLogin,
	handleRegister,
	isRegistered,
	setError,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	// const [currentChain, setCurrentChain] = useState("");

	const account = useAccount();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<motion.header
			whileInView={{ y: 0 }}
			initial={{ y: -100 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: 1.5 }}
			className="flex flex-col h-full w-full items-center justify-center gap-3 z-50 font-extrabold"
		>
			<div className="flex text-white w-full md:w-3/4 h-14 lg:h-[72px] rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
				<div className="w-full h-full bg-agblack px-8 flex items-center justify-between rounded-lg gap-6 px-4">
					{/* Desktop View */}
					<div className="hidden md:flex md:flex-grow md:items-center h-full md:justify-between md:gap-x-6">
						<div
							className="flex items-center cursor-pointer"
							onClick={scrollToTop}
						>
							<div className="w-[37px] h-[37px] md:w-[45px] md:h-[45px] relative">
								<Image src={IMAGEKIT.HELMET} alt="icon" fill />
							</div>
							<p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
								ANTIGRAVITY
							</p>
						</div>
						<div
							className={`relative flex justify-center items-center font-extrabold text-lg font-sans gap-[16px] oveflow-hidden`}
						>
							<a href="/wishwell">
								<P uppercase gradient extrabold>
									Wishwell
								</P>
							</a>
							<a href="/mining">
								<P uppercase gradient extrabold>
									Mining
								</P>
							</a>
							<a href="/collective">
								<P uppercase gradient extrabold>
									Collective
								</P>
							</a>
							<a
								target="_blank"
								href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
							>
								<P uppercase gradient extrabold>
									WHITEPAPER
								</P>
							</a>
							{account.isConnected ? (
								<>
									<div className="w-[2px] h-[2.5rem] bg-gradient-to-b from-white via-[#999999] to-[#999999] rounded-full" />
									<UserConnected />
								</>
							) : (
								<RegisterButton
									loading={loading}
									error={error}
									registerIdle={registerIdle}
									handleLogin={handleLogin}
									setError={setError}
									handleRegister={handleRegister}
									isRegistered={isRegistered}
								/>
							)}
						</div>
					</div>
					{/* Mobile View */}
					<div
						className="flex md:hidden items-center cursor-pointer"
						onClick={scrollToTop}
					>
						<div className="w-[37px] h-[37px] md:w-[45px] md:h-[45px] relative">
							<Image src={IMAGEKIT.HELMET} alt="icon" fill />
						</div>
						<p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
							ANTIGRAVITY
						</p>
					</div>
					<div className="flex md:hidden">
						{isOpen ? (
							<IoCloseCircleOutline
								className="cursor-pointer"
								width={24}
								height={24}
								onClick={toggleMenu}
							/>
						) : (
							<IoMenu
								className="cursor-pointer"
								width={24}
								height={24}
								onClick={toggleMenu}
							/>
						)}
					</div>
				</div>
			</div>
			{isOpen ? (
				<div className="flex md:hidden w-full justify-center">
					<div className="flex text-white w-full lg:h-16 rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
						<div className="w-full h-full bg-agblack px-8 flex flex-col items-center justify-center rounded-lg gap-6 py-4">
							{account.isConnected && <UserConnected />}
							<a href="/wishwell">
								<P uppercase gradient extrabold>
									Wishwell
								</P>
							</a>
							<a href="/mining">
								<P uppercase gradient extrabold>
									Mining
								</P>
							</a>
							<a href="/collective">
								<P uppercase gradient extrabold>
									Collective
								</P>
							</a>
							<a
								target="_blank"
								href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
							>
								<P uppercase gradient extrabold>
									WHITEPAPER
								</P>
							</a>
						</div>
					</div>
				</div>
			) : null}
		</motion.header>
	);
};

export default Header;
