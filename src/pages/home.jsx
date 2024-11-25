import React, { useEffect, useState } from 'react'
import Cards from '../components/cards'
import img from '../assets/a3.jpg'
import { motion } from 'framer-motion'
import { useModeState } from '../store/mode.store'
import { list } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import home from '../assets/homeimage.jpg'
import dotenv from 'dotenv'

export default function Home() {
  dotenv.config()
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
  const nav=useNavigate()

  

    
    
  useEffect(()=>{
    setScreensize(window.innerWidth)
    if(screensize>=1100){
      setWrapp('wrap')
      return
        
    }
    if(screensize<=1100){
      if(listin!==''){
        const a =270*listin.length 
        console.log(a)
      setW(a)
      }
    }

  }, [listin])

  console.log(screensize)
 




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
                console.log(lists)
                
                return
                
            }
            setLoading(false)
            setError('No result found')
            
        } catch (error) {
            
        }

    }

    getListings()
    

}, [])

if(listin!==''){
  listin.map((l)=>{console.log(l)})

  
}






  if(loading) return <div>Loading...</div>
  return (<div>
<div style={{height:'70vh', display:'flex', flexWrap:'wrap',width: '100vw', marginBottom:'10vh', overflow:'hidden'}}>
  <h1 style={{position:'relative', left:0,textAlign:'justify', fontSize:'2.5em', maxWidth:400}}>Find Your Dream Home With Unoode</h1>
  <div style={{position:'relative', right:0, zIndex:0, top:0}}>
    <img style={{zIndex:0, height:'100%'}} src={home}/>
  </div>
</div>

<div style={{ overflow: 'hidden', width: '100vw', padding: '10px' , maxWidth:1500, zIndex:10}}>
 <motion.div style={{ height:'max-containt',display: 'flex', flexWrap:wrapp, gap: '20px', cursor: 'grab' }} drag="x" dragConstraints={{ left:-w , right: 0 }}>
 {listin!==''? listin.map((list)=>
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
     detail={()=>nav(`/listing/list/${List}`)}
     />
    )
    
    
    
    
    ):''}




 </motion.div>
    
    
  </div>



  
  </div>)


}
