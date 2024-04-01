interface TimerBoxProps {
    value: number,
    text: string
}
const TimerBox = ({ value, text }: TimerBoxProps) => {
    return (
        <div className="flex flex-col items-center text-agblack bg-agyellow w-[220px] h-[178px] p-4 rounded-lg uppercase">
            <p className="font-sans text-9xl font-black">{value}</p>
            <p className="font-sans text-lg font-extrabold">{text}</p>
        </div>
    )
}


export default TimerBox;