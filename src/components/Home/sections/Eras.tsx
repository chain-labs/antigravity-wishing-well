"use client";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import HeroItemCard from "@/components/HeroItemCard";

export default function Eras() {
	return (
		<div className="relative grid grid-cols-1 grid-rows-3 w-full h-[180vh] md:h-[100vh] z-0 my-32">
			<HeroItemCard
				title="WishWell"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={IMAGEKIT_IMAGES.WISHWELL}
				animateFrom="left"
				className="object-[50%_55%]"
				cardExternalLink="/wishwell"
			/>
			<HeroItemCard
				title="Mining"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={IMAGEKIT_IMAGES.MINING}
				animateFrom="right"
				cardExternalLink="/mining"
			/>
			<HeroItemCard
				title="The Collective"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={IMAGEKIT_IMAGES.MINTING}
				animateFrom="left"
				className="object-[0px_25%]"
				cardExternalLink="/collective"
			/>
		</div>
	);
}
