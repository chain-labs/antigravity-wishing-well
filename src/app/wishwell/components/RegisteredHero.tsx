import H1 from "@/app/components/HTML/H1";
import P from "@/app/components/HTML/P";
import Button from "@/stories/Button";
import Image from "next/image";

export default function RegisteredHero() {
	return (
		<div className="relative w-screen h-screen -z-[1]">
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000] to-[#00000000]">
				<div className="absolute bottom-0 left-0 flex flex-col gap-[16px] py-[48px] px-[96px]">
					<H1 className="md:text-[64px] font-black">Make A Wish</H1>
					<P>
						Get points + the WishWell NFT in your wallet.
						<br />
						Earn more points while the bonus is still in play!
					</P>
					<div className="flex justify-center items-center gap-[16px]">
						<Button
							innerText="Wishwell.eth"
							iconSrc={require("@/app/assets/icons/copy.svg")}
							iconAlt="info icon"
                            iconPosition="end"
						/>
						<Button
							innerText="Wishwell.pls"
							iconSrc={require("@/app/assets/icons/copy.svg")}
							iconAlt="info icon"
                            iconPosition="end"
						/>
					</div>

                    <div className="flex flex-col py-[32px] gap-[8px]">
                        <P>Here are some tokens that we encourage for contribution:</P>
                    </div>
				</div>
				<Image
					src={require("@/app/wishwell/assets/bg.png")}
					alt="background"
					layout="cover"
					objectFit="cover"
					className="absolute top-0 left-0 -z-[1] w-full h-full"
				/>
			</div>
		</div>
	);
}
