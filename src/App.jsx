import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Profile from './pages/profile'
import Signin from './pages/signin'
import About from './pages/about'
import Login from './pages/login'
import Home from './pages/home'
import SignUp from './pages/signup'
import ForgotPassword from './pages/forgetpassword'
import Header from './components/header'
import styled from 'styled-components';
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/createListing'
import Listing from './pages/listing'
import Edit_list from './pages/edit_list'
import Listpage from './pages/listpage'
import Searchresult from './pages/searchresult'
import { useModeState } from './store/mode.store';

const MainContent = styled.main`
  flex: 1;
  padding-top: 50px; // This matches the height of the navbar
`;


function App() {
  const darkmode=useModeState((state) => state.darkmode)
  const backdarkmode=useModeState((state) => state.backdarkmode)
  
  document.getElementById('root').style.color=darkmode
  document.getElementById('root').style.backgroundColor=backdarkmode

  return (
  <BrowserRouter>
  <Header />
  <MainContent>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
   
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/about' element={<About />} />
    <Route path='/log-in' element={<Login/>} />
    <Route element={<PrivateRoute />}>
    <Route path='/profile' element={<Profile />} />
    <Route path='/create-listing' element={<CreateListing />} />
    <Route path='/listing' element={<Listing />} />
    <Route path='/listing/edit_list/:id' element={<Edit_list/>} />
    

    
    </Route>
    
    <Route path='/listing/list/:id' element={<Listpage/>} />
    <Route path='/search' element={<Searchresult />} />
    
    
  </Routes>
  </MainContent>
  </BrowserRouter>
  )
}

export default App
