# Password Manager

Visit the live site: [Password Manager](https://password-manager-olx5.onrender.com)

## Overview

The Password Manager project provides a secure and convenient solution for managing and storing passwords. It offers functionalities for users to sign up, sign in, save, retrieve, and delete their credentials. The project utilizes encryption techniques to safeguard sensitive information and ensures proper session management for user authentication.

## Features

- **User Authentication**: Users can sign up and sign in securely to access their password vault.
- **Password Encryption**: Utilizes encryption methods to secure user passwords and stored credentials.
- **Session Management**: Implements session-based authentication to maintain user login states securely.
- **Credential Management**: Allows users to save, retrieve, and delete their credentials for various websites or applications.
- **Responsive Design**: Provides a user-friendly interface accessible across different devices and screen sizes.

## Modules Used

- **Express**: For building the backend server and handling HTTP requests.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB, facilitating interaction with the database.
- **Body Parser**: Middleware for parsing incoming request bodies.
- **Express Session**: Middleware for session management.
- **dotenv**: For loading environment variables from a `.env` file.
- **bcrypt**: Library for hashing user passwords for storage.
- **randomstring**: Generates random strings for session secret and password salting.

## How to Use

### Setup

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:Create a .env file in the project root directory and specify the following variables:
   ```.env
   PORT=<port_number>
   MONGODB_USERNAME=<mongodb_username>
   MONGODB_PASSWORD=<mongodb_password>
   SESSION_SECRET=<session_secret>
   ```
### Running the Application
Run the application using the following command:
```bash
   npm start
```
The server will start running on the specified port.

## API Endpoints

- **POST /signup**: Endpoint for user registration.
- **POST /login**: Endpoint for user authentication.
- **GET /success**: Endpoint for accessing the password manager dashboard.
- **POST /success/add**: Endpoint for adding new credentials.
- **GET /success/delete/:index**: Endpoint for deleting saved credentials.
- **GET /signout**: Endpoint for user logout.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements or bug fixes.

