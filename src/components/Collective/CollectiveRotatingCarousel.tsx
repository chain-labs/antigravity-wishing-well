import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import H1 from '../HTML/H1';
import Image from 'next/image';
import P from '../HTML/P';
import { IMAGEKIT_COLLECTIVE } from '@/assets/imageKit';
import { motion } from 'framer-motion';

function EventCard({
  image,
  caption,
}: {
  image: {
    link: string | StaticImport;
    height: number;
    width: number;
  };
  caption: string;
}) {
  const CONSTANT_HEIGHT = 250;
  return (
    <div
      style={{
        width: (image.width * CONSTANT_HEIGHT) / image.height,
      }}
      className={`relative flex flex-col rounded-[8.16px] h-full border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-br before:from-[#3C00DC] before:to-[#15004C] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
    >
      <div className={`rounded-t-[8.16px]`}>
        <Image
          src={image.link}
          alt={caption}
          height={CONSTANT_HEIGHT}
          width={(image.width * CONSTANT_HEIGHT) / image.height}
          style={{
            objectFit: 'cover',
            width: (image.width * CONSTANT_HEIGHT) / image.height,
            height: CONSTANT_HEIGHT,
          }}
          className={`rounded-t-[8.16px] object-cover`}
        />
      </div>
      <div className="p-[10.88px] w-full h-full bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-b-[8.16px]">
        <P>{caption}</P>
      </div>
    </div>
  );
}

function MobileEventCard({
  image,
  caption,
}: {
  image: {
    link: string | StaticImport;
    height: number;
    width: number;
  };
  caption: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-[8.16px] h-fit w-full border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-br before:from-[#3C00DC] before:to-[#15004C] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
    >
      <div className={`h-fit w-full  rounded-t-[8.16px] overflow-hidden`}>
        <Image
          src={image.link}
          alt={caption}
          height={image.height}
          width={image.width}
          className={`h-fit w-full rounded-t-[8.16px]`}
        />
      </div>
      <div className="p-[10.88px] w-full bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-b-[8.16px]">
        <P>{caption}</P>
      </div>
    </div>
  );
}

function EventCardsContainer() {
  return (
    <div className="flex ml-[16px] gap-[16px] animate-[carouselMarquee_30s_linear_infinite]">
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_1}
        caption="Don, Max & Cody at the Pulschain Tour Salt Lake 2024"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_2}
        caption="Rags2Riches, Freddie Quotes, CryptoSloth, & Max at Crypto Bootcamp NC 2023"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_3}
        caption="Salt Lake City Meetup 2023"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_4}
        caption="Highest of Stakes Premiere, Salt Lake City 2024 Don Max & Lainey"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_5}
        caption="Dave & Dave on The Texan Tour 2022"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_6}
        caption="NFT NYC 2023 BitBoy, Don & Max"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_7}
        caption="Hex' 3rd Birthday in San Diego 2022 HexNinja, Bloobum, & Max"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_8}
        caption="Meetup in Salt Lake 2023 Mati Allin, Die Hard Hexicans"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_9}
        caption="Hex Conference in Las Vegas 2023, Goldkey, Dipcatcher, Yashdeep, Max"
      />
      <EventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_10}
        caption="Antigravity's 1st ever Meetup in Salt Lake 2024 Max & Cody"
      />
    </div>
  );
}

function MobileEventCards() {
  return (
    <>
      {' '}
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_1}
        caption="Don, Max & Cody at the Pulschain Tour Salt Lake 2024"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_2}
        caption="Rags2Riches, Freddie Quotes, CryptoSloth, & Max at Crypto Bootcamp NC 2023"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_3}
        caption="Salt Lake City Meetup 2023"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_4}
        caption="Highest of Stakes Premiere, Salt Lake City 2024 Don Max & Lainey"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_5}
        caption="Dave & Dave on The Texan Tour 2022"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_6}
        caption="NFT NYC 2023 BitBoy, Don & Max"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_7}
        caption="Hex' 3rd Birthday in San Diego 2022 HexNinja, Bloobum, & Max"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_8}
        caption="Meetup in Salt Lake 2023 Mati Allin, Die Hard Hexicans"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_9}
        caption="Hex Conference in Las Vegas 2023, Goldkey, Dipcatcher, Yashdeep, Max"
      />
      <MobileEventCard
        image={IMAGEKIT_COLLECTIVE.ANTIGRAVITY_MEETUP_10}
        caption="Antigravity's 1st ever Meetup in Salt Lake 2024 Max & Cody"
      />
    </>
  );
}

export default function CollectiveRotatingCarousel() {
  return (
    <div className="relative flex flex-col h-fit gap-[32px] my-[50px] overflow-hidden p-[16px] md:p-0">
      <H1
        className="text-agwhite text-[32px] leading-[38.4px] md:text-[40px] md:leading-[40px]"
        center
      >
        The Two Things We Value the Most:
        <br className="hidden md:block" /> Events & Community.
      </H1>
      <div className="hidden md:block relative w-full h-fit">
        <div className="absolute right-0 top-0 h-full w-[10vw] bg-gradient-to-l from-[#030404] to-[#03040400] z-[1]"></div>
        <div className="absolute left-0 top-0 h-full w-[10vw] bg-gradient-to-r from-[#030404] to-[#03040400] z-[1]"></div>
        <div className="w-fit left-0 relative flex ">
          <EventCardsContainer />
          <EventCardsContainer />
        </div>
      </div>
      <div className="flex md:hidden flex-col w-full gap-[16px] justify-center items-center">
        <MobileEventCards />
      </div>
    </div>
  );
}

/*
 1: Don, Max & Cody at the Pulschain Tour Salt Lake 2024
2: Rags2Riches, Freddie Quotes, CryptoSloth, & Max at Crypto Bootcamp NC 2023
3: Salt Lake City Meetup 2023
4: Highest of Stakes Premiere, Salt Lake City 2024 Don Max & Lainey
5: Dave & Dave on The Texan Tour 2022
6: NFT NYC 2023 BitBoy, Don & Max
7: Hex' 3rd Birthday in San Diego 2022 HexNinja, Bloobum, & Max
8: Meetup in Salt Lake 2023 Mati Allin, Die Hard Hexicans
9: Hex Conference in Las Vegas 2023, Goldkey, Dipcatcher, Yashdeep, Max
10: Antigravity's 1st ever Meetup in Salt Lake 2024 Max & Cody (edited) 
*/
