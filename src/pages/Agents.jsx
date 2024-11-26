import React, { useEffect, useState } from 'react'
import Agentcard from '../components/agentcard'
import a3 from '../assets/a3.jpg'
import { useNavigate } from 'react-router-dom'







export default function Agents() {
  const nav=useNavigate()
  const [data, setData]=useState(null)
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState()
  const [user, setUser]=useState()

  useEffect(()=>{
    const getagents=async ()=>{
      console.log('get all agents')
      setLoading(true)
      const res= await fetch('https://estate-backend-1-d4pa.onrender.com/api/user/agents/all', {
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      }
    )
    const d=await res.json()
    if(d){
      setLoading(false)
      setData(d)
      
      
    }
    else{
      setError(d.message)
    }

    }
  getagents()
    }, [1])

    console.log(data)
  return (
    <div>
    <div style={{display:'flex', flexWrap:'wrap', gap:20}}>
    {
      data!==null ? data.map((user)=>(<Agentcard agentProfile={user.avator} 
                                      agentname={user.username}
                                      description={user.bio}
                                      email={user.email} 
                                      phone={user.Phone} 
                                      companyname={null}
                                      setId={()=>{setUser(user._id)}}
                                      detail={()=>{nav('/')}} />)):<div></div>
    }
    </div>

     




    </div>
  )
}
