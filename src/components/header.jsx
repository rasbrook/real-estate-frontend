import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { color, motion, useAnimationControls } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaSun, FaMoon, FaHeart } from 'react-icons/fa';
import { useUserStore } from '../store/user.store';
import { useNavigate } from 'react-router-dom';
import { useModeState } from '../store/mode.store';
import './header.css'
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';





const Header = () => {
  const f = useAnimationControls()
  const { changeLightMode } = useModeState()

  function Show() {
    f.start('final')
  }
  function Hide() {

    f.start('init')
  }
  const [isDark, setIsDark] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { logout } = useUserStore()
  const user = useUserStore((state) => state.user)
  const darkmode = useModeState((state) => state.darkmode)
  const backdarkmode = useModeState((state) => state.backdarkmode)
  const containdarkmode = useModeState((state) => state.containdarkmode)
  const buttdarkmode = useModeState((state) => state.buttdarkmode)
  const hdarkmode = useModeState((state) => state.hdarkmode)
  const hbackdarkmode = useModeState((state) => state.hbackdarkmode)
  const hcontaindarkmode = useModeState((state) => state.hcontaindarkmode)
  const hbuttdarkmode = useModeState((state) => state.hbuttdarkmode)


  //console.log(darkmode, backdarkmode)

  const [searchTerm, setSearchform] = useState('')
  const nav = useNavigate()

  const hovereffect = { scale: 1.1, color: hdarkmode || '#ffffff' || 'white' }
  const linkstyle = { textDecoration: 'none', color: hdarkmode || '#ffffff' || 'white', display: 'flex', alignItems: 'center', fontWeight: 100, fontSize: 14 }
  const hiddlenlink = { textDecoration: 'none', color: darkmode || '#000000' || '#112D4E', alignSelf: 'center', position: 'relative', top: '10vh', alignContent: 'center' }



  //console.log(user)

  const handlesubmit = async (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)


    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    nav(`search?${searchQuery}`)

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromurl = urlParams.get('searchTerm')
    if (searchTermFromurl) {
      setSearchform(searchTermFromurl)
    }
  }, [location.search])

  const toggleMenu = () => {
    setIsDark(!isDark)
    changeLightMode(isDark)

  };
  return (
    <div className='head' style={{ backgroundColor: hbackdarkmode || '#222831', color: hdarkmode || '#ffffff' || 'white', height: '10vh', minHeight: 60, width: '120vw', marginLeft: '-8.6vw', marginTop: -35, display: 'flex', alignItems: 'center', overflowX: 'hidden' }}>

      <div style={{ display: 'flex', alignItems: 'center', position: "relative", left: -30 }}>
        <div id='bars' onClick={toggleMenu} style={{ cursor: 'pointer', fontSize: '2em', margin: '1.5em', alignSelf: 'center', position: 'absolute', left: 10 }}> {darkmode === '#ffffff' || darkmode === undefined ? <FaSun style={{ color: '#fff000' }} /> : <FaMoon style={{ color: '#00000f' }} />}</div>


        <div style={{ position: 'relative', left: '8vw', display: "flex", alignContent: 'center', marginRight: '10vw', alignItems: 'center' }}>
          <img style={{ width: 50, height: 50 }} src='https://firebasestorage.googleapis.com/v0/b/real-estate-3e0dc.appspot.com/o/Profile%2Funoode%20logo.png71dfe3c8-90e7-431e-aff7-a09bc4d62008?alt=media&token=0093f1fe-558f-47be-ab1c-67ba6481abf0' />
          <motion.h2 style={{ marginLeft: '0em', fontWeight: 300, marginRight: '0.8em', color: '#28A745' }} onClick={() => nav('/')} whileHover={{ cursor: 'pointer' }} id='name'>Unoode</motion.h2>
        </div>

      </div>

      <motion.div>
        <form onSubmit={handlesubmit}>
          <motion.div id='search' whileHover={{ scale: 1.01, minWidth: 150, padding: 5 }} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.input
              style={{ backgroundcolor: hdarkmode || '#ffffff' || "black", color: 'black', width: '40vw', height: '4vh', minWidth: 150, maxWidth: 400, minHeight: 30, borderRadius: '1.5vh', border: 'none', padding: 5, fontSize: '0.9em', position: 'relative', left: '-4vw' }}

              type="text"
              placeholder="Search for home..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={searchTerm}
              onChange={(e) => setSearchform(e.target.value)}
            />

            <FaSearch style={{ fontSize: '1.8em', position: 'relative', left: '-3vw' }} onClick={handlesubmit} />
          </motion.div>

        </form>
      </motion.div>
      <motion.div >


        <motion.div id='profile' >
          <motion.div style={{ display: 'flex', gap: 20, marginRight: 20, alignItems: 'center' }}  >
            <Link style={linkstyle} as={Link} to="/"><motion.h3 style={linkstyle} whileHover={hovereffect}>Home</motion.h3></Link>
            <Link style={linkstyle} as={Link} to="/listings/forsell"><motion.h3 style={linkstyle} whileHover={hovereffect}>For Sell</motion.h3></Link>
            <Link style={linkstyle} as={Link} to="/listings/forrent"><motion.h3 style={linkstyle} whileHover={hovereffect}>For Rent</motion.h3></Link>
            <Link style={linkstyle} as={Link} to="/find/agent"><motion.h3 style={linkstyle} whileHover={hovereffect}>Find An Agent</motion.h3></Link>
            |

          </motion.div>



          {<motion.div>{user ? <motion.div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <motion.div whileHover={hovereffect}>
              <Link style={linkstyle} as={Link} to="/profile">
                <motion.img style={{ height: 36, width: 36, borderRadius: 18, border: 'none', marginRight: 10 }} src={user.rest.avator} /><p>{user.rest.username}</p>
              </Link>
            </motion.div>
            <Link style={{ position: 'absolute', left: '95vw' }} as={Link} to="/fav/listings"><motion.h3 style={linkstyle} whileHover={hovereffect}><FaHeart /></motion.h3></Link>
          </motion.div>
            :
            <Link style={linkstyle} as={Link} to="/sign-in">Sign in</Link>}
          </motion.div>}



        </motion.div>

        <motion.div>
          <FaBars onClick={Show}
            transition={{ duration: 2 }}

            id='bar' initial='init' style={{ fontSize: 30, color: hdarkmode || '#ffffff' || 'white' }} />
        </motion.div>

      </motion.div>
      <motion.div id='slidebar'
        style={{
          width: '120vw',
          backgroundColor: '#dbe2ef5a',
          height: '120vh',
          position: 'relative',
          backdropFilter: 'blur(7px)',
          overflow: 'hidden',
          zIndex: 999
        }}
        transition={{ duration: 1 }}
        variants={{
          init: {
            position: 'absolute',
            top: '-200vh',
            left: 0







          },
          final: {
            top: '0vh'
            //marginLeft:'-50vw'

          }
        }} initial='init' animate={f}  >

        <motion.div  >
          <FaTimes onClick={Hide} style={{ fontSize: 30, position: 'relative', top: 10, color: hbuttdarkmode }} />
          <div onClick={toggleMenu} style={{ position: 'absolute', left: 0, top: 0, fontSize: 40, padding: 10 }}> {darkmode !== '#ffffff' || darkmode === undefined ? <FaSun style={{ color: '#fff000' }} /> : <FaMoon style={{ color: '#00000f' }} />}</div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            {<motion.div style={{ position: 'relative', top: 20 }} >{user ? <div><Link style={{ textDecoration: 'none' }} onClick={Hide}
              as={Link} to="/profile">
              <img style={{ width: 80, maxHeight: 80, borderRadius: 40 }}
                src={user.rest.avator} />

              <p >{user.rest.username}</p></Link></div> :
              <Link onClick={Hide} style={{ position: 'relative', top: 20, textDecoration: 'none', color: darkmode || '#000000' }} as={Link} to="/sign-in">Sign in</Link>}</motion.div>}
            <Link onClick={Hide} style={{ position: 'absolute', left: '100vw', top: '-5vh', fontSize: 40, padding: 10, zIndex: 9999, textDecoration: 'none', color: hdarkmode || '#ffffff' || 'white' }} as={Link} to="/fav/listings"><motion.h3  ><FaHeart /></motion.h3></Link>
          </motion.div>
          <motion.div style={{ margin: 20 }} whileTap={{ scale: 0.95 }}>
            <Link onClick={Hide} style={hiddlenlink} as={Link} to="/">Home</Link>
          </motion.div>

          <motion.div style={{ margin: 20 }} whileTap={{ scale: 0.95 }}>

            <Link onClick={Hide} style={hiddlenlink} as={Link} to="/listings/forsell">For Sell</Link>
          </motion.div>
          <motion.div style={{ margin: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link onClick={Hide} style={hiddlenlink} as={Link} to="/listings/forrent">For Rent</Link>
          </motion.div>
          <motion.div style={{ margin: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link onClick={Hide} style={hiddlenlink} as={Link} to="/find/agent">Find An Agent</Link>
          </motion.div>


        </motion.div>
      </motion.div>
    </div>

  )
};


export default Header;