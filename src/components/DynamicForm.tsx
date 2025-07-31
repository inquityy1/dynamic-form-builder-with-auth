'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

interface Field {
  type: string;
  label: string;
  name: string;
  required?: boolean;
}

interface Schema {
  title: string;
  fields: Field[];
}

interface DynamicFormProps {
  schema: Schema;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
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

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <h2>{schema.title}</h2>
      <Form onSubmit={handleSubmit}>
        {schema.fields.map((field) => (
          <div key={field.name}>
            <Label>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                name={field.name}
                required={field.required}
                onChange={handleChange}
              />
            ) : (
              <Input
                type={field.type}
                name={field.name}
                required={field.required}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default DynamicForm;