import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name field: only letters and spaces
    if (name === "name") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra name validation
    if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      alert("Please enter a valid name using letters only.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      alert("Message Sent Successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      console.log(res.data);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-badge">
          <span></span>
          GET IN TOUCH
        </div>

        <h1>
          Let's <span>Talk</span>
        </h1>

        <p>
          Have a question, need a custom order, or want to know more
          about our products? Our team is here to help.
        </p>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="contact-container">

        {/* CONTACT FORM */}
        <div className="contact-form-box">

          <div className="contact-section-heading">
            <div className="contact-icon">
              ✉
            </div>

            <div>
              <h2>Send Us a Message</h2>
              <p>We'll get back to you as soon as possible.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME + EMAIL */}
            <div className="contact-form-row">

              <div className="contact-input-group">
                <label>
                  Full Name <span>*</span>
                </label>

                <div className="contact-input">
                  <span>👤</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-input-group">
                <label>
                  Email Address <span>*</span>
                </label>

                <div className="contact-input">
                  <span>✉</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

            </div>

            {/* PHONE */}
            <div className="contact-input-group">
              <label>Phone Number</label>

              <div className="contact-input">
                <span>☎</span>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="contact-input-group">
              <label>
                Your Message <span>*</span>
              </label>

              <div className="contact-textarea">
                <span>💬</span>

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="contact-submit-btn"
            >
              Send Message
              <span>→</span>
            </button>

          </form>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="contact-info-box">

          <div className="info-header">
            <div className="contact-icon">
              📍
            </div>

            <div>
              <h2>Contact Information</h2>
              <p>Reach out to our team anytime.</p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="info-item">
            <div className="info-item-icon">
              📍
            </div>

            <div>
              <h4>Our Location</h4>
              <p>Rawalpindi, Pakistan</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="info-item">
            <div className="info-item-icon">
              ✉
            </div>

            <div>
              <h4>Email Address</h4>
              <p>info@agni.com</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="info-item">
            <div className="info-item-icon">
              ☎
            </div>

            <div>
              <h4>Phone Number</h4>
              <p>+92 300 0000000</p>
            </div>
          </div>

          {/* WORKING HOURS */}
          <div className="working-hours">

            <div className="working-icon">
              🕒
            </div>

            <div>
              <h3>Working Hours</h3>

              <p>
                <strong>Monday - Saturday</strong>
              </p>

              <span>9:00 AM - 6:00 PM</span>
            </div>

          </div>

          {/* SUPPORT */}
          <div className="support-box">
            <div className="support-dot"></div>

            <div>
              <h3>Need quick help?</h3>
              <p>Our team is ready to assist you.</p>
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM FEATURES */}
      <section className="contact-features">

        <div className="contact-feature">
          <div>⚡</div>
          <h3>Quick Response</h3>
          <p>We reply as soon as possible.</p>
        </div>

        <div className="contact-feature">
          <div>🛡</div>
          <h3>Reliable Support</h3>
          <p>Professional customer service.</p>
        </div>

        <div className="contact-feature">
          <div>🎯</div>
          <h3>Custom Solutions</h3>
          <p>Solutions tailored to your needs.</p>
        </div>

      </section>

    </div>
  );
};

export default Contact;