const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const initAdminUser = async () => {
  const existing = await Admin.findOne({ username: "admin" });
  if (existing) return;

  const hashed = await bcrypt.hash("admin123", 10);
  const newAdmin = new Admin({
    username: "admin",
    password: hashed,
    role: "admin",
  });

  await newAdmin.save();
  console.log("✅ Initial admin created: admin / admin123");
};

module.exports = initAdminUser;
