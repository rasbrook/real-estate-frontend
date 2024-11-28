import { motion } from "framer-motion"
import React from "react"
import image from '../assets/a3.jpg'
import { useModeState } from "../store/mode.store"
import { FontWeight } from "@cloudinary/url-gen/qualifiers"


function Cards(props){
    const darkmode=useModeState((state) => state.darkmode)
const backdarkmode=useModeState((state) => state.backdarkmode)
const containdarkmode=useModeState((state) => state.containdarkmode)
const buttdarkmode=useModeState((state) => state.buttdarkmode)
const hdarkmode=useModeState((state) => state.hdarkmode)
const hbackdarkmode=useModeState((state) => state.hbackdarkmode)
const hcontaindarkmode=useModeState((state) => state.hcontaindarkmode)
const hbuttdarkmode=useModeState((state) => state.hbuttdarkmode)
const cardstyle={Height:'25vh',
                boxShadow: '5px 5px 5px  rgba(128,128 ,128, 0.3)',
                width:'20vw',
                maxWidth:400,
                minHeight:250,
                minWidth:320,
                maxHeight:400,
                border:'none', borderRadius:15, backgroundColor:containdarkmode ||  '#EEE', color:darkmode || '#000000', alignSelf:'center', FontWeight:600, overflow:'hidden' } 
    return(
    <motion.div  key={props.id} whileTap={props.idset} whileInView={props.idset}  onMouseEnter={props.idset} onClick={props.detail} className="cards" style={cardstyle} whileHover={{cursor:'pointer'}} > 
        <a hred='./process.jpx'>
            <img loading='lazy' className='cardimage' style={{width:'100%', border:'none', alignSelf:'center', borderRadius:10, Height:'50%', maxHeight:170}} src={props.cardimage} />
            <motion.div style={{height: 'max-content'}} >
            <h2 style={{display:'flex', left:20, gap:10}}><span>{props.Price.toLocaleString()}</span>{props.isSell?'ETB':"ETB/Month"}</h2>
            <motion.p style={{position:'relative', left:10, zIndex:1, display:'flex', gap:10, marginTop:10, marginBottom:10, fontSize:12, overflow:'hidden'}}><span>{<span>{props.bed}</span>} bed</span> |
                                                                                                                            <span>{<span>{props.bath}</span>} bath</span>|
                                                                                                                            <span>{<span>{props.area}</span>} sqm</span>|
                                                                                                                            <span>{<span>{props.isSell? 'For Sell':'For Rent'}</span>} </span></motion.p>
            
           
            <p style={{display:'flex',position:'relative', left:10, marginBottom:5, fontSize:'0.75em',fontWeight:100, opacity:0.5, gap:5}}>
                         |<span>{props.country}</span>|
                        <span>{props.state}</span>|
                        <span>{props.county}</span>
                       </p>
            <div style={{display:'flex', fontSize:11, marginTop:30,opacity:0.4, alignItems:'center', justifyContent:'space-between'}}>
            <p style={{position:'relative', margin:10}}>{props.agentname}</p>
            <p style={{position:'relative', margin:10}}>{props.companyname}</p>
           
            </div>
            {props.owner ?<div style={{display:'flex', gap:50, justifyContent:'center'}}>
                <button 
                style={{width:120, height:35,marginTop:10, marginBottom:10, border:'none' , borderRadius:10, backgroundColor:'#5cff57cd'}} 
                onClick={props.edit}>
                    Edit
                </button>

                <motion.button 
                style={{width:120,  height:35, border:'none' , marginTop:10, marginBottom:10,borderRadius:10, backgroundColor:'#fa3f32d4'}}
                whileHover={{scale:1.05, cursor:'pointer'}}

                onClick={props.delete}>Delete</motion.button></div>:''}
            </motion.div>
        </a>

    </motion.div>)
}




export default Cards