require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ MongoDB Connected successfully');

    // Reset password for 'admin' user
    const username = 'admin';
    const newPassword = 'admin123';

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log(`❌ Admin with username '${username}' not found.`);
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await Admin.findOneAndUpdate(
      { username },
      { password: hashedPassword }
    );

    console.log('✅ Password reset successfully!');
    console.log('📋 Updated Login Credentials:');
    console.log(`👤 Username: ${username}`);
    console.log(`🔑 Password: ${newPassword}`);
    console.log('');
    console.log('🌐 Login Steps:');
    console.log('1. Go to http://localhost:3000/login');
    console.log(`2. Enter Username: ${username}`);
    console.log(`3. Enter Password: ${newPassword}`);
    console.log('4. Click Login');

  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
};

resetAdminPassword();
