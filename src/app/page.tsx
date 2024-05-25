import BodySlogan from "@/components/BodySlogan";
import Carousel from "@/components/Carousel";
import PromotionHouse from "@/components/PromotionHouse";
import AwardsSection from "@/components/AwardsSection";
import LandingImage from "@/components/LandingImage";
import { cookies } from "next/headers";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const username = cookieStore.get("username");
  if (!accessToken || !username) {
    return (
      <main className="">
        <div className="ms-4 flex flex-row items-center gap-4">
          <Button className="z-50 hover:bg-customWhite hover:text-customBlack">
            <Link href="/login">Login</Link>
          </Button>
        </div>
        <LandingImage />
        <BodySlogan />

        <Carousel />
        <PromotionHouse />
        <AwardsSection />
      </main>
    );
  }
  return (
    <>
      <div className="ms-4 flex flex-row gap-2">
        <div className="flex flex-row items-center gap-4">
          <Button className="z-50 hover:bg-customWhite hover:text-customBlack">
            <Link href="/profile">Profile</Link>
          </Button>
        </div>
      </div>

      <main className="">
        <LandingImage />
        <BodySlogan />
        <Carousel />
        <PromotionHouse />
        <AwardsSection />
      </main>
    </>
  );
}
