import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Services.css";

import service1 from "../assets/images/service1.jpg";
import service2 from "../assets/images/service2.jpg";
import service3 from "../assets/images/service3.jpg";
import service4 from "../assets/images/service4.jpg";
import service5 from "../assets/images/service5.jpg";
import service6 from "../assets/images/service6.jpg";

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      image: service1,
      title: "Sportswear Manufacturing",
      desc: "Premium sportswear production for international brands.",
    },
    {
      image: service2,
      title: "Gym Wear",
      desc: "Comfortable and durable gym clothing.",
    },
    {
      image: service3,
      title: "Team Uniforms",
      desc: "Custom uniforms for schools, clubs and teams.",
    },
    {
      image: service4,
      title: "Compression Wear",
      desc: "High-performance compression apparel.",
    },
    {
      image: service5,
      title: "Custom Apparel",
      desc: "Customized sportswear with your own branding.",
    },
    {
      image: service6,
      title: "Private Label",
      desc: "Complete private label manufacturing services.",
    },
  ];

  const handleLearnMore = (serviceTitle) => {
    navigate("/contact", {
      state: {
        service: serviceTitle,
      },
    });
  };

  return (
    <>
      <Navbar />

      {/* Banner */}
      <section className="service-banner">
        <h1>Our Services</h1>

        <p>
          High-quality manufacturing solutions for sportswear brands.
        </p>
      </section>

      {/* Services */}
      <section className="services-section">
        <h2>What We Offer</h2>

        <div className="services-grid">
          {services.map((item, index) => (
            <div className="service-card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="service-image"
              />

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <button
                type="button"
                onClick={() => handleLearnMore(item.title)}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Start Your Project?</h2>

        <p>
          Contact AGNI Industry today and let's manufacture premium
          sportswear for your brand.
        </p>

        <button
          type="button"
          onClick={() => navigate("/contact")}
        >
          Get Quote
        </button>
      </section>

      <Footer />
    </>
  );
}

export default ServicesPage;