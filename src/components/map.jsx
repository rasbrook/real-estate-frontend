import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Pin from './pin'

export default function Map(props) {
  return (
    <MapContainer maxZoom={props.maxZoom||14} style={{width:'100%', height:'100%'}} center={props.center} zoom={props.zoom} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <p>Unoode</p> google map'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {props.pin}
    
  </MapContainer>
  )
}
