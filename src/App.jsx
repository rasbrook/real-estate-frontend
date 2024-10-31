import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import './App.css'
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

const MainContent = styled.main`
  flex: 1;
  padding-top: 50px; // This matches the height of the navbar
`;


function App() {


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
    
    </Route>
  </Routes>
  </MainContent>
  </BrowserRouter>
  )
}

export default App
