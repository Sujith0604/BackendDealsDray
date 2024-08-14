import express from "express";
import multer from "multer";
import {
  createEmployee,
  deleteEmploye,
  getAllEmployees,
  getOneEmployee,
  updateEmploye,
} from "../controller/employeeController.js";

const router = express.Router();

const uploadMiddleware = multer({ dest: "uploads/" });

router
  .route("/")
  .get(getAllEmployees)
  .post(uploadMiddleware.single("imageUpload"), createEmployee);

router
  .route("/:id")
  .get(getOneEmployee)
  .put(uploadMiddleware.single("imageUpload"), updateEmploye)
  .delete(deleteEmploye);

export default router;
