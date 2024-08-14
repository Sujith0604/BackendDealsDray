import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Employeerouter from "./routes/employeeRoutes.js";
import Adminrouter from "./routes/adminRoutes.js";

dotenv.config();

const __dirname = path.resolve();

const uploadMiddleware = multer({ dest: "uploads/" });

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(
    "mongodb+srv://sujithkarthikaiselvan:HVG5cA52ijBHioCp@cluster0.7wfvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.use("/employees", Employeerouter);
app.use("/admin", Adminrouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
