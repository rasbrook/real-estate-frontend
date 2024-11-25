
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 } from 'uuid';
import { useState } from 'react';


export const useListingStore=create(
    persist(
        (set)=>({
            _hasHydrated: true,
            listing: null,
            List:null,
            setList:(List)=>set(List),
            setListing:(listing)=>set(listing),
        

        Create_Listing: async(list, setLoading, setError)=>{
            console.log('listing')
            console.log(list.Location)
            setLoading(true)
            
           
            
         
            try {
              const getCityName = async ()=>{
                
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${list.Location[0]}&lon=${list.Location[1]}&zoom=20&addressdetails=1`; 
                        try { const response = await fetch(url,{
                            method:"GET", 
                            headers:{
                                'Content-Type':'application/json'
                              }}); 
                              
                            const da = await response.json();
                          
                            return da
                            } 
                        catch (error) { console.error('Error fetching city name:', error); 
                    
                    
    
            }}
            console.log('lll')
            
            const d=await getCityName()
            console.log(d)
            
            if(d){
              console.log(d)
              const add=`${d.display_name}|${d.name}||${d.type}||${d.place_id}||${d.osm_id}||${d.address.suburb}||${d.address.county}||${d.address.state_district}||${d.address.state}||${d.address.country}||${d.address.postcode}||${d.address.country_code}`
             
              
              const res=await fetch('https://estate-backend-1-d4pa.onrender.com/api/listing/create',{
                  method:"POST", 
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({...list, address:add||list.address})
                } )
                const data=await res.json()
                if(data.success){
                  setLoading(false)
                  set({listing:data})
                  console.log(data)

                }
                else{
                  setLoading(false)
                  setError(data.message)
                  console.log(data.message)

                }
            }

               

                  
                  
                
            } catch (error) {
                setLoading(false)
                setError(error)
                
            }

        },
       DeleteListing: async(setError, id)=>{
        console.log('deleting list')
        try {
           
            const res=await fetch(`/api/listing/delete/${id}`,{
                method:"DELETE", 
                headers:{
                  'Content-Type':'application/json'
                }
              } )

              const data=res.json()
              if(data.success){
                
                console.log(data.message)

              }
              else{
               
                setError(data.message)
                console.log(data.message)

              }
            
        } catch (error) {
            console.log(error)
            setError('Server is down for the moment')
            
        }

    },

    Updata_listing:async(updatedlist,setLoading, setError, id)=>{
      setLoading(true)
      console.log(id)
      try {
        const res=await fetch(`/api/listing/update/${id}`, {
          method:"PUT",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(updatedlist)
        })
        const data=res.json()
        if(data.success){
          setLoading(false)
          set({listing:data})
          return
        }
        setLoading(false)
        setError(data.message)
        console.log(data.message)
        

        
      } catch (error) {
        setError('internal server error')
        
      }


      
    },
    Get_all_listings:async(setLoading, setError, setListings)=>{
      setLoading(true)
      try {
        const res=await fetch('/api/listing/listings/all', {
          method:"GET",
          headers:{
            'Content-Type':'application/json'
          }

        })
        const listings=await res.json()
        if(listings){
          setLoading(false)
          setListings(listings)
          return
        }
        setLoading(false)
        setError('There has been an error')
        
      } catch (error) {
        setError('Internal server error')
        
      }

    }







        })
        ,{
      name: `listing-store`,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state._hasHydrated = true
      },
    }
    )
    )
