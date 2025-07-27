require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const checkAdmins = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ MongoDB Connected successfully');

    // Check existing admins
    const admins = await Admin.find({});
    console.log(`👥 Found ${admins.length} admin accounts:`);
    
    if (admins.length > 0) {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username} | Role: ${admin.role || 'admin'} | Created: ${admin.createdAt || 'Unknown'}`);
      });
    } else {
      console.log('❌ No admin accounts found. You need to create one.');
    }

  } catch (error) {
    console.error('❌ Error checking admins:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
};

checkAdmins();
