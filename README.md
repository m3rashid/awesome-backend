### Awesome

- Awesome follows a multi-tenannt architecture, where data is segregated at the database level.
- It keeps each tenant data separate in separate databases (keeping in mind, the compliance to common data-protection policies).
- It also provides a multi-tenant admin web app, where the admin can manage all the tenants, users, roles, permissions, etc.
- It also provides a multi-tenant web app, where the tenants can manage their own data.

---

### Setting up the project locally

**Frontend**

- Make sure you have nodejs installed v20 LTS
- Make sure you have react native development environment setup properly kindly refer the [react native installation docs](https://reactnative.dev/docs/environment-setup?guide=native) for this section
- Go to the frontend folder and run `pnpm i` to install all the dependencies
- `cd web` and run `pnpm dev` to start the web app

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

1. Built with Golang and Fiber Framework
2. JWT based authentication
3. Secure assets management with signed URL asset uploads
4. Defaults Caching Solution with Redis
5. Permissions Management with Casbin and RBAC
6. Module system
   - Auto DB migrations
   - Error handling
   - Automatic routes
   - single configuration file for each module
7. Master (Default) router/controller setup
8. Multi-tenancy support with separate database for each tenant (clients)
9. Easy to use and extendable logging system with log levels and log rotation
10. Day-One support for websockets, Docker and Docker Compose
11. Hot module reloading for development (also works with docker and docker-compose)

<br />

**Frontend**

1. Built with Typescript and React
2. Modular Architecture with prime focus on Reusability and de-duplication
3. Authentication and Authorization with Multi-tenancy support
4. Package management for code reuse between admin web and tenant web
5. Shippable as a standalone native desktop app (Windows, Linux, MacOS)
6. Auto-pick the correct node version on directory change
7. State management, API calls, form management etc. set up and ready to use
8. Services for API calls handling all the boilerplate code for authorization, error handling, etc, typescript-typed responses etc.
9. Microsoft Fluent UI for UI components
10. React Router for routing

---

### Coming Soon

1. Dashboard Builder with custom data and widgets
2. ETL (Extract, Transform, Load) for seamless data migration
3. CLI to generate modules, models, controllers, etc
4. Bundling the whole project as a low code tool for non-technical users
5. More granular and configurable permissions management
6. Configurable and runtime user-defined workflows based on server actions and event driven architecture
