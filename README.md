# User Stories for Login and Dashboard (JIRA Format)

---

## 🧑‍💻 Login Screen

---

### 📝 Story: Display Login Form

**Title:** Display Login Form  
**Summary:** Show a login form with email and password fields, including validation and error messages.

**Description:**  
As a user, I want to see a login form with fields for email and password, so that I can enter my credentials to access the app.

**Priority:** Medium  
**Labels:** login, authentication, ui

**Acceptance Criteria:**

| #  | Criteria                                                                 |
|----|--------------------------------------------------------------------------|
| 1  | The login form includes:                                                 |
|    | - Email input field                                                      |
|    | - Password input field                                                   |
|    | - Login button                                                           |
| 2  | Basic client-side validation:                                            |
|    | - Required fields                                                        |
|    | - Proper email format                                                    |
| 3  | Error messages are shown for invalid inputs                              |

**Story Points:** 3

**Test Notes:**
- Leave fields blank and verify required field errors appear.
- Enter invalid email and verify proper error message.
- Enter valid credentials and verify form submits (mock or real).