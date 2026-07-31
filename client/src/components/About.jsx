import "./About.css";
import about from "../assets/images/about.jpg";

function About() {
  return (
    <section className="about">

      <div className="about-left">

        <img src={about} alt="About AGNI Industry" />

      </div>

      <div className="about-right">

        <span className="section-tag">
          ABOUT AGNI
        </span>

        <h2>
          Trusted Sportswear
          Manufacturing Partner
        </h2>

        <p>
          AGNI Industry is a leading sportswear manufacturing company
          specializing in premium quality gym wear, fitness apparel,
          sports uniforms, team wear and private label clothing.
        </p>

        <p>
          We combine modern technology with skilled craftsmanship
          to deliver world-class products for international brands.
        </p>

        <button>
          Learn More
        </button>

      </div>

    </section>
  );
}

export default About;