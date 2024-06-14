"use client";

import { useRestPost } from "@/hooks/useRestClient";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import H1 from "../components/HTML/H1";
import P from "../components/HTML/P";
import Button from "@/stories/Button";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data, isPending, error, mutate } = useRestPost(
    ["contact"],
    "/contact"
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      toast.success("Subscribed successfully");
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (name && email) {
      mutate({ name, email });
    }
  };
  return (
    <div
      className="relative flex flex-col lg:flex-row items-start justify-center md:w-fit mx-[16px] px-[8px] py-[32px] lg:p-[32px] rounded-[12px] md:mx-auto gap-4 md:gap-16 my-32 md:my-64 z-0
		before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] md:after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
    >
      {success === false ? (
        <>
          <div className="flex flex-col gap-2">
            <H1 className="text-[48px] leading-[48px]">
              Ignite Your <br /> Boosters.
            </H1>
            <P>Get all Antigravity updates in your inbox.</P>
          </div>
          <form action="" className="flex flex-col gap-4 w-full md:w-fit">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="text-agblack p-3 rounded-[8px] w-full md:w-[30em] font-sans font-semibold text-lg"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              className="text-agblack p-3 rounded-[8px] w-full md:w-[30em] font-sans font-semibold text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <button
							type="submit"
							className="uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer
                                rounded-lg px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue"
						>
							<Image
								src={require("@/app/assets/icons/send.svg")}
								alt="send"
								width={40}
								height={40}
							/>
							Submit
						</button> */}
            <Button
              innerText="Submit"
              iconSrc={require("@/app/assets/icons/send.svg")}
              iconAlt="send"
              type="submit"
            />
          </form>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <H1 className="text-[48px] leading-[48px]" center>
            Success!
          </H1>
          <p className="text-xl text-center from-white to-[#999999] font-sans font-medium bg-gradient-to-b text-transparent bg-clip-text">
            You&apos;ll get all Antigravity updates in your inbox.
            <br /> Stay tune!.
          </p>
        </div>
      )}
    </div>
  );
}
