import express from "express";
import userProxy from "./routes/userProxy";
import courseProxy from "./routes/courseProxy";

const app = express();
const PORT = 6000;

app.use("/api/users", userProxy);
app.use("/api/courses", courseProxy);
app.use("/api/lessons", courseProxy);
app.use("/api/comments", courseProxy);
app.use("/api/enrollments", courseProxy);

app.listen(PORT, () => {
  console.log(`API Gateway запущен на http://localhost:${PORT}`);
});
