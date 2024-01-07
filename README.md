### Awesome

- Awesome follows a multi-tenannt architecture, where data is segregated at the database level.
- It keeps each tenant data separate in separate databases (keeping in mind, the compliance to common data-protection policies).
- It also provides a multi-tenant admin web app, where the admin can manage all the tenants, users, roles, permissions, etc.
- It also provides a multi-tenant web app, where the tenants can manage their own data.
- Currently, the mobile app does not support multi-tenancy, but it will be added soon.

---

### Setting up the project locally

**Frontend**

- Make sure you have nodejs installed v20 LTS
- Make sure you have react native development environment setup properly kindly refer the [react native installation docs](https://reactnative.dev/docs/environment-setup?guide=native) for this section
- Go to the frontend folder and run `yarn` to install all the dependencies
- `cd web` and run `yarn dev` to start the web app
- `cd mobile` and run `yarn android` and then `yarn start` to start the mobile app

<br />

**Backend**

1. With Docker
   - Make sure you have docker installed on your system
   - Go to the backend folder and run `docker compose up`
   - you can also develop along, while the backend app runs inside the docker containers
2. Without Docker
   - Make sure the following dependencies are installed
     - Golang v1.21.5
     - PostgresQL
     - Redis
   - Install Air (for hot module reloading) `go install github.com/cosmtrek/air@latest`
   - Add the respective connection url string in the environment variables file (.env) for postgres and redis
   - Go to the backend folder and start the development server using the command `air`.

---

### Project Structure

**Backend**

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

<br />

**Frontends**

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
11. State management with Recoil, Axios for API calls, React Hook Form for form management
12. Services for API calls handling all the boilerplate code for authorization, error handling, etc, typescript-typed responses etc.
13. Web
    - Microsoft Fluent UI for UI components
    - React Router for routing
14. Mobile
    - Gluestack UI for UI components
    - React Navigation for routing

---

### COMING SOON

1. Dashboard Builder with custom data and widgets
2. Multi-tenancy support for mobile apps
3. ETL (Extract, Transform, Load) for seamless data migration
4. CLI to generate modules, models, controllers, etc
5. Bundling the whole project as a low code tool for non-technical users
6. More granular and configurable permissions management
