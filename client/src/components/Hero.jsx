import "./Hero.css";
import hero from "../assets/images/hero.jpg";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="tag">
          SPORTSWEAR MANUFACTURER
        </span>

        <h1>
          We Build
          <br />
          Premium
          <br />
          Sportswear
          <br />
          For Brands
        </h1>

        <p>
          AGNI Industry manufactures premium gym wear,
          sports uniforms, fitness apparel and custom
          clothing for businesses across the world.
        </p>

        <div className="buttons">

          <button className="orange">
            Explore More
          </button>

          <button className="white">
            Contact Us
          </button>

        </div>

      </div>

      <div className="hero-right">

        <img src={hero} alt="AGNI Sportswear Factory" />

      </div>

    </section>
  );
}

export default Hero;