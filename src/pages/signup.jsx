import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  SignUpContainer,
  SignUpForm,
  InputGroup,
  Label,
  Input,
  PasswordMatchMessage,
  SubmitButton,
  ErrorMessage,
  GoogleButton,
  OrDivider
} from './page style/signupstyle';
import { SignUpLink } from './page style/signinstyle';
import { useUserStore } from '../store/user.store';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';

const SignUp = () => {
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
  };

  return (
    <SignUpContainer>
      <SignUpForm
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <GoogleButton
          type="button"
          onClick={handleGoogleSignUp}
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
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="number"
            id='phone'
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            
          />
        </InputGroup>
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
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordMatch !== false && (
            <PasswordMatchMessage match={passwordMatch}>
              {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
            </PasswordMatchMessage>
          )}
        </InputGroup>
        
        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!passwordMatch || !!passwordError|| loading}
          
        >
          {loading? "loading...":"Sign Up"}
        </SubmitButton>
        <PasswordMatchMessage>{error}</PasswordMatchMessage>
       
        <SignUpLink>
          Have an account? <Link to="/sign-in">Sign in</Link>
        </SignUpLink>
      </SignUpForm>
      
    </SignUpContainer>
  );
};

export default SignUp;
