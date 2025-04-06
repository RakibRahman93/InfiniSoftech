import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import Home6 from "@/components/homes/home-6";
import Hero1 from "@/components/homes/home-6/heros/Hero1";
import { fancyMultipage } from "@/data/menu";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Launch fast, scale smart starting from just $399",
  description:
    "Launch fast, scale smart — Custom websites & mobile apps built for results. Trusted by startups, SaaS founders & agencies worldwide.",
};
export default function Home6MainDemoMultiPage() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset border-b">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section
              className="home-section bg-scroll scrollSpysection"
              id="home"
            >
              <div className="bg-shape-1 wow fadeIn">
                {/* <Image
                  width="1443"
                  height="844"
                  src="/assets/images/demo-fancy/Hero_background.png"
                  alt=""
                /> */}
              </div>
              <Hero1 />
            </section>

            <Home6 />
          </main>
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
    </>
  );
}
