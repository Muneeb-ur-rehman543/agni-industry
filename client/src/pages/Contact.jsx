import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">

      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-container">

        {/* LEFT - FORM */}
        <div className="contact-form-box">
          <h3>Send Message</h3>

          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <textarea rows="5" placeholder="Your Message"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* RIGHT - INFO */}
        <div className="contact-info-box">
          <h3>Contact Information</h3>

          <p>📍 Rawalpindi, Pakistan</p>
          <p>📧 info@agni.com</p>
          <p>📞 +92 300 0000000</p>

          <div className="contact-card">
            <h4>Working Hours</h4>
            <p>Mon - Sat: 9AM - 6PM</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;