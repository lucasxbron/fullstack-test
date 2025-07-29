import { connect } from "./utils/db.js";
import express from "express";
import config from "./config/config.js";
import { errorHandling } from "./middleware/errorHandling.js";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // sehr wichtig für Cookies
  })
);
//app.options("*", cors());
app.use(express.json());
//app.use(cors());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Beispiel-Route
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from backend" });
});

app.use(errorHandling);

connect();
app.listen(config.PORT, () =>
  console.log(`Server is running on PORT http//localhost:${config.PORT}`)
);
//https://fullstack-9wus.onrender.com/api/hello
