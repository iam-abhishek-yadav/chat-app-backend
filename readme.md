## Project Structure

- `src/publisher/wsServerPublisher.js`: WebSocket publisher server
- `src/subscriber/wsServerSubscriber.js`: WebSocket subscriber server
- `prisma/`: Prisma schema and migration files
- `docker-compose`: Start the app

## Setup

- **Start a PostgreSQL container:**

  ```bash
  docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword  -d postgres
  ```

2. **Start a Redis container:**

   ```bash
   docker run -d -p 6379:6379 redis:lastest
   ```

3. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Run data generation script:**

   ```bash
   node generateData.js
   ```

6. **Start the Node.js server:**

   ```bash
   node src/server.js
   ```

To run the WebSocket server with Docker, follow these additional steps:

7. **Build the Docker image:**

   ```bash
   docker build -t chat-app .
   ```

8. **Run the Docker container:**

   ```bash
   docker run -d -p 8080:8080 -p 8081:8081 chat-app
   ```
