import cors from "cors";
import express, { Request, Response } from "express";

// @ts-ignore
import { calc } from "@iic/core";

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
