import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import "swiper/swiper-bundle.css"
import{ FaBath, FaBed} from 'react-icons/fa'
import { useUserStore } from '../store/user.store'
import Constact from '../components/constact'


export default function Listpage() {

  const user = useUserStore((state) => state.user)


  
  


    SwiperCore.use([Navigation])
    const [contact, setContact]=useState(false)
    const [data, setData]=useState(null)
    const [loading,setLoading]=useState(false)
    const [message, setMessage]=useState(null)

    const params=useParams()

    useEffect(()=>{
      

        
        const fetchlisting=async()=>{
            const listingid=params.id
            try {
              setLoading(true)
              console.log(listingid)
            const res=await fetch(`/api/listing/list/${listingid}`, {
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

    const contactOwner=()=>{
      setContact(prev=>!prev)

    }


if(loading) return <div><h1>Loading...</h1></div>

{data && user ? console.log(user.rest._id , data.useRef):console.log('no data')}


  return (
    <div>
      {data && !loading? 
      
       
          
          <Swiper navigation>
            {
              data.ImageUrls.map((url)=>
                (<SwiperSlide key={url}>
                  <div style={{
                   backgroundImage: `url("${url}")`,  
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: "cover",
                   backgroundPosition: 'center',    
                   height: "80vh", 
                   width:"100vw",
                   minHeight:600,
                   display: "block",
                  
                    
                    
                  }}>
                  </div>
                  

                  
                </SwiperSlide>)
              )
            }
            <div style={{width:'100vw'}}>
            <button style={{width:100, height:40, borderRadius:10, display:'flex', textAlign:'center', padding:10, paddingLeft:25 }}>{data.isRent?"For Rent":"For Sell"}</button>
        <h1 style={{textAlign:'center'}}>{data.name}</h1>
        <h1 style={{maxWidth:200,  textAlign:'justify'}}>Price:{data.isRent? `${data.Price}Birr /month`:`ETB${data.Price}`}</h1>
        <p style={{textAlign:'conster', margin:0}}>description:{data.description}</p>
        <ul style={{display:'flex', flexWrap:'wrap', gap:'2vw'}}>
          <li style={{display:'flex', justifyItems:'center', textAlign:'center'}}><FaBed style={{fontSize:30,color:'green',marginRight:10}} />{data.bedroom} Beds</li>
          <li style={{display:'flex', justifyItems:'center'}}><FaBath style={{fontSize:30,color:'green',marginRight:10}} />{data.bedroom} Bathroom</li>
          
        </ul>
       

        {!contact ? '':<Constact listing={data} />}
       {data && user &&  data.useRef!==user.rest._id && !contact ?  <button onClick={()=>{setContact(true)}}>Constact Owner</button>:null}
      
        
      </div>
        
          </Swiper>
          

        
      
    

      :''

        
      }
      
       


    </div>
  )
}
