import Image from "next/image";
import IMAGEKIT from "./images";

const repItems = [
  {
    name: "Minting",
    img: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/minting.svg",
    alt: "minting",
  },
  {
    name: "Unwrapping",
    img: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/unwrapping.svg",
    alt: "unwrapping",
  },
  {
    name: "Pruning",
    img: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/scraping.svg",
    alt: "pruning",
  },
];

const Features = () => {
  return (
    <div className="flex relative overflow-hidden w-full bg-agblack items-center justify-center">
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
      <div className="relative flex flex-col w-full sm:w-3/4 sm:max-w-[1280px] z-10">
        <div className="py-24 px-2 flex flex-col gap-12 items-end">
          <p className="text-5xl sm:text-6xl font-black font-sans capitalize text-agwhite md:max-w-[700px]">
            So, what can you do with Antigravity?
          </p>
          <div className="flex flex-col gap-4 w-full md:max-w-[700px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden sm:col-span-2">
                <div className="bg-agblack px-4 py-8 flex flex-col items-center rounded-lg">
                  <div className="relative w-36 h-36 mb-4">
                    <Image
                      className="w-full h-full"
                      src={
                        "https://ik.imagekit.io/xlvg9oc4k/Antigravity/mining.svg"
                      }
                      alt={"mining"}
                      fill
                    />
                  </div>
                  <p className="text-2xl font-sans font-extrabold">Mining</p>
                </div>
              </div>
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden">
                <div className="bg-agblack px-4 py-8 flex flex-col items-center rounded-lg">
                  <div className="relative w-36 h-36 mb-4">
                    <Image
                      className="w-full h-full"
                      src={
                        "https://ik.imagekit.io/xlvg9oc4k/Antigravity/claiming.svg"
                      }
                      alt={"claiming"}
                      fill
                    />
                  </div>
                  <p className="text-2xl font-sans font-extrabold">Claiming</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {repItems.map((item) => {
                return (
                  <div
                    key={item.alt}
                    className=" bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden"
                  >
                    <div className="bg-agblack px-4 py-8 flex flex-col items-center rounded-lg">
                      <div className="relative w-36 h-36 mb-4">
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
      <div className="absolute -right-24 -bottom-52 h-2/3 sm:left-0 sm:top-0 z-0 w-2/3 sm:w-1/2 sm:h-[1000px] items-end">
        <Image src={IMAGEKIT.ASTRO} alt="astroman" fill />
      </div>
    </div>
  );
};

export default Features;
