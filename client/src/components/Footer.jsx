import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-logo">

          <h2>AGNI</h2>

          <p>
            Premium Sportswear Manufacturing
            Company for Global Brands.
          </p>

        </div>

        <div>

          <h3>Quick Links</h3>

          <ul>

            <li>Home</li>

            <li>Company</li>

            <li>Services</li>

            <li>Gallery</li>

          </ul>

        </div>

        <div>

          <h3>Contact</h3>

          <p>Islamabad, Pakistan</p>

          <p>info@agni.com</p>

          <p>+92 300 1234567</p>

        </div>

      </div>

      <hr/>

      <p className="copyright">

        © 2026 AGNI Industry. All Rights Reserved.

      </p>

    </footer>
  );
}

export default Footer;