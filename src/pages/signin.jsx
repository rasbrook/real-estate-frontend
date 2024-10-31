import React, { useState } from 'react';


import { Link , useNavigate} from 'react-router-dom';
import {
  SignInContainer,
  SignInForm,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  GoogleButton,
  OrDivider,
  ErrorMessage,
  ForgotPassword,
  SignUpLink
} from './page style/signinstyle.js';
import { useUserStore } from '../store/user.store.js';
import { NavContainer } from '../components/header.style.js';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase.js';


const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {Signin}=useUserStore()
  const [error, setError]=useState(null)
  const [success, setSuccess]=useState(null)
  const [loading, setLoading]=useState(false)
  const nav=useNavigate()
 


 
  




  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    ///send data to an API
    await Signin(formData, setLoading, setError, setSuccess)
      console.log(success)
      
      if(success){
       return nav('/')
      }
        
    // For demonstration, let's set an error if the email is not valid
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
    } else {

        
       
        
        
        

       
        
      
      
      
    }
    
    
  };

  const handleGoogleSignIn = async() => {
    console.log('hello')
   
      
   
    try {
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app)
      const result=await signInWithPopup(auth, provider)
      const email=result.user.email
      const password='nopass'
      const data={email, password}
      const image=result.user.photoURL
      await Google_Sign_in(data, setLoading, setError, setSuccess)
      console.log(success)
      setFormData({email:email, password:password, image})
      
      if(success){
       return nav('/')
      }
        




    } catch (error) {
      console.log("Could Not sign in with google", error)
    }
  };

  return (
    <SignInContainer>
      <SignInForm
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2>Sign In</h2>
        <GoogleButton
          type="button"
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          Continue with Google
        </GoogleButton>
        <OrDivider>
          <span>or</span>
        </OrDivider>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
        </InputGroup>
        <p >{error}</p>
        <ForgotPassword href="/forgot-password">Forgot password?</ForgotPassword>
        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading? "loading...":"Sign In"}
        </SubmitButton>
        <SignUpLink>
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </SignUpLink>
      </SignInForm>
    </SignInContainer>
  );
};

export default Signin;