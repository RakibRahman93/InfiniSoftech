"use client";
import { footerLinks, navigationLinks } from "@/data/footer";
import Image from "next/image";
import FooterSocials from "./FooterSocials";

export default function Footer6() {
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Linear easing replacement
    });
  };

  return (
    <div className="container">
      <div className="row py-5 pb-sm-80 pb-xs-50">
        <div className="col-lg-3 text-gray mb-md-50">
          <div className="mb-30">
            <Image
              src="/assets/images/InfiniSoftLogoblack.png"
              alt="Your Company Logo"
              width={154}
              height={35}
            />
          </div>
          <p>Bringing your vision to reality with limitless possibilities.</p>
          <div className="clearlinks">
            <strong>T.</strong>
            <a href="tel:+8801858333238">+8801858333238</a>
          </div>
          <div className="clearlinks">
            <strong>E. </strong>
            <a href="mailto:info@infinisoftech.com">info@infinisoftech.com</a>
          </div>
          <div className="py-3">
            <FooterSocials variant="second" />
          </div>
          <hr />
          {/* <a
             href="https://infinisoftech.setmore.com/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn-mod btn-color btn-large btn-round btn-hover-anim me-1 mb-xs-10"
           >
             <span>Book A Free Call</span>
           </a>{" "} */}
        </div>
        <div className="col-lg-7 offset-lg-2">
          <div className="row mt-n30">
            {/* Footer Widget */}
            <div className="col-sm-4 mt-30">
              <h3 className="fw-title">Company</h3>
              <ul className="fw-menu clearlist local-scroll">
                {navigationLinks.map((elm, i) => (
                  <li key={i}>
                    <a href={elm.href}>{elm.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* End Footer Widget */}
            {/* Footer Widget */}
            <div className="col-sm-4 mt-30">
              <h3 className="fw-title">Social Media</h3>
              <ul className="fw-menu clearlist">
                <FooterSocials variant="first" />
              </ul>
            </div>
            {/* End Footer Widget */}
            {/* Footer Widget */}
            <div className="col-sm-4 mt-30">
              <h3 className="fw-title">Legal &amp; Press</h3>
              <ul className="fw-menu clearlist">
                {footerLinks.map((elm, i) => (
                  <li key={i}>
                    <a href={elm.path}>{elm.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* End Footer Widget */}
          </div>
        </div>
      </div>
      {/* Footer Text */}
      <div className="row text-gray d-flex align-items-center justify-between">
        <div className="col-md-4 col-lg-3">
          <b>©InfiniSoft Technology. {new Date().getFullYear()}.</b>
        </div>
        <div className="col-md-7 offset-md-1 offset-lg-2 clearfix">
          <b className="text-right">
            Bringing your vision to reality with limitless possibilities.
          </b>
          {/* Back to Top Link */}
          <div
            className="local-scroll float-end mt-n20 mt-sm-10"
            onClick={scrollToTop}
          >
            <a href="#top" className="link-to-top">
              <i className="mi-arrow-up size-24" />
              <span className="visually-hidden">Scroll to top</span>
            </a>
          </div>
          {/* End Back to Top Link */}
        </div>
      </div>
      {/* End Footer Text */}
    </div>
  );
}
