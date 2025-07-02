# User Stories for Login and Dashboard (JIRA Format)

---

## Table of Contents

- [Login Screen](#-login-screen)
  - [Story: Display Login Form](#-story-display-login-form)
- [Dashboard](#-dashboard)
  - [Story: Display User Dashboard](#-story-display-user-dashboard)
- [Additional Stories](#additional-stories)

---

## 🧑‍💻 Login Screen

### 📝 Story: Display Login Form

**Title:** Display Login Form

**Description:**  
As a user, I want to see a login form with fields for email and password, so that I can enter my credentials to access the app.

**Acceptance Criteria:**
- The login form includes:
  - Email input field
  - Password input field
  - Login button
- Basic client-side validation:
  - Required fields for both email and password
  - Proper email format validation
- Error messages are shown for invalid inputs
- The login button is disabled until all validations pass

**Story Points:** 3

---

## 📊 Dashboard

### 📝 Story: Display User Dashboard

**Title:** Display User Dashboard

**Description:**  
As a logged-in user, I want to see a dashboard with my profile information and recent activity, so that I can quickly access relevant data after logging in.

**Acceptance Criteria:**
- The dashboard displays:
  - User's name and profile picture
  - Recent activity or notifications
  - A logout button
- The dashboard is only accessible after successful login
- If the user is not authenticated, they are redirected to the login screen

**Story Points:** 5

---

## Additional Stories

_Add more user stories here as the project evolves._