"use client";
import React, { useState } from "react";
import Value from "./Value";
import Features from "./Features";
import Team from "./Team";
import StayUpdated from "./StayUpdated";
import Footer from "./Footer";
import Register from "./RegisterContainer";
import SuccessFooter from "./SuccessFooter";

const HomeContainer = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
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
      <Value />
      {/* <SuccessFooter isSuccess={isSuccess} /> */}
      {/* <Features />
            <Team />
            <StayUpdated />
            <Footer /> */}
    </div>
  );
};

export default HomeContainer;
