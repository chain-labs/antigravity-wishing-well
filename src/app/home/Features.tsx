import Image from "next/image";
import IMAGEKIT from "./images";
import { CSSProperties } from "react";


const repItems1 = [
  {
    name: "Mining",
    img: "/mining.svg",
    alt: "mining",
    width: '600px'
  },
  {
    name: "Claiming",
    img: "/claiming.svg",
    alt: "claiming",
    width: '360px'
  },

];

const repItems2 = [
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
    name: "Tooling",
    img: "/scraping.svg",
    alt: "scraping",
  },
];





const Features = () => {
  return (
    <div className="relative overflow-hidden bg-agblack ">
      <div className="absolute bottom-0 z-1 mix-blend-hard-light ">
        <div className="relative w-screen h-[900px]">
          <Image
            src={IMAGEKIT.STARS_BG}
            alt="feature-bg"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="">
        <div className="relative flex flex-col">
          <div className="py-24 px-6 w-[64%] self-end first-letter flex flex-col">
            <p className="text-6xl font-black font-sans capitaliz text-agwhite md:max-w-[700px]">
              So, what can you do with Antigravity?
            </p>

            <div className="flex flex-row gap-4 mt-12">
              {repItems1.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center rounded-xl border border-transparent p-8 text-center text-white
                  [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
                  style={{
                    width: item.width,
                    "--background": "0 0 0", // Black background
                    "--highlight": "255 255 255", // White text color
                    "--bg-color": "linear-gradient(#030404, #131A1A)",
                    "--border-color": `linear-gradient(145deg,#3C00DC 0%, #FF5001 100%)`,
                  } as CSSProperties}
                >
                  <div className="relative w-32 h-32 mb-4">
                    <Image className="w-full h-full" src={item.img} alt={item.alt} fill />
                  </div>
                  <p className="text-2xl font-extrabold">{item.name}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-4 mt-12">
              {repItems2.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center rounded-xl border border-transparent p-8 text-center text-white
                  [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
                  style={{
                    width: '320px',
                    "--background": "0 0 0", // Black background
                    "--highlight": "255 255 255", // White text color
                    "--bg-color": "linear-gradient(#030404, #131A1A)",
                    "--border-color": `linear-gradient(145deg,#3C00DC 0%, #FF5001 100%)`,
                  } as CSSProperties}
                >
                  <div className="relative w-32 h-32 mb-4">
                    <Image className="w-full h-full" src={item.img} alt={item.alt} fill />
                  </div>
                  <p className="text-2xl font-extrabold">{item.name}</p>
                </div>
              ))}
            </div>



            <div className="absolute left-0 top-0 w-1/2">
              <div className="relative h-[1000px] w-full">
                <Image src={IMAGEKIT.ASTRO} alt="astroman" fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
