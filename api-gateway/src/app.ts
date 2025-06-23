import express from "express";
import proxy from "express-http-proxy";
import { connectRabbitMQ } from "./rabbitmq/rabbitmq";
import { startGatewayConsumer } from "./rabbitmq/consumer";

const app = express();
const PORT = 6000;

(async () => {
  await connectRabbitMQ();
  await startGatewayConsumer();

  app.use("/api/users", proxy("http://user-service:4002"));
  app.use("/api/courses", proxy("http://courses-service:4001"));
  app.use("/api/lessons", proxy("http://courses-service:4001"));
  app.use("/api/comments", proxy("http://courses-service:4001"));
  app.use("/api/enrollments", proxy("http://courses-service:4001"));
  app.use("/upload", proxy("http://courses-service:4001"));

  app.listen(PORT, () => {
    console.log(`API Gateway запущен на http://localhost:${PORT}`);
  });
})();
