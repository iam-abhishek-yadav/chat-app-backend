## Project Structure

- `src/publisher/wsServerPublisher.js`: WebSocket publisher server
- `src/subscriber/wsServerSubscriber.js`: WebSocket subscriber server
- `prisma/`: Prisma schema and migration files
- `docker-compose`: Start the app

## Setup

- **Generate to setup binary targets**
  ```bash
  npx prisma generate
  ```
- **Start the app**
  ```bash
  docker-compose up -d --build
  ```
- **Prisma migrate**
  ```bash
  docker-compose run app npx prisma migrate dev --name init
  ```
- **Fill up the db**
  ```bash
  docker-compose run app node generateData.js
  ```
