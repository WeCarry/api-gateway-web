import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
	clientId: 'your-client-id',
	brokers: ['kafka-broker-1:9092', 'kafka-broker-2:9092'],
	logLevel: logLevel.NOTHING,
});

const topic = 'your-topic-name';

export const sendMessage = async (message: string) => {
	const producer = kafka.producer();
	await producer.connect();
	await producer.send({
		topic,
		messages: [{ value: message }],
	});
	await producer.disconnect();
};

export const receiveMessages = async () => {
	const consumer = kafka.consumer({ groupId: 'your-group-id' });
	await consumer.connect();
	await consumer.subscribe({ topic });
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				partition,
				offset: message.offset,
				value: message.value?.toString(),
			});
		},
	});
	await consumer.disconnect();
};
