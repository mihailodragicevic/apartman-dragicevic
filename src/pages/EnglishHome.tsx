import Hero from "@/components/Hero";
import FaqSection from "@/components/FaqSection";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import geoContent from "@/geo-content.json";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import PriceSection from "@/components/PriceSection";
import GalleryPreview from "@/components/GalleryPreview";
import GuestTestimonials from "@/components/GuestTestimonials";
import ReviewSection from "@/components/ReviewSection";

const page = geoContent.locales.en;

export default function EnglishHome() {
  return (
    <Layout>
      <Seo
        title={page.title}
        description={page.description}
        path="/en/"
        htmlLang="en"
        schema={[]}
      />
      <Hero locale="en" />
      <Features locale="en" />
      <WhyUs locale="en" />
      <FaqSection locale="en" />
      <PriceSection locale="en" />
      <GalleryPreview locale="en" />
      <GuestTestimonials locale="en" />
      <ReviewSection locale="en" />
    </Layout>
  );
}
