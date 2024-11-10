## README

BE Platform for RoyalChick

Prerequisites

```bash
- Node.js 20.18.0
- npm (comes with Node.js)
```

Getting Started

1. Clone the repository

```bash
git clone [<your-repo-url>](https://github.com/ahmedrzakhan/RoyalChick-BE-Platform)
cd RoyalChick-BE-Platform
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env
```

4. Start the development server

```bash
npm run dev
```

## Project Structure

```
.
├── src/
│   ├── Controllers/
│   │   └── user.controller.js    # User-related controller logic
│   ├── middleware/
│   │   ├── errorHandler.js       # Global error handling middleware
│   │   └── responseInterceptor.js # Response formatting middleware
│   ├── models/
│   │   └── user.schema.js        # User data model schema
│   ├── Repositories/
│   │   └── user.repository.js    # User data access layer
│   ├── Routes/
│   │   └── user.route.js         # User route definitions
│   ├── Services/
│   │   └── user.service.js       # User business logic
│   ├── tests/
│   │   └── app.test.js          # Application tests
│   ├── Util/
│   │   └── order.util.js        # Utility functions for orders
|   ├── validations/              # directory for validation schemas
│   │   └── user.validation.js    # User-related validation schemas
│   └── app.js                   # Application entry point
├── .vscode/
│   └── launch.json              # VS Code debug configuration
├── node_modules/                # Project dependencies
├── .gitignore                  # Git ignore rules
├── package-lock.json           # Dependency lock file
├── package.json                # Project metadata and dependencies
└── README.md                   # Project documentation
```

### Directory Structure Explanation

- **src/**: Main source code directory

  - **Controllers/**: Handle HTTP requests and responses
  - **middleware/**: Custom middleware functions
  - **models/**: Database schemas and models
  - **Repositories/**: Data access layer for database operations
  - **Routes/**: API route definitions
  - **Services/**: Business logic layer
  - **tests/**: Application test files
  - **Util/**: Helper functions and utilities
  - **Validation/**: Joi validations

- **.vscode/**: VS Code specific configuration
- **node_modules/**: Project dependencies (auto-generated)
- **Configuration Files**:
  - `.gitignore`: Specifies which files Git should ignore
  - `package.json`: Project configuration and dependencies
  - `package-lock.json`: Locked versions of dependencies
  - `README.md`: Project documentation
