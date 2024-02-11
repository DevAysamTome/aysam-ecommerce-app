import './App.css';
import CustomNavbar from './component/Navbar';
import {React ,useState,useEffect} from 'react';
import {  Route, Switch,Redirect } from 'react-router-dom'
import Cart from './pages/Cart.js';
import { ToastContainer } from "react-toastify";
import Home from './pages/Home.js';
import Category from './component/Category.js';
import About from './component/About.js';
import Footer from './component/Footer.js';
import MenCategory from './pages/MenCategory.js';
import LoginPage from './pages/Login.js';
import WomenCategory from './pages/WomenCategory.js';
import JeweleryCategory from './pages/JeweleryCategory.js';
import SportsCategory from './pages/SportsCategory.js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import axios from 'axios';
import ElectornicCategory from './pages/ElectronicCategory.js';
import Dashboard from './Dashboard/dashboard.js';
import AccountSettingUser from './userController/AccountSettingUser.js';
import EditProfilePage from './userController/component/EditProfileUser.js';
import SecurityUsers from './userController/component/SecurityUser.js';
function App({formValues}) {
  // Consts
  const [countCate , setCount] = useState();
  const [openSidebarToggle , setOpenSidebarToggle] = useState(false);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdminLogged , setisAdminLogged] = useState(false);
  const [name, setName] = useState('');
  const incrementCartCount = (product) => {
    setCart([...cart, product])
  }

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 1000,
    offset: '30px',
    transition: transitions.SCALE,
  }
  const OpenSidebar = () =>{
    setOpenSidebarToggle(!openSidebarToggle);
  }

 //  Fetch User Using Cookies
  axios.defaults.withCredentials = true;
  useEffect(() =>{
      axios.get(':3001/home')
      .then(res =>{
          if(res.status === 200){
            setLoggedIn(true);
            setName(res.data.name);
            }
          else{setLoggedIn(false);}
      }) 
      .catch(err => console.log(err))
    }
   ,[])
   
   //  Fetch Admin Using Cookies
  useEffect(() =>{
    axios.get('/admin/dashboard')
    .then(res =>{
    if(res.status === 200 && res.data.isAdmin === true){
      setisAdminLogged(true)
      setLoggedIn(false)
      setName(res.data.name);
      }

    else{
      setisAdminLogged(false)
        }
    }) 
    .catch(err => console.log(err))
    },[isAdminLogged])
    
  // Function to handle Logout
  const handleLogout =  () => {
    axios.get('/logout')
    .then(res =>{
      setLoggedIn(false);
      setisAdminLogged(false);
      setCart(null);
    })
    }

  // Fetch Count Category
    useEffect(() => {
      axios.get('/api/data/category')
        .then(res => {
          setCount(res.data.length);
        })
    }, []);
  return (
  <>
      <AlertProvider template={AlertTemplate} {...options} >
          <div className="App">
          <header className="App-header">
          <CustomNavbar formValues={formValues} cart={cart} isLoggedIn={isLoggedIn} isAdminLogged={isAdminLogged} name={name} onLogout={handleLogout}   />
          </header>
          <ToastContainer />
          <Switch>
          <Route path="/home"  render={() => <Home incrementCartCount={incrementCartCount}/>} />
          <Route path="/cart"  render={() => <Cart cart={cart}/>} />
          <Route path="/categorys"  render={() => <Category />} />
          <Route path="/about"  render={() => <About />} />
          <Route path="/footer"  render={() => <Footer />} />
          <Route path="/category/men-clotihng"  render={() => <MenCategory incrementCartCount={incrementCartCount}/>} />
          <Route path="/category/women-clotihng"  render={() => <WomenCategory incrementCartCount={incrementCartCount}/>} />
          <Route path="/category/electronic"  render={() => <ElectornicCategory incrementCartCount={incrementCartCount}/>} />
          <Route path="/category/jewelery"  render={() => <JeweleryCategory incrementCartCount={incrementCartCount}/>} />
          <Route path="/category/sports"  render={() => <SportsCategory incrementCartCount={incrementCartCount}/>} />
          <Route path="/Login"  render={() => <LoginPage onLogout={handleLogout} />} />
          <Route exact path="/"   render={() => <Redirect to="/home" />} />
          <Route 
                 path="/admin/dashboard" 
                  render={() => isAdminLogged ? <Dashboard name={name} handleLogout={handleLogout}/> : <LoginPage />} 
                />   
         <Route path="/account/setting" render={()=>isLoggedIn ?  <AccountSettingUser isLoggedIn={isLoggedIn}/> : <LoginPage />}  />


          </Switch>
          </div>
       </AlertProvider>
 </>
  );
}

export default App;
