import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import Home6 from "@/components/homes/home-6";
import Hero1 from "@/components/homes/home-6/heros/Hero1";
import { fancyMultipage } from "@/data/menu";
import Image from "next/image";

export const metadata = {
  title:
    "InfiniSoft Technology |  Professional Websites & App Solutions",
  description:
    "Custom website, mobile app design & development. UIUX & prototyping services.",
};
export default function Home6MainDemoMultiPage() {
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section
              className="home-section bg-scroll scrollSpysection"
              id="home"
            >
              <div className="bg-shape-1 wow fadeIn">
                <Image
                  width="1443"
                  height="844"
                  src="/assets/images/demo-fancy/image.svg"
                  alt=""
                />
              </div>
              <Hero1 />
            </section>
            <div className="page-section overflow-hidden">
                {/* Marquee Text Line */}
                <div className="marquee marquee-style-1 mb-30">
                  <div className="marquee-track marquee-animation">
                    <div>Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                    <div aria-hidden="true">Branding</div>
                    <div aria-hidden="true">UI/UX Design</div>
                    <div aria-hidden="true">Art Direction</div>
                  </div>
                </div>
                {/* End Marquee Text Line */}
                {/* Marquee Text Line */}
                <div className="marquee marquee-style-1">
                  <div className="marquee-track marquee-animation">
                    <div>Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                    <div aria-hidden="true">Development</div>
                    <div aria-hidden="true">SEO Optimization</div>
                  </div>
                </div>
                {/* End Marquee Text Line */}
              </div>
            <Home6 />
          </main>
          <footer className="page-section footer bg-dark-1 light-content pb-30">
            <Footer6 />
          </footer>
        </div>{" "}
      </div>
    </>
  );
}
