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
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/telegram.svg",
    alt: "telegram",
    url: TELEGRAM,
  },
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/twitter.svg",
    alt: "twitter",
    url: TWITTER,
  },
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/youtube.svg",
    alt: "youtube",
    url: YOUTUBE,
  },
];

const TEAM_2_SOCIALS = [
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/twitter.svg",
    alt: "twitter",
    url: TWITTER_HEXIEST,
  },
];

const TEAM_3_SOCIALS = [
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/instagram.svg",
    alt: "instagram",
    url: INSTAGRAM_CODY,
  },
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/tiktok.svg",
    alt: "tiktok",
    url: TIKTOK_CODY,
  },
];

const Team = () => {
  return (
    <div className="bg-agblack z-10">
      <div
        className="flex flex-col bg-cover bg-team-bg"
        style={{
          backgroundImage: `url('${IMAGEKIT.TEAM_BG}')`,
        }}
      >
        <div className="absolute w-full h-full bg-black/30 z-0" />
        <div className="flex py-16 px-5 w-full items-center justify-center z-10">
          <div className="flex items-center justify-around flex-col gap-12 max-w-[1280px] w-3/4">
            <p className="text-6xl text-center font-black text-agwhite font-sans capitalize">
              Who’s behind it all?
            </p>
            <div className="flex items-center justify-evenly w-3/4 sm:flex-row flex-col gap-16">
              <div className="flex items-center justify-around flex-col w-1/3 gap-2">
                <div className="relative h-[145px] w-[145px]">
                  <Image
                    src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/team_admin.svg"
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl text-agwhite">
                  @PulseRayVision
                </p>
                <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-brred to-brblue p-0.5 overflow-hidden">
                  <div className="bg-agblack flex items-center px-6 py-4 rounded-lg">
                    {socials.map((item, i) => {
                      return (
                        <a href={item.url} target="_blank" rel="noreferrer" key={item.alt}>
                          <div
                            className={`h-[32px] w-[32px] ${
                              i !== 2 && "mr-10"
                            }`}
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
              <div className="flex items-center justify-around flex-col w-1/3 gap-2">
                <div className="relative h-[145px] w-[145px]">
                  <Image
                    src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/team_hexistman.svg"
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl text-agwhite">
                  @TheHEXiestMan
                </p>
                <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-brred to-brblue p-0.5 overflow-hidden">
                  <div className="bg-agblack flex items-center px-6 py-4 rounded-lg">
                    {TEAM_2_SOCIALS.map((item, i) => {
                      return (
                        <a href={item.url} target="_blank" rel="noreferrer" key={item.alt}>
                          <div
                            className={`h-[32px] w-[32px] ${i !== 2}`}
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
              <div className="flex items-center justify-around flex-col w-1/3 gap-2">
                <div className="relative h-[145px] w-[145px]">
                  <Image
                    src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/team_cody.svg"
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl text-agwhite">
                  Cody Smith
                </p>
                <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-brred to-brblue p-0.5 overflow-hidden">
                  <div className="bg-agblack flex items-center px-6 py-4 rounded-lg">
                    {TEAM_3_SOCIALS.map((item, i) => {
                      return (
                        <a href={item.url} target="_blank" rel="noreferrer" key={item.alt}>
                          <div
                            className={`h-[32px] w-[32px] ${
                              i !== 1 && "mr-10"
                            }`}
                          >
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
