import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ForgotPasswordContainer,
  ForgotPasswordForm,
  Title,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  Message,
  BackToLogin
} from '../pages/page style/forgetpassword.style.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the password reset request
    // For this example, we'll just set a message
    setMessage(`Password reset link sent to ${email}`);
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordForm
        as={motion.form}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Forgot Password</Title>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <SubmitButton
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Reset Password
        </SubmitButton>
        {message && <Message>{message}</Message>}
        <BackToLogin>
          <Link to="/sign-in">Back to Login</Link>
        </BackToLogin>
      </ForgotPasswordForm>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
