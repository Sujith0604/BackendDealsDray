import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  loginAdmin,
  updateAdmin,
} from "../controller/adminController.js";

const router = express.Router();

router.route("/").get(getAllAdmin).post(createAdmin);
router.route("/:id").patch(updateAdmin).delete(deleteAdmin);
router.route("/login").post(loginAdmin);

export default router;
