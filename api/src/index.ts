import express from "express";
import dotenv from "dotenv";
import connectDB from "./shared/config/db";
import userRoutes from "./frameworks/routes/userRoutes";
import {errorHandler  } from "./interface-apdaters/middleware/errorHandler";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorHandler); // Global error handler

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
