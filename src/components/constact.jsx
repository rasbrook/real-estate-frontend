import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'



export default function Constact({listing}) {
    
    const [u, setUser]=useState()
    const [message, setMessage]=useState()
    const [loading, setLoading]=useState(false)
    console.log(listing)
    

    useEffect(()=>{
        setLoading(true)
        setLoading(false)
        

   
        if(listing){
            console.log(listing.useRef)
            const getuser=async()=>{
                try {
                    const res=await fetch(`https://estate-backend-1-d4pa.onrender.com/api/user/${listing.useRef}`, {
                        method:"GET", 
                        header:{
                            'Content-Type': 'application/json'

                        }
                    })
                    
                
                const user=await res.json()
                if(user.success===true){
                    setUser(user)
                    console.log(user)
                    setLoading(false)
                    
                }
                    
                    
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                    
                }
            
           
    
        }
        getuser()
        }
        
    
        
    
        
       
        
    
        }, [])
    

   

    
        if (loading) return <div>loading</div>

  return (
    <div>
        {
            listing && u && (
                <form>
            <h1>Write a message to-<span style={{gap:50, fontWeight:700}}>{u.username}</span><br/> Listing:<span style={{gap:50,fontWeight:700}}>{listing.name}</span></h1>
            <textarea
            id='message'
            name='message'
            placeholder='Message' 
            value={message} 
            onChange={(e)=>setMessage(e.target.value)}></textarea>
            <Link to={`mailto:${u.rest.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
        </form>
        
            )
        }
        
    </div>
  )
}
