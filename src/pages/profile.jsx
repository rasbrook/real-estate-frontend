import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../store/user.store'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useModeState } from '../store/mode.store.js'

const Container = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Avatar = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
`

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: #333;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.variant === 'secondary' ? '#6c757d' : '#007bff'};
  color: white;
`

const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InfoGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
`

const InfoLabel = styled.strong`
  color: #555;
`

const InfoText = styled.p`
  margin: 0;
  color: #333;
`

const ErrorMessage = styled(motion.div)`
  color: #dc3545;
  padding: 1rem;
  background-color: #f8d7da;
  border-radius: 4px;
  margin-bottom: 1rem;
`

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
    <Container style={{color:darkmode||'#00000', backgroundColor:backdarkmode||'#11111'}}
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
