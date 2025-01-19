"use client";
import { contactItems } from "@/data/contact";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [options, setOptions] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      options,
      subject,
      message,
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
      } else {
        setStatus(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setStatus("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="row wow fadeInUp">
        {/* Left Column */}
        <div className="col-lg-5 mb-md-50 mb-sm-30 d-flex align-items-strech">
          <div
            className="bg-color-primary-1 bg-color-alpha-90 bg-image bg-scroll light-content w-100 round overflow-hidden px-4 px-sm-5 py-5"
            style={{
              backgroundImage:
                "url(/assets/images/demo-corporate/section-bg-4.jpg)",
            }}
          >
            {/* Address */}
            {contactItems.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={`contact-item ${
                    index !== 3 ? "mb-40 mb-sm-20" : ""
                  }`}
                >
                  <div className="ci-icon">
                    <i className={item.iconClass} />
                  </div>
                  <h4 className="ci-title">{item.title}</h4>
                  <div className="ci-text large">{item.text}</div>
                  <div className="ci-link">
                    <a
                      href={item.link.url}
                      target={item.link.target}
                      rel={item.link.rel}
                    >
                      {item.link.text}
                    </a>
                  </div>
                </div>{" "}
                {index !== contactItems.length - 1 && (
                  <hr className="mt-0 mb-40 mb-sm-20 opacity-02" />
                )}
              </React.Fragment>
            ))}
            {/* End Phone */}
          </div>
        </div>
        {/* End Left Column */}
        {/* Right Column */}
        <div className="col-lg-7 d-flex align-items-strech">
          <div className="border-color-primary-1 round w-100 px-4 px-sm-5 py-5">
            <h3 className="section-title-small mt-n10 mb-40 mb-sm-30">
              Let's build something amazing together!
            </h3>
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="form contact-form"
              id="contact_form"
            >
              <div className="row">
                <div className="col-md-6">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="input-lg round form-control"
                      placeholder="Enter your name"
                      pattern=".{3,100}"
                      required
                      aria-required="true"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {/* End Name */}
                </div>
                <div className="col-md-6">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="input-lg round form-control"
                      placeholder="Enter your email"
                      pattern=".{5,100}"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* End Email */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="input-lg round form-control"
                      placeholder="Enter your phone number"
                      pattern=".{10,15}"
                      required
                      aria-required="true"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {/* End Phone Number */}
                </div>
                <div className="col-md-6">
                  {/* Dropdown */}
                  <div className="form-group">
                    <label htmlFor="dropdown">Select an Option</label>
                    <select
                      className="input-lg round form-control"
                      value={options}
                      onChange={(e) => setOptions(e.target.value)}
                      required
                    >
                      <option value="" disabled selected>
                        Choose an option
                      </option>
                      <option value="Website design">Website design</option>
                      <option value="Mobile App design">
                        Mobile App design
                      </option>
                      <option value="Website development">
                        Website development
                      </option>
                      <option value="Mobile App development">
                        Mobile App development
                      </option>
                      <option value="UIUX Consulting">UIUX Consulting</option>
                      <option value="Prototyping">Prototyping</option>
                    </select>
                  </div>
                  {/* End Dropdown */}
                </div>
              </div>
              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="input-lg round form-control"
                  placeholder="Enter your subject"
                  required
                  aria-required="true"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  className="input-lg round form-control"
                  style={{ height: 132 }}
                  placeholder="Enter your message"
                  defaultValue={""}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-6 col-xl-7 d-flex align-items-center">
                  {/* Inform Tip */}
                  {/* <div className="form-tip w-100 pt-3">
        <i className="icon-info size-16" />
        All the fields are required. By sending the form you agree to the{" "}
        <a href="#">Terms &amp; Conditions</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div> */}
                  {/* End Inform Tip */}
                </div>
                <div className="col-md-6 col-xl-5 mt-sm-20">
                  {/* Send Button */}
                  <div className="pt-3 text-md-end">
                    <button
                      type="submit"
                      className="submit_btn btn btn-mod btn-color btn-large btn-round btn-hover-anim"
                      id="submit_btn"
                      aria-controls="result"
                    >
                      <span>Send Message</span>
                    </button>
                  </div>
                  {/* End Send Button */}
                </div>
              </div>
              <div
                id="result"
                role="region"
                aria-live="polite"
                aria-atomic="true"
              />
            </form>

            {/* End Contact Form */}
          </div>
        </div>
        {/* End Right Column */}
      </div>
    </>
  );
}
