import Image from "next/image";
import { useState } from "react";

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
    <div className="flex flex-col bg-timer bg-contain bg-center relative overflow-hidden">
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
            <div className="flex flex-col float-start">
              <input
                className="p-4 rounded-lg font-sans font-semibold text-xl mb-4 w-[375px]"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="p-4 rounded-lg font-sans font-semibold text-xl mb-2 w-[375px]"
                placeholder="Your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="flex gap-x-2 items-center justify-center font-sans font-extrabold rounded-lg bg-blue w-1/2 px-6 py-4 mt-6 lg:mb-0 lg:mr-4 text-agwhite uppercease tracking-wider"
                onClick={handleSubmit}
              >
                <Image
                  src="submit.svg"
                  className="w-6 h-6"
                  alt="submit_icon"
                  width={24}
                  height={24}
                />
                <p>Submit</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="absolute -top-10 -left-20">
        <div className="relative ">
          <Image src="/rock1.svg" alt="rock1" width={320} height={320} />
        </div>
      </div>
      <div className="absolute -bottom-20 -right-20">
        <div className="relative ">
          <Image src="/rock2.svg" alt="rock1" width={320} height={320} />
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
