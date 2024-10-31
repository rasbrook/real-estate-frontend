import React, { useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../store/user.store'
import {storage} from '../../firebase.js'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'





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
  const user=useUserStore((state) => state.user)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
  })
  console.log(profileData)

  const [image, setImage]=useState(undefined)


 
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileRef=useRef(null)

  

  



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
 
  }

  const handleSubmit = async (e) => {
   
    e.preventDefault()
    ImageUpload()
   
  
  }
  
const ImageUpload= async ()=>{
  if (image === undefined) {
    return
}

try {
    setLoading(true)
    const imageRef = ref(storage, `Profile/${image.name + v4()}`)
    
    // Upload the image
    await uploadBytes(imageRef, image)
    
    // Get the URL immediately after upload
    const url = await getDownloadURL(imageRef)
    console.log("Download URL:", url)
    
    // Update local state
    setProfileData(prev => ({
        ...prev,
        avator: url
    }))

    
    
    
    
    setLoading(false)
    alert('Profile picture updated successfully')
    
} catch (error) {
    setLoading(false)
    setError('Error uploading your new Profile: ' + error.message)
    console.error('Upload error:', error)
}


  
  }


  

  

  

  if (loading) return <Container>Loading...</Container>
  if (error) return <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</ErrorMessage>
  if (!user) return <Container>Please log in to view your profile</Container>

 

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Profile</h1>
      
      <ProfileHeader>
        <input 
        onChange={(e)=>{setImage(e.target.files[0])}}
        name='file' 
        id='file'  
        value={profileData.file}  
        type='file'  
        ref={fileRef}  
        hidden  
        accept='image/*'/>
        <Avatar
          onClick={()=>fileRef.current.click()}
          src={profileData.avator || user.rest.avator} 
          alt="Profile"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </ProfileHeader>

      <AnimatePresence mode="wait">
        {isEditing ? (
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

            <ButtonGroup>
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
                onClick={() => setIsEditing(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        ) : (
          <InfoContainer
            key="info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <InfoGroup>
              <InfoLabel>Name:</InfoLabel>
              <InfoText>{user.rest.username}</InfoText>
            </InfoGroup>

            <InfoGroup>
              <InfoLabel>Email:</InfoLabel>
              <InfoText>{user.rest.email}</InfoText>
            </InfoGroup>

            <InfoGroup>
              <InfoLabel>Bio:</InfoLabel>
              <InfoText>{user.rest.bio}</InfoText>
            </InfoGroup>
            

            <Button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </Button>
          </InfoContainer>
        )}
      </AnimatePresence>
    </Container>
)}

export default Profile
