import React, { useEffect, useState } from 'react'
import Cards from '../components/cards'
import img from '../assets/a3.jpg'
import { motion } from 'framer-motion'
import { useModeState } from '../store/mode.store'
import { list } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import home1 from '../assets/home1.png'
import home2 from '../assets/home2.png'
import home3 from '../assets/home3.png'
import { PropagateLoader } from 'react-spinners'
import { useUserStore } from '../store/user.store'


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [l, setL]=useState('Show Listing')
  const [data, setData]=useState('')
  const [List, SetListing]=useState('')
  const [listin, setListin]=useState('')
  const [screensize, setScreensize]=useState(null)
  const [wrapp, setWrapp]=useState(null)
  const [w, setW]=useState(null)
  const [s, setS]=useState(0)
  const [randomHome, setRandomhome]=useState()
  const nav=useNavigate()
  const user = useUserStore((state) => state.user); 

  const homearray=[home1,home2,home3]

  

  

  

    
    
  useEffect(()=>{
    setScreensize(window.innerWidth)
    if(screensize>=1100){
      setWrapp('wrap')
      return
        
    }
    if(screensize<=1100){
      if(listin!==''){
        const a =270*listin.length 
      setW(a)
      }
    }

  }, [listin])

  
 




  useEffect(()=>{
    
    const getListings=async()=>{
        setLoading(true)
        try {
            const res= await fetch(`https://estate-backend-1-d4pa.onrender.com/api/listing/get`, {
                method:"GET", 
                headers:{
                    'Content-Type':'application/json'

                }
            })
            const lists=await res.json()
            if(lists){
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
//console.log(listin)




  if(loading) return <PropagateLoader color="#58fcff"  />
  return (<div>
<div style={{height:'90vh', display:'flex', flexWrap:'wrap',width: '100vw', marginBottom:'10vh', overflow:'hidden',minHeight:400}}>
  <h1 style={{position:'relative', left:0,textAlign:'justify', fontSize:'2.5em', maxWidth:400}}>Find Your Dream Home With Unoode</h1>
  <div style={{position:'relative', right:0, zIndex:0, top:0}}>
    <img loading='lazy' style={{zIndex:0,  width:'100%'}} src={randomHome}/>
  </div>
</div>

<div style={{ overflow: 'hidden', width: '100vw', padding: '10px' , maxWidth:1500, zIndex:10}}>
 <motion.div  style={{ height:'max-containt',display: 'flex', flexWrap:wrapp, gap: '20px', cursor: 'grab' }} drag="x" dragConstraints={{ left:-w , right: 0 }}>
 {listin!==''? listin.map((list)=>list.isValid?
    (
      <Cards idset={()=>SetListing(list._id)} 
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
     fav={user ? user.rest.FavListing.indexOf(list._id)!==-1:false}
     detail={()=>nav(`/listing/list/${List}`)}
     />
    ):''
    
    
    
    
    ):''}




 </motion.div>
    
    
  </div>



  
  </div>)


}
