import styled from 'styled-components';
import { motion } from 'framer-motion';



export const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

export const GoogleSignInButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &:hover {
    background-color: #357ae8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &::before {
    content: '';
    background-image: url('https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg');
    background-size: contain;
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
`;

export const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); // Adjust based on your navbar height
  background-color: #f0f2f5;
`;

export const SignInForm = styled(motion.form)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export const GoogleButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background-color: #ffffff;
  color: #757575;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #dadce0;
  }

  span {
    padding: 0 10px;
    color: #757575;
    font-size: 0.9rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

export const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  color: #3498db;
  font-size: 0.9rem;
  text-decoration: none;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const SignUpLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
