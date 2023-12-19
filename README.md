Certainly! Below is a template for a professional README file for the provided quiz application assignment. Please adjust the details and formatting according to your project structure and preferences.

---

# Quiz Application Backend

This is the backend for a quiz application built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Routes](#routes)
  - [User Authentication](#user-authentication)
  - [Quiz Management](#quiz-management)
- [Usage](#usage)
  - [Creating a User Account](#creating-a-user-account)
  - [Logging In](#logging-in)
  - [Creating a Quiz](#creating-a-quiz)
  - [Getting the Active Quiz](#getting-the-active-quiz)
  - [Getting Quiz Results](#getting-quiz-results)
  - [Getting All Quizzes](#getting-all-quizzes)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quiz-backend.git
   cd quiz-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection by creating a `.env` file in the root directory with the following content:

   ```env
   MONGO_URL=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

   Replace `your-mongodb-connection-string` with your MongoDB connection string and `your-secret-key` with a secure secret key for JWT.

4. Run the application:

   ```bash
   npm start
   ```

   The server will be running on http://localhost:3000 by default.

## Routes

### User Authentication

| Method | Endpoint         | Description              | Authentication Required |
| ------ | ----------------- | ------------------------ | ------------------------ |
| POST   | `/auth/signup`   | Create a new user        | No                       |
| POST   | `/auth/login`    | Log in an existing user  | No                       |

### Quiz Management

| Method | Endpoint        | Description                         | Authentication Required |
| ------ | --------------- | ----------------------------------- | ------------------------ |
| POST   | `/quizzes`      | Create a new quiz                   | Yes                      |
| GET    | `/quizzes/active`| Get the currently active quiz       | Yes                      |
| GET    | `/quizzes/:id/result`| Get quiz results after 5 minutes of end time | Yes                      |
| GET    | `/quizzes/all`  | Get all quizzes (including inactive) | Yes                      |

## Usage

### Creating a User Account

**Endpoint**: `/auth/signup`

**Method**: POST

**Example Payload**:

```json
{
  "username": "john_doe",
  "password": "securepassword"
}
```

### Logging In

**Endpoint**: `/auth/login`

**Method**: POST

**Example Payload**:

```json
{
  "username": "john_doe",
  "password": "securepassword"
}
```

**Response**:

```json
{
  "token": "your-json-web-token"
}
```

Use the obtained token for authentication in subsequent requests.

### Creating a Quiz

**Endpoint**: `/quizzes`

**Method**: POST

**Example Payload**:

```json
{
  "title": "Sample Quiz",
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Paris", "Madrid", "Rome"],
      "rightAnswer": 1
    },
    // ... (add more questions)
  ],
  "startDate": "2023-12-15T08:00:00.000Z",
  "endDate": "2023-12-15T10:00:00.000Z"
}
```

### Getting the Active Quiz

**Endpoint**: `/quizzes/active`

**Method**: GET

**Response**:

```json
{
  "title": "Sample Quiz",
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Paris", "Madrid", "Rome"],
      "rightAnswer": 1
    },
    // ... (more questions)
  ],
  "startDate": "2023-12-15T08:00:00.000Z",
  "endDate": "2023-12-15T10:00:00.000Z",
  "active": true
}
```

### Getting Quiz Results

**Endpoint**: `/quizzes/:id/result`

**Method**: GET

**Example URL**: `/quizzes/your-quiz-id/result`

**Payload**: `Provide answers payload so it can compare your answers with right answer and return you result as response.`

```json
{
  "answers":[1, 1, 0, 1, 1]
}

```

**Response**:

```json
{
  "totalQuestions": 5,
  "correctAnswers": 3,
  "score": 60
}
```

### Getting All Quizzes

**Endpoint**: `/quizzes/all`

**Method**: GET

**Response**:

```json
[
  {
    "title": "Sample Quiz 1",
    // ... (quiz details)
  },


  {
    "title": "Sample Quiz 2",
    // ... (quiz details)
  },
  // ... (more quizzes)
]
```
