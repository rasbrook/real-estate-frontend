import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Searchresult() {
    const [loading, setLoading]=useState(false)
    const [listings, setListing]=useState('')
    const [list, setlist]=useState()
    const [error, setError]=useState()
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
                const res= await fetch(`/api/listing/get${query}`, {
                    method:"GET", 
                    headers:{
                        'Content-Type':'application/json'

                    }
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
    if(listings!==''){listings.map((l)=>{
        console.log(l)
    

    })}
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


    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
    const p=query.split('=')


    
  return (
    <div style={{display:'flex', flexWrap:'wrap'}}>
      <div>
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
              
              


            </select>

          </div>
          <button >Search</button>

          </div>
          
          
          
        </form>

      </div>
      <div>{listings !== '' ? listings.map((l) => (
        <div key={l._id} onMouseEnter={() => setlist(l._id)} onClick={()=>nav(`/listing/list/${l._id}`)} style={{
            display: 'flex',
            height: '10vh', 
            justifyContent: 'space-between', 
            width: '50vw',
            justifySelf: 'center',
            margin: 20, 
            padding: 20, 
            backgroundColor: 'grey', 
            borderRadius: 10
        }}>
          <div style={{display: 'flex'}}>
            <img style={{width: 50}} src={l.ImageUrls[0]} alt={l.name} />
            <div>
              <p>Name: {l.name}</p>
            </div>
          </div>
         
        </div>
      )) : <h1>No result found</h1>}
      </div>
    </div>
    
       )
}
