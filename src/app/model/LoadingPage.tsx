"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingPage({
	contentLoaded,
}: {
	contentLoaded: boolean;
}) {
	const [progress, setProgress] = useState(0);
	const [slideUpProgress, setSlideUpProgress] = useState(0);
	useEffect(() => {
		if (contentLoaded) {
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev < 100) {
						return prev + 1;
					}
					return prev;
				});
			}, 10);
			return () => clearInterval(interval);
		} else {
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev < 95) {
						return prev + 1;
					}
					return prev;
				});
			}, 50);
			return () => clearInterval(interval);
		}
	}, [contentLoaded]);

	useEffect(() => {
		if (progress === 100) {
			const interval = setInterval(() => {
				setSlideUpProgress((prev) => {
					if (prev < 100) {
						return prev + 1;
					}
					return prev;
				});
			}, 1);
			return () => clearInterval(interval);
		}
	}, [progress, contentLoaded]);

	return (
		<div
			style={{
				top: `-${slideUpProgress}%`,
			}}
			className={`fixed left-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] z-[10000]`}
		>
			<div className="absolute top-[50%] left-0 translate-y-[-50%] flex gap-4 justify-center items-center mx-32">
				<Image
					src={require("@/app/model/assets/logo.svg")}
					alt="logo"
					width={100}
					height={100}
				/>
				<div className="uppercase text-6xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					Antigravity
				</div>
			</div>

			<div
				style={{
					height: `calc(${progress}%)`,
				}}
				className="absolute bottom-0 left-0 w-screen bg-gradient-to-b from-[#142266] to-[#0A1133] z-[-1]"
			></div>

			<div
				style={{
					top: `calc(100% - ${progress}% - ${(100 - progress) * 0.08}rem - ${(100 - progress) * 0.16}px)`,
				}}
				className="absolute right-0 p-4 uppercase text-[8rem] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text"
			>
				{progress}%
			</div>
		</div>
	);
}