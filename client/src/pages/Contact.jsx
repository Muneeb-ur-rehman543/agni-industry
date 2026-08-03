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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-container">
        <div className="contact-form-box">
          <h3>Send Message</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

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