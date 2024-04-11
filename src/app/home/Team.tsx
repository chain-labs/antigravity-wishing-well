import Image from "next/image";
import IMAGEKIT from "./images";
import { CSSProperties } from "react";
import { TELEGRAM, TWITTER, YOUTUBE } from "@/constants";

const socials = [
  {
    icon: "telegram.svg",
    alt: "telegram",
    url: TELEGRAM,
  },
  {
    icon: "twitter.svg",
    alt: "twitter",
    url: TWITTER,
  },
  {
    icon: "youtube.svg",
    alt: "youtube",
    url: YOUTUBE,
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
            <div
              style={
                {
                  "--background": "0 0 0", // Black background
                  "--highlight": "255 255 255", // White text color
                  "--bg-color":
                    "linear-gradient(rgb(var(--background)), rgb(var(--background)))",
                  "--border-color": `linear-gradient(145deg,
    #3C00DC 0%,
    #FF5001 100%
  )
  `,
                } as CSSProperties
              }
              className="rounded-xl border border-transparent p-1 text-center text-white [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
            >
              <div className="bg-agblack flex items-center px-6 py-4">
                {socials.map((item, i) => {
                  return (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <div
                        key={item.alt}
                        className={`h-[32px] w-[32px] ${i !== 2 && "mr-10"}`}
                      >
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="h-full w-full "
                        />
                      </div>
                    </a>
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
