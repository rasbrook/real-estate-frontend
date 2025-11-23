import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


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
    <div></div>
  );
};

export default ForgotPassword;
