{data && !loading? 
      
       
          
  <Swiper navigation>
    {
      data.ImageUrls.map((url)=>
        (<SwiperSlide key={url}>
          <div style={{
           backgroundImage: `url("${url}")`,  
           backgroundRepeat: 'no-repeat',
           backgroundSize: "cover",
           backgroundPosition: 'center',    
           height: "80vh", 
           width:"100vw",
           minHeight:600,
           display: "block",
          
            
            
          }}>
          </div>
          

          
        </SwiperSlide>)
      )
    }
    <div style={{width:'100vw'}}>
    <button style={{width:100, height:40, borderRadius:10, display:'flex', textAlign:'center', padding:10, paddingLeft:25 }}>{data.isRent?"For Rent":"For Sell"}</button>
<h1 style={{textAlign:'center'}}>{data.name}</h1>
<h1 style={{maxWidth:200,  textAlign:'justify'}}>Price:{data.isRent? `${data.Price}Birr /month`:`ETB${data.Price}`}</h1>
<p style={{textAlign:'conster', margin:0}}>description:{data.description}</p>
<ul style={{display:'flex', flexWrap:'wrap', gap:'2vw'}}>
  <li style={{display:'flex', justifyItems:'center', textAlign:'center'}}><FaBed style={{fontSize:30,color:'green',marginRight:10}} />{data.bedroom} Beds</li>
  <li style={{display:'flex', justifyItems:'center'}}><FaBath style={{fontSize:30,color:'green',marginRight:10}} />{data.bedroom} Bathroom</li>
  
</ul>


{!contact ? '':<Constact listing={data} />}
{data && user &&  data.useRef!==user.rest._id && !contact ?  <button onClick={()=>{setContact(true)}}>Constact Owner</button>:null}


</div>

  </Swiper>
  





:''


}















import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../store/user.store'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useModeState } from '../store/mode.store.js'



const Profile = () => {
  const { UpdateuserInfo } = useUserStore()
  
  const user = useUserStore((state) => state.user)
  const { LogOut } =useUserStore()
  const darkmode=useModeState((state) => state.darkmode)
  const backdarkmode=useModeState((state) => state.backdarkmode)

  
  
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: user?.rest?.username || '',
    email: user?.rest?.email || '',
    phone: user?.rest?.phone || null, 
    bio: user?.rest?.bio || '',
    avator: user?.rest?.avator || ''
  })
  
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [sure, setSure]=useState(false)
  const nav=useNavigate()
  const {DeleteUser}=useUserStore()
  
  const fileRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      try {
        setLoading(true)
        const imageRef = ref(storage, `Profile/${file.name + v4()}`)
        await uploadBytes(imageRef, file)
        const url = await getDownloadURL(imageRef)
        
        setProfileData(prev => ({
          ...prev,
          avator: url
        }))
        setLoading(false)
      } catch (err) {
        setError('Error uploading profile picture: ' + err.message)
        setLoading(false)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await UpdateuserInfo(profileData, setError, setLoading, user.rest._id)
      setIsEditing(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
    {error? alert(error):alert('Update successfully')}
  }
  const handleLogout=async(e)=>{
    e.preventDefault() 
   try {
      setLoading(true)
      console.log('start')
    
    await LogOut(setLoading, setError)
   } catch (error) {
    setError(error)

    
   }
   finally {
    setLoading(false)
  }
   
  }


  
  const handleDelete = async() => { 
    if (window.confirm("Are you sure you want to proceed?")) {
        await DeleteUser(user,setError, setLoading,  user.rest._id)
        console.log("Confirmed!"); } 
    else { console.log("Cancelled!"); } };

  if (loading) return <Container>Loading...</Container>
  if (!user) return <Container>Please log in to view your profile</Container>
  
  

  return (
    <Container style={{color:darkmode || '#000000'||'#00000',  backgroundColor:backdarkmode || '#FEFEFE'||'#11111'}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Profile</h1>
      
      <ProfileHeader >
        <input 
          onChange={handleFileChange}
          name='file' 
          id='file'  
          type='file'  
          ref={fileRef}  
          hidden  
          accept='image/*'
        />
        <Avatar
          onClick={()=>fileRef.current.click()}
          src={profileData.avator || user.rest.avator} 
          alt="Profile"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </ProfileHeader>

      <AnimatePresence mode="wait">
        
          <Form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label>UserName:</Label>
              <Input
                type="text"
                name="username"
                id='username'
                value={profileData.username}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                id='email'
                value={profileData.email}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number:</Label>
              <Input
                type="tel"
                name="phone"
                id='phone'
                value={profileData.phone}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Bio:</Label>
              <TextArea
                id='bio'
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows="4"
              />
            </FormGroup>

            <ButtonGroup style={{justifyContent:'space-between'}}>
              <div >
              <Button
          
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                onClick={() => nav('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </Button>
              </div>
              <Button onClick={() => nav('/create-listing')}>Create Listing</Button>
              
            </ButtonGroup>
            <div style={{display:'flex', alignItems:'centers', justifyContent:'space-between'}}>
          <p style={{color:'red', cursor:'pointer'}} onClick={handleDelete}>Delete Account</p>
          <p style={{color:'blue', cursor:'pointer'}}onClick={handleLogout}>Log out</p>
        </div>
          </Form>

          <p 
          style={{color:'blue', cursor:'pointer'}}
          onClick={()=>nav('/listing')}
          >Show listing</p>
        
        
          
      </AnimatePresence>
    </Container>
  )
}

export default Profile

















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



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import {
  Nav,
  NavContainer,
  LogoContainer,
  Logo,
  CompanyName,
  SearchContainer,
  SearchInput,
  SearchIcon,
  MenuToggle,
  NavLinks,
  NavItem,
  NavLink
} from './header.style';
import { useUserStore } from '../store/user.store';
import { useNavigate } from 'react-router-dom';

//firebase storage 
//allow read;
//allow write: if
//request.resource.size< 2 * 1024 * 1024 &&
//request.resource.contentType.matches('image/.*')

const Header = () => {
  const [isOpen, setIsOpen]=useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {logout}=useUserStore()
  const user=useUserStore((state) => state.user)
  const [searchTerm, setSearchform]=useState('')
  const nav=useNavigate()



  console.log(user)

  const handlesubmit=async(e)=>{
    e.preventDefault()
   const urlParams=new URLSearchParams(window.location.search)


   urlParams.set('searchTerm', searchTerm)
   const searchQuery=urlParams.toString()
   nav(`search?${searchQuery}`)

  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const searchTermFromurl=urlParams.get('searchTerm')
    if(searchTermFromurl){
      setSearchform(searchTermFromurl)
    }
  },[location.search])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  };

  return (
    <Nav>
      <NavContainer>
        <LogoContainer>
          <Logo
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Logo
          </Logo>
          <CompanyName
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unoode
          </CompanyName>
        </LogoContainer>
        <SearchContainer
          
          animate={{ width: isSearchFocused ? '300px' : '200px' }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handlesubmit}>
          <SearchInput
            type="text"
            placeholder="Search..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            value={searchTerm}
            onChange={(e)=>setSearchform(e.target.value)}
          />
          <SearchIcon>
            <FaSearch onClick={handlesubmit} />
          </SearchIcon>
            
          </form>
          
        </SearchContainer>
        <MenuToggle onClick={toggleMenu}  >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
           
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes /> : <FaBars  />}
          </motion.div>
        </MenuToggle>
        <NavLinks style={{display: 'flex', alignItems:'center'}}>
          <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink as={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavLink as={Link} to="/about">About</NavLink>
          </NavItem>
          <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {<div>{user? <NavLink style={{display:'flex', alignItems:'center'}} 
          as={Link} to="/profile"><img style={{height:30, marginRight:10, borderRadius:15}} 
          src={user.rest.avator}/><p>{user.rest.username}</p></NavLink>:<NavLink 
          as={Link} to="/sign-in">Sign in</NavLink>}</div>} 
          </NavItem>
          
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Header;








import React, { useEffect, useState } from 'react'
import {useListingStore} from '../store/listing.store.js'
import axios from 'axios'


function Home() {
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState('')
  const [list, setListings]=useState()
  const {Get_all_listings}=useListingStore()


  

  

  

useEffect(()=>{
  setLoading(true)

  const fetchlisting= async()=>{
    const res=await fetch('/api/listing/listings/all', {
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      } 

    })
      
    const data=await res.json()
   if(data){
    setLoading(false)
    setListings(data)
    console.log(data)
    return
   }
   setLoading(false)
   

  }

  
  fetchlisting()
}, [])



  





  if(loading) return <div>Loading</div>

  
  return (<div>
    {
       list?
        
          list.map((l)=>{
            <div key={l._id}>
              <h1>Name:{l.name}</h1>
              <h1>Description:{l.description}</h1>
              <h1>Price:{l.Price}</h1>

            </div>

          })
        


      :<div></div>
    }
    

  </div>)

}



import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { useUserStore } from '../store/user.store';
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid';
import { useListingStore } from '../store/listing.store.js';
import { useParams } from 'react-router-dom';

export default function Edit_list() {
    const prams=useParams()
    const user = useUserStore((state) => state.user)
    const [loading, setLoading]=useState(false)
    const [uploading, setUploading]=useState(false)
    const [error, setError]=useState(false)
    const {Updata_listing} =useListingStore()
    const [list , setList]=useState()
    
    
    const styles = {
        container: {
          maxWidth: '56rem',
          margin: '0 auto',
          padding: '1.5rem',
        },
        heading: {
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        },
        inputGroup: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
        input: {
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
        },
        checkboxGroup: {
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        },
        checkboxLabel: {
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        },
        numberInput: {
          width: '5rem',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
        },
        label: {
          marginLeft: '0.5rem',
        },
        priceInput: {
          width: '8rem',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
        },
        imageUploadSection: {
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        },
        fileInput: {
          border: '1px solid #ccc',
          padding: '0.5rem',
          borderRadius: '0.25rem',
        },
        uploadButton: {
          marginLeft: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#16a34a',
          color: 'white',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
        },
        submitButton: {
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#334155',
          color: 'white',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
        },
        toggleSwitch: {
            position: 'relative',
            display: 'inline-block',
            width: '60px',
            height: '34px',
          },
          toggleSlider: {
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ccc',
            transition: '0.4s',
            borderRadius: '34px',
            '&:before': {
              position: 'absolute',
              content: '""',
              height: '26px',
              width: '26px',
              left: '4px',
              bottom: '4px',
              backgroundColor: 'white',
              transition: '0.4s',
              borderRadius: '50%',
            }
          },
          toggleContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          },
          toggleLabel: {
            fontSize: '1rem',
            color: '#666',
          }
      };

    
    console.log(list)
    console.log(prams.id)

    
    const [file, setFile]=useState([])
    const [formdata, setFormData]=useState({
        name: '',
        description: '',
        address: '',
        isRent: false,
        isSell: true,
        parking: false,
        furnished: false,
        offer: false,
        bedroom: 1,
        bathroom: 1,
        Price: 0,
        ImageUrls:[],
        useRef:user.rest._id

    })
    //console.log(formdata)
    useEffect(()=>{
      const fetchlisting=async()=>{
        const listingid=prams.id
        console.log(listingid)
        const res=await fetch(`/api/listing/list/${listingid}`, {
          method:"GET", 
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data=await res.json()
        setFormData(data)
        
        
        

      }

      fetchlisting()
    },[])

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        if (!formdata.name && 
          !formdata.address &&
          !formdata.bathroom&&
          !formdata.bedroom&&
          !formdata.description&&
          !formdata.parking&&
          !formdata.Price&&
          !formdata.description
        ) {
           alert("Please fill in the required field.") 
        } else { 
          
          const { name, value } = e.target; setFormData({ ...formdata, [name]: value})
          await Updata_listing(formdata,setLoading, setError,prams.id)
          if(!setError){
            console.log("Form submitted:", formdata);
            
          }


          
        }
        
        
        
       
        console.log(formdata);
      };
     
      
      const handleToggle = () => {
        setFormData(prev => ({
          ...prev,
          isRent: !prev.isRent,
          isSell: !prev.isSell
        }));
      };

      const handleImageUploadtofirebase =(e)=>{
        setUploading(true)
        //e.preventDefault();
        console.log(file)
        if(file.length>0 && file.length<7){
            const promises=[]
            for(let i=0; i<file.length; i++){
                promises.push(storeimages(file[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData(prev => ({
                    ...prev,
                    ImageUrls: formdata.ImageUrls.concat(urls)
                  }))
            }).then(()=>setUploading(false))
        } 
        else if(file.length>7){
            setUploading(false)
            setError('You can only upload maximum of 6 images')
        }  
        else{
          setUploading(false)
            setError('There is No image to be Uploaded')

        }
       
    }
    const storeimages=async(file)=>{
        return new Promise(async(resolve, reject)=>{
            if (file) {
      
                try {
                  setLoading(true)
                  const ListingRef = ref(storage, `Listings/${user.rest.username}'s listing/${file.name + v4()}`)
                  await uploadBytes(ListingRef, file)
                  const url = await getDownloadURL(ListingRef)
                  resolve(url)
                  
                  
                  setLoading(false)
                } catch (err) {
                  setError('Error uploading the Images: ' + err.message)
                  setLoading(false)
                }
              }

        })
    }
    const handleRemoveImage= (index)=>{
        setFormData({...formdata, ImageUrls:formdata.ImageUrls.filter((u, i)=>i !==index)})
       

    }
      
      
      if (!user) return <div>Please log in to view your profile</div>
  return (
  <motion.div 
    style={styles.container}
    initial="initial"
    animate="animate"
    variants={fadeIn}
  >
    <motion.h1 
      style={styles.heading}
      variants={fadeIn}
    >
      Edit Listing
    </motion.h1>

    <form onSubmit={handleSubmit} style={styles.form}>
      <motion.div variants={fadeIn} style={styles.inputGroup}>
        <input
          type="text"
          required
          placeholder="Name"
          style={styles.input}
          value={formdata.name}
          onChange={(e) => setFormData({...formdata, name: e.target.value})}
        />
        
        <textarea
          placeholder="Description"
          style={styles.input}
          value={formdata.description}
          onChange={(e) => setFormData({...formdata, description: e.target.value})}
        />

        <input
          type="text"
          placeholder="Address"
          required
          style={styles.input}
          value={formdata.address}
          onChange={(e) => setFormData({...formdata, address: e.target.value})}
        />
      </motion.div>

      <motion.div variants={fadeIn} style={styles.toggleContainer}>
          <div style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formdata.isRent}
              onChange={handleToggle}
              style={{ display: 'none' }}
              id="rentSellToggle"
            />
            <label
              htmlFor="rentSellToggle"
              style={{
                ...styles.toggleSlider,
                backgroundColor: formdata.isRent ? '#2F855A' : '#ccc',
                '&:before': {
                  ...styles.toggleSlider['&:before'],
                  transform: formdata.isRent ? 'translateX(26px)' : 'translateX(0)',
                }
              }}
            />
          </div>
          <span style={styles.toggleLabel}>
            {formdata.isRent ? 'Rent' : 'Sell'}
          </span>
        </motion.div>

      <motion.div variants={fadeIn} style={styles.checkboxGroup}>
        <div>
          <input
            required
            type="number"
            placeholder="Beds"
            style={styles.numberInput}
            value={formdata.bedroom}
            onChange={(e) => setFormData({...formdata, bedroom: e.target.value})}
          />
          <span style={styles.label}>Beds</span>
        </div>
        <div>
          <input
            required
            type="number"
            placeholder="Baths"
            style={styles.numberInput}
            value={formdata.bathroom}
            onChange={(e) => setFormData({...formdata, bathroom: e.target.value})}
          />
          <span style={styles.label}>Baths</span>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} style={styles.inputGroup}>
        <div>
          <input
            type="number"
            placeholder="Regular price"
            required
            style={styles.priceInput}
            value={formdata.Price}
            onChange={(e) => setFormData({...formdata, Price: e.target.value})}
          />
          <span style={styles.label}>{formdata.isRent? "Birr/Month":"Birr"}</span>
        </div>

        <div style={styles.imageUploadSection}>
          <p>Images: The First image will be the cover (max 6)</p>
          <div>
            <input
            
              type="file"
              multiple
              accept="image/*"
              onChange={(e)=>{setFile(e.target.files)}}
              style={styles.fileInput}
            />

            
          </div>
        </div>
        <button disabled={uploading} type="button" style={styles.uploadButton} onClick={()=>{handleImageUploadtofirebase()}}>
              {uploading ? 'Uploading...':"UPLOAD"}
            </button>
        {error? <p style={{color:'red'}}>{error}</p>:null}
        {formdata.ImageUrls.length >0 && formdata.ImageUrls.map(
            (i, index)=> 
                <div key={i}>
                    <img style={{width:150}} src={i} alt='listing image'/>
                    <button onClick={()=>handleRemoveImage(index)}>Delete</button>
                </div>
            )}
      </motion.div>

      <motion.button
        variants={fadeIn}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={styles.submitButton}
        type="submit"
      >
        {loading?'Updating Listing':'UPDATE LISTING'}
      </motion.button>
    </form>
  </motion.div>
  )
}



