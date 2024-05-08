import React from "react";
import Container from "./Container";

function ExploreSection() {
  return (
    <div className="bg-customBlack w-full h-full">
      <Container>
        <div className="z-0 relative flex flex-col justify-center w-96 items-center ps-10">
          <h2 className="not-sr-only tracking-widest relative font-bodoni text-8xl font-thin text-customWhite text-opacity-10 dark:text-darkText">
            Explore
          </h2>
          <h2 className="absolute tracking-widest font-bodoni text-5xl font-thin text-background pt-4">
            Explore
          </h2>
        </div>
      </Container>
    </div>
  );
}

export default ExploreSection;
