import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    username: { type: "string" },
    email: { type: "string" },
    mobile: { type: "string" },
    designation: { type: "string" },
    gender: { type: "string" },
    course: [{ type: Array }],
    imageUpload: { type: "string" },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
