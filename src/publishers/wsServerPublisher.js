const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');
const redis = require('redis');

const prisma = new PrismaClient();
const wss = new WebSocket.Server({ port: 8080 });
const redisPublisher = redis.createClient({ url: process.env.REDIS_URL });

redisPublisher.on('connect', () => {
	console.log('Connected to Redis');
});

redisPublisher.on('error', (error) => {
	console.error('Redis error:', error);
});

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('message', async (message) => {
		try {
			const { type, data } = JSON.parse(message);

			if (type === 'MESSAGE') {
				const { senderId, recipientId, content, channel } = data;

				if (!senderId || !recipientId || !content || !channel) {
					console.error('Missing required fields in message data');
					return;
				}

				const savedMessage = await prisma.message.create({
					data: {
						senderId,
						recipientId,
						content,
					},
				});

				redisPublisher.publish(
					channel,
					JSON.stringify({
						type: 'MESSAGE',
						data: savedMessage,
					})
				);
			} else {
				console.log('Unknown message type:', type);
			}
		} catch (error) {
			console.error('Error processing message:', error);
		}
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});

	ws.on('error', (error) => {
		console.error('WebSocket error:', error);
	});
});

console.log('WebSocket publisher server running on port 8080');
