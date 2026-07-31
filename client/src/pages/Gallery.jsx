import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Gallery.css";

import gallery1 from "../assets/images/gallery1.jpg";
import gallery2 from "../assets/images/gallery2.jpg";
import gallery3 from "../assets/images/gallery3.png";
import gallery4 from "../assets/images/gallery4.jpg";
import gallery5 from "../assets/images/gallery5.jpg";
import gallery6 from "../assets/images/gallery6.jpg";
import gallery7 from "../assets/images/gallery7.jpg";
import gallery8 from "../assets/images/gallery8.jpg";

function Gallery() {

  const projects = [
    {
      image: gallery1,
      title: "Sports T-Shirt"
    },
    {
      image: gallery2,
      title: "Gym Wear"
    },
    {
      image: gallery3,
      title: "Football Uniform"
    },
    {
      image: gallery4,
      title: "Cricket Uniform"
    },
    {
      image: gallery5,
      title: "Tracksuit"
    },
    {
      image: gallery6,
      title: "Hoodie"
    },
    {
      image: gallery7,
      title: "Compression Wear"
    },
    {
      image: gallery8,
      title: "Training Kit"
    }
  ];

  return (
    <>
      <Navbar />

      <section className="gallery-banner">
        <h1>Project Gallery</h1>
        <p>Explore our latest sportswear manufacturing projects.</p>
      </section>

      <section className="gallery">

        <div className="gallery-grid">

          {projects.map((item, index) => (

            <div className="gallery-card" key={index}>

              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
              />

              <h3>{item.title}</h3>

            </div>

          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Gallery;