# User Stories for Login and Dashboard (JIRA Format)

---

## Table of Contents

- [Login Screen](#login-screen)
  - [Story: Display Login Form](#story-display-login-form)
- [References](#references)

---

## 🧑‍💻 Login Screen

### 📝 Story: Display Login Form

#### Story Details

- **Title:** Display Login Form
- **Story Points:** 3

#### Description

As a user, I want to see a login form with fields for email and password, so that I can enter my credentials to access the app.

#### Acceptance Criteria

- [ ] The login form includes:
  - [ ] Email input field
  - [ ] Password input field
  - [ ] Login button
- [ ] Basic client-side validation:
  - [ ] Required fields
  - [ ] Proper email format
- [ ] Error messages are shown for invalid inputs

---

## References

- `client/src/components/LoginForm.tsx` – Login form implementation
- `client/src/App.tsx` – Renders the login form
- `client/README.md` – Project setup and linting guidelines