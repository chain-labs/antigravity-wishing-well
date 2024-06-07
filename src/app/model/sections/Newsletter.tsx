"use client";

import Image from "next/image";
import { useState } from "react";

export default function Newsletter() {
	const [success, setSuccess] = useState(false);
	return (
		<div className="flex flex-col md:flex-row items-start justify-center md:w-4/5 mx-4 md:mx-auto gap-4 md:gap-16 my-32 md:my-64">
			{success === false ? (
				<>
					<div className="flex flex-col gap-2">
						<h1 className="text-6xl text-left text-white font-sans font-black md:text-nowrap">
							Ignite Your <br /> Boosters.
						</h1>
						<p className="text-xl md:text-nowrap md:text-center from-white to-[#999999] font-sans font-medium bg-gradient-to-b text-transparent bg-clip-text">
							Get all Antigravity updates in your inbox.
						</p>
					</div>
					<form action="" className="flex flex-col gap-4 w-full md:w-fit">
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Your Name"
							className="text-agblack p-3 rounded-xl w-full md:w-[30em] font-sans font-semibold text-lg"
						/>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="your@email.com"
							className="text-agblack p-3 rounded-xl w-full md:w-[30em] font-sans font-semibold text-lg"
						/>
						<button
							type="submit"
							className="uppercase tracking-widest rounded-md bg-brblue px-4 py-3 text-white font-sans font-extrabold flex justify-center items-center text-xl gap-2 w-fit"
						>
							<Image
								src={require("@/app/model/assets/icons/send.svg")}
								alt="send"
								width={40}
								height={40}
							/>
							Submit
						</button>
					</form>
				</>
			) : (
				<div className="flex flex-col justify-center items-center gap-4">
					<h1 className="text-6xl text-left from-white to-[#999999] font-sans font-black bg-gradient-to-b text-transparent bg-clip-text">
						Success!
					</h1>
					<p className="text-xl text-center from-white to-[#999999] font-sans font-medium bg-gradient-to-b text-transparent bg-clip-text">
						You&apos;ll get all Antigravity updates in your inbox.
						<br /> Stay tune!.
					</p>
				</div>
			)}
		</div>
	);
}
