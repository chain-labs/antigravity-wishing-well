"use client";

import DynamicNumberCounter from "@/app/components/spinner/DynamicNumberCounter";

export default function CountdownTimer({
	state,
}: {
	state: {
		days: number;
		hours: number;
		mins: number;
		secs: number;
		phase: 1 | 2 | 3;
	};
}) {
	return (
		<>
			<div className="tracking-widest uppercase text-2xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
				ETA for phase {(state.phase + 1) % 4 ? state.phase + 1 : 1}
			</div>
			<div className="relative flex gap-2 md:gap-3 text-agyellow font-sans">
				<div className="flex items-center justify-center flex-col">
					<h1 className="hidden md:flex text-6xl font-extrabold">
						<DynamicNumberCounter
							count={state.days}
							setCount={() => {}}
							modulo={10000}
							boxPixelSize={60}
						/>
					</h1>
					<h1 className="md:hidden text-5xl font-extrabold">
						<DynamicNumberCounter
							count={state.days}
							setCount={() => {}}
							modulo={10000}
							boxPixelSize={48}
						/>
					</h1>
					<p className="text-lg md:text-xl uppercase font-extrabold tracking-widest">
						Days
					</p>
				</div>
				<div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
				<div className="flex items-center justify-center flex-col">
					<h1 className="hidden md:flex text-6xl font-extrabold">
						<DynamicNumberCounter
							count={state.hours}
							setCount={() => {}}
							modulo={24}
							boxPixelSize={60}
						/>
					</h1>
					<h1 className="md:hidden text-5xl font-extrabold">
						<DynamicNumberCounter
							count={state.hours}
							setCount={() => {}}
							modulo={24}
							boxPixelSize={48}
						/>
					</h1>
					<p className="text-xl uppercase font-extrabold tracking-widest">
						Hours
					</p>
				</div>
				<div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
				<div className="flex items-center justify-center flex-col">
					<h1 className="hidden md:flex text-6xl font-extrabold">
						<DynamicNumberCounter
							count={state.mins}
							setCount={() => {}}
							modulo={60}
							boxPixelSize={60}
						/>
					</h1>
					<h1 className="md:hidden text-5xl font-extrabold">
						<DynamicNumberCounter
							count={state.mins}
							setCount={() => {}}
							modulo={60}
							boxPixelSize={48}
						/>
					</h1>
					<p className="text-lg md:text-xl uppercase font-extrabold tracking-widest">
						Mins
					</p>
				</div>
				<div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
				<div className="flex items-center justify-center flex-col">
					<h1 className="hidden md:flex text-6xl font-extrabold">
						<DynamicNumberCounter
							count={state.secs}
							setCount={() => {}}
							modulo={60}
							boxPixelSize={60}
						/>
					</h1>
					<h1 className="md:hidden text-5xl font-extrabold">
						<DynamicNumberCounter
							count={state.secs}
							setCount={() => {}}
							modulo={60}
							boxPixelSize={48}
						/>
					</h1>
					<p className="text-lg md:text-xl uppercase font-extrabold tracking-widest">
						Secs
					</p>
				</div>
			</div>
		</>
	);
}
