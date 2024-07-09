"use client";

import { useRestPost } from "@/hooks/useRestClient";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { AnimatePresence, motion } from "framer-motion";
import { successToast } from "@/hooks/frontend/toast";

export default function Newsletter() {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data, isPending, error, mutate } = useRestPost(
    ["newsletter"],
    "/newsletter",
  );

  useEffect(() => {
    if (data) {
      successToast("Subscribed successfully");
      setSuccess(true);
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
      className="relative flex flex-col lg:flex-row items-start justify-center md:w-fit mx-[16px] px-[8px] py-[32px] lg:p-[32px_48px] rounded-[12px] md:mx-auto gap-4 md:gap-16 my-32 md:my-64 z-0
		before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] md:after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
    >
      <AnimatePresence>
        {success === false ? (
          <>
            <div className="flex flex-col gap-2">
              <H1 className="text-[48px] leading-[48px] font-black text-agwhite">
                Ignite Your <br /> Boosters.
              </H1>
              <P>Get all Antigravity updates in your inbox.</P>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full md:w-fit"
            >
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
              <Button
                variants={{
                  hover: {
                    animationName: "flyingPlane",
                    animationDuration: "0.5s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "linear",
                    animationDelay: "0.25s",
                  },
                  rest:{
                    animationName: "restflyingPlane"
                  }
                }}
                innerText="Submit"
                iconSrc={IMAGEKIT_ICONS.SEND}
                iconAlt="send"
                type="submit"
                className="text-[16px] leading-[16px]"
              />
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center gap-4"
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <H1 className="text-[48px] leading-[48px]" center>
                  Success!
                </H1>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  delay: 0.25,
                }}
              >
                <p className="text-xl text-center from-white to-[#999999] font-sans font-medium bg-gradient-to-b text-transparent bg-clip-text">
                  You&apos;ll get all Antigravity updates in your inbox.
                  <br /> Stay tune!.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
