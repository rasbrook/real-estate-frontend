import React, { useEffect } from 'react'
import { useUserStore } from '../store/user.store'
import { useState } from 'react'
import Cards from '../components/cards'
import { useModeState } from '../store/mode.store'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Favorite() {
  const user = useUserStore((state) => state.user)
  const [data, setData] = useState([])
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [l, setL] = useState('Show Listing')
  const [List, SetListing] = useState('')
  const listing = useUserStore((state) => state.listing)
  const [screensize, setScreensize] = useState(null)
  const [wrapp, setWrapp] = useState(null)
  const [w, setW] = useState(null)
  const [s, setS] = useState(0)
  const containdarkmode = useModeState((state) => state.containdarkmode)

  const [profileData, setProfileData] = useState({
    FavListing: user?.rest?.FavListing || [],

  })


  useEffect(() => {
    const getListing = async () => {
      if (user && profileData.FavListing.length > 0) {
        try {
          const fetchedData = await Promise.all(profileData.FavListing.map(async (listingId) => {
            const res = await fetch(`  https://estate-backend-1-d4pa.onrender.com/api/listing/list/${listingId}`,
              {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
                ,
              });
            const d = await res.json();
            return d;
          }));
          setData(fetchedData);
        }
        catch (error) {
          setError(error.message);
        }
      }
    };
    getListing();
  }, [user, profileData.FavListing]);




  //console.log(user.rest._id)


  useEffect(() => {
    setScreensize(window.innerWidth)
    if (screensize >= 1100) {
      setWrapp('wrap')
      return

    }
    if (screensize <= 1100) {
      //console.log(data)
      if (data.message === "UnAuthorized access") {
        setError('401 Unauthorized access')
        return

      }
      if (data && data.length > 0) {
        const a = 270 * data.length
        setW(a)
      }
    }

  }, [screensize, data])

  // console.log(data)


  return (
    <div style={{ overflow: 'hidden', width: '100vw', padding: '10px', maxWidth: 1500 }}>
      <h1 style={{ justifySelf: 'start' }}>For Sell</h1>


      <motion.div style={{ height: 'max-containt', display: 'flex', flexWrap: wrapp, gap: '20px', cursor: 'grab' }} drag="x" dragConstraints={{ left: -w, right: 0 }}>
        {user && profileData.FavListing !== '' &&
          profileData.FavListing.length > 0 &&
          data.length > 0 ? data.map((list) => list.isSell && list.success !== false ?



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
                valid={list.isValid}
                isSell={list.isSell}
                agentname={list.AgentName}
                companyname={list.CompanyName}
                owner={false}
                fav={true}
                detail={() => nav(`/listing/list/${List}`)}
              />

            ) : ''





          ) : ''}

      </motion.div>
      <h1 style={{ justifySelf: 'start' }}>For Rent</h1>
      <motion.div style={{ height: 'max-containt', display: 'flex', flexWrap: wrapp, gap: '20px', cursor: 'grab' }} drag="x" dragConstraints={{ left: -w, right: 0 }}>
        {user && profileData.FavListing !== '' &&
          profileData.FavListing.length > 0 &&
          data.length > 0 ? data.map((list) => !list.isSell && list.success !== false ?



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
                fav={true}
                detail={() => nav(`/listing/list/${List}`)}
              />

            ) : ''



          ) : ''}

      </motion.div>

    </div>
  )
}





