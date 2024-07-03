"use client";

import { useState } from "react";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";

export default function Form({
  defaultSuccess = false,
  formTitle,
  formDescription,
  successTitle,
  successDescription,
}: {
  defaultSuccess?: boolean;
  formTitle: string;
  formDescription: string;
  successTitle: string;
  successDescription: string;
}) {
  const [success, setSuccess] = useState(defaultSuccess);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentTarget = e.currentTarget as HTMLFormElement;
    const nameElement = currentTarget.name as unknown as HTMLInputElement;
    const emailElement = currentTarget.email as HTMLInputElement;
    const name = nameElement.value;
    const email = emailElement.value;
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (nameRegex.test(name) && emailRegex.test(email)) {
      setSuccess(true);
    } else {
      alert("Please enter a valid name and email.");
    }
  }

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
              <div dangerouslySetInnerHTML={{ __html: formTitle }} />
            </H1>
            <P>
              <div
                dangerouslySetInnerHTML={{
                  __html: formDescription,
                }}
              />
            </P>
          </div>

          <form
            action=""
            className="flex flex-col gap-4 w-full md:w-fit"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="text-agblack p-3 rounded-[8px] w-full md:w-[30em] font-sans font-semibold text-lg"
              onChange={() => {}}
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              className="text-agblack p-3 rounded-[8px] w-full md:w-[30em] font-sans font-semibold text-lg"
              required
            />
            <Button
              innerText="Submit"
              iconSrc={IMAGEKIT_ICONS.SEND}
              iconAlt="send"
              type="submit"
            />
          </form>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <H1 className="text-[48px] leading-[48px]" center>
            <div dangerouslySetInnerHTML={{ __html: successTitle }} />
          </H1>
          <P center>
            <div
              dangerouslySetInnerHTML={{
                __html: successDescription,
              }}
            />
          </P>
        </div>
      )}
    </div>
  );
}
