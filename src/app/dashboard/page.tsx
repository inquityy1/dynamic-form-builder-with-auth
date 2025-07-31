'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import DynamicForm from '@/components/DynamicForm';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
`;

const AddButton = styled.button`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  padding: 8px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #c82333;
  }
`;

const ExportButton = styled.button`
  padding: 10px;
  margin: 20px 0;
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
  const [forms, setForms] = useState<number[]>([1]);
  const [submissions, setSubmissions] = useState<Record<number, Record<string, string>>>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null;

  const addForm = () => {
    setForms((prev) => [...prev, prev.length + 1]);
  };

  const deleteForm = (id: number) => {
    setForms((prev) => prev.filter((formId) => formId !== id));
    setSubmissions((prev) => {
      const newSubs = { ...prev };
      delete newSubs[id];
      return newSubs;
    });
  };

  const handleFormSubmit = (id: number, data: Record<string, string>) => {
    setSubmissions((prev) => ({ ...prev, [id]: data }));
  };

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-submissions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <AddButton onClick={addForm}>+ Add New Form</AddButton>
      <ExportButton onClick={exportAll}>Export All Submissions</ExportButton>

      {forms.map((id) => (
        <div
          key={id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Form #{id}</h3>
            <DeleteButton onClick={() => deleteForm(id)}>Delete</DeleteButton>
          </div>
          <DynamicForm schema={schema} onSubmit={(data) => handleFormSubmit(id, data)} />
        </div>
      ))}
    </Container>
  );
};

export default DashboardPage;