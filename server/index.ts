import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRouter from "./routers/auth-router";
import { initializeTables } from "./dal/db-init";
import { errorHandler } from "./middlewares/exceptions";
import imageRouter from "./routers/image-router";
import usersRouter from "./routers/users-router";
import path from "path";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_APP_URL || "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));

(async () => {
  await initializeTables();
  app.use("/auth", authRouter);
  app.use("/images", imageRouter);
  app.use("/users", usersRouter);
  app.get("/*", (q, a) => {
    a.sendFile(path.join(__dirname, "../build", "index.html"));
  });
  app.use(errorHandler);
})();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(PORT));
