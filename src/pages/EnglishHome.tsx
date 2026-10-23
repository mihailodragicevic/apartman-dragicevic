import GeoDetails from "@/components/GeoDetails";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import geoContent from "@/geo-content.json";

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
      <GeoDetails locale="en" />
    </Layout>
  );
}
