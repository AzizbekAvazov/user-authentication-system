# User Authentication System

## Technologies Used

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **GraphQL**: A query language for APIs and a runtime for executing those queries.
- **Apollo Server**: A GraphQL server implementation for Node.js.
- **bcrypt.js**: A library to help hash passwords.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT).
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Apollo Client**: A comprehensive state management library for managing GraphQL data in React applications.
- **jwt-decode**: A library for decoding JWT tokens.
- **ldrs**: A collection of lightweight loaders and spinners.
- **react-icons**: A library providing a collection of icons as React components.

## Usage

### Installation
1. Install dependencies for both frontend and backend using `npm install`.

### MongoDB Configuration
1. Create a `.env` file in the `backend` directory if not already present.
2. Add the following environment variables to the `.env` file:
    - `JWT_SECRET`: Secret key for generating JWT tokens.
    - `MONGO_URI`: MongoDB connection URI.

   Example:
   - JWT_SECRET=your_jwt_secret_key
   - MONGO_URI=your_mongodb_connection_uri

3. Alternatively, if you prefer not to use a `.env` file:
- Replace `"process.env.MONGO_URI"` in `backend/index.js` with the actual MongoDB connection URI.
- Replace `"process.env.JWT_SECRET"` in `backend/middleware/auth.js` and `backend/graphql/resolvers/users.js` with your JWT secret key.

### Running the Frontend and Backend
1. Start the frontend server using `npm start`.
2. Start the backend server using `npm start` or `npm run start`.

## Description
This repository contains a user authentication system built using Node.js for the backend and React.js for the frontend. The backend utilizes GraphQL for communication with the frontend, and MongoDB as the database, accessed through Mongoose. Passwords are securely hashed and salted using bcrypt.js, and JSON Web Tokens (JWT) are employed for user authentication and authorization.

On the frontend, Apollo Client manages state and communication with the GraphQL API. Tailwind CSS is used for styling, while additional libraries such as jwt-decode, ldrs, and react-icons provide additional functionality and visual enhancements.
