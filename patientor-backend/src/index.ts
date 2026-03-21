import express from "express";
import cors from "cors";
import diagnoses from "./routes/diagnoses";
import patients from "./routes/patients";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json("pong");
});

app.use("/api/diagnoses", diagnoses);
app.use("/api/patients", patients);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
