import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import IMAGEKIT from "./images";

const StayUpdated = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (name && email) {
      setSubmit(true);
    }
  };

  return (
    <div className="bg-agblack z-10">
      <div
        className="flex flex-col bg-contain bg-center relative overflow-hidden"
        style={{ backgroundImage: `url('${IMAGEKIT.GRID}')` }}
      >
        <div className={`w-full ${!submit ? "px-32 py-16" : "px-32 py-32"}`}>
          <div className="flex justify-center">
            <div className="flex flex-col mr-20">
              <p className="font-sans text-5xl font-black text-agwhite">
                {!submit ? "Stay Updated!" : "Success!"}
              </p>
              <p className="font-sans font-normal text-agwhite text-xl mt-4">
                {!submit
                  ? "Get all Antigravity updates in your inbox."
                  : `You’ll get all Antigravity updates in your inbox. Stay tuned.`}
              </p>
            </div>
            {!submit && (
              <div className="flex flex-col float-start gap-y-4">
                <input
                  className="p-4 rounded-lg font-sans font-semibold text-xl w-[375px]"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="p-4 rounded-lg font-sans font-semibold text-xl w-[375px]"
                  placeholder="Your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="tracking-wider uppercase self-start"
                  onClick={handleSubmit}
                >
                  <Image
                    src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/submit.svg"
                    className="w-6 h-6"
                    alt="submit_icon"
                    width={24}
                    height={24}
                  />
                  <p>Submit</p>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute -top-10 -left-20">
          <div className="relative ">
            <Image src={IMAGEKIT.ROCK1} alt="rock1" width={320} height={320} />
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20">
          <div className="relative ">
            <Image src={IMAGEKIT.ROCK2} alt="rock1" width={320} height={320} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
