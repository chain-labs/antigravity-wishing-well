interface TimerBoxProps {
  value: number;
  text: string;
}
const TimerBox = ({ value, text }: TimerBoxProps) => {
  const formattedValue = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center text-agblack bg-agyellow p-4 w-full rounded-lg uppercase">
      <p className="font-sans text-6xl lg:text-9xl font-black">
        {formattedValue}
      </p>
      <p className="font-sans text-lg font-extrabold">{text}</p>
    </div>
  );
};

export default TimerBox;
