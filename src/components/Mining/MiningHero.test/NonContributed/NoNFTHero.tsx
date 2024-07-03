import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";

function NoNFTHero() {
  return (
    <div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0">
      <H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
        Mining
      </H1>
      <P>
        Everyone is going to say you got lucky!
        <br />
        <br />
        Start mining with the recommended tokens and get Points and $DARKX
        tokens.
        <br />
        <br />
        Try the interactive demo! ➡️
      </P>
    </div>
  );
}

export default NoNFTHero;
