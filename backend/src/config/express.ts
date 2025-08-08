import express from "express";
import cors from "cors";
import { useErrorHandler } from "../middlewares/errorHandler";
import userRoutes from "../routes/userRoutes";

const app = express();
app.use(cors({ exposedHeaders: ["X-Total-Items"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/todo", todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(useErrorHandler);

export default app;
