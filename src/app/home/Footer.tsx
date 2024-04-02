import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-between items-center px-32 py-8 z-10 bg-agblack">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image src="/icon.svg" alt="icon" width={64} height={64} />
          <p className=" from-white to-gray-500 pl-2 font-sans font-extrabold text-4xl bg-gradient-to-b text-transparent bg-clip-text">
            ANTIGRAVITY
          </p>
        </div>
      </Link>
      <p className=" from-white to-gray-500 pl-2 font-sans font-extrabold text-xl bg-gradient-to-b text-transparent bg-clip-text uppercase">
        2024 &copy; Copyrights reserved
      </p>
    </div>
  );
};

export default Footer;
