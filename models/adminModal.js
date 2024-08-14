import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
