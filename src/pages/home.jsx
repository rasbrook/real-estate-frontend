import React, { useEffect, useState } from 'react'
import Cards from '../components/cards'
import BigCard from '../components/bigCard'
import img from '../assets/a3.jpg'
import { motion } from 'framer-motion'
import { useModeState } from '../store/mode.store'
import { list } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import home1 from '../assets/home1.png'
import home2 from '../assets/home2.png'
import home3 from '../assets/home3.png'
import home4 from '../assets/home4.png'
import home5 from '../assets/home6.png'
import home6 from '../assets/home7.png'
import { PropagateLoader } from 'react-spinners'
import { useUserStore } from '../store/user.store'
import buy from '../assets/sale.webp'
import sell from '../assets/sale.png'
import rent from '../assets/rent.webp'
import { justify } from '@cloudinary/url-gen/qualifiers/textAlignment'



export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [l, setL] = useState('Show Listing')
  const [data, setData] = useState('')
  const [List, SetListing] = useState('')
  const [listin, setListin] = useState('')
  const [screensize, setScreensize] = useState(null)
  const [wrapp, setWrapp] = useState(null)
  const [w, setW] = useState(null)
  const [s, setS] = useState(0)
  const [randomHome, setRandomhome] = useState()
  const nav = useNavigate()
  const user = useUserStore((state) => state.user);

  const homearray = [home1, home2, home3, home5, home6]









  useEffect(() => {
    setScreensize(window.innerWidth)
    if (screensize >= 1100) {
      setWrapp('wrap')
      return

    }
    if (screensize <= 1100) {
      if (listin !== '') {
        const a = 270 * listin.length
        setW(a)
      }
    }

  }, [listin])







  useEffect(() => {

    const getListings = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://estate-backend-1-d4pa.onrender.com/api/listing/get`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'

          }
        })
        const lists = await res.json()
        if (lists) {
          setLoading(false)
          setListin(lists)


          return

        }
        setLoading(false)
        setError('No result found')

      } catch (error) {

      }

    }

    getListings()
    const randomIndex = Math.floor(Math.random() * homearray.length); // Select the element at the random index 
    setRandomhome(homearray[randomIndex])


  }, [])

  ///if(listin!==''){
  //  listin.map((l)=>{console.log(l)})}
  console.log(user)




  if (loading) return <PropagateLoader color="#58fcff" />
  return (<div>
    <div style={{ height: 'containt', display: 'flex', flexWrap: 'wrap', width: '100vw', overflow: 'hidden', minHeight: 400 }}>
      <h1 style={{ position: 'relative', left: 0, textAlign: 'justify', fontSize: '2.8em', maxWidth: 400 }}>Find Your Dream Home With <span style={{ color: "#58fcff" }}>Unoode</span></h1>
      <div style={{ position: 'relative', right: 0, zIndex: 0, top: 0 }}>
        <img loading='lazy' style={{ zIndex: 0, width: '80%' }} src={randomHome} />
      </div>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifySelf: 'center', marginBottom: 50, maxWidth: '100vw', justifyItems: 'center', justifyContent: 'center' }}>
      <BigCard soure={sell}
        head='Buy A Home'
        contain='Find your place with an immersive photo 
experience and the most listings, including things
 you won’t find anywhere else.'
        button='Find Home'
        handleclick={() => nav('/listings/forsell')} />

      <BigCard soure={buy}
        head='Sell A Home'
        contain='No matter what path you take to sell your home, we can help you navigate a successful sale.'
        button='Create Listing'
        handleclick={() => nav('/create-listing')} />

      <BigCard soure={rent}
        head='Rent'
        contain='We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.'
        button='Find Rental'
        handleclick={() => nav('/listings/forrent')} />
    </div>


    <div style={{ overflow: 'hidden', width: '100vw', padding: '10px', maxWidth: 1500, zIndex: 10 }}>
      <motion.div style={{ height: 'max-containt', display: 'flex', flexWrap: wrapp, gap: '20px', cursor: 'grab' }} drag="x" dragConstraints={{ left: -w, right: 0 }}>
        {listin !== '' ? listin.map((list) => list.isValid ?
          (
            <Cards idset={() => SetListing(list._id)}
              county={list.address.split('||')[0].split(',')[1]}
              state={list.address.split('||')[0].split(',')[2]}
              country={list.address.split('||')[0].split(',')[4]}
              cardimage={list.ImageUrls[0]}
              Price={list.Price}
              bed={list.bedroom}
              bath={list.bathroom}
              area={list.Area}
              isSell={list.isSell}
              agentname={list.AgentName}
              companyname={list.CompanyName}
              owner={false}
              valid={list.isValid}
              fav={user && user.rest.FavListing ? user.rest.FavListing.indexOf(list._id) !== -1 : null}
              detail={() => nav(`/listing/list/${List}`)}
            />
          ) : ''




        ) : ''}




      </motion.div>


    </div>




  </div>)


}
