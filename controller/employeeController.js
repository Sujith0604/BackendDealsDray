import Employee from "../models/employeeModal.js";
import fs from "fs";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getOneEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const newEmployee = await Employee.create({
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      imageUpload: newPath,
    });
    res.status(201).json({
      success: true,
      data: newEmployee,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateEmploye = async (req, res) => {
  const { id } = req.params;
  let newPath = null;
  if (res.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  try {
    const isEmployee = await Employee.findById(id);
    if (!isEmployee) return new Error("Employee not found");
    const updateEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        username: req.body.username || isEmployee.username,
        email: req.body.email || isEmployee.email,
        mobile: req.body.mobile || isEmployee.mobile,
        designation: req.body.designation || isEmployee.designation,
        gender: req.body.gender || isEmployee.gender,
        course: req.body.course || isEmployee.course,
        imageUpload: newPath || isEmployee.imageUpload,
      },
      {
        returnOriginal: false,
      }
    );
    res.status(200).json({
      success: true,
      data: updateEmployee,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const deleteEmploye = async (req, res) => {
  const { id } = req.params;
  try {
    const isEmployee = await Employee.findById(id);
    if (!isEmployee) return new Error("Employee not found");
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
