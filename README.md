## Awesome

### Setting up the project locally
- Make sure you have nodejs installed v20 LTS
- Make sure you have react native development environment setup properly (kindly refer the react native docs for this section) [https://reactnative.dev/docs/environment-setup?guide=native](https://reactnative.dev/docs/environment-setup?guide=native) 
- If you have docker setup on your computer, you can run the backend directly via `docker compose up`. This will setup all the backend requirements and you can develop along, while the backend app runs inside the docker containers
- Else, make sure you have latest version of go v1.21.5, postgres:latest and redis:latest installed on your system. Make sure you have air installed on your system (to constantly restart the server during development) You can install air via go `go install github.com/cosmtrek/air@latest`. Add the respective connection url string in the environment variables file (.env) and start the development server using the command `air`. 
- Start the frontend web by first installing the packages (running `yarn` in the root of frontend folder). Then start the frontend app by yarn dev
- Start the react native app directly by running `yarn android` and then `yarn start`


### BACKEND

1. Built with Golang and Fiber (PostgresQL as database)
2. JWT based authentication
3. Secure and Scalable assets management with signed URL asset uploads
4. Email: Sending Emails, Email Templates
5. Defaults Caching Solution with Redis
6. Permissions Management with Casbin and RBAC
7. Module system
   - Auto DB migrations
   - Error handling
   - Automatic routes
   - single configuration file for each module
8. Master (Default) router/controller setup
9. Input sanitization and validation with struct validators
10. Multi-tenancy support with separate database for each tenant (clients)
11. Configurable and runtime user-defined workflows based on server actions and event driven architecture
12. Easy to use and extendable logging system with log levels and log rotation
13. Easy to use and extendable configuration system
14. Day-One support for websockets
15. Day-One support for Docker and Docker Compose
16. Hot module reloading for development (also works with docker and docker-compose)

<hr />

### FRONTEND

1. Built with React and Typescript
2. Modular Architecture with prime focus on Reusability and de-duplication
3. Authentication and Authorization
4. Multi-tenancy support
5. Package management for code reuse between admin web, tenant web and mobile apps
6. Configurable UI components
7. Shippable as a standalone native desktop app (Windows, Linux, MacOS)
8. Auto-pick the correct node version on directory change
9. Hot module reloading for development
10. Data sanitization and validation with ZOD
11. Services for API calls handling all the boilerplate code for authorization, error handling, etc, typescript-typed responses etc.

### WEB FRONTEND

1.  Microsoft Fluent UI for UI components
2.  React Router for routing
3.  Recoil for state management
4.  Axios for API calls
5.  React Hook Form for form management

### MOBILE FRONTEND

1. Gluestack UI for UI components
2. React Navigation for routing
3. Axios for API calls
4. Recoil for state management

<hr />

### COMING SOON

1. Dashboard Builder with custom data and widgets
2. Multi-tenancy support for mobile apps
3. ETL (Extract, Transform, Load) for seamless data migration
4. CLI to generate modules, models, controllers, etc
5. Bundling the whole project as a low code tool for non-technical users
6. More granular and configurable permissions management
