import "dotenv/config";
import express from "express";
import { router } from "./api/router";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", router);

export { app };
