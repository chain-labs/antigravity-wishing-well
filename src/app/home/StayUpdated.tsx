const StayUpdated = () => {

    return (
        <div className="flex flex-col">
            <div className='h-auto w-full'>
                <img
                    src="stay_updated.svg"
                    alt="stay_updated"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute p-32 w-full">
                <div className="flex justify-center">
                    <div className="flex flex-col mr-20">
                        <p className="font-sans text-5xl font-black">Stay Updated!</p>
                        <p className="font-sans font-normal text-xl mt-4">Get all Antigravity updates in your inbox.</p>
                    </div>
                    <div className="flex flex-col float-start">
                        <input className="p-4 rounded-lg font-sans font-semibold text-xl mb-4 w-[375px]" placeholder="Your Name" />
                        <input className="p-4 rounded-lg font-sans font-semibold text-xl mb-2 w-[375px]" placeholder="Your@email.com" />
                        <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue w-1/2 px-6 py-4 mt-6 lg:mb-0 lg:mr-4">
                            <img src="telegram.svg" className="w-6 h-6 mr-2 " alt="wallet_icon" /> Submit
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default StayUpdated;