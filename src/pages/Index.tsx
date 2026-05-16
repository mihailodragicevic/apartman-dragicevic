import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import PriceSection from "@/components/PriceSection";
import GalleryPreview from "@/components/GalleryPreview";
import ReviewSection from "@/components/ReviewSection";
import Seo from "@/components/Seo";
import { heroImage } from "@/lib/media";
import { baseSchemas, pageSeo } from "@/lib/seo";

export default function Index() {
  return (
    <Layout>
      <Seo
        {...pageSeo.home}
        schema={baseSchemas}
        preloadImage={{
          href: heroImage.src,
          srcSet: heroImage.srcSet,
          sizes: "100vw",
        }}
      />
      <Hero />
      <Features />
      <WhyUs />
      <PriceSection />
      <GalleryPreview />
      <ReviewSection />
    </Layout>
  );
}
