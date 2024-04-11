import Image from "next/image";

interface ValueItemProps {
  itemTitle: string;
  imgSrc: string;
  imgText: string;
}

const ValueItem = ({ itemTitle, imgSrc, imgText }: ValueItemProps) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg bg-gradient-to-r from-brblue via-brred p-0.5 overflow-hidden">
      <div className="bg-agblack p-6  h-[180px] w-[272px] flex flex-col items-center justify-center rounded-lg">
        <div className="relative w-[56px] h-[56px] mb-4">
          <Image className="w-full h-full" src={imgSrc} alt={imgSrc} fill />
        </div>
        <p className="font-sans text-lg font-extrabold text-center uppercase max-w-[240px] tracking-wider">
          {itemTitle}
        </p>
      </div>
    </div>
  );
};

export default ValueItem;
