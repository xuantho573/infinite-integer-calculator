import { calc } from "./parser";

import cors from "cors";
import express, { Request, Response } from "express";
import ViteExpress from "vite-express";

const app = express();
const port = parseInt(process.env.PORT || "3000");
ViteExpress.config({ mode: "production" })

app.use(cors<Request>());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("<h2>Server is up and running</h2>");
});

app.post("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ val: calc(req.body.expr).toString() });
  } catch (error: any) {
    res.status(400).json({ error: "Invalid expression" });
  }
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on port ${port}`);
});
