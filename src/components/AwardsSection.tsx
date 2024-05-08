import React from "react";
import Container from "./Container";

function AwardsSection() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-16 text-customBlack">
        <div className="relative font-bodoni font-thin pb-2 w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center uppercase">
          <svg
            className="absolute left-[-20%]"
            width="250"
            height="1"
            viewBox="0 0 250 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <line
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="#212121"
              strokeOpacity="0.8"
            />
          </svg>
          <p className="text-lg md:text-2xl lg:text-4xl xl:text-7xl opacity-10 font-thin">
            awards
          </p>
          <p className="absolute text-base md:text-lg lg:text-xl xl:text-5xl text-customBlack">
            awards
          </p>
          <svg
            className="absolute right-[-20%] "
            width="100"
            height="8"
            viewBox="0 0 251 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M250.354 4.35355C250.549 4.15829 250.549 3.84171 250.354 3.64645L247.172 0.464466C246.976 0.269204 246.66 0.269204 246.464 0.464466C246.269 0.659728 246.269 0.976311 246.464 1.17157L249.293 4L246.464 6.82843C246.269 7.02369 246.269 7.34027 246.464 7.53553C246.66 7.7308 246.976 7.7308 247.172 7.53553L250.354 4.35355ZM0 4.5H250V3.5H0V4.5Z"
              fill="#212121"
              fillOpacity="1"
            />
          </svg>
        </div>
        <p className="text-center font-libre text-base md:text-lg xl:text-xl">
          Our dedication to excellence has been recognized by the following
          organizations:
        </p>
        <div className="flex flex-wrap font-libre justify-center mt-8 items-center w-full">
          <div className="relative w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center uppercase">
            <p className="text-lg md:text-7xl lg:text-8xl xl:text-9xl opacity-10 italic">
              97
            </p>
            <div className="absolute text-sm md:text-lg flex flex-col justify-center items-center">
              <span>rated</span>
              <span className="text-sm md:text-2xl xl:text-5xl italic">97</span>
              <span>world wide</span>
            </div>
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center">
            <div className="relative w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center uppercase">
              <p className="text-lg md:text-7xl lg:text-8xl xl:text-9xl opacity-10 italic">
                100
              </p>
              <div className="absolute text-sm md:text-lg flex flex-col justify-center items-center">
                <span>customer</span>
                <span className="text-sm md:text-2xl xl:text-5xl italic text-customBlack">
                  100%
                </span>
                <span>satisfaction</span>
              </div>
            </div>
          </div>
          <div className="w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center">
            <div className="w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center">
              <div className="relative w-1/2 md:w-1/3 lg:w-1/4 flex items-center justify-center uppercase">
                <p className="text-lg md:text-7xl lg:text-8xl xl:text-9xl opacity-10 italic">
                  1st
                </p>
                <div className="absolute text-sm md:text-lg flex flex-col justify-center items-center font-libre">
                  <span>first</span>
                  <span className="text-sm md:text-2xl xl:text-5xl italic text-customBlack font-libre">
                    1st
                  </span>
                  <span>choice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AwardsSection;
