import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import IMAGEKIT from "./images";
import { useRestPost } from "@/hooks/useRestClient";

const StayUpdated = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const { data, isPending, error, mutate } = useRestPost(
    ["contact"],
    "/contact"
  );

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (name && email) {
      console.log({ name, email });

      setSubmit(true);
      mutate({ name, email });
    }
  };

  return (
    <div className="bg-agblack z-10">
      <div
        className="flex flex-col bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url('${IMAGEKIT.STAY_UPDATED_BG}')` }}
      >
        <div className="absolute w-full h-full bg-black opacity-50 z-0" />
        <div
          className={`flex px-4 justify-center w-full z-10 ${
            !submit ? "py-8" : "py-8"
          }`}
        >
          <div className="flex mt-52 sm:mt-0 flex-col gap-8 sm:flex-row justify-center max-w-[1280px] w-full sm:w-3/4">
            <div className="flex flex-col mr-20 gap-4">
              <p className="font-sans text-5xl font-black text-agwhite">
                {!submit ? "Stay Updated!" : "Success!"}
              </p>
              <p className="font-sans font-normal text-agwhite">
                {!submit
                  ? "Get all Antigravity updates in your inbox."
                  : `You’ll get all Antigravity updates in your inbox. Stay tuned.`}
              </p>
            </div>
            {!submit && (
              <div className="flex flex-col float-start gap-y-4">
                <input
                  className="p-3 rounded-lg font-sans font-semibold text-xl w-full sm:w-[375px]"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="p-3 rounded-lg font-sans font-semibold text-xl w-full sm:w-[375px]"
                  placeholder="Your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="tracking-wider uppercase self-start w-full sm:w-fit"
                  onClick={handleSubmit}
                >
                  <Image
                    src={IMAGEKIT.SUBMIT}
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
        <div className="absolute -top-10 -left-20 z-10">
          <div className="relative">
            <Image src={IMAGEKIT.ROCK1} alt="rock1" width={320} height={320} />
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 hidden sm:flex z-10">
          <div className="relative ">
            <Image src={IMAGEKIT.ROCK2} alt="rock1" width={320} height={320} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
