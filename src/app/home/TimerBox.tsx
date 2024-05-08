interface TimerBoxProps {
  value: number;
  text: string;
}
const TimerBox = ({ value, text }: TimerBoxProps) => {
  const formattedValue = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center text-agblack bg-agyellow py-4 px-8 w-fit rounded-lg uppercase justify-center">
      <p className="font-sans text-6xl lg:text-7xl font-black md:min-w-[110px] min-w-[90px] text-center">
        {formattedValue}
      </p>
      <p className="font-sans text-lg font-extrabold">{text}</p>
    </div>
  );
};

export default TimerBox;
