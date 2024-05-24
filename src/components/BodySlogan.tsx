import bodyImage from "@/app/public/bodyImage.jpg";
import Container from "./Container";
import Image from "next/image";

function BodySlogan() {
  return (
    <Container className=" flex flex-row items-start justify-center gap-10">
      <div className=" z-20 hidden md:block">
        <div className="relative flex flex-col items-end justify-center gap-4 border-b-[2rem] border-l-[2rem] border-t-[2rem] border-customBlack px-2 py-40 font-bodoni uppercase dark:border-customWhite ">
          <h2 className="bg-background text-3xl font-thin text-customBlack dark:text-customWhite md:text-5xl lg:text-7xl">
            The perfect location
          </h2>
          <div className="absolute bottom-0 ">
            <svg
              width="150"
              height="133"
              viewBox="0 0 209 133"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="2.18557e-08"
                x2="0.499995"
                y2="112"
                stroke="#FFFFFF"
                strokeOpacity="0.8"
              />
              <path
                d="M208.354 129.354C208.549 129.158 208.549 128.842 208.354 128.646L205.172 125.464C204.976 125.269 204.66 125.269 204.464 125.464C204.269 125.66 204.269 125.976 204.464 126.172L207.293 129L204.464 131.828C204.269 132.024 204.269 132.34 204.464 132.536C204.66 132.731 204.976 132.731 205.172 132.536L208.354 129.354ZM0 129.5H208V128.5H0V129.5Z"
                fill="#FFFFFF"
                fillOpacity="0.8"
              />
            </svg>
          </div>
          <div>
            <span className="left-30 not-sr-only absolute bottom-8 hidden -rotate-90 pb-4 font-bodoni text-2xl font-thin uppercase text-customBlack dark:text-customWhite md:block">
              meets
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="relative ">
          <Image
            className="z-10 object-cover"
            src={bodyImage}
            alt="Image of luxury couch and wall art"
          />
          <div className="xl:bottom-3/5 absolute top-2/4 p-4 md:bottom-2/3">
            <h2 className="max-w-2xl font-bodoni text-3xl font-thin uppercase text-background dark:text-darkText md:text-6xl lg:text-7xl xl:text-9xl">
              life time of memories
            </h2>
          </div>
        </div>
      </div>
      {/* MOBILE SCREENS */}
      <div className="absolute block font-bodoni text-background dark:text-darkText md:hidden">
        <div className="pt-28">
          <Image
            className=" z-10 object-cover"
            src={bodyImage}
            alt="Image of luxury couch and wall art"
          />
          <div className="absolute top-40 px-4 font-bodoni text-6xl uppercase">
            <p>the perfect location</p>
            <p>life time of memories</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default BodySlogan;
