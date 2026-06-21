import { BenefitsSection } from "../components/sections/BenefitsSection";
import { ConversionCta } from "../components/sections/ConversionCta";
import { HomeHero } from "../components/sections/HomeHero";
import { PromoSection } from "../components/sections/PromoSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <BenefitsSection />
      <PromoSection />
      <ReviewsSection />
      <ConversionCta />
    </main>
  );
}
