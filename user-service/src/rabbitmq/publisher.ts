import amqp from "amqplib";

let channel: amqp.Channel;

export const connectPublisher = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost",
  );
  channel = await connection.createChannel();
  await channel.assertQueue("enrollmentQueue");
};

export const publishEnrollment = (message: object) => {
  if (!channel) throw new Error("RabbitMQ channel not established");
  channel.sendToQueue("enrollmentQueue", Buffer.from(JSON.stringify(message)));
};
