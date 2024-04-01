"use client";
import React, { useState } from "react";
import Value from "./Value";
import Features from "./Features";
import Team from "./Team";
import StayUpdated from "./StayUpdated";
import Footer from "./Footer";
import Register from "./RegisterContainer";
import dynamic from "next/dynamic";

const Timer = dynamic(() => import("./Timer"));

const HomeContainer = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRegister = () => {
    console.log("registering");

    // setIsRegistered(!isRegistered);
  };

  const handleSuccess = () => {
    setIsSuccess(!isSuccess);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Register
        isRegistered={isRegistered}
        handleRegister={handleRegister}
        isSuccess={isSuccess}
        handleSuccess={handleSuccess}
      />
      <div id="value"></div>
      <Value />
      <Timer handleRegister={handleRegister} />
      {/* <SuccessFooter isSuccess={isSuccess} /> */}
      <div id="utilities"></div>
      <Features />
      <div id="team"></div>
      <Team />
      <StayUpdated />
      {/* <Footer /> */}
    </div>
  );
};

export default HomeContainer;
