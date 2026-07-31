import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Company.css";
import company from "../assets/images/company.jpg";

function Company() {
  return (
    <>
      <Navbar />

      {/* Banner */}

      <section className="company-banner">

        <div className="banner-text">

          <h1>Company Profile</h1>

          <p>
            Learn more about AGNI Industry and our manufacturing excellence.
          </p>

        </div>

      </section>

      {/* Who We Are */}

      <section className="who">

        <div className="who-image">

          <img src={company} alt="AGNI Industry" />

        </div>

        <div className="who-text">

          <span>WHO WE ARE</span>

          <h2>Sportswear Manufacturing Experts</h2>

          <p>
            AGNI Industry manufactures premium sportswear,
            gym wear, fitness apparel and team uniforms for
            local and international brands.
          </p>

          <p>
            Our focus is quality, innovation and long-term
            partnerships.
          </p>

        </div>

      </section>

      {/* Mission Vision */}

      <section className="mission">

        <div className="mission-card">

          <h2>Mission</h2>

          <p>
            Deliver premium sportswear with consistent quality
            and customer satisfaction.
          </p>

        </div>

        <div className="mission-card">

          <h2>Vision</h2>

          <p>
            Become a trusted global sportswear manufacturing
            company.
          </p>

        </div>

      </section>

      {/* Core Values */}

      <section className="values">

        <h2>Core Values</h2>

        <div className="values-grid">

          <div className="value-card">
            <h3>Quality</h3>
          </div>

          <div className="value-card">
            <h3>Innovation</h3>
          </div>

          <div className="value-card">
            <h3>Integrity</h3>
          </div>

          <div className="value-card">
            <h3>Teamwork</h3>
          </div>

        </div>

      </section>

      {/* Process */}

      <section className="process">

        <h2>Manufacturing Process</h2>

        <div className="timeline">

          <div>Design</div>
          <div>Fabric</div>
          <div>Cutting</div>
          <div>Stitching</div>
          <div>Quality Check</div>
          <div>Packing</div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Company;