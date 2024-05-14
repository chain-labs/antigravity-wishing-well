import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center py-3 sm:px-10 z-10 bg-agblack gap-4">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image
            src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/icon.svg"
            alt="icon"
            width={45}
            height={45}
          />
          <p className=" from-white to-gray-500 pl-2 font-sans font-extrabold text-4xl bg-gradient-to-b text-transparent bg-clip-text">
            ANTIGRAVITY
          </p>
        </div>
      </Link>
      <p className="from-white to-gray-500 pl-2 font-sans font-extrabold text-xl bg-gradient-to-b text-transparent bg-clip-text uppercase">
        2024 &copy; Copyrights reserved
      </p>
    </div>
  );
};

export default Footer;
