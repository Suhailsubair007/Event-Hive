import express from "express";
import dotenv from "dotenv";
import connectDB from "./shared/config/db";
import cors from "cors";
import userRoutes from "./frameworks/routes/userRoutes";
import adminRoutes from "./frameworks/routes/adminRoutes";
import eventRoutes from "./frameworks/routes/eventRoutes";
import subscriptionRoutes from "./frameworks/routes/subscriptionRoutes";
import walletRoute from "./frameworks/routes/walletRoutes";

import { errorHandler } from "./interface-apdaters/middleware/errorHandler";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/wallet", walletRoute);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
