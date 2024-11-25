import React, { useEffect, useRef } from 'react'
import { useUserStore } from '../store/user.store.js'
import { useListingStore } from '../store/listing.store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cards from '../components/cards.jsx'
import { motion } from 'framer-motion'
import { useModeState } from '../store/mode.store.js'


export default function Listing() {
  const nav=useNavigate()
  const {Updata_listing}=useListingStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {DeleteListing}=useListingStore()
    const [l, setL]=useState('Show Listing')
    const [data, setData]=useState('')
    const [List, SetListing]=useState('')
    const user = useUserStore((state) => state.user)
    const listing=useUserStore((state)=>state.listing)
    const [screensize, setScreensize]=useState(null)
    const [wrapp, setWrapp]=useState(null)
    const [w, setW]=useState(null)
    const [s, setS]=useState(0)
    const containdarkmode=useModeState((state) => state.containdarkmode)
    
    console.log(user.rest._id)
   

    useEffect(()=>{
      setScreensize(window.innerWidth)
      if(screensize>=1100){
        setWrapp('wrap')
        return
          
      }
      if(screensize<=1100){
        if(data){
          const a =270*data.listings.length 
        setW(a)
        }
      }

    }, [screensize, data])

    console.log(screensize)



    

 
       
        
       
         
        

   
    



    useEffect(()=>{
      const getuser=async()=>{
        try {
          setLoading(true)
        const res= await fetch(`https://estate-backend-1-d4pa.onrender.com/api/user/userlisting/${user.rest._id}`)
        const d=await res.json()
        setData(d)
        if (d.success===false){
          setLoading(false)
          setError(data.message)
          
          
        }
        else{
          setL('')
          setLoading(false)
          
          return
        }
          
        } catch (error) {
          setError('There has been an error, please try again')
          
        }
    }

    getuser()
    }, [])

    const Deletelist=async()=>{

      if (window.confirm("Are you sure You Want to delete This listing?")) {
        try {
          await DeleteListing(setError, List)
          //nav('/profile')
          if(!setError){
            console.log('Deleted sucessfully')
          }
          
        } catch (error) {
          
        }}

        else { console.log("Cancelled!"); } };
      

        


      

    if (loading) return <div>Loading...</div>
 

  if(data!==''){
    console.log(data.listings)
  }
    
console.log(List)

  
    
  




  return (
    <div style={{ overflow: 'hidden', width: '100vw', padding: '10px' , maxWidth:1500}}>
      <h1 style={{justifySelf:'start'}}>For Sell</h1>


    <motion.div style={{ height:'max-containt',display: 'flex', flexWrap:wrapp, gap: '20px', cursor: 'grab'}} drag="x" dragConstraints={{ left:-w , right: 0 }}>
    {data!==''? data.listings.map((list)=>list.isSell?



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
   owner={true} 
   edit={()=>{nav(`/listing/edit_list/${List}`)}} 
   delete={()=>{Deletelist(),console.log(data)}} />

):''
    
   
      
  

    ): ''}
    
    </motion.div>
    <h1 style={{justifySelf:'start'}}>For Rent</h1>
    <motion.div style={{ height:'max-containt',display: 'flex', flexWrap:wrapp, gap: '20px', cursor: 'grab' }} drag="x" dragConstraints={{ left:-w , right: 0 }}>
    {data!==''? data.listings.map((list)=>!list.isSell ?



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
   owner={true} 
   edit={()=>{nav(`/listing/edit_list/${List}`)}} 
   delete={()=>{Deletelist(),console.log(data)}} />

):''    
   
    

    ): ''}
    
    </motion.div>
    
    </div>
  )
}
