import React, { useEffect, useState } from 'react'
import Cards from '../components/cards'
import img from '../assets/a3.jpg'
import { motion } from 'framer-motion'
import { useModeState } from '../store/mode.store'
import { list } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import Pin from '../components/pin'
import Map from '../components/map'

export default function Sell() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [l, setL]=useState('Show Listing')
  const [length, setLength]=useState(0)
  const [data, setData]=useState('')
  const [List, SetListing]=useState('')
  const [listin, setListin]=useState('')
  const [screensize, setScreensize]=useState(null)
  const [wrapp, setWrapp]=useState(null)
  const [w, setW]=useState(null)
  const [s, setS]=useState(0)
  const [alllat, setLat]=useState(0)
  const [alllon, setLon]=useState(0)
  const [lat, setLatt]=useState(0)
  const [lon, setLong]=useState(0)
  const nav=useNavigate()

  

    
    
  useEffect(()=>{
    setScreensize(window.innerWidth)
    if(screensize>=1100){
      setWrapp('wrap')
      

     

     
      setLoading(false)
      if(alllat>0){
        setLatt(alllat/length)
        setLong(alllon/length)
        setLoading(false)
       }
      return
        
    }
    if(screensize<=1100){
      if(listin.length>0){
       
          const a =280*length 
        console.log(a)
        setW(a)
        
      
  
       
  
       
        setLoading(false)
        if(alllat>0){
          setLatt(alllat/length)
          setLong(alllon/length)
          setLoading(false)
         }
        
      }
    }

  }, [listin, length])

  console.log(screensize)
  console.log(listin)
  console.log(lat, lon)


  if(listin!==''){

    if(length===0){
      listin.map(l=>{ if(l.isSell){
        setLat(prev=>(parseFloat(prev)+parseFloat(l.Location[0]))),setLon(prev=>(parseFloat(prev)+parseFloat(l.Location[1])))
  
        return setLength(prev=>prev+1)
        
      } }
    )
    }
    
  }
  //console.log(lat, lon)




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
    <div style={{width:'100%', height:'50vh',  border:'none',marginBottom:50, minWidth:320}}>
    {listin.length!==0 && lat!==0 && lon!==0 ? <Map zoom={12} center={{lat, lon}} pin={listin!=='' ?listin.map((items)=>items.isSell? ((<Pin id={items._id} 
                                                                                              idset={()=>SetListing(items._id)} 
                                                                                              detail={()=>nav(`/listing/list/${List}`)}
                                                                                              image={items.ImageUrls[0]} 
                                                                                              price={items.Price} 
                                                                                              isSell={items.isSell} 
                                                                                              position={items.Location}
                                                                                              Area={items.Area}
                                                                                              NoofFloor={items.NumberofFloor}
                                                                                              />)):''):[8,36]}/>:null}

        </div>
    <h1 style={{justifySelf:'start'}}>For Sell</h1>


<div style={{ overflow: 'hidden', width: '100vw', padding: '10px' , maxWidth:1500}}>
 
 {listin!==''? <motion.div style={{ height:'max-containt',display: 'flex', flexWrap:wrapp, gap: '20px', cursor: 'grab' }} drag="x" 
 dragConstraints={{ left:-w , right: 0 }}> {listin.map((list)=>list.isSell? (
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
 ) :''
    
    
    
    
    
 )}</motion.div>:''}




 
    
    
  </div>



  
  </div>)


}
