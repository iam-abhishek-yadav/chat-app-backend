const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
	res.send('hello');
});

const getPagination = (page, size) => {
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

app.get('/users', async (req, res) => {
	const { page, size } = req.query;
	const { limit, offset } = getPagination(page, size);
	console.log(page, size);

	try {
		const users = await prisma.user.findMany({
			skip: offset,
			take: limit,
		});
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch users' });
	}
});

app.get('/users/search', async (req, res) => {
	const { name, age, mobile, city, page, size } = req.query;
	const { limit, offset } = getPagination(page, size);

	try {
		const users = await prisma.user.findMany({
			where: {
				OR: [
					name ? { name: { contains: name, mode: 'insensitive' } } : undefined,
					age ? { age: parseInt(age, 10) } : undefined,
					mobile ? { mobile: { contains: mobile } } : undefined,
					city ? { city: { contains: city, mode: 'insensitive' } } : undefined,
				],
			},
			skip: offset,
			take: limit,
		});
		console.log(users);
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'Failed to search users' });
	}
});

app.get('/users/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id: parseInt(id, 10) },
			include: {
				messages: true,
				receivedMessages: true,
			},
		});
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user' });
	}
});
