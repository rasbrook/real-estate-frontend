import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpLink } from './page style/signinstyle';
import { useUserStore } from '../store/user.store';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {motion} from 'framer-motion'
import { app } from '../../firebase';
import { useModeState } from '../store/mode.store';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
    phone:''
  });
  const nav=useNavigate()
  
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true)
  const [error, setError]=useState(null)
  const [success, setSuccess]=useState(false)
  const [loading, setLoading]=useState(false)
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
    width:'30vw',
    minWidth:250,
    border:'none',
    margin:'3vh',

    
    
  
    }
  
  const inpu={color:darkmode, backgroundColor:backdarkmode,width:'100%', height:30, borderRadius:8, border:'none'}
  const {Signup}=useUserStore()
  const {Google_Sign_up}=useUserStore()
  

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    } else if (!(hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
  };

  useEffect(() => {
    if (formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    } else {
      setPasswordMatch(false);
    }

    setPasswordError(validatePassword(formData.password));
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData)
  };
  const handleSubmit = async(e) => {
    
    e.preventDefault();
    if (passwordMatch && !passwordError) {
     
      await Signup(formData, setLoading, setError, setSuccess)
      console.log(success)
      console.log(error)
      if(success){
        nav('/')
      }

      
      
      
    }
  

    
  };

  const handleGoogleSignUp =async () => {
   
    try {
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app)
      const result=await signInWithPopup(auth, provider)
      console.log(result)
      const username=result.user.displayName
      const email=result.user.email
      const image=result.user.photoURL
      const data={username,email, image}
      console.log(data)
        
        await Google_Sign_up(data, setLoading, setError, setSuccess)
        console.log(success)
        if(success){
          nav('/')
        }
      
    } catch (error) {
      console.log("Could Not sign in with google", error)
    }
  }
  return (
    <div style={{width:'60%',backgroundColor:containdarkmode, justifySelf:'center', minWidth:350, border:'none', borderRadius:10, height:'max-content'}}>
      <motion.form
      onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
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
            color:darkmode, 
            backgroundColor:backdarkmode
          }}
          onClick={handleGoogleSignUp}
          whileHover={{ scale: 1.05 , cursor:'pointer'}}
          whileTap={{ scale: 0.95 }}
        >
          <img style={{width:25}} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          <h4>Continue with Google</h4>
        </motion.button>
        
          <span>or</span>
        
        <div style={divelement}>
          <label htmlFor="username">Username</label>
          <input
            style={inpu}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div style={divelement}>
        <label htmlFor="phone">Phone</label>
          <input
            style={inpu}
             type="number"
             id='phone'
             name="phone"
             value={formData.phone}
             onChange={handleChange}
             required
          />
        </div>
        <div style={divelement}>
        <label htmlFor="phone">Phone</label>
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
          <input
            style={inpu}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            
          />
          {passwordError==='' ? <div style={{fontSize:14}}>{passwordError}</div>:''}
        </div>
        <div style={divelement}>
        <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            style={inpu}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordMatch !== false && (
            <div match={passwordMatch}>
              {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
            </div>
          )}
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={!passwordMatch || !!passwordError|| loading}
          style={{width:'15vw', minWidth:200, height:35, backgroundColor:'#59caff', borderRadius:10, border:'none', color:buttdarkmode}}
          whileHover={{scale:1.05, backgroundColor:'#59caffe3', cursor:'pointer'}}
          
        >
          {loading? "loading...":"Sign Up"}
        </motion.button>
        <p style={{color:'red'}}>{error}</p>

        
        <motion.div style={{display:'flex', justifySelf:'center', gap:10, alignItems:'center'}}>
         <p>Have an account?</p> <motion.div whileHover={{scale:1.05, color:'#59caff'}}> <Link style={{textDecoration:'none', color:'#59caffe3'}} to="/sign-in">Sign in</Link></motion.div>
        </motion.div>

      </motion.form>

    </div>
  )
}
