export default function GradientBorder({
  from,
  to,
  direction,
  borderSize,
}: {
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
  return `relative bg-clip-padding border-transparent bg-agblack  z-0 border-[${borderSize}px]
      before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-${direction} before:from-[${from}] before:to-[${to}] before:rounded-[inherit] before:overflow-hidden before:m-[-${borderSize}px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden`;
}
