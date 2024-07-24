import { twMerge } from "tailwind-merge";

export default function Badge({
  children,
  special = false,
}: {
  children: React.ReactNode;
  special?: boolean;
}) {
  return (
    <div
      className={twMerge(
        `relative px-[8px] py-[4px] border-[2px] rounded-full bg-clip-padding flex justify-center items-center z-0 text-nowrap
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden`,
        special &&
          "text-agyellow font-extrabold bg-gradient-to-b from-[#0A1133] to-[#142266] border-none",
      )}
    >
      <div className="bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text font-extrabold text-[12px] leading-[12px] tracking-widest uppercase">
        {children}
      </div>
    </div>
  );
}
