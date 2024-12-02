import React, { useEffect, useState } from 'react'
import { FaPhone } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Constact from '../components/constact'
import { useModeState } from '../store/mode.store'
import { motion } from 'framer-motion'
import { PropagateLoader } from 'react-spinners'


export default function Agentpage() {
    const [agent, setAgent]=useState('')
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState()
    const buttdarkmode=useModeState((state) => state.buttdarkmode)
    const darkmode=useModeState((state) => state.darkmode)
    const backdarkmode=useModeState((state) => state.backdarkmode)

    const params=useParams()
    const nav=useNavigate()


    useEffect(()=>{
        setLoading(true)
        const agentid=params.id
        const getuserbyid=async()=>{
            const res=await fetch(` http://localhost:5000/api/user/findaget/${agentid}`,  {
                method:"GET", 
                headers:{
                  'Content-Type':'application/json',
                }})
            const user=await res.json()
            console.log(user)
            if(user.success===true){
                setLoading(false)
                setAgent(user)
                return

            }
            setLoading(false)
    

        }

        getuserbyid()
       

    }, [])

//console.log(agent)


if(loading) return <PropagateLoader color="#58fcff"/>
  return (
    <div>
        {agent.success===true && !loading ? 
        <div style={{justifyItems:'center', height:1200}}>
            
            <img loading='lazy' style={{width:150, height:150, border:'none', borderRadius:75}} src={agent.rest.avator} />
            <h1>{agent.rest.username}</h1>
            <p>{agent.rest.bio}</p>
            
            <a style={{textDecoration:'none', color:"#58fcff"}} href={`tel:+2519${agent.rest.phone.toString().slice(-8)}`} >
            <h2>Call Now</h2><FaPhone style={{width:'100%', fontSize:30}}/>
            </a>


            <form>
            <h1>Write a message to <span style={{gap:50, fontWeight:700}}>{agent.rest.username} via Email</span></h1>
            <div>
            <textarea
            style={{height:'40vh', width:'30vw', minWidth:300, fontSize:16, border:'none', borderRadius:10,color:backdarkmode  || '#000000',  backgroundColor:darkmode|| '#FEFEFE'}}
            id='message'
            name='message'
            placeholder='Message' 
            value={message} 
            onChange={(e)=>setMessage(e.target.value)}></textarea><br/>
            <Link style={{textDecoration:'none', padding:10,backgroundColor:buttdarkmode || '#4A628A', position:'relative', top:'5vh',color:backdarkmode , border:'none', borderRadius:5}} to={`mailto:${agent.rest.email}?subject=Regarding Finding Unoode property&body=${message}`}>Send Message</Link>
            </div>
        </form>
        <motion.button whileHover={{width:'8vw', 
            minWidth:150,
            backgroundColor:'#2796ff', 
            borderRadius:5, 
            border:'none', 
            color:buttdarkmode || '#4A628A', 
            scale:1.05,
            padding:10

            }} style={{color:'#2796ff', cursor:'pointer',width:'10vw', justifySelf:'center',minWidth:150,position:'relative', top:100, height:30, border:'none', borderRadius:5}} onClick={()=>nav(`/agent/listings/${agent.rest._id}`)} >Show {agent.rest.username}'s Listings</motion.button>

        </div>:''}

    </div>
  )
}
