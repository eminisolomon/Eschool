require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./config/connect");

const morgan = require("morgan");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const authRouter = require("./routes/authRoutes");

const schoolRouter = require("./routes/School");

const adminRouter = require("./routes/Admin");
const galleryRouter = require("./routes/Gallery");
const eventRouter = require("./routes/Event");
const noteRouter = require("./routes/Note");
const resultRouter = require("./routes/Result");
const commentsRouter = require("./routes/comment");
const postsRouter = require("./routes/Post");
const userRouter = require("./routes/userRoutes");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("tiny"));

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/user", userRouter);

// error middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is currently listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
