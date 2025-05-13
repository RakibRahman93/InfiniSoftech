import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import AgencyPricingHero from "@/components/pricing/AgencyPricingHero";
import NorMalUiuxPricing from "@/components/pricing/NormalUiuxPricing";
import PricingHero from "@/components/pricing/PricingHero";
import { fancyMultipage } from "@/data/menu";
export const metadata = {
  title:
    "See Our Pricing Plans - Launch fast, scale smart starting from just $399",
  description: "",
};
const AgencyPricingPage = () => {
  return (
    <div className="theme-fancy">
      <div className="page" id="top">
        <nav className="main-nav transparent stick-fixed wow-menubar wch-unset border-b">
          <Header6 links={fancyMultipage} />
        </nav>
        <main id="main">
          <section
            className="pricing-section bg-scroll scrollSpysection"
            id="page-pricing"
          >
            <AgencyPricingHero />
          </section>
          <section className="page-section">
            <NorMalUiuxPricing />
            <NorMalUiuxPricing />
            <NorMalUiuxPricing />
          </section>
        </main>
        <FooterTop />
        <footer
          className="footer bg-dark-1 light-content py-5"
          style={{
            background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
          }}
        >
          <Footer6 />
        </footer>
      </div>{" "}
    </div>
  );
};

export default AgencyPricingPage;
