import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { pageSeo } from "@/lib/seo";

const NotFound = () => {
  return (
    <Layout>
      <Seo {...pageSeo.notFound} noIndex />
      <section className="container flex min-h-[70vh] items-center justify-center py-32">
        <div className="text-center">
          <h1 className="mb-4 font-display text-4xl md:text-5xl">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Stranica koju tražite nije pronađena.</p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Vratite se na početnu
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
