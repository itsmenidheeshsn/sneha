import express from "express";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { apiRouter } from "./routes/version_1/index.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      process.env.RESTAURANT_URL,
    ],
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ], // Allow these headers
  })
);

// Handle preflight requests
app.options("*", cors());

// Verify environment variables
if (!process.env.CLIENT_URL || !process.env.ADMIN_URL) {
  console.warn(
    "CLIENT_URL or ADMIN_URL is not set in the environment variables."
  );
}
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

const db = connectDb;
db();

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404).json({ message: "End point does not exist" });
});
