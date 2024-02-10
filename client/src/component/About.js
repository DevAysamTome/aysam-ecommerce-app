import React from 'react'
import { Container, Row, Col,Card} from 'react-bootstrap'
import imageAbout from "../images/about.jpg"
import Reveal from 'react-reveal/Reveal'

const About = () => {
  const fadeInUp = {
    initial: [{ opacity: 0, translateY: 50 }],
    animate: [{ opacity: 1, translateY: 0 }],
    transition: { duration: 1000, ease: 'easeOutQuad' }
  }

  const fadeInDown = {
    initial: [{ opacity: 0, translateY: -50 }],
    animate: [{ opacity: 1, translateY: 0 }],
    transition: { duration: 1000, ease: 'easeOutQuad' }
  }

  return (
    <section id="about" className="about bg-white">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h1>About Us</h1>
            <p className="lead">
              Welcome to our store! We're a team of passionate and experienced professionals dedicated to providing high-quality products and exceptional customer service. Our mission is to make online shopping easy, convenient, and enjoyable for our customers.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center  text-center ">
          <Col lg={6} className="mb-5  image">
            <Reveal effect={fadeInUp}>
            <div className="image-container w-100 h-100 rounded-5">
              <img src={imageAbout} alt="About Us"    className="rounded-circle  position-relative h-100 p-3"  width="250px"
                        height="250px"/>
                        </div>
            </Reveal>
          </Col>
        </Row>
        <Row className="align-items-center mb-5">
          <Col lg={6} order={2} order-lg={1}>
            <Reveal effect={fadeInDown}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h3>What We Do?</h3>
                  <p>
                    We offer a wide range of products, from electronics and fashion to home and garden, at competitive prices. Our user-friendly website and seamless checkout process make it easy for customers to find and purchase the products they need.
                 
                  </p>
                </Card.Body>
              </Card>
            </Reveal>
          </Col>
          <Col lg={6} order={1} order-lg={2} className="text-center text-lg-start">
            <Reveal effect={fadeInDown}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h3>Why Choose Us?</h3>
                  <p>
                    We pride ourselves on our fast and reliable shipping, as well as our knowledgeable and responsive customer support. Our commitment to excellence has earned us a loyal customer base and numerous positive reviews.
                  </p>
                </Card.Body>
              </Card>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About