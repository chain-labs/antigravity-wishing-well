import CountdownTimer from "@/components/CountdownTimer";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import useTimer from "@/hooks/frontend/useTimer";

export default function ClaimTransitionWait() {
  const timer = useTimer();
  return (
    <div className="h-screen px-[16px] flex flex-col justify-center items-center gap-[24px] pb-[50px] md:pb-[100px]">
      <div className="flex flex-col justify-center md:items-center gap-[8px] mt-auto md:mt-0">
        <H1 className="text-[64px] leading-[64px] md:text-[64px] md:leading-[64px] text-agwhite">
          Claiming will start soon.
        </H1>
        <P className="text-[14px] leading-[20.3px]">
          Mining has ended. Thank you for participating.
        </P>
      </div>
      <div className="p-[8px] rounded-[6px] bg-[#030404A8]">
        <CountdownTimer state={timer} fontDesktopSize={56} />
      </div>
    </div>
  );
}
