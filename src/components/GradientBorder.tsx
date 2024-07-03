import { twMerge } from "tailwind-merge";

export default function GradientBorder({
  children,
  clasName,
  from,
  to,
  direction,
  borderSize,
}: {
  children: React.ReactNode;
  clasName?: string;
  from: string;
  to: string;
  direction:
    | "t"
    | "r"
    | "b"
    | "l"
    | "tr"
    | "tl"
    | "br"
    | "bl"
    | "tlbr"
    | "trbl";
  borderSize: number;
}) {
  return (
    <div
      className={twMerge(
        `relative border-t-4 border-b-4 md:border-4  mt-[30px] bg-clip-padding border-transparent p-[16px] md:p-[32px] bg-agblack md:rounded-xl z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden`,
        clasName,
      )}
    >
      {children}
    </div>
  );
}
