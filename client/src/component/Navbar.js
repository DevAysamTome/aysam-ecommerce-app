import React, { useState } from 'react'
import { Link , useHistory,useLocation   } from 'react-router-dom'
import { Navbar, Nav, Container, NavbarCollapse, NavLink, NavDropdown } from 'react-bootstrap'
import './navbar.css'
import {Link as ScrollLink} from 'react-scroll';
import axios from 'axios'

const CustomNavbar = ({cart , isLoggedIn, name , onLogout , isAdminLogged , adminLogin}) => {
  // Consts
  const location = useLocation();
  const isAdminDashboard = location.pathname === '/admin/dashboard';
  const [open, setOpen] = useState(false)
  axios.defaults.withCredentials = true;
  const handleNavbar = () => {
    setOpen(!open)
  }
  const history = useHistory();
  const handleClick = () => {
    history.push('/cart');
  }
  const numItems = cart ? cart.length : 0;
  
  // Render
  return (
    <Navbar bg="white" expand="lg" className="custom-navbar shadow w-100 p-3 mb-0 bg-white rounded" style={{ display: isAdminDashboard ? 'none' : 'block' }}>
      <Container>
        <div className="d-flex justify-content-start">
          <Navbar.Brand href="/">
            <span className="logo">E-Commerce</span>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle onClick={handleNavbar} className="custom-toggler">
          <span className="navbar-toggle-icon fa fa-bars"> </span>
        </Navbar.Toggle>
        <NavbarCollapse in={open} timeout={1000}>
          <Nav className="d-flex justify-content-center w-100" navbar>
            <Nav.Item>
              <NavLink as={Link} to="/home" className="nav-link " >
                <i className="fa fa-home"></i> Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown  smooth title={<><i className="fa fa-th-large"></i> Category</>} id="category-dropdown" className="nav-dropdown " >
                <NavDropdown.Item  className="feutred" as={Link} to="/category/men-clotihng" >Men's Clothing</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/women-clotihng" >Fashion</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/electronic" >Electronic</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/jewelery" >Jewelery</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/sports" >Sports</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={ScrollLink} smooth to="feutred" className="nav-link feutred" >
                <i className="fa fa-star"></i> Feutres
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={ScrollLink} smooth to="about" className="nav-link feutred" >
                <i className="fa fa-info-circle"></i> About
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={ScrollLink} to="footer" smooth className="nav-link feutred" >
                <i className="fa fa-phone"></i> Contact
              </NavLink>
            </Nav.Item>
            {isAdminLogged ?
             <Nav.Item>
             <NavLink as={Link} to="/admin/dashboard" smooth className="nav-link feutred" >
               <i className="fa fa-phone"></i> Vite
             </NavLink>
           </Nav.Item>
           :
           null
          }
           
          </Nav>

          <Nav className="ml-auto w-50 ">
          {!isLoggedIn && !isAdminLogged ? (
            <Nav.Item>
              <NavLink as={Link} to="/Login" onLoad={adminLogin}  className="nav-link" >
                <i className="fa fa-sign-in"></i> Login
              </NavLink>
            </Nav.Item>
            ):(
              <>
                 <Nav.Item>
                  <NavDropdown  smooth title={<><i className="fa fa-user"></i> {name} </>} id="category-dropdown" className="nav-dropdown " >
                    <NavDropdown.Item  className="feutred" as={Link} to="/account/setting" >Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/account/setting" >Account Setting</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/home" onClick={onLogout} >Logout</NavDropdown.Item>
                 </NavDropdown>
                </Nav.Item>
              </>
    )}
           <Nav.Item>
            <NavLink as={Link} onClick={handleClick} to="/cart" className="nav-link notification-container" >
            <i className="fa fa-shopping-cart"></i> Cart  ({numItems})
            </NavLink>
          </Nav.Item>  
         </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar;