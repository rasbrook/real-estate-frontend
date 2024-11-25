import React from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import {color, motion } from 'framer-motion'
import{ FaBath, FaBed, FaBuilding} from 'react-icons/fa'
import { AiOutlineAreaChart } from 'react-icons/ai'


export default function Pin(props) {
  
  const iconsstyle={fontSize:10,color:"#009fbe"}
  function numberToStringName(number) { 
    const scales = [ 
      { value: 1E12, suffix: 'tri' }, 
      { value: 1E9, suffix: 'B' }, 
      { value: 1E6, suffix: 'mil' }, 
      { value: 1E3, suffix: 'k' }, ]; 
      for (let i = 0; i < scales.length; i++) 
        { if (number >= scales[i].value) 
          { return (number / scales[i].value).toFixed(1) + '' + scales[i].suffix; } } return number.toString(); }
  return (
    <Marker key={props.id} position={props.position}>
      <Tooltip className='tooltip' onClick={props.detail}  whileHover={{cursor:'pointer'}}   direction="top" offset={[0, 0]} opacity={1} permanent> 
        <span >{numberToStringName(props.price)}</span> 
        </Tooltip>
      <Popup>
       <motion.div whileHover={{cursor:'pointer'}} style={{display:'flex', width:250, flexWrap:'wrap'}} whileTap={props.idset} whileInView={props.idset}  onMouseEnter={props.idset} onClick={props.detail} >
       <img style={{width:'30%', height:'30%', borderRadius:4, border:'none'}} src={props.image} />
        <div>
          <h2>{numberToStringName(props.price)} {props.isSell? 'Birr':' Birr/Month'}</h2>
          <p>{props.isSell ? 'For Sell':'For Rent'}</p>
          <p><AiOutlineAreaChart style={iconsstyle} />{props.Area} Sqm</p>
          <p><FaBuilding style={iconsstyle} />Ground +{props.NoofFloor}</p>
        </div>
       </motion.div>
      </Popup>
    </Marker>
  )
}
