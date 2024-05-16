import Image from "next/image";
import IMAGEKIT from "./images";

const repItems = [
  {
    name: "Minting",
    img: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/feature-image-2_JCaEnke7l0.png?updatedAt=1715260692033",
    alt: "minting",
  },
  {
    name: "Unwrapping",
    img: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/feature-image-3_uAZhTemc8.png?updatedAt=1715260692036",
    alt: "unwrapping",
  },
  {
    name: "Pruning",
    img: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/feature-image-1_b86C9z3s7P.png?updatedAt=1715260692026",
    alt: "pruning",
  },
];

const Features = () => {
  return (
    <div className="flex relative overflow-hidden w-full min-h-screen md:min-h-full bg-agblack md:items-center md:justify-center">
      <div className="absolute bottom-0 z-1 mix-blend-hard-light">
        <div className="relative w-screen h-[900px]">
          <Image
            src={IMAGEKIT.STARS_BG}
            alt="feature-bg"
            fill
            className="object-cover object-left-top md:object-center"
          />
        </div>
      </div>
      <div className="relative flex flex-col h-full w-full md:w-4/5 md:max-w-[1280px] z-10 items-end pb-60 md:pb-0">
        <div className="absolute -right-10 bottom-0 h-[400px] w-[400px] md:-left-24 md:bottom-0 z-0 md:w-[670px] md:h-[600px]">
          <Image
            src={IMAGEKIT.ASTRO}
            alt="astroman"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="md:py-12 py-10 px-4 md:px-0 flex flex-col gap-8 md:gap-12 w-full md:max-w-[550px] 2xl:max-w-[700px] z-10">
          <p className="text-5xl md:text-[56px] font-black font-sans capitalize text-agwhite w-full">
            So, what can you do with Antigravity?
          </p>
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden w-full">
                <div className="bg-agblack px-20 py-4 md:py-8 flex flex-col items-center rounded-lg h-full w-full">
                  <div className="relative w-24 h-24">
                    <Image
                      className="w-full h-full"
                      src={
                        "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/feature-image-5_JEaH7eEZg.png?updatedAt=1715260692067"
                      }
                      alt={"mining"}
                      fill
                    />
                  </div>
                  <p className="text-lg font-sans font-extrabold">Mining</p>
                </div>
              </div>
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden">
                <div className="bg-agblack px-4 py-4 md:py-8 flex flex-col items-center rounded-lg h-full w-full">
                  <div className="relative w-24 h-24">
                    <Image
                      className="w-full h-full"
                      src={
                        "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/feature-image-4_uyyK3UoJvL.png?updatedAt=1715260692044"
                      }
                      alt={"claiming"}
                      fill
                    />
                  </div>
                  <p className="text-lg font-sans font-extrabold">Claiming</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {repItems.map((item) => {
                return (
                  <div
                    key={item.alt}
                    className=" bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden"
                  >
                    <div className="bg-agblack px-4 py-4 md:py-8 flex flex-col items-center rounded-lg h-full w-full">
                      <div className="relative w-24 h-24">
                        <Image
                          className="w-full h-full"
                          src={item.img}
                          alt={item.alt}
                          fill
                        />
                      </div>
                      <p className="text-lg font-sans font-extrabold">
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
  );
};

export default Features;
