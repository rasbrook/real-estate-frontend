import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { useUserStore } from '../store/user.store';
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid';
import { useListingStore } from '../store/listing.store.js';
import { useModeState } from '../store/mode.store.js';
import FormContain from '../components/formContain.jsx';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



export default function CreateListing() {
 
    const user = useUserStore((state) => state.user)
    const [loading, setLoading]=useState(false)
    const [uploading, setUploading]=useState(false)
    const [error, setError]=useState(false)
    const {Create_Listing} =useListingStore()
    const [picno, setPicno]=useState(0)
    const hdarkmode=useModeState((state) => state.hdarkmode)
    const darkmode=useModeState((state) => state.darkmode)
    const backdarkmode=useModeState((state) => state.backdarkmode)
    const containdarkmode=useModeState((state) => state.containdarkmode)
    const buttdarkmode=useModeState((state) => state.buttdarkmode)
    

    const nav=useNavigate()

    const inputStyle={width:'30vw', height:'5vh', borderRadius:10, border:'none', position:'relative',right:'4em', minWidth:180, minHeight:35, color:darkmode || '#000000',  backgroundColor:backdarkmode || '#FEFEFE', margin:5}
    const inpnum={height:'5vh', maxHeight:30, border:'none', borderRadius:5,width:50, color:darkmode || '#000000',  backgroundColor:backdarkmode || '#FEFEFE'}
    const Deletebutton={width:'20vw',minWidth:150, height:40, color:buttdarkmode || '#4A628A', backgroundColor:'#E84545', borderRadius:10, border:'none', margin:20, textDecoration:'none'}
    const Deletehover={scale:1.05, color:hdarkmode || '#ffffff', backgroundColor:'#A84545'}



  
    const [file, setFile]=useState([])
    const [formdata, setFormData]=useState({
      name: null,
      description: null,
      address: '',
      isRent: false,
      isSell: true,
      parking: false,
      furnished: false,
      offer: false,
      bedroom: null,
      bathroom: null,
      Price: null,
      ImageUrls:[],
      Location:[0,0],
      Area:null,
      NumberofFloor:0,
      AgentName:'Owner',
      CompanyName:'solo',
      useRef:user.rest._id

  })
    

    

     
      const handleSubmit =async (e) => {
        
        e.preventDefault();
        if (!formdata.name && 
          !formdata.address &&
          !formdata.bathroom&&
          !formdata.bedroom&&
          !formdata.description&&
          !formdata.parking&&
          !formdata.ImageUrls&&
          !formdata.Price&&
          !formdata.description
        ) {
           alert("Please fill in the required field.") 
        } else { 
          const { name, value } = e.target; setFormData({ ...formdata, [name]: value})
          if (navigator.geolocation) { 
          
             navigator.geolocation.getCurrentPosition(
             (position) => { 
                
                //console.log(position.coords.latitude)
                setFormData({ ...formdata, Location:  [position.coords.latitude , position.coords.longitude]})
                
                
            }  
          )
          console.log(formdata)
          
          if(formdata.Location){
            //console.log(formdata.Location[0])
            
           
            
            return

          }
          else{
            window.confirm("Please enable your GPS to Submit the form!")
                
            
            
            
          }
          

        }
        
            
              
             
              
              if(!setError){
              //console.log("Form submitted:", formdata);
              //console.error('Error getting location:', error);
            
  
              
    
            
          }
          
          
          
         


          
        }
       
        
        
        
       
        //console.log(formdata);
      };
      useEffect(()=>{
       const submit=async()=>{
        if(formdata.Location[0]!==0){
          Create_Listing(formdata, setLoading, setError)
          console.log(loading)
          if(!loading && formdata.Location[0]!==0 && error==='no error' ){
            console.log(error)
            
            nav('/listing')
            
          }
           
          
         }
       }
       

       submit()

       


      }, [formdata.Location])
     
      
      const handleToggle = () => {
        setFormData(prev => ({
          ...prev,
          isRent: !prev.isRent,
          isSell: !prev.isSell
        }));
      };

      const handleImageUploadtofirebase =(e)=>{
        setUploading(true)
        //e.preventDefault();
        setPicno(parseInt(formdata.NumberofFloor)+parseInt(formdata.bathroom)+parseInt(formdata.bedroom)+3)
        console.log(file)
        if(file.length>0 && file.length<picno || file.length<7){
            const promises=[]
            for(let i=0; i<file.length; i++){
                promises.push(storeimages(file[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData(prev => ({
                    ...prev,
                    ImageUrls: formdata.ImageUrls.concat(urls)
                  }))
            }).then(()=>setUploading(false))
        } 
        else if(file.length>picno){
            setUploading(false)
            setError(`You can only upload maximum of ${picno} images`)
        }  
        else{
          setUploading(false)
            setError('There is No image to be Uploaded')

        }
       
    }
    const storeimages=async(file)=>{
        return new Promise(async(resolve, reject)=>{
            if (file) {
      
                try {
                  setLoading(true)
                  const ListingRef = ref(storage, `Listings/${user.rest.username}'s listing/${file.name + v4()}`)
                  await uploadBytes(ListingRef, file)
                  const url = await getDownloadURL(ListingRef)
                  resolve(url)
                  
                  
                  setLoading(false)
                } catch (err) {
                  setError('Error uploading the Images: ' + err.message)
                  setLoading(false)
                }
              }

        })
    }
    const handleRemoveImage= (index)=>{
        setFormData({...formdata, ImageUrls:formdata.ImageUrls.filter((u, i)=>i !==index)})
       

    }
      
      
      if (!user) return <div>Please log in to view your profile</div>
  return (
   <motion.div
      style={{backgroundColor:containdarkmode ||  '#EEE', borderRadius:25, width:'90vw',justifyContent:'center', minWidth:450, maxWidth:1000, fontWeight:50}}
       
    
  >
    <FormContain head='Create Listing'  />

    <motion.form onSubmit={handleSubmit} >
      <motion.div  >
       <motion.div style={{position:'relative', left:0}}>
       
       <motion.input
          style={inputStyle}
          type="text"
          required
          placeholder="Home Name"
          value={formdata.name}
          onChange={(e) => setFormData({...formdata, name: e.target.value})}
        />
        <span style={{position:'relative',left:-50}}>Name</span>
       </motion.div>
        
        <div>
        <motion.textarea
          style={{width:'30vw', height:'30vh', borderRadius:10, border:'none', position:'relative',right:'6vw', minWidth:300, maxHeight:350, margin:30, color:darkmode || '#000000',  backgroundColor:backdarkmode || '#FEFEFE'}}
          placeholder="Description"
          required
          value={formdata.description}
          onChange={(e) => setFormData({...formdata, description: e.target.value})}
        />
        
        </div>


        <div>
        <div>
        <motion.input
          style={inputStyle}
          type="text"
          placeholder="Agent Name/Optional"
          
          
          value={formdata.AgentName}
          onChange={(e) => setFormData({...formdata, AgentName: e.target.value})}
        />
        <span style={{position:'relative',left:-50}}>Agent Name</span>
        </div>
        </div>
        <div >
        <motion.input
          style={inputStyle}
          type="text"
          placeholder="Company Name/Optional"
          
          
          value={formdata.CompanyName}
          onChange={(e) => setFormData({...formdata, CompanyName: e.target.value})}
        />
        <span style={{position:'relative',left:-50}}>Company Name</span>
        </div>
      </motion.div>
      
      

      <motion.div  >
          <motion.div  onClick={handleToggle}>
            
            <motion.label
              htmlFor="rentSellToggle"
              
            />
          </motion.div>
          <motion.span   onClick={handleToggle}>
            {!formdata.isSell ? 
            <div  style={{alignItems:'center', display:'flex', alignSelf:'center'}}>
            <FaToggleOn style={{width:80, height:30}}/><p>Rent</p></div> : 
            <div style={{alignItems:'center', display:'flex', alignSelf:'center'}}>
              <FaToggleOff style={{width:80,height:30, color:'white'}}/><p>Sell</p></div>}
          </motion.span>
        </motion.div>

      <motion.div style={{display:'flex', flexWrap:'wrap', gap:50,position:'relative',left:'12vw', alignItems:'center', width:'50vw', minWidth:400}}>
        <motion.div style={{gap:10}} >
          <motion.input
            required
            type="number"
            placeholder="Beds"
            style={inpnum}
            
            
            value={formdata.bedroom}
            onChange={(e) => setFormData({...formdata, bedroom: e.target.value})}
          />
          <span>Bed Room</span>
        </motion.div>
        
        <motion.div style={{gap:10}}>
          <motion.input
            required
            type="number"
            placeholder="Baths"
            style={inpnum}
            value={formdata.bathroom}
            onChange={(e) => setFormData({...formdata, bathroom: e.target.value})}
          />
          <span >Bath Room</span>
        </motion.div>
        <motion.div style={{gap:10}}>
          <motion.input
            required
            type="number"
            placeholder="Area"
            style={inpnum}
            value={formdata.Area}
            onChange={(e) => setFormData({...formdata, Area: e.target.value})}
          />
          <span >Sqm</span>
        </motion.div>
        <motion.div style={{gap:10}}>
          <motion.input
            required
            type="number"
            placeholder="NumberofFloor"
            style={inpnum}
            value={formdata.NumberofFloor}
            onChange={(e) => setFormData({...formdata, NumberofFloor: e.target.value})}
          />
          <span >Number Of Floor</span>
        </motion.div>
        
      </motion.div>
      <motion.div>
          <motion.input
            type="number"
            placeholder="Regular price"
            required
            style={{height:35, margin:20, border:'none', borderRadius:5, color:darkmode || '#000000',  backgroundColor:backdarkmode || '#FEFEFE'}}
            
            value={formdata.Price}
            onChange={(e) => setFormData({...formdata, Price: e.target.value})}
          />
          <span>{formdata.isRent? "Birr/Month":"Birr"}</span>
        </motion.div>

      <motion.div >

        

        <motion.div >
          <p>Images: The First image will be the cover (max {picno})</p>
          <motion.div>
            <motion.input
           
              type="file"
              multiple
              accept="image/*"
              onChange={(e)=>{setFile(e.target.files)}}
              
            />

            
          </motion.div>
        </motion.div>
        <motion.button  
        style={{width:'40vw', height:40, backgroundcolor:buttdarkmode || '#4A628A', borderRadius:10, border:'none', margin:20}}
        whileHover={{scale:1.05, color:buttdarkmode || '#4A628A',  backgroundColor:backdarkmode || '#FEFEFE'}} 
        whileTap={{ scale: 0.98 }}
        disabled={uploading} type="button"  onClick={()=>{handleImageUploadtofirebase()}}>
              {uploading ? 'Uploading...':"UPLOAD"}
            </motion.button>
        {error? <p >{error}</p>:null}
        {formdata.ImageUrls.length >0 && formdata.ImageUrls.map(
            (i, index)=> 
                <motion.div style={{border:20}} key={i}>
                    <motion.img loading='lazy' style={{width:'50vw', borderRadius:10, border:'none'}} src={i} alt='listing image'/>
                    <motion.button style={Deletebutton} whileHover={Deletehover} whileTap={Deletehover} onClick={()=>handleRemoveImage(index)}>Delete</motion.button>
                </motion.div>
            )}
      </motion.div>

      <motion.button
       style={{width:'40vw', height:40, backgroundcolor:buttdarkmode || '#4A628A', borderRadius:10, border:'none'}}
       whileHover={{scale:1.05, color:buttdarkmode || '#4A628A',  backgroundColor:backdarkmode || '#FEFEFE'}}
        
       onClick={handleSubmit}
        type="submit"
      >
        {loading?'Creating Listing':'CREATE LISTING'}
      </motion.button>
    </motion.form>
  </motion.div>

  )
}
