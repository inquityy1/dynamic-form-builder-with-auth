# **Dynamic Form Builder with Auth**

_A frontend project with authentication, dynamic form rendering, and export functionality._

---

## 📌 **Project Overview**

This project is a **dynamic form builder application** built with **Next.js** and **TypeScript**. It demonstrates:

- Rendering forms dynamically from a **JSON schema**
- **Protected routes** using a simple JWT-like login flow
- Adding multiple independent forms from the same schema
- Exporting individual or all form submissions as JSON
- Modern UI with **styled-components**
- Full **unit and E2E test coverage**

This project simulates real-world scenarios like **form engines** and **role-based access control**, similar to enterprise setups.

---

## 🛠 **Tech Stack**

- **Frontend:** [Next.js](https://nextjs.org/), React, TypeScript
- **Styling:** [styled-components](https://styled-components.com/)
- **Authentication:** Simple JWT-like mechanism (localStorage)
- **Testing:**
  - **Unit Tests:** Jest + React Testing Library
  - **E2E Tests:** Playwright
- **Build Tooling:** Babel for Jest transformations

---

## ✅ **Features**

- 🔐 **Login & Protected Routes:** Only authenticated users can access `/dashboard`
- 🖊 **Dynamic Form Rendering:** Render fields dynamically from JSON schema
- ➕ **Add/Delete Multiple Forms:** Create independent form instances from the same schema
- 📤 **Export Data:**
  - Export **single form submission** as JSON
  - Export **all submissions at once**
- 🎨 **Clean UI:** Styled with styled-components
- ✅ **Testing:**
  - Jest unit tests for core components
  - Playwright E2E test for full flow

---

## 📂 **Project Structure**

```
project-root/
├── src/
│ ├── app/
│ │ ├── login/ # Login page
│ │ ├── dashboard/ # Dashboard page
│ │ └── page.tsx # Redirects to /login
│ ├── components/
│ │ └── DynamicForm.tsx # Dynamic form renderer
│ └── lib/
│ └── api.ts # (Optional API helpers)
├── tests/ # Playwright E2E tests
├── jest.config.js
├── babel.config.js
└── playwright.config.ts
```

---

## ⚡ **Getting Started**

### **1. Clone the Repository**

```
git clone https://github.com/inquityy1/dynamic-form-builder-with-auth.git
```

---

### **2. Install Dependencies**

```
npm install
```

---

### **3. Run Development Server**

```
npm run dev
```

Navigate to:
http://localhost:3000/login

---

## Login Credentials

```
Username: admin
Password: admin123
```

---

## Testing

### Run Unit Tests (Jest)

```
npm run test
```

### Run E2E Tests (Playwright)

```
npm run e2e
```

Configured for headed mode with slow motion in playwright.config.ts.

---

Example JSON Schema

```
{
  "title": "Contact Form",
  "fields": [
    { "type": "text", "label": "Name", "name": "name", "required": true },
    { "type": "email", "label": "Email", "name": "email", "required": true },
    { "type": "textarea", "label": "Message", "name": "message" }
  ]
}
```
