import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./interface-apdaters/routes/userRoutes";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Ensure `router` is properly imported
app.use("/api/users", router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
