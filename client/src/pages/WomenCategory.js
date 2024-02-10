import {React , useState , useEffect} from "react";
import { Container, Row, Col, Card,  Carousel } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
function WomenCategory({incrementCartCount}){
    const [hovered, setHovered] = useState(false);

    async function fetchData() {
        const response = await fetch("/api/data/category/Women-Clothing");
        const data = await response.json();
        return data;
      }
      const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

const [loading, setLoading] = useState(true);
const [products , setProducts] = useState([]);
useEffect(() => {
  fetchData().then((data) => {
    setData(data);
    setLoading(false);
  })
}, []);
useEffect(() => {
    fetchData().then((data) => {
        setProducts(data);
    })
  }, []);
const backgroundImage = "";
const showToast = (products, event) => {
    event.preventDefault();
    toast(`Item ${products.name} has been added`, {
      position: "top-right",
      autoClose: 2000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => incrementCartCount(products)
    });
  };

if (loading) return <div>Loading...</div>;
    return(
      <Carousel>
      <Container className="m-5">
          <h3 className="mb-5">Men's Clothing Category</h3>
      <Row>
        {products.map((product,index) => (
          <Col key={product.id} md={4}>
            <Card className={`slider-item z-3 ${hovered ? "hovered" : "" }`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Card.Img variant="top" className="carousel " />
              <img className="d-block w-100" src={product.images} alt={product.name} />
              <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <button
                      onClick={(event) => showToast(product, event)}
                      className="btn bg-dark text-white cartadd" >
                      Add to Cart 
                        </button>             
                  </Card.Body>
              {hovered && <div className=" rounded" ></div>}
              </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </Carousel>
    )
}

export default WomenCategory;