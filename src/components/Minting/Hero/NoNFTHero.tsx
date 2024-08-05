import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";

export default function NoNFTHero() {
  return (
    <div className="flex flex-col justify-start items-start gap-[16px] w-fit md:max-w-[451px] p-[16px] bg-[#FFFFFF4D]">
      <H1 className="text-agblack text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] lg:text-nowrap text-wrap font-black">
        Mint Fuel Cells
      </H1>
      <P className="text-agblack text-[14px] font-medium">
        Minting a fuel cell enters you into the lottery, raises your collective
        points and rank up. It also secures your treasury yield!
      </P>
    </div>
  );
}