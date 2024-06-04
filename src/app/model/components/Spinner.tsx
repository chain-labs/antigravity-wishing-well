export default function Spinner() {
	return (
		<div className="w-[500px] h-[500px] bg-white rounded-full flex justify-center items-center">
			<div className="w-[470px] h-[470px] bg-[radial-gradient(circle_at_center,rgba(183,164,234,1),rgba(28,0,104,1))] rounded-full flex justify-center items-center">
				<div className="w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(183,164,234,1),rgba(28,0,104,1))] rounded-full border-[10px] border-agblack flex justify-center items-center">
					<div className="w-[180px] h-[180px] bg-[#1C0068] rounded-full border-[10px] border-agblack flex justify-center items-center">
						<div className="w-[100px] h-[100px] bg-agyellow rounded-full flex justify-center items-center">
							<div className="flex flex-col justify-center items-center">
								<h1 className="font-sans font-black text-4xl">
									22x
								</h1>
								<div className="uppercase text-sm">Bonus</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="absolute flex justify-center items-center h-[200px] w-[400px] bg-[radial-gradient(circle_at_top_right,#5537A5,#BF6841)] rounded-bl-full rounded-br-full translate-y-[50%]"></div> */}
				<div className="absolute flex justify-center items-start h-[190px] w-[380px] bg-[radial-gradient(circle_at_bottom,#15004C,#3C00DC)] rounded-bl-full rounded-br-full bg-clip-padding border-transparent border-[10px] before:content-[''] before:absolute before:inset-0 before:-z-10 before:-m-2 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_top_right,#5537A5,#BF6841)]">
                    <div className="flex gap-2">
                        <div className="flex-col justify-center items-center gap-0">
                            <div className="font-sans text-agyellow text-4xl font-bold text-center">04</div>
                            <div className="uppercase text-lg text-white text-center">Days</div>
                        </div>
                        <div className="flex-col justify-center items-center gap-0">
                            <div className="font-sans text-agyellow text-4xl font-bold text-center">14</div>
                            <div className="uppercase text-lg text-white text-center">Hours</div>
                        </div>
                        <div className="flex-col justify-center items-center gap-0">
                            <div className="font-sans text-agyellow text-4xl font-bold text-center">48</div>
                            <div className="uppercase text-lg text-white text-center">Mins</div>
                        </div>
                        <div className="flex-col justify-center items-center gap-0">
                            <div className="font-sans text-agyellow text-4xl font-bold text-center">56</div>
                            <div className="uppercase text-lg text-white text-center">Secs</div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	);
}
