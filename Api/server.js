import authRouter from "./routes/route.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}/`);
});
