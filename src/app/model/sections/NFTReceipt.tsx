"use client";

import Image from "next/image";

export default function NFTReceipt() {
	return (
		<div className="mx-4 my-32 flex flex-col gap-8 items-center justify-center">
			<div className="text-6xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
				Not everyone makes smart decisions.
				<br /> Except you. You badass. Here&apos;s your NFT.
			</div>
			<Image
				src={require("@/app/model/assets/nft-receipt.svg")}
				alt="NFT Receipt"
				width={300}
				height={600}
				className="rounded-lg"
			/>
			<button
				className={`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer
                                rounded-lg px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue`}
			>
				<Image
					src={require("@/app/model/assets/icons/claim.svg")}
					alt="hammer icon"
					width={25}
					height={25}
					className="object-cover"
				/>
				Claim collective rewards
			</button>
		</div>
	);
}
