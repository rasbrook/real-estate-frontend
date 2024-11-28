import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import{ FaBath, FaBed, FaBuilding, FaMapMarkerAlt, FaPhone} from 'react-icons/fa'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { useUserStore } from '../store/user.store'
import Constact from '../components/constact'
import {motion} from 'framer-motion'
import Map from '../components/map'
import Pin from '../components/pin'
import ClipLoader from "react-spinners/ClipLoader";
import { PropagateLoader } from 'react-spinners'




export default function Listpage() {

  const user = useUserStore((state) => state.user)
  const nav=useNavigate()

  

  const iconsstyle={fontSize:'5vh',color:"#009fbe"}
  


  
  


    
    const [contact, setContact]=useState(false)
    const [data, setData]=useState(null)
    const [loading,setLoading]=useState(false)
    const [message, setMessage]=useState(null)
    const [bigimage, setBigimage]=useState(null)
    const [List, SetListing]=useState('')
    const [u, setUser]=useState('')
    const [userid, serUserId]=useState('')
  

    const params=useParams()

    useEffect(()=>{
      

        
        const fetchlisting=async()=>{
            const listingid=params.id
            try {
              setLoading(true)
              console.log(listingid)
            const res=await fetch(`https://estate-backend-1-d4pa.onrender.com/api/listing/list/${listingid}`, {
              method:"GET", 
              headers:{
                'Content-Type':'application/json'
              }
            })
            setLoading(false)
            const d=await res.json()
            if(d){
              setLoading(false)
              setData(d)
            console.log(d)
            return
            }
            setLoading(false)

              
            } catch (error) {
              
            }
            
            
            
    
          }
    
          fetchlisting()


    }, [])
    useEffect(()=>{

   
      if(data){
        console.log(data.useRef)
        
         
          const getuser=async()=>{
              try {
                  const res=await fetch(`https://estate-backend-1-d4pa.onrender.com/api/user/${data.useRef}`, {
                      method:"GET", 
                      header:{
                          'Content-Type': 'application/json'

                      }
                  })
                  
              
              const user=await res.json()
              if(user){
                  setUser(user)
                  console.log(user)
                  
              }
                  
                  
              } catch (error) {
                  console.log(error)
                  
              }
          
         
  
      }
      getuser()
      }
      
  
      
  
      
     
      
  
      }, [data])
  

console.log(u)
console.log(data)
console.log(userid)

      
   
   


if(loading) return <PropagateLoader color="#58fcff"/>

///{data && u!=='' ? console.log(user.rest._id , data.useRef):console.log('no data')}


  return (

    <div>
   
   {
    data && !loading ? <div>
      

      
      <motion.div style={{display:'flex', flexWrap:'wrap', gap:10, alignContent:'center'}}>
        <motion.img style={{width:'80%', minWidth:450,maxWidth:800,border:'none', borderRadius:20}} src={bigimage||data.ImageUrls[0]}/>
        <motion.div style={{display:'flex', flexWrap:'wrap',width:'35%',justifyContent:'center',minWidth:400, gap:10}}>
          <motion.div style={{display:'flex', flexWrap:'wrap',justifyContent:'center',minWidth:310, gap:10}} >
          {data.ImageUrls.map((i)=>
            (<motion.img style={{width:180, height:180, borderRadius:10, position:'relative', top:0, justifySelf:'self-start'}} key={i} onClick={()=>setBigimage(i)}  src={i}/>)

          )}
          </motion.div>
          <motion.div style={{width:360, height:250,position:'relative', top:0, border:'none'}}>

          <Map maxZoom={15}  zoom={13} center={data.Location} pin={<Pin id={data._id} 
                                                          idset={()=>SetListing(data._id)} 
                                                          detail={()=>nav(`/listing/list/${List}`)}
                                                          image={data.ImageUrls[0]} 
                                                          price={data.Price} 
                                                          isSell={data.isSell} 
                                                          position={data.Location}
                                                          Area={data.Area}
                                                          NoofFloor={data.NumberofFloor}/>}/>
          </motion.div>
        </motion.div>
        
      </motion.div>


      <motion.div>
          <h1 style={{position:'relative', justifySelf:'self-start' }}>{data.isSell ? "For Sell":"For Rent"}</h1>
      <motion.div>
          
          </motion.div>
          <h2 style={{position:'relative', justifySelf:'self-start'}}>Price: {data.Price.toLocaleString()} {data.isSell ? "Birr":"Birr/Month"}</h2>
          

          

        </motion.div>
        
        

        <motion.div style={{display:'flex', flexWrap:'wrap', gap:50, alignItems:'center'}}>
        <div style={{display:'flex', flexWrap:'wrap',alignItems:'center',gap:10}}><AiOutlineAreaChart style={iconsstyle} /><p>{data.Area} Sqm</p></div>
          <div style={{display:'flex', flexWrap:'wrap',alignItems:'center',gap:10}}><FaBed style={iconsstyle}/><p>{data.bedroom} Bed Room</p></div>
          <div style={{display:'flex', flexWrap:'wrap',alignItems:'center',gap:10}}><FaBath style={iconsstyle} /><p>{data.bathroom} Bath Room</p></div>
          <div style={{display:'flex', flexWrap:'wrap',alignItems:'center',gap:10}}><FaBuilding style={{fontSize:30,color:"#009fbe"}} /><p>{data.NumberofFloor ===0 ? `bungalow /Ground +${data.NumberofFloor}`:`Ground +${data.NumberofFloor}`}</p></div>
          <div style={{display:'flex',alignItems:'center',gap:10}}><FaMapMarkerAlt style={iconsstyle} /><p>{`${data.address.split('||')[0].split(',')[4]},  ${data.address.split('||')[0].split(',')[3]}, ${data.address.split('||')[0].split(',')[2]},${data.address.split('||')[0].split(',')[1]}`}</p></div>




        </motion.div>
        <div>
        <h2 style={{position:'relative', justifySelf:'self-start'}}>{data.name}</h2>
          <h3 style={{position:'relative', justifySelf:'self-start'}}>Home Description</h3>
          <p style={{position:'relative', justifySelf:'self-start',fontWeight:100}}>{data.description}</p>
        </div>
        {data && u && (!user ||u.rest._id!==user.rest._id) ? <h2 style={{position:'relative', 
                        justifySelf:'self-start'}}>Agent Account</h2>:null }
            {data && u  && (!user ||u.rest._id!==user.rest._id)  ?  
            <div onMouseEnter={()=>{serUserId(u.rest._id)}} onTouchStart={()=>{serUserId(u.rest._id)}} style={{position:'relative', 
                        justifySelf:'self-start', 
                        width:'20vw', 
                        minWidth:300, 
                        backgroundColor:"#009fbe", 
                        height:100, 
                        borderRadius:10, 
                        alignContent:'center',
                        display:'flex',
                        flexWrap:'wrap' }}>
                    <motion.img 
                    style={{position:'relative', 
                            justifySelf:'self-start', 
      
                            width:60, 
                            height:60,
                            borderRadius:10, 
                            margin:5 }} src={u.rest.avator} />
                    <div>
                      <motion.p  onClick={()=>nav(`/agent/agentpage/${userid}`)} whileHover={{cursor:'pointer'}}>{u.rest.username}</motion.p>
                      <a href={`tel:+2519${u.rest.phone.toString().slice(-8)}`} >
                        <motion.div 
                        style={{width:80, display:'flex', flexWrap:'wrap',color:"#58fcff"}} 
                        whileHover={{scale:1.02,color:"#55505f"}}>
                          <FaPhone style={{width:'100%', fontSize:20}}/>
                        </motion.div></a>

                    </div>
                    
                    </div>:null}



    




        {!contact ? '':<Constact listing={data} />}
        {data && user &&  u._id!==user.rest._id && !contact ?  <button onClick={()=>{setContact(true)}}>Contact Owner</button>:null}
    </div>:
    
    
    
    
    
    
    
    
    <div>Error loading</div>
   }
      
       


    </div>
  )
}
