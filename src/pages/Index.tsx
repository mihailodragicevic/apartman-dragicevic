import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import PriceSection from "@/components/PriceSection";
import GalleryPreview from "@/components/GalleryPreview";
import GuestTestimonials from "@/components/GuestTestimonials";
import ReviewSection from "@/components/ReviewSection";
import GeoDetails from "@/components/GeoDetails";
import Seo from "@/components/Seo";
import { heroImage } from "@/lib/media";
import { pageSeo } from "@/lib/seo";

export default function Index() {
  return (
    <Layout>
      <Seo
        {...pageSeo.home}
        schema={[]}
        preloadImage={{
          href: heroImage.src,
          srcSet: heroImage.srcSet,
          sizes: "100vw",
        }}
      />
      <Hero />
      <GeoDetails locale="sr" />
      <Features />
      <WhyUs />
      <PriceSection />
      <GalleryPreview />
      <GuestTestimonials />
      <ReviewSection />
    </Layout>
  );
}
