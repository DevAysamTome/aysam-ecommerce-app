import {React} from "react";
import Hero from "../component/Hero";
import FeutredProduct from "../component/FeutredProduct";
import Category from "../component/Category";
import Promotion from "../component/Promotion";
import DiscountSection from "../component/ProductDiscount";
import About from "../component/About";
import Footer from "../component/Footer";
import axios from "axios";
function Home({incrementCartCount}){
    axios.defaults.withCredentials = true;

  
    return(
        <div className="position-relative">
        <Hero />
        <FeutredProduct incrementCartCount={incrementCartCount} />
        <Category />
        <Promotion />
        <DiscountSection />
        <About />
        <Footer />
        </div>
    )
}
export default Home;