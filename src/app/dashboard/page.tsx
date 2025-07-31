'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import DynamicForm from '@/components/DynamicForm';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const schema = {
  title: 'Contact Form',
  fields: [
    { type: 'text', label: 'Name', name: 'name', required: true },
    { type: 'email', label: 'Email', name: 'email', required: true },
    { type: 'textarea', label: 'Message', name: 'message' },
  ],
};

const DashboardPage = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect if not logged in
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null; // Prevent flashing content

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <DynamicForm schema={schema} />
    </Container>
  );
};

export default DashboardPage;