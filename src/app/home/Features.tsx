const repItems = [
    {
        name: 'Minting',
        img: 'minting.svg',
        alt: 'minting'
    },
    {
        name: 'Unwrapping',
        img: 'unwrapping.svg',
        alt: 'unwrapping'
    },
    {
        name: 'Scraping',
        img: 'scraping.svg',
        alt: 'scraping'
    }
];

const Features = () => {
    return (
        <div className="flex flex-col ">
            <div className='h-screen w-full'>
                <img
                    src="features.svg"
                    alt="values"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute p-24 right-0 w-[64%]">
                <p className="text-6xl font-black font-sans capitalize">
                    So, what can you do with Antigravity?
                </p>
                <div className="flex mt-12 flex-col">
                    <div className="flex">
                        <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
                            <div className="bg-agblack px-4 py-8  h-[254px] w-[400px] flex flex-col items-center">
                                <div className="w-[150px] h-[150px] mb-4">
                                    <img className="w-full h-full" src={'minting.svg'} alt={'minting'} />
                                </div>
                                <p className="text-2xl font-sans font-extrabold">Mining</p>
                            </div>
                        </div>
                        <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
                            <div className="bg-agblack px-4 py-8  h-[254px] w-[258px] flex flex-col items-center">
                                <div className="w-[150px] h-[150px] mb-4">
                                    <img className="w-full h-full" src={'claiming.svg'} alt={'claiming'} />
                                </div>
                                <p className="text-2xl font-sans font-extrabold">Claiming</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex">
                            {
                                repItems.map((item) => {
                                    return <div key={item.alt} className=" bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
                                        <div className="bg-agblack px-4 py-8  h-[254px] w-[214px] flex flex-col items-center">
                                            <div className="w-[150px] h-[150px] mb-4">
                                                <img className="w-full h-full" src={item.img} alt={item.alt} />
                                            </div>
                                            <p className="text-2xl font-sans font-extrabold">{item.name}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >


        </div >
    );
};

export default Features;