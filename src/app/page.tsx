import BodySlogan from '@/components/BodySlogan'
import ExploreSection from '@/components/ExploreSection'
import Carousel from '@/components/Carousel'
import PromotionHouse from '@/components/PromotionHouse'
import AwardsSection from '@/components/AwardsSection'
import LandingImage from '@/components/LandingImage'

export default function Home() {
  return (
    <main className="">
      <LandingImage />
      <BodySlogan />
      <ExploreSection />
      <Carousel />
      <PromotionHouse />
      <AwardsSection />
    </main>
  )
}
