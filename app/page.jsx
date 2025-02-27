import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import Home6 from "@/components/homes/home-6";
import Hero1 from "@/components/homes/home-6/heros/Hero1";
import { fancyMultipage } from "@/data/menu";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Slider from "@/components/homes/home-6/Slider";

export const metadata = {
  title:
    "InfiniSoft Technology |  Professional Websites & App Solutions",
  description:
    "Custom website, mobile app design & development. UIUX & prototyping services.",
};
export default function Home6MainDemoMultiPage() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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
              <Slider/>
            </section>
            
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
