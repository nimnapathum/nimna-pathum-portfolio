"use client";
import React from "react";
import { useEffect, useState } from "react";


const LoadingName: React.FC = () => {
  const [loadingText, setLoadingText] = useState("Loading");
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [nameVisibility, setNameVisibility] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => (prev.length < 10 ? prev + "." : "Loading"));
    }, 500);

    const timeout = setTimeout(() => {
      setLoadingVisible(false);
      setNameVisibility(true);
      clearInterval(interval);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        {loadingVisible && (
            <p className={`text-foreground text-center transition-opacity duration-500`}>
                {loadingText}
            </p>
        )}

        {nameVisibility && (
            <div
              className={`flex justify-center items-center space-x-2 transition-opacity duration-500 ${
                nameVisibility ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src="/svg/name.svg" alt="" className="w-screen" />
            </div>
        )}
    </div>
      
  );
};

export default LoadingName;
