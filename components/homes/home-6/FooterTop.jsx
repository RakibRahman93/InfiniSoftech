import FooterSocials from "@/components/footers/FooterSocials";
import "./ContactForm.css";
const FooterTop = () => {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(220deg, #621ABE 0%, #051D55 70%)",
        }}
        className="page-section scrollSpysection"
        id="footer-top"
      >
        <div className="container py-2">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="contact-form-wrapper">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="text-white">Get Started</p>
                    <h2 className="mb-3 text-white section-5-title mb-2">
                      Get in touch with us.
                    </h2>
                    <h2 className="mb-3 text-white section-5-title">
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
                        className="form-control bg-transparent formDesign"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="email"
                        className="form-control bg-transparent formDesign"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="tel"
                        className="form-control bg-transparent formDesign"
                        placeholder="Phone Number (optional)"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="form-control bg-transparent formDesign"
                      rows="5"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-primary submit-button"
                      type="submit"
                      const
                      style={{
                        borderRadius: "50px",
                        height: "2.7rem",
                        minWidth: "12rem",
                        background:
                          "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                        border: "none",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
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
