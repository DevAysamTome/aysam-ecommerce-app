import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
function Category(){
  // Consts
  const [categoryProductCounts, setCategoryProductCounts] = useState([])
  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const numSlides = Math.ceil(categoryProductCounts.length / itemsPerSlide);
 
  // Fetch Category
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('/api/data/category')
        setCategoryProductCounts(response.data)
      }
       catch (error) {
        console.error('Error fetching data:', error)
      }
    
    }
    fetchData()
    },[]);

 //  Function to handle the number of slides per page
    useEffect(() => {
        const handleResize = () => {
          setItemsPerSlide(window.innerWidth <= 768 ? 1 : 3);
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
      
      return (
    <Container className="py-5" id="categorys">
      <h1 className="text-center my-5">Shop by Category</h1>
      <Carousel indicators={false} interval={500} numberOfItems={itemsPerSlide}>
        {Array.from({ length: numSlides }, (_, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center ml-auto">
              {categoryProductCounts
                .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                .map((categoryProductCounts, index) => (
                  <div
                    key={categoryProductCounts.id}
                    className="position-relative rounded-3"
                    style={{ width: "250px", height: "250px" }}
                  >
                    <Link  to={'/category/' + categoryProductCounts.name}>
                    <div className="image-container rounded-5">
                      <img
                        className="d-block rounded-circle  position-relative w-100 p-3"
                        src={categoryProductCounts.imageUrl}
                        alt={categoryProductCounts.name}
                        style={{ objectFit: "cover" }}
                        width="250px"
                        height="250px"
                      />
                      <div className="overlay rounded-circle d-flex justify-content-center align-items-center">
                        <div className="co carousel-caption rounded-circle d-none d-md-block shadow p-3 bg-black position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                          <h3>{categoryProductCounts.name}</h3>
                        </div>
                      </div>
                    </div>
                    </Link>
                   
                  </div>
                ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default Category;