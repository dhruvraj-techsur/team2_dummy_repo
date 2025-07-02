# User Stories for Login and Dashboard (JIRA Format)

---

## Table of Contents

- [Login Screen](#login-screen)
  - [Story: Display Login Form](#story-display-login-form)
- [How to Use](#how-to-use)
- [References](#references)

---

## 🧑‍💻 Login Screen

### 📝 Story: Display Login Form

**Title:** Display Login Form

**Description:**  
As a user, I want to see a login form with fields for email and password, so that I can enter my credentials to access the app.

**Acceptance Criteria:**

- [ ] The login form includes:
  - [ ] Email input field
  - [ ] Password input field
  - [ ] Login button
- [ ] Basic client-side validation:
  - [ ] Required fields
  - [ ] Proper email format
- [ ] Error messages are shown for invalid inputs

**Story Points:** 3

---

## How to Use

1. Navigate to the Login screen in the application.
2. Enter your email and password in the respective fields.
3. Click the **Login** button.
4. If any field is invalid or empty, an error message will be displayed.
5. Upon successful validation, you will be logged in and redirected as appropriate.

---

## References

- **Component Implementation:**  
  See [`src/components/LoginForm.tsx`](./src/components/LoginForm.tsx) for the React component implementing this user story.
- **App Entry:**  
  See [`src/App.tsx`](./src/App.tsx) for how the login form is rendered.
- **Styling:**  
  See [`src/App.css`](./src/App.css) and [`src/index.css`](./src/index.css) for form and global styles.

---