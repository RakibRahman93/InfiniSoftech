import FooterSocials from "@/components/footers/FooterSocials";
import "./ContactForm.css";
const FooterTop = () => {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(220deg, #621ABE 0%, #051D55 70%)",
        }}
        className="py-4 scrollSpysection"
        id="footer-top"
      >
        <div className="container py-2 position-relative">
          <div className="row">
            <div>
              <div className="contact-form-wrapper">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <p className="text-white fs-24">Get Started</p>
                    <h2 className="mb-3 text-white fs-footer-title mb-0">
                      Get in touch with us.
                    </h2>
                    <h2 className="mb-3 text-white fs-footer-title">
                      We're here to assist you.
                    </h2>
                  </div>
                  <div className="social-icons">
                    {/* Placeholder social icons */}
                    <FooterSocials variant="third" />
                  </div>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control bg-transparent formDesign fs-24 ps-0"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="email"
                        className="form-control bg-transparent formDesign fs-24 ps-0"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="tel"
                        className="form-control bg-transparent formDesign fs-24 ps-0"
                        placeholder="Phone Number (optional)"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="form-control bg-transparent formDesign fs-24 ps-0 mb-5"
                      rows="5"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="btn btn-lg"
                      style={{
                        borderRadius: "50px",
                        background:
                          "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                        color: "white",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        cursor: "pointer",
                      }}
                    >
                      Leave us a Message <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterTop;
