"use client";

import { MotionValue, useSpring, useTransform, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type CounterProps = {
	count: number;
	setCount?: Dispatch<SetStateAction<number>>;
	minValue?: number;
	modulo: number;
};

export default function DynamicNumberCounter(props: CounterProps) {
	const { count, setCount, modulo } = props;
	const arrayOfNumbers = Array.from({ length: 3 }, (_, i) => {
		if (count + i <= 0) {
			return modulo - 1;
		}
		return count + i - 1;
	});
	const animatedValue = useSpring(count);

	useEffect(() => {
		animatedValue.set(count);
	}, [count, animatedValue]);

	return (
		<>
			<div className="relative overflow-hidden flex flex-col justify-center items-center h-12 w-16">
				{arrayOfNumbers.map((num) => (
					<Count
						num={String(num).padStart(2, "0")}
						mv={animatedValue}
						key={num}
						modulo={modulo}
					/>
				))}
			</div>
		</>
	);
}

function Count({
	num,
	mv,
	modulo,
}: {
	num: string;
	mv: MotionValue;
	modulo: number;
}) {
	let y = useTransform(mv, (latestValue) => {
		return 48 * (Number(num) - latestValue);
	});
	return (
		<motion.span
			style={{ y }}
			viewport={{ once: true }}
			key={num}
			className={twMerge(
				"absolute inset-0 w-12 h-12 text-center leading-[3rem]",
				String(num).includes("1") || String(num).includes("7")
					? "mx-auto"
					: ""
			)}
		>
			{num}
		</motion.span>
	);
}