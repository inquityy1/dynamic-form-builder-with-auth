'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 8px 0;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {

      const token = btoa(JSON.stringify({ username, role: 'admin' }));
      localStorage.setItem('token', token);

      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
}