import React from 'react'
import { useModeState } from '../store/mode.store'
import { motion } from 'framer-motion'
import { scale } from '@cloudinary/url-gen/actions/resize'

export default function BigCard(props) {

    const darkmode=useModeState((state) => state.darkmode)
    const backdarkmode=useModeState((state) => state.backdarkmode)
    const containdarkmode=useModeState((state) => state.containdarkmode)
    const buttdarkmode=useModeState((state) => state.buttdarkmode)
    const hdarkmode=useModeState((state) => state.hdarkmode)
    const hbackdarkmode=useModeState((state) => state.hbackdarkmode)
    const hcontaindarkmode=useModeState((state) => state.hcontaindarkmode)
    const hbuttdarkmode=useModeState((state) => state.hbuttdarkmode)
    const cardstyle={
        width:380,
        boxShadow: '7px 7px 7px 7px  rgba(128,128 ,128, 0.1)',
        backgroundColor:`${containdarkmode}FF` ||  '#EEEEEEff', 
        color:darkmode || '#000000', 
        alignSelf:'center',  
        overflow:'hidden' ,
        height:500,
        minHeight:550,
        border:'none',
        borderRadius:30,
        alignItems:"center", 
       alignContent:'center', 
        justifyItems:'center',
        margin:20,
        
        
        
    }
  return (
    <motion.div whileHover={{cursor:'pointer', scale:1.03}} onClick={props.handleclick} style={cardstyle}>
  <img style={{width:250}} src={props.soure}/>
  <h1>{props.head}</h1>
  <p style={{width:'70%', fontWeight:100, textAlign:'center'}}>{props.contain}</p>
  <motion.button  whileHover={{scale:1.05}} style={{padding:10,fontSize:18, borderColor:'#58fcff', borderRadius:7,backgroundColor:'#EEEEEEff', border:'none'}}>{props.button}</motion.button>
</motion.div>
  )
}
