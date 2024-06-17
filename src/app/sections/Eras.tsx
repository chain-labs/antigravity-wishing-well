"use client";
import HeroItemCard from "@/stories/HeroItemCard";

export default function Eras() {
	return (
		<div className="relative grid grid-cols-1 grid-rows-3 w-full h-[180vh] md:h-[100vh] z-0 my-32">
			<HeroItemCard
				title="WishWell"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={require("../assets/wishwell.png")}
				animateFrom="left"
				className="object-[50%_55%]"
			/>
			<HeroItemCard
				title="Mining"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={require("../assets/mining.png")}
				animateFrom="right"
			/>
			<HeroItemCard
				title="The Collective"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={require("../assets/minting.png")}
				animateFrom="left"
				className="object-[0px_25%]"
			/>
		</div>
	);
}
