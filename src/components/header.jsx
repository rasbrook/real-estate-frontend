import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import {
  Nav,
  NavContainer,
  LogoContainer,
  Logo,
  CompanyName,
  SearchContainer,
  SearchInput,
  SearchIcon,
  MenuToggle,
  NavLinks,
  NavItem,
  NavLink
} from './header.style';
import { useUserStore } from '../store/user.store';

//firebase storage 
//allow read;
//allow write: if
//request.resource.size< 2 * 1024 * 1024 &&
//request.resource.contentType.matches('image/.*')

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {logout}=useUserStore()
  const user=useUserStore((state) => state.user)
  



  console.log(user)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <LogoContainer>
          <Logo
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Logo
          </Logo>
          <CompanyName
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Company Name
          </CompanyName>
        </LogoContainer>
        <SearchContainer
          animate={{ width: isSearchFocused ? '300px' : '200px' }}
          transition={{ duration: 0.3 }}
        >
          <SearchInput
            type="text"
            placeholder="Search..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </SearchContainer>
        <MenuToggle onClick={toggleMenu}>
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes /> : <FaBars  />}
          </motion.div>
        </MenuToggle>
        <NavLinks style={{display:'flex', alignItems:'center'}} isOpen={isOpen}>
          <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink as={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavLink as={Link} to="/about">About</NavLink>
          </NavItem>
          <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {<div>{user? <NavLink style={{display:'flex', alignItems:'center'}} as={Link} to="/profile"><img style={{height:30, marginRight:10, borderRadius:15}} src={user.rest.avator}/><p>{user.rest.username}</p><NavLink style={{padding:10}} onClick={async()=>{logout()}}>Log-Out</NavLink></NavLink>:<NavLink as={Link} to="/sign-in">Sign in</NavLink>}</div>} 
          </NavItem>
          
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Header;
