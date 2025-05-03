"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Form({ onSuccess,plan }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [options, setOptions] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const { name, email, phone, options, subject, message } =
        JSON.parse(savedFormData);
      setName(name);
      setEmail(email);
      setPhone(phone);
      setOptions(options);
      setSubject(subject);
      setMessage(message);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "formData",
      JSON.stringify({ name, email, phone, options, subject, message })
    );
  }, [name, email, phone, options, subject, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      options,
      subject,
      message,
      planTitle: plan?.title,
      planPrice: plan?.price,
    };

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setOptions("");
        setSubject("");
        setMessage("");
        onSuccess(); // Call the onSuccess function passed as a prop
      } else {
        setStatus(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="popup-form text-left">
      <div className="d-flex flex-column text-start">
        <h2
          className="font-semibold section-5-title mb-0"
          style={{ color: "#1C1C57", fontFamily: "Montserrat" }}
        >
          Book A {" "}
          <span
            style={{
              background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Free Call
          </span>
        </h2>
        <p className="font-semibold">We will get back to you soon!</p>
      </div>

      <div className="popup-area row">
        <div className="col-md-6 col-lg-7">
          <form
            className="popup-form-left space-y-4 wow fadeInUp"
            onSubmit={handleSubmit}
          >
            {/* Conditionally show plan title and price if plan is provided */}
            {plan?.title && plan?.price ? (
              <>
                <div className="w-full mb-3 text-start">
                  <div
                    className="popup-input w-full bg-gray-100 p-2 rounded border border-gray-300"
                    style={{ color: "#828282" }}
                  >
                    Package:{" "}
                    <span style={{ color: "#B467C0", fontWeight: "bolder" }}>
                      {plan?.title}
                    </span>
                  </div>
                </div>
                <div className="w-full text-start mb-3">
                  <div
                    className="popup-input w-full bg-gray-100 p-2 rounded border border-gray-300"
                    style={{ color: "#828282" }}
                  >
                    Price:{" "}
                    <span style={{ color: "#B467C0", fontWeight: "bolder" }}>
                      ${plan?.price}
                    </span>
                  </div>
                </div>
              </>
            ) : null}
            <div className="w-full">
              <input
                type="text"
                placeholder="Name"
                className="popup-input w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Email"
                className="popup-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <input
                type="tel"
                placeholder="Phone Number"
                className="popup-input w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <select
                className="popup-input w-full"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                required
                style={{ color: "#1C1C57" }}
              >
                <option value="" disabled>
                  Select Service
                </option>
                <option value="Website design">Staff Augmentation</option>
                <option value="Website design">Website design</option>
                <option value="Mobile App design">Mobile App design</option>
                <option value="Website development">Website development</option>
                <option value="Mobile App development">
                  Mobile App development
                </option>
                <option value="UIUX Consulting">UIUX Consulting</option>
                <option value="Prototyping">Prototyping</option>
              </select>
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Subject"
                id="subject"
                className="popup-input w-full"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{ color: "#1C1C57" }}
              />
            </div>
            <div className="w-full">
              <textarea
                placeholder="Message"
                id="message"
                className="popup-input w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ color: "#1C1C57" }}
              />
            </div>
            <button
              className="btn btn-primary submit-button w-full"
              type="submit"
              style={{
                borderRadius: "50px",
                height: "2.7rem",
                width: "100%",
                background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                border: "none",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              Send Request <i className="bi bi-arrow-right"></i>
            </button>
            <div className="row py-3">
              <div className="col-md-8 col-lg-5">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon">
                    <img
                      src="/assets/images/whatsup.svg"
                      alt="WhatsApp"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center text-start">
                    <p
                      className="mb-0 fw-bold"
                      style={{
                        fontFamily: "Poppins",
                        color: "#1C1C57",
                        fontSize: "14px",
                      }}
                    >
                      WhatsApp
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontFamily: "Poppins",
                        color: "#E25B72",
                        fontSize: "13px",
                        fontWeight: "bolder",
                      }}
                    >
                      <a
                        href="tel:+8801858333238"
                        style={{ color: "#E25B72", textDecoration: "none" }}
                      >
                        +8801858333238
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-7">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon">
                    <img
                      src="/assets/images/email.svg"
                      alt="WhatsApp"
                      className="img-fluid w-100"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center text-start">
                    <p
                      className="mb-0 fw-bold"
                      style={{
                        fontFamily: "Poppins",
                        color: "#1C1C57",
                        fontSize: "14px",
                      }}
                    >
                      EMAIL
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontFamily: "Poppins",
                        color: "#E25B72",
                        fontSize: "13px",
                        fontWeight: "bolder",
                      }}
                    >
                      <a
                        href="mailto:info@infinisoftech.com"
                        style={{ color: "#E25B72", textDecoration: "none" }}
                      >
                        info@infinisoftech.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 col-lg-5 p-0">
          <div className="">
            {/* Decorative Image */}
            <div className="decoration-11 d-none d-xl-block">
              <div className="wow fadeInUp">
                {/* <Image
                  src="/assets/images/demo-fancy/contact-section-image.png"
                  width={225}
                  height={250}
                  alt=""
                /> */}
              </div>
            </div>
            {/* End Decorative Image */}
            {/* <div className="box-shadow round p-4 p-sm-5">
              <h4 className="h3 mb-30">Get in Touch</h4> */}
            {/* Google Map */}
            <div className="map-boxed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0719894066533!2d90.41366707619392!3d23.780450678649846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79c1e7f822f%3A0x6c343f84ca86b6c9!2sNavana%20Tower%2C%2045%20Gulshan%20Ave%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1733060682121!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mapData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
