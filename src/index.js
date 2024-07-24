const { exec } = require('child_process');

console.log('Starting WebSocket servers...');

exec('node src/publishers/wsServerPublisher.js', (error, stdout, stderr) => {
	if (error) {
		console.error(`Error starting publisher: ${error}`);
		return;
	}
	console.log(`Publisher stdout: ${stdout}`);
	console.error(`Publisher stderr: ${stderr}`);
});

exec('node src/subscribers/wsServerSubscriber.js', (error, stdout, stderr) => {
	if (error) {
		console.error(`Error starting subscriber: ${error}`);
		return;
	}
	console.log(`Subscriber stdout: ${stdout}`);
	console.error(`Subscriber stderr: ${stderr}`);
});
