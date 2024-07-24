const WebSocket = require('ws');
const redis = require('redis');

const wss = new WebSocket.Server({ port: 8081 });
const redisSubscriber = redis.createClient({ url: process.env.REDIS_URL });

redisSubscriber.on('connect', () => {
	console.log('Connected to Redis');
	redisSubscriber.subscribe('chat_channel', (err) => {
		if (err) {
			console.error('Failed to subscribe to Redis channel:', err);
		} else {
			console.log('Subscribed to Redis channel: chat_channel');
		}
	});
});

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('message', (message) => {
		console.log('Received message:', message);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});

	ws.on('error', (error) => {
		console.error('WebSocket error:', error);
	});
});

redisSubscriber.on('message', (channel, message) => {
	if (channel === 'chat_channel') {
		console.log('Broadcasting message:', message);
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	}
});

redisSubscriber.on('error', (error) => {
	console.error('Redis error:', error);
});

console.log('WebSocket subscriber server running on port 8081');
