"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import "../Popup.css";

export default function Form({ togglePopup }) {
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
      togglePopup();
      } else {
        setStatus(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="popup-form">
      <h2 className="font-semibold text-center mb-4">Book A Free Call</h2>
      <div className="popup-area">
        <form className="popup-form-left space-y-4" onSubmit={handleSubmit}>
          <div className="d-flex gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Your Name"
                className="popup-input w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Your Email"
                className="popup-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="d-flex gap-4">
            <div className="w-full">
              <input
                type="tel"
                placeholder="Your Phone Number"
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
              >
                <option value="" disabled>
                  Select an option
                </option>
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
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Subject"
              className="popup-input w-full"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <textarea
              placeholder="Your Message"
              className="popup-input w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-mod btn-color btn-large btn-round btn-hover-anim me-1 mb-xs-10"
          >
            <span>Submit</span>
          </button>
        </form>
        
        <div className="popup-form-right">
          <a
            href="https://wa.me/+8801858333238"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <i className="fab fa-whatsapp whatsapp-icon"></i>
            <span className="whatsapp-text">Send a message!</span>
          </a>
        </div>
      </div>
    </div>
  );
}
