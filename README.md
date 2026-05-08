# School Management API

A Node.js Express API for managing school data with geographical sorting.

## Prerequisites

- Node.js (v18+)
- MySQL Database

## Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and fill in your MySQL credentials.
   ```bash
   cp .env.example .env
   ```
4. **Run Database Migrations:**
   ```bash
   npm run db:migrate
   ```
5. **(Optional) Seed Database:**
   ```bash
   npm run db:seed
   ```
6. **Start the server:**
   ```bash
   npm run dev
   ```

## Running with Docker

You can use Docker Compose to spin up both the API and the MySQL database automatically.

1. **Start the containers:**
   ```bash
   docker-compose up --build
   ```
2. **Run migrations (first time only):**
   ```bash
   docker-compose exec app npm run db:migrate
   ```

## APIs

### 1. Add School
- **Endpoint:** `POST /addSchool`
- **Body:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9012
  }
  ```

### 2. List Schools
- **Endpoint:** `GET /listSchools`
- **Query Parameters:**
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Returns:** List of schools sorted by proximity to the user.

## Postman Integration

The Postman collection is integrated into the repository for easy testing.

1. Locate the collection file at `postman/collection.json`.
2. Open Postman.
3. Click on **Import**.
4. Drag and drop the `postman/collection.json` file.
5. Set the `base_url` variable in the collection if your server is running on a different port/host.
