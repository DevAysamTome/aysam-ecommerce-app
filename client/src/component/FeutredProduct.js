import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

function FeutredProduct({ incrementCartCount }) {
  // Consts
  const [feutred, setFeutred] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const numSlides = Math.ceil(feutred.length / itemsPerSlide);
  const showToast = (feutred, event) => {
    event.preventDefault();
    toast(`Item ${feutred.name} has been added`, {
      position: "top-right",
      autoClose: 2000, // milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => incrementCartCount(feutred)
    });
  };

  // Fetch Feautred Product
  useEffect(() => {
    fetch("/api/data/feutred")
      .then((response) => response.json())
      .then((data) => setFeutred(data))
      .catch((error) => console.error(error));
  }, []);

  // Handle Resize silde per page
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth <= 768 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
// Render
  return (
    <div className="mt-5 feutred" id="feutred">
      <h3 style={{ textAlign: "center" }}>Feutred Product</h3>
      <Carousel indicators={false} interval={500} numberOfItems={itemsPerSlide}>
        {Array.from({ length: numSlides }, (_, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center ml-auto">
              {feutred
                .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                .map((feutred, index) => (
                  <div
                    key={feutred.id}
                    className="position-relative"
                    style={{ width: "250px", height: "250px" }}
                  >
                    <div className="image-container">
                      <img
                        className="d-block position-relative w-100 p-3"
                        src={feutred.images}
                        alt={feutred.title}
                        style={{ objectFit: "cover" }}
                        width="250px"
                        height="250px"
                      />
                      <div className="overlay d-flex justify-content-center align-items-center">
                        <div className="co carousel-caption d-none d-md-block shadow p-3 bg-black position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                          <h3>{feutred.title}</h3>
                          <p>${feutred.price}</p>
                          <button
                            onClick={(event) => showToast(feutred, event)}
                            className="btn bg-white text-black cartadd"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default FeutredProduct;