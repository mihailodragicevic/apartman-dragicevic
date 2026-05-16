import { useEffect } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import PriceSection from "@/components/PriceSection";
import GalleryPreview from "@/components/GalleryPreview";
import ReviewSection from "@/components/ReviewSection";

export default function Index() {
  useEffect(() => {
    document.title = "Apartman Dragićević · Stan na dan u Bogatiću";
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', 'Apartman u Bogatiću, 100m od centra. Do 5 osoba, parking, WiFi, klima. Pozovite za rezervaciju - cene od 19€ po osobi.');
    document.head.appendChild(meta);
  }, []);
  return (
    <Layout>
      <Hero />
      <Features />
      <WhyUs />
      <PriceSection />
      <GalleryPreview />
      <ReviewSection />
    </Layout>
  );
}
