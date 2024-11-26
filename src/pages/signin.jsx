import React, { useState } from 'react';


import { Link , useNavigate} from 'react-router-dom';
import { useUserStore } from '../store/user.store.js';
//import { NavContainer } from '../components/header.style.js';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase.js';
import { motion } from 'framer-motion';
import { useModeState } from '../store/mode.store.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Signin = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {Signin}=useUserStore()
  const [error, setError]=useState(null)
  const [success, setSuccess]=useState(null)
  const [loading, setLoading]=useState(false)
  const [showPassword, setShowPassword] = useState(false); 
  const nav=useNavigate()
  const hdarkmode=useModeState((state) => state.hdarkmode)
  const darkmode=useModeState((state) => state.darkmode)
  const backdarkmode=useModeState((state) => state.backdarkmode)
  const containdarkmode=useModeState((state) => state.containdarkmode)
  const buttdarkmode=useModeState((state) => state.buttdarkmode)
  const divelement={
    height:50, 
    borderRadius:10, 
    alignSelf:'center', 
    justifySelf:'center', 
    gap:'5vw', 
    alignItems:'center', 
    width:'25vw',
    minWidth:250,
    border:'none',
    margin:'3vh',

    
    
  
    }
  
  const inpu={color:darkmode || '#ffffff',  bbackgroundColor:backdarkmode || '#222831',width:'100%', height:30, borderRadius:8, border:'none'}
  
 


 
  




  const togglePasswordVisibility = () => { setShowPassword(!showPassword)};


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
    <div style={{width:'60%',backgroundColor:containdarkmode ||  '#000', justifySelf:'center', minWidth:350, border:'none', borderRadius:10, height:'max-content'}}>
      <motion.form
      onSubmit={handleSubmit}
      >
        <h2>Sign In</h2>
        <motion.button
          style={{height:40, 
            borderRadius:10, 
            display:'flex', 
            alignSelf:'center', 
            justifySelf:'center', 
            gap:'5vw', 
            alignItems:'center', 
            width:'25vw',
            minWidth:250,
            border:'none',
            margin:'3vh',
            color:darkmode || '#ffffff', 
             bbackgroundColor:'#222831'
          }}
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.05 , cursor:'pointer'}}
          whileTap={{ scale: 0.95 }}
        >
          <img style={{width:25}} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          <h4>Continue with Google</h4>
        </motion.button>
        
          <span>or</span>
        
        <div style={divelement}>
        <label htmlFor="phone">Email</label>
          <input
            style={inpu}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={divelement}>
        <label htmlFor="password">Password</label>
        <div style={{display:"flex", alignItems:'center'}}>
        
          <input
            style={inpu}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            
          />
          <span onClick={togglePasswordVisibility}> {showPassword ?  <FaEye />: <FaEyeSlash />} </span>
        </div>
          
        </div>
        
        <p >{error}</p>
       
        
        <div style={{height:50, 
    borderRadius:10, 
    alignSelf:'center', 
    justifySelf:'center', 
    gap:'5vw', 
    alignItems:'center', 
    width:'25vw',
    minWidth:250,
    border:'none',
    margin:'3vh',
}}>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={ loading}
          style={{width:'15vw', minWidth:200, height:35, backgroundColor:'#59caff', borderRadius:10, border:'none', color:buttdarkmode || '#F1F1F1'}}
          whileHover={{scale:1.05, backgroundColor:'#59caffe3', cursor:'pointer'}}
          
        >
          {loading? "loading...":"Sign In"}
        </motion.button>
        <p><a style={{fontSize:14, textDecoration:'none', color:'#7f4343'}} href="/forgot-password">Forgot password?</a></p>
        </div>
        
       

        
        <motion.div style={{display:'flex', justifySelf:'center', gap:10, alignItems:'center'}}>

         <p>Don't have an account?</p> <motion.div whileHover={{scale:1.05, color:'#59caff'}}> 
          <Link style={{textDecoration:'none', color:'#59caffe3'}} to="/sign-up">Sign up</Link></motion.div>
        </motion.div>

      </motion.form>
    </div>
  );
};

export default Signin;