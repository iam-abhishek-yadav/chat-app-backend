const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function generateData() {
	const data = [];
	for (let i = 0; i < 50000; i++) {
		data.push({
			name: faker.person.fullName(),
			age: faker.datatype.number({ min: 18, max: 99 }),
			mobile: faker.phone.number(),
			email: faker.helpers.unique(faker.internet.email, [
				faker.person.firstName(),
				faker.person.lastName(),
			]),
			city: faker.location.city(),
		});
	}

	await prisma.user.createMany({ data });
	console.log('Data inserted');
}

generateData()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
