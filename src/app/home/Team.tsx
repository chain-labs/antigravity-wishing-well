import Image from "next/image";
import IMAGEKIT from "./images";
import { EMAIL_CODY, INSTAGRAM_CODY, TELEGRAM, TIKTOK_CODY, TWITTER, TWITTER_HEXIEST, YOUTUBE } from "@/constants";

const socials = [
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/telegram.svg?updatedAt=1713111638038",
    alt: "telegram",
    url: TELEGRAM,
  },
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/twitter.svg?updatedAt=1713111643352",
    alt: "twitter",
    url: TWITTER,
  },
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/youtube.svg?updatedAt=1713111650154",
    alt: "youtube",
    url: YOUTUBE,
  },
];

const TEAM_2_SOCIALS = [
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/twitter.svg?updatedAt=1713111643352",
    alt: "twitter",
    url: TWITTER_HEXIEST,
  }
]

const TEAM_3_SOCIALS = [
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/instagram.svg?updatedAt=1713111253290",
    alt: "instagram",
    url: INSTAGRAM_CODY,
  },
  {
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/tiktok.svg?updatedAt=1713111638160",
    alt: "tiktok",
    url: TIKTOK_CODY,
  },
]

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
            <div className="flex items-center justify-around flex-row">
              <div className="basis-full flex items-center justify-around flex-col">
              <div className="relative h-[145px] w-[145px] mt-10">
                <Image
                  src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/team_admin.svg?updatedAt=1713111547144"
                  alt="team"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
              <p className="font-sans font-extrabold text-2xl mt-4 text-agwhite">
                @PulseRayVision
              </p>
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-0.5 my-4 ml-4 overflow-hidden">
                <div className="bg-agblack flex items-center px-6 py-4 rounded-lg">
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
            <div className="basis-1/2 flex items-center justify-around flex-col mr-10 ml-10">
            <div className="relative h-[145px] w-[145px] mt-10">
              <Image
                src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/team_hexistman.svg?updatedAt=1713111612703"
                alt="team"
                className="h-full w-full object-cover"
                fill
              />
            </div>
            <p className="font-sans font-extrabold text-2xl mt-4 text-agwhite">
              @TheHEXiestMan
            </p>
            <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-0.5 my-4 ml-4 overflow-hidden">
              <div className="bg-agblack flex items-center px-6 py-4 rounded-lg">
                {TEAM_2_SOCIALS.map((item, i) => {
                  return (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <div
                        key={item.alt}
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
              <div className="basis-1/2 flex items-center justify-around flex-col ml-10">
                <div className="relative h-[145px] w-[145px] mt-10">
                  <Image
                    src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/team_cody.svg?updatedAt=1713111642956"
                    alt="team"
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
                <p className="font-sans font-extrabold text-2xl mt-4 text-agwhite">
                  @Cody
                </p>
                <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-0.5 my-4 ml-4 overflow-hidden">
                  <div className="bg-agblack flex items-center px-6 py-4 rounded-lg">
                    {TEAM_3_SOCIALS.map((item, i) => {
                      return (
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <div
                            key={item.alt}
                            className={`h-[32px] w-[32px] ${i !== 1 && "mr-10"}`}
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
      </div>
    </div>
  );
};

export default Team;
