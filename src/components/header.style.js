import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Nav = styled.nav`
  background-color: #2c3e50;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding-bottom:0.5em
  margin:1em
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  position: relative;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

export const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 0.5rem;
  color: #3498db;
`;

export const CompanyName = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 300;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  max-width: 300px;
  margin: 0 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    max-width: 150px;
    margin: 0 0.5rem;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

export const MenuToggle = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavLinks = styled(motion.ul)`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #34495e;
    padding: 1rem;
    z-index: 10;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const NavItem = styled(motion.li)`
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 300;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;
