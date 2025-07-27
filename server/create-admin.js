require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ MongoDB Connected successfully');

    // Create new admin credentials
    const username = 'newadmin';
    const password = 'password123';

    // Check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log(`❌ Admin with username '${username}' already exists.`);
      console.log('Try logging in with:');
      console.log(`Username: ${username}`);
      console.log(`Password: password123`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      role: 'admin',
      fullName: 'New Administrator',
      email: 'admin@yourdomain.com',
      bio: 'Blog Administrator'
    });

    await newAdmin.save();

    console.log('✅ New admin created successfully!');
    console.log('📋 Login Credentials:');
    console.log(`👤 Username: ${username}`);
    console.log(`🔑 Password: ${password}`);
    console.log('');
    console.log('🌐 Login Steps:');
    console.log('1. Go to http://localhost:3000/login');
    console.log(`2. Enter Username: ${username}`);
    console.log(`3. Enter Password: ${password}`);
    console.log('4. Click Login');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
};

createAdmin();
