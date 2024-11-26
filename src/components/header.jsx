import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { color, motion, useAnimationControls } from 'framer-motion';
import { FaBars, FaTimes, FaSearch , FaSun, FaMoon} from 'react-icons/fa';
import { useUserStore } from '../store/user.store';
import { useNavigate } from 'react-router-dom';
import { useModeState } from '../store/mode.store';
import './header.css'





const Header = () => {
  const f=useAnimationControls()
  const {changeLightMode}=useModeState()

    function Show(){
        f.start('final')
    }
    function Hide(){
        
        f.start('init')
    }
  const [isDark, setIsDark]=useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {logout}=useUserStore()
  const user=useUserStore((state) => state.user)
  const darkmode=useModeState((state) => state.darkmode)
  const backdarkmode=useModeState((state) => state.backdarkmode)
  const containdarkmode=useModeState((state) => state.containdarkmode)
  const buttdarkmode=useModeState((state) => state.buttdarkmode)
  const hdarkmode=useModeState((state) => state.hdarkmode)
  const hbackdarkmode=useModeState((state) => state.hbackdarkmode)
  const hcontaindarkmode=useModeState((state) => state.hcontaindarkmode)
  const hbuttdarkmode=useModeState((state) => state.hbuttdarkmode)
  

  console.log(darkmode, backdarkmode)
  
  const [searchTerm, setSearchform]=useState('')
  const nav=useNavigate()

  const hovereffect={scale:1.1, color:hdarkmode || '#ffffff'||'white'}
  const linkstyle={textDecoration:'none', color:hdarkmode || '#ffffff'||'white', display:'flex', alignItems:'center', fontWeight:100, fontSize:14}
  const hiddlenlink={textDecoration:'none', color:darkmode || '#000000'||'#112D4E', alignSelf:'center', position:'relative', top:'10vh', alignContent:'center'}



  console.log(user)

  const handlesubmit=async(e)=>{
    e.preventDefault()
   const urlParams=new URLSearchParams(window.location.search)


   urlParams.set('searchTerm', searchTerm)
   const searchQuery=urlParams.toString()
   nav(`search?${searchQuery}`)

  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const searchTermFromurl=urlParams.get('searchTerm')
    if(searchTermFromurl){
      setSearchform(searchTermFromurl)
    }
  },[location.search])

  const toggleMenu = () => {
    setIsDark(!isDark)
    changeLightMode(isDark)
    
  };
  return(
    <div className='head' style={{backgroundColor:hbackdarkmode||'#222831',color:hdarkmode || '#ffffff'||'white', height:'10vh',minHeight:60,width:'120vw', marginLeft:'-8.4vw', marginTop:-35, display:'flex', alignItems:'center', overflowX:'hidden'}}>

       <div style={{display:'flex',alignItems:'center'}}>
       <div id='bars' onClick={toggleMenu} style={{ cursor: 'pointer', fontSize: '2em' ,margin:'1.5em', alignSelf:'center', position:'absolute', left:10}}> {darkmode==='#ffffff' || darkmode===undefined  ? <FaSun style={{ color: '#fff000' }} /> : <FaMoon style={{ color: '#00000f' }} />}</div>
      
    
<svg style={{marginLeft:'8vw'}}width="50px" height="50px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0">

<path transform="translate(-2.4, -2.4), scale(0.8999999999999999)" d="M16,31.51055469115575C19.482123403784776,31.981491581264233,22.55056547019278,29.261977612345486,25.09212644720391,26.83557435777609C27.47935343325085,24.556512245659462,29.59621751871266,21.71647024574413,29.713810462712978,18.418114792898336C29.8235983461734,15.338682883555965,27.462755815476935,12.924247716770086,25.677637734142017,10.412613249073429C24.102269028338554,8.19609301873226,22.567062451247132,5.897623392622028,20.062381526042227,4.838698487989378C17.456849057437697,3.7371357328018635,14.514262577855458,3.6488318177303274,11.836500823240133,4.560880025934356C9.113056413863484,5.488487789931298,7.148480524776792,7.605899660593009,5.3483986493653966,9.850295092910523C3.1674681890274057,12.569543828341533,-0.31945386251482943,15.342856899278118,0.464966960108562,18.739245471130296C1.2517867804773957,22.146021233494924,6.060248030547659,22.406490089062714,8.7611654433819,24.626907089044728C11.413280608565294,26.807203891420418,12.597695129936518,31.050412792403076,16,31.51055469115575" fill="#7ed0ec" strokewidth="0"/>

</g>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M19 9.77806V16.2C19 17.8801 19 18.7202 18.673 19.3619C18.3854 19.9264 17.9265 20.3854 17.362 20.673C17.2111 20.7499 17.0492 20.8087 16.868 20.8537M5 9.7774V16.2C5 17.8801 5 18.7202 5.32698 19.3619C5.6146 19.9264 6.07354 20.3854 6.63803 20.673C6.78894 20.7499 6.95082 20.8087 7.13202 20.8537M21 12L15.5668 5.96393C14.3311 4.59116 13.7133 3.90478 12.9856 3.65138C12.3466 3.42882 11.651 3.42887 11.0119 3.65153C10.2843 3.90503 9.66661 4.59151 8.43114 5.96446L3 12M7.13202 20.8537C7.65017 18.6447 9.63301 17 12 17C14.367 17 16.3498 18.6447 16.868 20.8537M7.13202 20.8537C7.72133 21 8.51495 21 9.8 21H14.2C15.485 21 16.2787 21 16.868 20.8537M14 12C14 13.1045 13.1046 14 12 14C10.8954 14 10 13.1045 10 12C10 10.8954 10.8954 9.99996 12 9.99996C13.1046 9.99996 14 10.8954 14 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

</svg>
       <h2 style={{marginLeft:'0em', fontWeight:300, marginRight:'1em'}} id='name'>Unoode</h2>
       
        </div>
        
        <motion.div>
        <form onSubmit={handlesubmit}>
          <motion.div id='search' whileHover={{scale:1.05, minWidth:150, padding:5}} style={{display:'flex', alignItems:'center'}}>
          <motion.input
            style={{backgroundcolor:hdarkmode || '#ffffff'||"black",color:darkmode || '#000000'||'white',width:'50vw', height:'4vh', minWidth:150,maxWidth:400, minHeight:30,borderRadius:'1.5vh', border:'none', padding:5, fontSize:'0.9em'}}
            
            type="text"
            placeholder="Search for home..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            value={searchTerm}
            onChange={(e)=>setSearchform(e.target.value)}
          />
          
          <FaSearch style={{fontSize:'1.8em',position:'relative', left:10}}  onClick={handlesubmit} />
          </motion.div>  
          
          </form>
        </motion.div>
      <motion.div >
     

      <motion.div id='profile' >
          <motion.div style={{display:'flex', gap:20, marginRight:20, alignItems:'center'}}  >
            <Link style={linkstyle}  as={Link} to="/"><motion.h3 style={linkstyle}  whileHover={hovereffect}>Home</motion.h3></Link>
            <Link style={linkstyle}   as={Link} to="/listings/forsell"><motion.h3 style={linkstyle}  whileHover={hovereffect}>For Sell</motion.h3></Link>
            <Link style={linkstyle}   as={Link} to="/listings/forrent"><motion.h3 style={linkstyle}  whileHover={hovereffect}>For Rent</motion.h3></Link>
            <Link style={linkstyle}   as={Link} to="/find/agent"><motion.h3 style={linkstyle}  whileHover={hovereffect}>Find An Agent</motion.h3></Link>
            |
                
          </motion.div>
          
    
          
          {<motion.div>{user? <motion.div whileHover={hovereffect}>
            <Link  style={linkstyle} as={Link} to="/profile">
                    <motion.img style={{height:36, width:36, borderRadius:18, border:'none', marginRight:10}} src={user.rest.avator}/><p>{user.rest.username}</p>
                </Link>
          </motion.div>
                :
                      <Link style={linkstyle} as={Link} to="/sign-in">Sign in</Link>}
          </motion.div>} 
          
          
        
      </motion.div>
      
      <motion.div>
      <FaBars onClick={Show} 
      transition={{duration:2}}
      
      id='bar' initial='init' style={{fontSize:30, color:hdarkmode || '#ffffff'||'white'}}/>
      </motion.div>
      
      </motion.div>
      <motion.div id='slidebar' 
      style={{
        width:'120vw', 
        backgroundColor:'#dbe2ef5a',
        height:'120vh', 
        position:'relative',
        backdropFilter:'blur(7px)',
        overflow:'hidden',
        zIndex:999
      }}
      transition={{duration:1}}
      variants={{
        init:{
          position:'absolute',
          top:'-200vh',
          left:0
         
           
        


          

        },
        final:{
          top:'0vh'
          //marginLeft:'-50vw'

        }
      }} initial='init' animate={f}  >

      <motion.div  >
        <FaTimes onClick={Hide} style={{fontSize:30, position:'relative', top:10, color:hbuttdarkmode}} />
        <div onClick={toggleMenu} style={{position:'absolute', left:0,top:0, fontSize:40, padding:10}}> {darkmode!=='#ffffff' || darkmode===undefined  ? <FaSun style={{ color: '#fff000' }} /> : <FaMoon style={{ color: '#00000f' }} />}</div>
        <motion.div  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {<motion.div style={{position:'relative', top:20}} >{user? <Link  style={{textDecoration:'none'}} onClick={Hide}
          as={Link} to="/profile"><img  style={{width:80,maxHeight:80, borderRadius:40}} 
          src={user.rest.avator}/><p >{user.rest.username}</p></Link>:
          <Link onClick={Hide}  style={{position:'relative', top:20, textDecoration:'none', color:darkmode || '#000000'}} as={Link} to="/sign-in">Sign in</Link>}</motion.div>} 
          </motion.div>
          <motion.div style={{margin:20}} whileTap={{ scale: 0.95 }}>
            <Link onClick={Hide} style={hiddlenlink}as={Link} to="/">Home</Link>
          </motion.div>
          
          <motion.div  style={{margin:20}} whileTap={{ scale: 0.95 }}>
          
          <Link onClick={Hide} style={hiddlenlink}as={Link} to="/listings/forsell">For Sell</Link>
          </motion.div>
          <motion.div style={{margin:20}}   whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link onClick={Hide} style={hiddlenlink} as={Link} to="/listings/forrent">For Rent</Link>
          </motion.div>
          <motion.div style={{margin:20}}   whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link onClick={Hide} style={hiddlenlink} as={Link} to="/find/agent">Find An Agent</Link>
          </motion.div>
         
        </motion.div>
      </motion.div>
    </div>
    
  )};


export default Header;