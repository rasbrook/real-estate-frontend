import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cards from '../components/cards'
import {motion } from 'framer-motion'
import Map from '../components/map'
import Pin from '../components/pin'
import { PropagateLoader } from 'react-spinners'


export default function Searchresult() {
    const [loading, setLoading]=useState(false)
    const [listings, setListing]=useState('')
    const [list, setlist]=useState()
    const [error, setError]=useState()
    const [screensize, setScreensize]=useState(null)
    const [w, setW]=useState(null)
    const [wrapp, setWrapp]=useState(null)
   const [isbig, setisBig]=useState(true)
   const [alllat, setLat]=useState(0)
   const [alllon, setLon]=useState(0)
   const [center, setCenter]=useState()
   const [lat, setLatt]=useState(0)
   const [lon, setLong]=useState(0)

    let query=useLocation().search

    
    
    const nav=useNavigate()
    const [sidebardata, setSidebardata]=useState({
      searchTerm:'',
      sort:'createdAt',
      order:'desc',
      type:'Both'

    }
      
    )
   

    const [isRent, setRent]=useState(true)
    const [isSell, setSell]=useState(true)
  


    useEffect(()=>{
      if(sidebardata.type==='Both'){
        setRent(true)
        setSell(true)
      }
      if(sidebardata.type==='isRent'){
        setRent(true)
        setSell(false)
        
      }
      if(sidebardata.type==='isSell'){
        setRent(false)
        setSell(true)
        
      }

      
    }, [sidebardata])
    console.log(isRent, isSell)



    useEffect(()=>{
        console.log(query)
        const getListings=async()=>{
            setLoading(true)
            try {
                const res= await fetch(`https://estate-backend-1-d4pa.onrender.com/api/listing/get${query}`, {
                    method:"GET", 
                    headers:{
                        'Content-Type':'application/json',
                        

                    },
                    credentials: 'include'
                })
                const lists=await res.json()
                if(lists){
                    setLoading(false)
                    setListing(lists)
                    return
                    
                }
                setLoading(false)
                setError('No result found')
                
            } catch (error) {
                
            }

        }

        getListings()
        

    }, [query])
    
    console.log(listings)
    console.log(list)

    const handlesidebarchange=(e)=>{
      if(e.target.id==='isRent'||e.target.id==='isSell'||e.target.id==='Both'){
        setSidebardata({...sidebardata, type:e.target.id})
        

      }
      if(e.target.id==='searchTerm'){
        setSidebardata({...sidebardata, searchTerm:e.target.value})
      }

      if(e.target.id==='sort_order'){
        e.preventDefault()
        
        const sortorder=e.target.value.split('_')
        const sort=sortorder[0] ||'createdAt'
        const order=sortorder[1] || 'desc'

        setSidebardata({...sidebardata, sort:sort, order:order})
        
                 

      }
    }


    const handlesubmit=(e)=>{
      setLoading(true)
      e.preventDefault()
      const urlparam= new URLSearchParams()
      urlparam.set('searchTerm', sidebardata.searchTerm)
      urlparam.set('isRent', isRent)
      urlparam.set('isSell', isSell)
      urlparam.set('sort', sidebardata.sort)
      urlparam.set('order', sidebardata.order)
      


      const searchQuery=urlparam.toString()
      console.log(searchQuery)
      nav(`?${searchQuery}`)


    

    }

   console.log(sidebardata)


   

  
  useEffect(()=>{
    setLoading(true)
    
    setScreensize(window.innerWidth)
    if(screensize>=1100){
      setWrapp('wrap')
      setisBig(true)
      if(listings.length>0){
        listings.map((item)=>{setLat(prev=>(parseFloat(prev)+parseFloat(item.Location[0]))),setLon(prev=>(parseFloat(prev)+parseFloat(item.Location[1])))})
       
      
      }

     

     
      setLoading(false)
      if(alllat>0){
        setLatt(alllat/listings.length)
        setLong(alllon/listings.length)
        setLoading(false)
       }
      
      return
        
    }
    if(screensize<=1100){
      setisBig(false)
      if(listings.length>0){
        const a =270*listings.length 
        console.log(a)
        setW(a)
        listings.map((item)=>{setLat(prev=>(parseFloat(prev)+parseFloat(item.Location[0]))),setLon(prev=>(parseFloat(prev)+parseFloat(item.Location[1])))})

      }

      
    }
   if(alllat>0){
    setLatt(alllat/listings.length)
    setLong(alllon/listings.length)
    setLoading(false)
   }

  }, [listings, screensize])


  console.log(lat, lon)




  




  if(loading) return <PropagateLoader color="#58fcff"  />
  if(error) return <div>{error}</div>
  //const p=query.split('=')


    
  return (
    <div style={{display:'flex', overflowX:'hidden', width:'110vw'}}>
      <div style={{height:'30vh'}}>
        <form onSubmit={handlesubmit}>
          <div>
          <div style={{gap:20}}>
            <label>Search Term:</label>
            <input
            id='searchTerm'
            type='text'
            value={sidebardata.searchTerm}
            onChange={handlesidebarchange}
            placeholder='Search...'
            />
          </div>
        
          <div>
          <div>
          <label>Rent And Sale</label>
            <input
            id='Both' 
            type='checkbox'
            onChange={handlesidebarchange}
            checked={sidebardata.type==='Both'}/>

          </div>
           <div>
           <label>Only Rent</label>
            <input
            id='isRent'  
            type='checkbox'
            onChange={handlesidebarchange}
            checked={sidebardata.type==='isRent'}
            />
           </div>

            <div>
            <label>Only Sell</label>
            <input
            id='isSell'
            type='checkbox'
            onChange={handlesidebarchange}
            checked={sidebardata.type==='isSell'}
            />
            </div>
            
          </div>
          

          <div>
            <label>Sort:</label>
            <select
            id='sort_order'
            onChange={handlesidebarchange}
            >
              <option id='sort_order' value='createdAt_desc'>Lastest</option>
              <option id='sort_order'  value='createdAt_asc'>Oldest</option>
              <option id='sort_order' value='Price_asc' >Price:low to high</option>
              <option id='sort_order' value='Price_desc'>Price:high to low</option>
              <option id='sort_order' value='Area_asc' >Area:low to high</option>
              <option id='sort_order' value='Area_desc'>Area:high to low</option>
              
              


            </select>

          </div>
          <button >Search</button>

          </div>
          
          
          
        </form>

      </div>

      {isbig ? <div style={{display:'flex', flexWrap:'wrap'}}>
      <div style={{width:'100%', height:'50vh',  border:'none',marginBottom:50, minWidth:600, borderRadius:20, marginLeft:10}}>
      {listings.length!==0 && lat!==0 && lon!==0 ? <Map maxZoom={20}  zoom={10} center={[9.033468114828745, 38.76315561094813]} pin={listings!=='' ?listings.map((items)=><Pin id={items._id} 
                                                                                              idset={()=>setlist(items._id)} 
                                                                                              detail={()=>nav(`/listing/list/${list}`)}
                                                                                              image={items.ImageUrls[0]} 
                                                                                              price={items.Price} 
                                                                                              isSell={items.isSell} 
                                                                                              position={items.Location}
                                                                                              Area={items.Area}
                                                                                              NoofFloor={items.NumberofFloor}
                                                                                              
                                                                                              />):''}/>:<div>{lon===0 ? <PropagateLoader color="#58fcff"  />:<h1>No Result</h1>}</div>}

        </div>
      <motion.div 
      style={{ height:'max-containt',display: 'flex', flexWrap:'wrap', gap: '20px', cursor: 'grab', position:'relative', left:'-11vw'}} 
      drag="x" dragConstraints={{ left:-w , right: 0 }} >
        
        
       {listings!=='' ? listings.map((l)=>
        (<Cards idset={()=>setlist(l._id)} 
        county={l.address.split('||')[0].split(',')[1]} 
         state={l.address.split('||')[0].split(',')[2]} 
         country={l.address.split('||')[0].split(',')[4]}
         cardimage={l.ImageUrls[0]} 
         Price={l.Price} 
         bed={l.bedroom} 
         bath={l.bathroom} 
         area={l.Area} 
         isSell={l.isSell} 
         agentname={l.AgentName}
         companyname={l.CompanyName}
         owner={false}
         detail={()=>nav(`/listing/list/${list}`)}
         />)

       ):<h1>No home found</h1>}
      </motion.div>
        
     
      </div>:<div style={{display:'flex', flexWrap:'wrap'}}>
      <div style={{width:'50%', height:'50vh',  border:'none',borderRadius:10, maxWidth:700, minWidth:400,overflow:'hidden', zIndex:0, marginLeft:10}}>
      {listings.length!==0 && lat!==0 && lon!==0 ? <Map maxZoom={20}  zoom={10} center={[9.033468114828745, 38.76315561094813]} pin={listings!=='' ?listings.map((items)=><Pin id={items._id} 
                                                                                              idset={()=>setlist(items._id)} 
                                                                                              detail={()=>nav(`/listing/list/${list}`)}
                                                                                              image={items.ImageUrls[0]} 
                                                                                              price={items.Price} 
                                                                                              isSell={items.isSell} 
                                                                                              position={items.Location}/>):[8,36]}/>:<div>{lon===0 ? <PropagateLoader color="#58fcff"  />:<h1>No Result</h1>}</div>}

        </div>
      <div style={{width: '100vw', padding: '10px' , maxWidth:1500}}>
      <motion.div 
     style={{ height:'max-containt',display: 'flex', flexWrap:wrapp, gap: '20px', position:"relative", left:-150}} drag="x" dragConstraints={{ left:-w , right: 0 }} >
        
        
       {listings!=='' ? listings.map((l)=>
        (<Cards idset={()=>setlist(l._id)} 
        county={l.address.split('||')[0].split(',')[1]} 
         state={l.address.split('||')[0].split(',')[2]} 
         country={l.address.split('||')[0].split(',')[4]}
         cardimage={l.ImageUrls[0]} 
         Price={l.Price} 
         bed={l.bedroom} 
         bath={l.bathroom} 
         area={l.Area} 
         isSell={l.isSell} 
         agentname={l.AgentName}
         companyname={l.CompanyName}
         owner={false}
         detail={()=>nav(`/listing/list/${list}`)}
         />)

       ):<h1>No home found</h1>}
      </motion.div>
      </div>
        
     
      </div>}
      
    </div>
    
       )
}
