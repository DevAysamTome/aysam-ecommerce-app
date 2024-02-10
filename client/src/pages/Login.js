import React, { useState , useEffect } from 'react'
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBValidationItem,
  MDBInputGroup,
  MDBValidation
} from 'mdb-react-ui-kit'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import LoginImg from '../images/loginUI.jpg'
import { useAlert } from 'react-alert'

export default function LoginPage({ onLogout}) {
  const [loginRegisterActive, setLoginRegisterActive] = useState('login')
  axios.defaults.withCredentials = true;
  const handleLoginRegisterClick = (active) => {
    if (active === loginRegisterActive) {
      return
    }
    setLoginRegisterActive(active)
  }
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors , setErrors] = useState({});
  const handleInputChange = (e) => {
    if (formValues === '' || !e.target || !e.target.name) {
        return;
    }
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
    });    
  }
  const alert = useAlert();
  const handleSubmitRegister =  (e) => {
    e.preventDefault();
    let newErrors = {}
    if (formValues.username == '' || formValues.username == null) {
        newErrors.username = 'Username is required';
    }
    
   if (formValues.email == '' || !/^[^@]+@[^@]+\.[^@]+$/.test(formValues.email)){ 
        newErrors.email = 'Invalid email address';
    }
    if (formValues.password == '' && formValues.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
    }
    if (formValues.confirmPassword == '' || formValues.confirmPassword !== formValues.password) {
        newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.keys({errors}).length = 0) {
        return;
    }
    else{
    axios.post('/signup', formValues)
    .then(res => {
      if(res.status == 200){
      alert.success('Register Successfull !')
        window.location.href='/Login';
      }
      else{
        alert.error('Register Unsuccessfull !')
      }
    })
    .catch(err => {
        console.log(err);
        alert.error("Failed to sign up, please try again.");
    });
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('/login/auth', {
    email: formValues.email,
    password: formValues.password
  })
  .then((res) => {

    if(formValues.email == '' && formValues.password == ''){
      alert.error('Please Enter Email and Password !');
    }

    if (res.data.Status === 'Success') {
        if (res.data.Message === 'User logged in successfully') {
      alert.success(res.data.Message,{
        onClose:() =>{
          window.location.replace("http://localhost/home");
         }
        
      })
      
      

    } else if (res.data.Message === 'Admin logged in successfully') {
      alert.success(res.data.Message,{
       onClose:() =>{
        window.location.replace("http://localhost/admin/dashboard");
       }
      })
       
    }

      
    }
   
    else{
      alert.error(res.data.Error);

    }
  })
  .catch((error) => {
    console.log(error);
    alert.error("Login failed, please try again.");
  });

}

  return (
<div className='col-4 w-100 login-img  d-flex position-relative'>
  <div className='container col-md-4 d-flex login-container position-relative flex-column '>
    <div className='d-flex w-100 flex-column login-container' >
      <h3 className='text-dark text-center  p-5'>E-Commerce Login</h3>
        <img src={LoginImg} className='' alt="Login" style={{maxWidth: '100%', maxHeight: '100%' , objectFit:'contain'}} />
  </div>
</div>
    <div className='container d-flex flex-column float-right justify-content-right p-5 shadow col-md-4 mt-5'>
      <MDBTabs pills className='mb-5 justify-content-center'>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('login')}
            active={loginRegisterActive === 'login'}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>

        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('register')}
            active={loginRegisterActive === 'register'}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      
      <MDBTabsContent >
      {loginRegisterActive === 'login' && (
        <MDBTabsPane className='float-right' open>
           <MDBValidation
              className='row g-3'
              noValidated
              onSubmit={handleSubmit}
            >
            <div className='mb-3 position-relative'>
              <p className='text-center'>Sign in with:</p>
              <div className='d-flex justify-content-center'>
                <MDBBtn floating color='light' className='mx-1'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>
                <MDBBtn floating color='light' className='mx-1'>
                  <MDBIcon fab icon='google' />
                </MDBBtn>
                <MDBBtn floating color='light' className='mx-1'>
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>
                <MDBBtn floating color='light' className='mx-1'>
                  <MDBIcon fab icon='github' />
                </MDBBtn>
              </div>
            </div>

            <p className='text-center'>or:</p>

            <MDBValidationItem className='' feedback='The Email Address was Wrong or Inccorect .' invalid>
              <MDBInput
                label='Email'
                wrapperClass='mb-4'
                size='lg'
                type='text'
                id='formControlLg'
                name='email'
                value={formValues.email}
                onChange={handleInputChange}
                required
                
              />
            </MDBValidationItem>
            
            <MDBValidationItem feedback='Your Password was Wrong or Inccorect .' invalid>
              <MDBInput
                label='Password'
                type='password'
                name='password'
                value={formValues.password}
                 onChange={handleInputChange}
                size='lg'
                className='mb-3'
                id='form7Example2'
                required
              />
            </MDBValidationItem>
            

            <MDBRow className='mb-4 mt-3'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox
                  wrapperClass='d-flex justify-content-center mb-4'
                  id='form7Example3'
                  label='Remember me'
                  defaultChecked
                />
              </MDBCol>

              <MDBCol>
                <a href='#!'>Forgot password?</a>
              </MDBCol>
            </MDBRow>

            <MDBBtn type='submit' className='mb-4 bg-light text-dark'>
              Sign in
            </MDBBtn>

            <div>
              <p>
                Not a member? <a href='#!'>Register</a>
              </p>
            </div>
        </MDBValidation>
        </MDBTabsPane>
      )}
        {loginRegisterActive === 'register' && (
          <MDBTabsPane open>
            <MDBValidation
              className='row g-3'
              novalidate
              onSubmit={handleSubmitRegister}
            >
              <div className='mb-3 d-flex justify-content-center flex-column text-center'>
                <p>Sign up with:</p>
                <div className='d-flex justify-content-center'>
                  <MDBBtn floating color='light' className='mx-1'>
                    <MDBIcon fab icon='facebook-f' />
                  </MDBBtn>
                  <MDBBtn floating color='light' className='mx-1'>
                    <MDBIcon fab icon='google' />
                  </MDBBtn>
                  <MDBBtn floating color='light' className='mx-1'>
                    <MDBIcon fab icon='twitter' />
                  </MDBBtn>
                  <MDBBtn floating color='light' className='mx-1'>
                    <MDBIcon fab icon='github' />
                  </MDBBtn>
                </div>
              </div>

              <p className='text-center'>or:</p>

              <MDBValidationItem feedback={errors.username} invalid>
                  <MDBInput label="Username" value={formValues.username} onChange={handleInputChange} name='username' required />
              </MDBValidationItem>

              <MDBValidationItem feedback={errors.email}  invalid>
                  <MDBInput label="Email Address" value={formValues.email} onChange={handleInputChange} name='email' placeholder='name@example.com' type='email' required />
              </MDBValidationItem>

              <MDBValidationItem feedback={errors.password} invalid>
                  <MDBInput label="Password"  value={formValues.password} onChange={handleInputChange} name='password' placeholder='Password' type='password' required />
              </MDBValidationItem>

              <MDBValidationItem feedback={errors.confirmPassword}  invalid>
                  <MDBInput label="Confirmed Password" value={formValues.confirmPassword} onChange={handleInputChange} name='confirmPassword' placeholder='Confirm Password' type='password' required />
              </MDBValidationItem>

              <div className='col-12'>
                <MDBCheckbox
                  wrapperClass='d-flex justify-content-center'
                  label='I have read and agree to the terms'
                  required
                />
              </div>
              <MDBBtn type='submit' className='mb-4 bg-white text-dark' block>
                Sign up
              </MDBBtn>

            </MDBValidation>
          </MDBTabsPane>
        )}
      </MDBTabsContent>
    </div>
    </div>
  )
}