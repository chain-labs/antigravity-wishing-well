import Image from "next/image";
import IMAGEKIT from "./images";
import {
  EMAIL_CODY,
  INSTAGRAM_CODY,
  TELEGRAM,
  TIKTOK_CODY,
  TWITTER,
  TWITTER_HEXIEST,
  YOUTUBE,
} from "@/constants";

const socials = [
  {
    icon: IMAGEKIT.ICON_TELEGRAM,
    alt: "telegram",
    url: TELEGRAM,
  },
  {
    icon: IMAGEKIT.ICON_TWITTER,
    alt: "twitter",
    url: TWITTER,
  },
  {
    icon: IMAGEKIT.ICON_YOUTUBE,
    alt: "youtube",
    url: YOUTUBE,
  },
];

const TEAM_2_SOCIALS = [
  {
    icon: IMAGEKIT.ICON_TWITTER,
    alt: "twitter",
    url: TWITTER_HEXIEST,
  },
];

const TEAM_3_SOCIALS = [
  {
    icon: IMAGEKIT.ICON_INSTAGRAM,
    alt: "instagram",
    url: INSTAGRAM_CODY,
  },
  {
    icon: IMAGEKIT.ICON_TIKTOK,
    alt: "tiktok",
    url: TIKTOK_CODY,
  },
];

const Team = () => {
  return (
    <div className="bg-agblack z-10">
      <div
        className="relative flex flex-col bg-cover bg-team-bg"
        style={{
          backgroundImage: `url('${IMAGEKIT.TEAM_BG}')`,
        }}
      >
        <div className="absolute w-full h-full bg-black/30 z-0" />
        <div className="flex py-12 px-5 w-full items-center justify-center z-10">
          <div className="flex items-center justify-around flex-col gap-8 max-w-[1280px] w-3/4">
            <p className="text-6xl text-center font-black text-agwhite font-sans capitalize z-10">
              Who’s behind it all?
            </p>
            <div className="flex items-center justify-evenly w-3/4 sm:flex-row flex-col gap-16 z-10">
              <div className="flex items-center justify-around flex-col w-1/3 gap-2">
                <div className="relative h-[145px] w-[145px]">
                  <Image
                    src={IMAGEKIT.PULSERAYVISION}
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl text-agwhite">
                  @PulseRayVision
                </p>
                <div className="bg-gray-800 text-white rounded-lg w-fit bg-gradient-to-tr from-brred to-brblue p-0.5 overflow-hidden">
                  <div className="bg-agblack flex items-center px-4 py-2 gap-4 w-fit rounded-lg">
                    {socials.map((item, i) => {
                      return (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          key={item.alt}
                        >
                          <div className={`h-[24px] w-[24px]`}>
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
              <div className="flex items-center justify-around flex-col w-1/3 gap-2">
                <div className="relative h-[145px] w-[145px]">
                  <Image
                    src={IMAGEKIT.HEXIEST}
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl text-agwhite">
                  @TheHEXiestMan
                </p>
                <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-brred to-brblue p-0.5 overflow-hidden">
                  <div className="bg-agblack flex items-center gap-4 px-4 py-2 rounded-lg">
                    {TEAM_2_SOCIALS.map((item, i) => {
                      return (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          key={item.alt}
                        >
                          <div className={`h-[24px] w-[24px]`}>
                            <img
                              src={item.icon}
                              alt={item.alt}
                              className="h-full w-full"
                            />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around flex-col w-1/3 gap-2">
                <div className="relative h-[145px] w-[145px]">
                  <Image
                    src={IMAGEKIT.CODY}
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl text-agwhite">
                  Cody Smith
                </p>
                <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-brred to-brblue p-0.5 overflow-hidden">
                  <div className="bg-agblack flex items-center gap-4 px-4 py-2 rounded-lg">
                    {TEAM_3_SOCIALS.map((item, i) => {
                      return (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          key={item.alt}
                        >
                          <div className={`h-[24px] w-[24px]`}>
                            <img
                              src={item.icon}
                              alt={item.alt}
                              className="h-full w-full"
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
      </div>
    </div>
  );
};

export default Team;
