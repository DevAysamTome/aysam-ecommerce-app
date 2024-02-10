import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const DiscountSection = () => {
  // Consts
  const [discountedProducts, setDiscountedProducts] = useState([]);
  
  // Function to get discounted products and update state
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data/');
      const data = await response.json();
      setDiscountedProducts(data.filter(product => product.discountPercentage > 0));
    };

    fetchData();
  }, []);

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
      </motion.div>
      <Row className="g-4">
        {discountedProducts.map(product => (
          <Col xs={12} md={6} lg={4} key={product.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border rounded shadow text-center mt-4 position-relative">
                <Card.Img
                  variant="top"
                  src={product.images}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <del> ${product.price}</del> ${(product.price * (100 - product.discountPercentage)) / 100}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-0 d-flex flex-column">
                  <small className="text-muted">
                    Save ${product.price * (product.discountPercentage / 100)}
                  </small>
                  <Button variant="dark" className="position-relative d-block bottom-0 end-0">
                    Buy Now
                  </Button>
                </Card.Footer>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DiscountSection;