
const socials = [
    {
        icon: 'telegram.svg',
        alt: 'telegram'
    },
    {
        icon: 'twitter.svg',
        alt: 'twitter'
    },
    {
        icon: 'youtube.svg',
        alt: 'youtube'
    }
]
const Team = () => {

    return (
        <div className="flex flex-col">
            <div className='h-auto w-full'>
                <img
                    src="teams_bg.svg"
                    alt="team"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute p-32 w-full">
                <div className="flex  items-center justify-around flex-col">
                    <p className="text-6xl font-black font-sans capitalize">
                        Who’s behind it all?
                    </p>
                    <div className='h-[145px] w-[145px] mt-10'>
                        <img
                            src="team_admin.svg"
                            alt="team"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <p className="font-sans font-extrabold text-2xl mt-4">@HEXrayVision</p>
                    <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
                        <div className="bg-agblack flex items-center px-6 py-4">
                            {

                            }
                            {
                                socials.map((item, i) => {
                                    return (
                                        <div key={item.alt} className={`h-[32px] w-[32px] ${i !== 2 && 'mr-10'}`}>
                                            <img
                                                src={item.icon}
                                                alt={item.alt}
                                                className="h-full w-full "
                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Team;