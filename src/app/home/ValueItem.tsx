import Image from "next/image";
import { CSSProperties } from "react";

interface ValueItemProps {
  itemTitle: string;
  imgSrc: string;
  imgText: string;
}

const ValueItem = ({ itemTitle, imgSrc, imgText }: ValueItemProps) => {
  return (
    // <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-1">
    <div
      style={
        {
          width: '250px',
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
      className="flex flex-col items-center justify-center rounded-xl border border-transparent px-2 py-4 text-center text-white
  [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
    >

      {/* <div className="bg-agblack p-6  h-[180px] w-[272px] flex flex-col items-center justify-center"> */}
      <div className="relative w-[56px] h-[56px] mb-4">
        <Image className="w-full h-full" src={imgSrc} alt={imgSrc} fill />
      </div>
      <p className="font-sans text-lg font-extrabold text-center uppercase  tracking-wider">
        {itemTitle}
      </p>
      {/* </div> */}
    </div>
  );
};

export default ValueItem;
