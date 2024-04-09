import Image from "next/image";
import IMAGEKIT from "./images";

const socials = [
  {
    icon: "telegram.svg",
    alt: "telegram",
    link: "https://t.me/antigravitysaga"
  },
  {
    icon: "twitter.svg",
    alt: "twitter",
    link: "https://x.com/HexrayVision"
  },
  {
    icon: "youtube.svg",
    alt: "youtube",
    link: "https://www.youtube.com/channel/UCfySj3nKqjM44iD58oB8Hyw"
  },
];
const Team = () => {
  return (
    <div className="bg-agblack z-10">
      <div
        className="flex flex-col bg-cover bg-bottom"
        style={{ backgroundImage: `url('${IMAGEKIT.TEAM_BG}')` }}
      >
        <div className="p-32 w-full">
          <div className="flex  items-center justify-around flex-col">
            <p className="text-[64px] font-black text-agwhite font-sans capitalize">
              Who’s behind it all?
            </p>
            <div className="relative h-[145px] w-[145px] mt-10">
              <Image
                src="/team_admin.svg"
                alt="team"
                className="h-full w-full object-cover"
                fill
              />
            </div>
            <p className="font-sans font-extrabold text-2xl mt-4 text-agwhite">
              @PulseRayVision
            </p>
            <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
              <div className="bg-agblack flex items-center px-6 py-4">
                {}
                {socials.map((item, i) => {
                  return (
                    <div
                      key={item.alt}
                      className={`h-[32px] w-[32px] ${i !== 2 && "mr-10"}`}
                    >
                      <a
                        href={item.link} // Assuming `item.link` contains the URL to the social media page
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Security and privacy attribute
                        className="h-full w-full block" // Ensures the anchor tag occupies the full height and width of its parent
                      >
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="h-full w-full "
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
