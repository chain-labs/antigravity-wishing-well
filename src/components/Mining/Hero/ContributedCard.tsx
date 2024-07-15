import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { pointsConverterToUSCommaseparated } from "../MiningCalculator";
import H1 from "@/components/HTML/H1";
import Pill from "@/components/Pill";
import AutomaticIncreamentalNumberCounter from "@/components/Home/components/spinner/AutomaticIncreamentalNumberCounter";
import AutomaticIncreamentalNumberCounterWithString from "../AutomaticIncreamentalNumberCounterWithString";

export default function ContributedCard({
  value,
  pillText,
  pillIconSrc,
  pillIconAlt,
  animateNumber = false,
  from = 0,
  to = 0,
}: {
  value: number;
  pillText: string;
  pillIconSrc: string | StaticImport;
  pillIconAlt: string;
  animateNumber?: boolean;
  from?: number;
  to?: number;
}) {
  return (
    <div
      className="relative flex justify-between gap-[4px] z-0 text-agwhite transition-all duration-300 ease-in-out bg-agblack rounded-[6px] px-[12px] py-[16px] w-full border-[1px]
          before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
          after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden"
    >
      {animateNumber ? (
        <H1 className="text-[32px] leading-[32px] md:text-[32px] md:leading-[32px]">
          <AutomaticIncreamentalNumberCounterWithString
            from={from + ""}
            to={to + ""}
            float={String(to).includes(".")}
            // floatingPoint={String(to).split(".")[1]?.length}
          />
        </H1>
      ) : (
        <H1 className="text-[32px] leading-[32px] md:text-[32px] md:leading-[32px]">
          {pointsConverterToUSCommaseparated(value)}
        </H1>
      )}
      <div className="flex flex-col justify-center items-center">
        <Pill text={pillText} iconSrc={pillIconSrc} iconAlt={pillIconAlt} />
      </div>
    </div>
  );
}
