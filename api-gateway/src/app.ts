import express from "express";
import proxy from "express-http-proxy";

const app = express();
const PORT = 6000;

app.use("/api/users", proxy("http://user-service:4002"));
app.use("/api/courses", proxy("http://courses-service:4001"));
app.use("/api/lessons", proxy("http://courses-service:4001"));
app.use("/api/comments", proxy("http://courses-service:4001"));
app.use("/api/enrollments", proxy("http://courses-service:4001"));
app.use("/upload", proxy("http://courses-service:4001"));

app.listen(PORT, () => {
  console.log(`API Gateway запущен на http://localhost:${PORT}`);
});
