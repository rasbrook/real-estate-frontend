import React from 'react'
import { motion } from 'framer-motion'
import { useModeState } from '../store/mode.store'

export default function Agentcard(props) {
    const darkmode=useModeState((state) => state.darkmode)
    const backdarkmode=useModeState((state) => state.backdarkmode)
    const containdarkmode=useModeState((state) => state.containdarkmode)
    const buttdarkmode=useModeState((state) => state.buttdarkmode)
    const hdarkmode=useModeState((state) => state.hdarkmode)
    const hbackdarkmode=useModeState((state) => state.hbackdarkmode)
    const hcontaindarkmode=useModeState((state) => state.hcontaindarkmode)
    const hbuttdarkmode=useModeState((state) => state.hbuttdarkmode)
    const cardstyle={Height:'15vh',
        boxShadow: '5px 5px 5px  rgba(128,128 ,128, 0.3)',
        width:'15vw',
        maxWidth:400,
        minHeight:150,
        minWidth:320,
        maxHeight:250,
        border:'none', 
        borderRadius:15, 
        backgroundColor:containdarkmode ||  '#EEE', 
        color:darkmode || '#000000', 
        alignSelf:'center', 
        FontWeight:600, 
        overflow:'hidden', 
        display:'flex', flexWrap:'wrap' }
  return (
    <motion.div whileHover={props.setId} onClick={props.detail} style={cardstyle}>
        <motion.div style={{width:'30%', backgroundColor:`${darkmode}88`}}>
            <img  src={props.agentProfile} style={{width:50, height:50, borderColor:containdarkmode, borderRadius:40, position:'relative', left:0, top:20, borderWidth:2}}/>
        </motion.div>


        <motion.div style={{width:'70%'}}>
            <h1 style={{fontSize:'1.5em', position:'relative', justifySelf:'center', top:-16, width:'100%'}}>{props.agentname}</h1>
            <p style={{fontSize:'0.8em', position:'relative', justifySelf:'center', top:-16,width:'100%', textAlign:'justify'}}>{props.description}</p>
            <div><p style={{fontSize:'0.8em', position:'relative', justifySelf:'center', top:0,width:'100%', textAlign:'justify', margin:1}}>{props.email}</p>
            <p style={{fontSize:'0.8em', position:'relative', justifySelf:'center', top:0,width:'100%', textAlign:'justify', margin:1}}>{props.phone}</p></div>
            <p style={{fontSize:'0.5em', position:'relative', right:0,bottom:0, width:'100%'}}>{props.companyname}</p>


        </motion.div>

        
    </motion.div>
  )
}
