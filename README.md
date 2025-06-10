
# User Stories for Login and Dashboard (JIRA Format)

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
  - Required fields
  - Proper email format
- Error messages are shown for invalid inputs

**Story Points:** 3

---

### 📝 Story: Handle Login Submission

**Title:** Handle Login Submission

**Description:**  
As a user, I want to submit my credentials, so that the system can validate them and log me in.

**Acceptance Criteria:**
- Clicking the login button triggers a request to the backend
- Display loading state during request
- On success:
  - Redirect to dashboard
- On failure:
  - Show relevant error message

**Story Points:** 3

---

## 🔐 Backend Service - User Validation

### 📝 Story: Validate User Credentials via API

**Title:** Validate User Credentials via API

**Description:**  
As a system, I want to receive login credentials from the frontend, so that I can validate them against stored user data.

**Acceptance Criteria:**
- API endpoint `POST /api/login` receives email and password
- Credentials are verified against stored hashed values
- On valid credentials:
  - Return success response with token (JWT or session ID)
- On invalid credentials:
  - Return 401 Unauthorized with error message

**Story Points:** 5

---

### 📝 Story: Manage Session or Token Authentication

**Title:** Manage Session or Token Authentication

**Description:**  
As a user, I want to stay logged in securely, so that I don’t have to log in repeatedly.

**Acceptance Criteria:**
- Issue JWT or session cookie on login
- Client stores token securely (e.g., localStorage, HTTPOnly cookie)
- Backend validates token on protected routes

**Story Points:** 5

---

## 📊 Dashboard Screen

### 📝 Story: Display User Dashboard After Login

**Title:** Display User Dashboard After Login

**Description:**  
As a logged-in user, I want to see a personalized dashboard, so that I can view relevant information after login.

**Acceptance Criteria:**
- Dashboard route (`/dashboard`) only accessible with valid token/session
- If unauthorized:
  - Redirect to login
- If authorized:
  - Show user-specific content

**Story Points:** 3

---

### 📝 Story: Implement Logout Functionality

**Title:** Implement Logout Functionality

**Description:**  
As a logged-in user, I want to log out of my account, so that no one else can access my data.

**Acceptance Criteria:**
- Logout button clears token/session
- Redirects user to login page
- Access to dashboard is denied after logout

**Story Points:** 2
