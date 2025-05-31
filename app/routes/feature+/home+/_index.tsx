import { CommonHero } from "@/components/common/CommonHero";
import PricingSectionCards from "~/components/common/pricing/PricingComponent";

import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
export const loader = HomeLoader;

export default function HomeIndex() {
  return (
    <>
      <CommonHero />
      <PricingSectionCards />
    </>
  );
}
