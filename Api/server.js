import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://blog-api-xpyf.vercel.app",
      "https://authorblog-api-7uhz.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
