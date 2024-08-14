import Admin from "../models/adminModal.js";
import bcrypt from "bcrypt";

const saltRound = 12;
const secretKey =
  "afsefafhabfgdqjwhdabssmcnmahdqukh34i23749823rh23f2fwfw><EBergehv";

export async function getAllAdmin(req, res) {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function createAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (user) return new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  // const passok = await bcrypt.compare(password, user.password);
  // if (!user || !passok)
  //   return res
  //     .status(401)
  //     .json({ success: false, error: "Invalid credentials" });

  res.status(200).json({
    data: user,
  });
};

export async function updateAdmin(req, res) {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) return new Error("Admin not found");
    const updateAdmin = await Admin.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      success: true,
      data: updateAdmin,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
export async function deleteAdmin(req, res) {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) return new Error("Admin not found");
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
