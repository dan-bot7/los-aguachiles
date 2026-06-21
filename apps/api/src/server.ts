import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { locations, menuItems } from "@los-aguachiles/shared";
import { ordersRouter } from "./routes/orders.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const allowedOrigins = (process.env.WEB_URL ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    }
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 150 }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "los-aguachiles-api" });
});

app.get("/api/menu", (_req, res) => {
  res.json({ menuItems });
});

app.get("/api/locations", (_req, res) => {
  res.json({ locations });
});

app.use("/api/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Los Aguachiles API running on http://localhost:${port}/api`);
});
