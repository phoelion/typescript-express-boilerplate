# Typescript Express Starter

A powerful and feature-rich starter template for building backend applications using Node.js, Express, and TypeScript. This starter template incorporates various essential components and follows best practices to accelerate your development process.

## Features

- Built with modern technologies: Node.js, Express, and TypeScript.
- Implements the repository pattern for efficient database model management.
- Includes a user model for user management and authentication.
- Provides sample tour components with authentication for easy customization.
- Implements an upload service for handling file uploads.
- Implements a robust error handling mechanism for both development and production environments.
- Includes a logger for efficient logging and debugging.
- Provides Swagger documentation for API endpoints.
- Utilizes a security middleware to enhance code safety.
- Includes an email notification service for sending email notifications.

## Prerequisites

Before getting started, ensure that you have the following installed on your machine:

- Node.js
- npm

## Getting Started

Follow these steps to get started with the Typescript Express Starter:

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/phoelion/typescript-express-starter.git
   ```

2. Install the project dependencies using npm or Yarn.

   ```bash
   cd typescript-express-starter
   npm install
   ```

3. Configure the necessary environment variables. You can find a sample configuration file `.env.example` in the project root. Rename it to `.env` and update the values as per your requirements.

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the sample tour component.

## Configuration

The project uses environment variables for configuration. Update the values in the `.env` file according to your requirements.

## Scripts

The following scripts are available in the project:

- `npm run dev`: Starts the development server using `nodemon`.
- `npm run build`: Builds the production-ready application into the `dist` folder.
- `npm run prod`: Starts the production server using `nodemon`
- `npm start`: Starts the production server using the compiled code from the dist folder.

## Swagger Documentation

### Future

The API endpoints are documented using Swagger. Once the server is running, you can access the Swagger documentation at `http://localhost:3000/api-docs`.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a

pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

[GitHub Repository](https://github.com/phoelion/typescript-express-starter)
