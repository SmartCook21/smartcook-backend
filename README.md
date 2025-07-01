# SmartCook Backend

Welcome to the SmartCook backend project. This project is built using AdonisJS and other modern web technologies to provide a seamless cooking experience.

For more detailed information, please refer to the [AdonisJS documentation](https://docs.adonisjs.com/).

## Technologies and Libraries

- **AdonisJS**: A fully-featured web framework for Node.js.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Project Architecture

The project follows a standard AdonisJS structure:

- `app/` - Contains the main application code (controllers, models, services, etc.).
- `config/` - Configuration files for the application.
- `database/` - Database migrations and seeds.
- `start/` - Entry points for starting the application.
- `public/` - Static files served directly by the server.

## Setup

Make sure to install dependencies & run migration :

```bash
# npm
npm install
node ace migration:run

# pnpm
pnpm install
node ace migration:run

# yarn
yarn install
node ace migration:run

# bun
bun install
node ace migration:run
```

## Development Server
- See the Swagger documentation `http://127.0.0.1:3333/docs`:
- Start the development server on `http://127.0.0.1:3333`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

## Environment Variables

Create a `.env` file in the root of the project with the following content:

```properties
TZ=UTC
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
APP_KEY=your_app_key_here
NODE_ENV=development
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
SESSION_DRIVER=cookie
LIMITER_STORE=database
API_VERSION=0.1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_key
AWS_REGION=your_region
S3_BUCKET=your_bucket
AWS_ENDPOINT=your_endpoint
DRIVE_DISK=s3
```
