# Full Stack Blog App

A full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with user authentication and management features.

## Repository Overview

This repository contains the code for a full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application provides a platform for users to create, read, update, and delete blog posts while managing user authentication and profiles.

## Key Features

- **User Authentication**: Secure user registration and login functionalities using Passport.js and bcrypt for password hashing.
- **Blog Management**: CRUD (Create, Read, Update, Delete) operations for blog posts, allowing users to publish and manage their articles.
- **Commenting System**: Users can comment on posts, enhancing interactivity and engagement.
- **User Profiles**: Each user has a profile where they can manage their information and view their posts.
- **Responsive Design**: The application is designed to be responsive, ensuring a seamless experience across desktop and mobile devices.

## Tech Stack Used 🛠️:

### Frontend:

- **[React.js](https://react.dev/)**: JavaScript library for building user interfaces
- **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**: Custom styles for responsiveness and design

### Backend:

- **[Node.js](https://nodejs.org/en/)**: JavaScript runtime for building the backend server
- **[Express.js](https://expressjs.com/)**: Fast and minimalist web framework for Node.js
- **[MongoDB](https://www.mongodb.com/)**: NoSQL database for storing blog posts and user information
- **[Mongoose](https://mongoosejs.com/)**: Object Data Modeling (ODM) library for MongoDB and Node.js

### Authentication:

- **[Passport.js](http://www.passportjs.org/)**: Authentication middleware for Node.js
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Library for hashing passwords
- **[express-session](https://www.npmjs.com/package/express-session)**: Session middleware to manage user sessions

## How to Use This Repository

1. **Clone the Repository**:
   To use the code in this repository, clone it to your local machine:

   ```bash
   git clone https://github.com/your-username/ExpressJs-Learning.git

   ```

2. **Install Backend Dependencies**: Navigate to the backend directory and install the required npm packages:

   ```bash
   cd Blog-App/Backend
   npm install

   ```

3. **Running the Backend Application**: Start the Express server using Node.js, Go to the Backend Directory and the Start it:

   ```bash
   cd Backend
   npm run start
   ```

4. **Install Frontend Dependencies**: Navigate to the frontend directory and install the required npm packages:

   ```bash
   cd Blog-App/Frontend
   npm install
   ```

5. **Running the Frontend Application**: Start the Frontend server, Go to the frontend Directory and the Start it:

   ```bash
   cd Frontend
   npm run dev
   ```

6. Your website will be live, visit the site at 'http://localhost:3000'

## Packages and Dependencies

### Backend Dependencies:

- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: ^5.1.1 - Used for securely hashing and comparing passwords.
- **[connect-mongo](https://www.npmjs.com/package/connect-mongo)**: ^5.1.0 - Stores Express sessions in MongoDB to persist user sessions across server restarts.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: ^1.4.6 - Parses cookies from client requests for session management.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: ^16.4.5 - Loads environment variables from a .env file into process.env for secure configuration.
- **[express](https://www.npmjs.com/package/express)**: ^4.21.0 - Provides the core web framework for building the backend server and handling routes.
- **[express-session](https://www.npmjs.com/package/express-session)**: ^1.18.0 - Manages sessions to keep track of logged-in users.
- **[express-validator](https://www.npmjs.com/package/express-validator)**: ^7.2.0 - Validates and sanitizes user input to prevent security vulnerabilities.
- **[mongoose](https://www.npmjs.com/package/mongoose)**: ^8.7.0 - Provides an Object Data Modeling (ODM) library for interacting with MongoDB.
- **[passport](https://www.npmjs.com/package/passport)**: ^0.7.0 - Middleware for authenticating users using strategies like local, OAuth, etc.
- **[passport-local](https://www.npmjs.com/package/passport-local)**: ^1.0.0 - Strategy for authenticating users via a username and password.
- **[slugify](https://www.npmjs.com/package/slugify)**: ^1.6.6 - A utility for converting strings into URL-friendly slugs. It replaces spaces and special characters with hyphens, ensuring that the resulting slug is lowercase and can be safely used in web URLs.

### Dev Dependencies:

- **[nodemon](https://www.npmjs.com/package/nodemon)**: ^3.1.7 (for automatic server restarts during development)

## Contributions ✨

This repository is intended for personal learning, but if you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request!

1. Fork the repository.

2. Create a new branch for your feature:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a pull request, and I'll review your contribution!

## Acknowledgments 👏

A huge thank you to the Express.js community and various online resources that have been invaluable in my learning journey!
