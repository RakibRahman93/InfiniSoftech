"use client";
import FooterSocials from "@/components/footers/FooterSocials";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ContactForm.css";
const FooterTop = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } 
  };

  return (
    <div>
      <section
        style={{
          background: "linear-gradient(-50deg, #621ABE 20%, #051D55 50%)",
        }}
        className="py-5 scrollSpysection"
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
                <form onSubmit={handleSubmit}>
                  
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control bg-transparent formDesign fs-24 ps-0"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="email"
                        className="form-control bg-transparent formDesign fs-24 ps-0"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="tel"
                        className="form-control bg-transparent formDesign fs-24 ps-0"
                        placeholder="Phone Number (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="form-control bg-transparent formDesign fs-24 ps-0 mb-5"
                      rows="5"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      name="message"
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
      <Toaster position="top-right"/>
    </div>
  );
};

export default FooterTop;
