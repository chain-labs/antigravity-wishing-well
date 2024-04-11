import Image from "next/image";
import IMAGEKIT from "./images";

const repItems = [
  {
    name: "Minting",
    img: "/minting.svg",
    alt: "minting",
  },
  {
    name: "Unwrapping",
    img: "/unwrapping.svg",
    alt: "unwrapping",
  },
  {
    name: "Scraping",
    img: "/scraping.svg",
    alt: "scraping",
  },
];

const Features = () => {
  return (
    <div className="flex relative overflow-hidden bg-agblack items-center justify-center">
      <div className="absolute bottom-0 z-1 mix-blend-hard-light">
        <div className="relative w-screen h-[900px]">
          <Image
            src={IMAGEKIT.STARS_BG}
            alt="feature-bg"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative flex flex-col w-3/4 max-w-[1480px]">
        <div className="py-24 px-12 w-[64%] self-end first-letter flex flex-col items-end">
          <p className="text-6xl font-black font-sans capitaliz text-agwhite md:max-w-[700px]">
            So, what can you do with Antigravity?
          </p>
          <div className="flex mt-12 flex-col gap-4">
            <div className="flex gap-4">
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1">
                <div className="bg-agblack px-4 py-8  h-[254px] w-[400px] flex flex-col items-center">
                  <div className="relative w-[150px] h-[150px] mb-4">
                    <Image
                      className="w-full h-full"
                      src={"/mining.svg"}
                      alt={"mining"}
                      fill
                    />
                  </div>
                  <p className="text-2xl font-sans font-extrabold">Mining</p>
                </div>
              </div>
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1">
                <div className="bg-agblack px-4 py-8  h-[254px] w-[258px] flex flex-col items-center">
                  <div className="relative w-[150px] h-[150px] mb-4">
                    <Image
                      className="w-full h-full"
                      src={"/claiming.svg"}
                      alt={"claiming"}
                      fill
                    />
                  </div>
                  <p className="text-2xl font-sans font-extrabold">Claiming</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-4">
                {repItems.map((item) => {
                  return (
                    <div
                      key={item.alt}
                      className=" bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1"
                    >
                      <div className="bg-agblack px-4 py-8  h-[254px] w-[214px] flex flex-col items-center">
                        <div className="relative w-[150px] h-[150px] mb-4">
                          <Image
                            className="w-full h-full"
                            src={item.img}
                            alt={item.alt}
                            fill
                          />
                        </div>
                        <p className="text-2xl font-sans font-extrabold">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-1/2 h-full">
        <div className="h-1/2">
          <Image src={IMAGEKIT.ASTRO} alt="astroman" fill />
        </div>
      </div>
    </div>
  );
};

export default Features;
