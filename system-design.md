**Architecture**

1. **Client Interaction**:

   - **Clients** connect to the WebSocket Servers to send and receive messages in real time.
   - When a message is sent by a client, it is published to a Redis channel by the Publisher Server.

2. **WebSocket Publisher Server**:

   - Receives messages from clients.
   - Saves messages to PostgreSQL.
   - Publishes messages to Redis channels for broadcasting.

3. **Redis Pub/Sub**:

   - **Publisher**: The Publisher Server publishes messages to specific channels.
   - **Subscriber**: The Subscriber Server subscribes to these channels and forwards messages to connected clients.

4. **WebSocket Subscriber Server**:

   - Subscribes to Redis channels for receiving messages.
   - Forwards these messages to connected clients.

5. **PostgreSQL Database**:
   - Stores user profiles and chat messages.
   - Utilizes indexing for quick data retrieval and efficient querying.

**Scalability Strategy**

- **Horizontal Scaling**:
  - **WebSocket Servers**: Deploy multiple instances of Publisher and Subscriber Servers.
  - **Load Balancer**: Distribute incoming requests among multiple WebSocket servers.

**High-Level Flow**

1. **Client Subscription**: When a client opens a chat, it sends a subscription message to the WebSocket Subscriber Server to join the relevant Redis channel.
2. **Client sends a message** to the WebSocket Publisher Server.
3. **Publisher Server**:
   - Saves the message to PostgreSQL.
   - Publishes the message to the Redis channel.
4. **Redis**:
   - Distributes the message to all subscribers of the channel.
5. **Subscriber Server**:
   - Receives the message from Redis.
   - Forwards the message to connected clients.
