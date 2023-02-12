import express, { application, Request, Response } from "express";

import helmet from "helmet";
import cors from "cors";

import databaseConnection from "./config/database";
databaseConnection();

import { routerV1 } from "./routers";

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send("server is wrorking");
});

app.use("/api/v1", routerV1);

const port: number = 5000;

app.listen(port, (): void => {
  console.log(`server listening on :${port}`);
});
