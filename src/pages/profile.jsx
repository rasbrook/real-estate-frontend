import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '../store/user.store'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useModeState } from '../store/mode.store.js'



const Profile = () => {
  const { UpdateuserInfo } = useUserStore()

  const user = useUserStore((state) => state.user)
  const { LogOut } = useUserStore()
  const hdarkmode = useModeState((state) => state.hdarkmode)
  const darkmode = useModeState((state) => state.darkmode)
  const backdarkmode = useModeState((state) => state.backdarkmode)
  const containdarkmode = useModeState((state) => state.containdarkmode)
  const buttdarkmode = useModeState((state) => state.buttdarkmode)
  const divelement = {
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifySelf: 'center',
    gap: '5vw',
    alignItems: 'center',
    width: '30vw',
    minWidth: 250,
    border: 'none',
    margin: '3vh',




  }

  const inpu = { color: darkmode || '#000000', backgroundColor: backdarkmode || '#FEFEFE', width: '100%', height: 30, borderRadius: 8, border: 'none' }



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

  const [sure, setSure] = useState(false)
  const nav = useNavigate()
  const { DeleteUser } = useUserStore()

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
    { error ? alert(error) : alert('Update successfully') }
  }
  const handleLogout = async (e) => {
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



  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to proceed?")) {
      await DeleteUser(user, setError, setLoading, user.rest._id)
      console.log("Confirmed!");
    }
    else { console.log("Cancelled!"); }
  };

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in to view your profile</div>

  return (<div style={{ width: '60%', backgroundColor: containdarkmode || '#EEE', justifySelf: 'center', minWidth: 350, border: 'none', borderRadius: 10, height: 'max-content' }}>
    <h1>Profile</h1>
    <div>
      <input
        onChange={handleFileChange}
        name='file'
        id='file'
        type='file'
        ref={fileRef}
        hidden
        accept='image/*'
      />
      <img
        loading='lazy'
        style={{ width: 80, height: 80, borderRadius: 40 }}
        onClick={() => fileRef.current.click()}
        src={profileData.avator || user.rest.avator}
        alt="Profile"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
    </div>
    <motion.form>
      <motion.div style={divelement}>
        <label>UserName</label>
        <motion.input
          style={inpu}
          type="text"
          name="username"
          id='username'
          value={profileData.username}
          onChange={handleInputChange}
        />
      </motion.div>
      <motion.div style={divelement}>
        <label>Email</label>
        <motion.input
          style={inpu}
          type="email"
          name="email"
          id='email'
          value={profileData.email}
          onChange={handleInputChange}
        />
      </motion.div>
      <motion.div style={divelement}>
        <label>Phone No</label>
        <motion.input
          style={inpu}
          type="tel"
          name="phone"
          id='phone'
          value={profileData.phone}
          onChange={handleInputChange}
        />
      </motion.div>
      <motion.div style={divelement}>
        <label>Bio</label>
        <motion.input
          style={{ color: darkmode || '#000000', backgroundColor: backdarkmode || '#FEFEFE', width: '100%', height: '5vh', borderRadius: 8, border: 'none' }}
          id='bio'
          name="bio"
          type='text'
          aria-rowcount={10}
          value={profileData.bio}
          onChange={handleInputChange}

        />
      </motion.div>
      <div >
        <motion.button
          style={{ width: '8vw', minWidth: 150, height: 35, backgroundColor: '#59caff', borderRadius: 10, border: 'none', color: buttdarkmode || '#4A628A', marginLeft: 15, marginRight: 15, margin: 10 }}
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
        <motion.button
          style={{ width: '8vw', minWidth: 150, height: 35, backgroundColor: '#ff4848f1', borderRadius: 10, border: 'none', color: buttdarkmode || '#4A628A', marginLeft: 15, marginRight: 15, margin: 10 }}
          type="button"
          variant="secondary"
          onClick={() => nav('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
      </div>
    </motion.form>
    <motion.button
      style={{
        width: '8vw',
        minWidth: 150,
        height: 35,
        backgroundColor: '#59caff',
        borderRadius: 10,
        border: 'none',
        color: buttdarkmode || '#4A628A',
        marginLeft: 15,
        marginRight: 15,
        margin: 10
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => nav('/create-listing')}>Create Listing +</motion.button>


    <div style={{ display: 'flex', alignItems: 'centers', justifySelf: 'center', justifyContent: 'space-between' }}>
      <motion.p
        whileHover={{
          width: '8vw',
          minWidth: 150,

          backgroundColor: '#ff4848f1',
          borderRadius: 10,
          border: 'none',
          color: buttdarkmode || '#4A628A',
          scale: 1.05,
          padding: 10

        }}
        style={{
          width: '8vw', padding: 10,
          minWidth: 150, color: '#ff4848f1', cursor: 'pointer', marginLeft: '8vw', marginRight: '8vw'
        }}
        onClick={handleDelete}>Delete Account</motion.p>
      <motion.p
        whileHover={{
          width: '8vw',
          minWidth: 150,
          backgroundColor: '#2796ff',
          borderRadius: 10,
          border: 'none',
          color: buttdarkmode || '#4A628A',
          scale: 1.05,
          padding: 10

        }}
        style={{
          width: '8vw', padding: 10,
          minWidth: 150, color: '#2796ff', cursor: 'pointer', marginLeft: '8vw', marginRight: '8vw'
        }}
        onClick={handleLogout}>Log out</motion.p>
    </div>


    <motion.p
      whileHover={{
        width: '8vw',
        minWidth: 150,
        backgroundColor: '#2796ff',
        borderRadius: 10,
        border: 'none',
        color: buttdarkmode || '#4A628A',
        scale: 1.05,
        padding: 10

      }}
      style={{ color: '#2796ff', cursor: 'pointer', width: '10vw', justifySelf: 'center', minWidth: 150, }}
      onClick={() => nav('/listing')}
    >Show My Listing</motion.p>


  </div>)

}
export default Profile