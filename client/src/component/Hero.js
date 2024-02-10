import React from 'react';
import { Carousel } from 'react-bootstrap';
import {useEffect,useState} from 'react';

const Hero = () => {
  // Consts
  const [products, setProducts] = useState([]);
  
// Fetch Hero Products
  useEffect(() => {
    fetch('/api/data/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  }, [])
  
  return (
    <section className="hero">
      <Carousel >
      {products.map((product,index) => (
          <Carousel.Item  key={index} interval={1000}>
            <img
              className="d-block "
              src={product.thumbnail}  // Adjust the property name based on your data
              alt={product.title}
              width="1920px"
              height="500px"
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        <Carousel.Item interval={500}>
          <img
            className="d-block"
            src="https://i.ibb.co/yhR6bqY/PERFUME-CHANEL.jpg"
            alt="Second slide"
            width="1920px"
            height="500px"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="https://i.ibb.co/JtRscvV/image.jpg"
            alt="Third slide"
            width="1920px"
            height="500px"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Hero;