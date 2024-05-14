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
    <div className="flex relative overflow-hidden w-full min-h-screen bg-agblack sm:items-center sm:justify-center pb-60 sm:pb-0">
      <div className="absolute bottom-0 z-1 mix-blend-hard-light">
        <div className="relative w-screen h-[900px]">
          <Image
            src={IMAGEKIT.STARS_BG}
            alt="feature-bg"
            fill
            className="object-cover object-left-top sm:object-center"
          />
        </div>
      </div>
      <div className="relative flex flex-col w-full sm:w-4/5 sm:max-w-[1280px] z-10 items-end">
        <div className="sm:py-24 py-10 px-4 sm:px-0 flex flex-col gap-6 sm:gap-12 w-full sm:max-w-[550px] 2xl:max-w-[700px]">
          <p className="text-5xl sm:text-[56px] font-black font-sans capitalize text-agwhite w-full">
            So, what can you do with Antigravity?
          </p>
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden w-full">
                <div className="bg-agblack px-20 py-4 sm:py-8 flex flex-col items-center rounded-lg h-full w-full">
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
                <div className="bg-agblack px-4 py-4 sm:py-8 flex flex-col items-center rounded-lg h-full w-full">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {repItems.map((item) => {
                return (
                  <div
                    key={item.alt}
                    className=" bg-gray-800 text-white rounded-lg bg-gradient-to-tr from-[#BF6841] to-[#5537A5] p-[1px] overflow-hidden"
                  >
                    <div className="bg-agblack px-4 py-4 sm:py-8 flex flex-col items-center rounded-lg h-full w-full">
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
      <div className="absolute -right-16 -bottom-40 h-2/3 sm:left-0 sm:bottom-0 z-0 w-2/3 sm:w-1/2 sm:h-[630px] 2xl:h-[900px] items-end">
        <Image
          src={IMAGEKIT.ASTRO}
          alt="astroman"
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Features;
