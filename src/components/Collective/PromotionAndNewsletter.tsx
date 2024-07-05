import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Button from "../Button";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";

interface IBook {
  book_header: string;
  book_description: string;
  book_image: IImage;
  book_url: string;
}

export default function PromotionAndNewsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [metadata, setMetadata] = useState<IBook>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="collective"][0]{
		book_header, book_description, book_image, book_url
	}`,
      )
      .then((metadata) => {
        setMetadata(metadata);
      });
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center gap-[16px] md:gap-[32px] w-full md:w-fit max-w-[992px] p-[32px_16px] md:p-[32px] md:mx-auto mb-[50px] md:mb-[100px] rounded-none md:rounded-[12px] relative bg-agblack border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
    >
      <div className="flex flex-col w-full md:flex-row justify-between items-center gap-[16px]">
        <div className="flex flex-col gap-[16px]">
          <div className="overflow-hidden">
            <motion.div
              whileInView={{ y: 0 }}
              initial={{ y: "100%" }}
              transition={{
                duration: 0.5,
                type: "spring",
                bounce: 0.25,
              }}
            >
              <H1 className="agwhite">{metadata?.book_header}</H1>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              whileInView={{ y: 0 }}
              initial={{ y: "100%" }}
              transition={{
                duration: 0.75,
                type: "spring",
                bounce: 0.25,
              }}
            >
              <P>{metadata?.book_description}</P>
            </motion.div>
          </div>
          <a href={metadata?.book_url} target="_blank" rel="noreferrer">
            <Button
              innerText="Get Book"
              iconSrc={IMAGEKIT_ICONS.BOOK}
              iconAlt="Get Book"
            />
          </a>
        </div>
        {metadata?.book_image && (
          <Image
            src={urlForImage(metadata.book_image)}
            alt="Book"
            width={523.81}
            height={275}
            className="w-full md:w-[524px] h-auto md:h-[275px] aspect-video rounded-[12px] object-cover"
          />
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-[16px] md:gap-[32px] w-full rounded-[12px] p-[16px] md:p-[32px] bg-[#3C00DC80]">
        <div className="flex flex-col gap-[8px] text-nowrap">
          <H1 className="text-agwhite text-[32px] leading-[38.4px] md:text-[40px] md:leading-[40px]">
            Ignite Your Boosters.
          </H1>
          <P>Get all Antigravity updates in your inbox.</P>
        </div>
        <form className="flex flex-col gap-[16px] w-full" action="">
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="text-agblack p-3 rounded-[8px] w-full font-sans font-semibold text-lg"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              className="text-agblack p-3 rounded-[8px] w-full font-sans font-semibold text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            innerText="Submit"
            iconSrc={IMAGEKIT_ICONS.SEND}
            iconAlt="send"
            type="submit"
            className="w-full md:w-fit shadow-none"
          />
        </form>
      </div>
    </div>
  );
}
