import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from './interface-apdaters/routes/userRoutes'
import { errorHandler } from "./interface-apdaters/middleware/errorHandler";


dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/users", router);

 // Error handler middleware
 app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
