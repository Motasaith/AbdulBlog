require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const setupSecureAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ MongoDB Connected successfully');

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminFullName = process.env.ADMIN_FULL_NAME;

    if (!adminUsername || !adminPassword) {
      console.error('❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
      process.exit(1);
    }

    console.log('🧹 Cleaning up existing admin accounts...');
    
    // Delete ALL existing admin accounts
    const deleteResult = await Admin.deleteMany({});
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing admin accounts`);

    // Create new secure admin account
    console.log('👤 Creating new secure admin account...');
    
    const hashedPassword = await bcrypt.hash(adminPassword, 12); // Using 12 rounds for extra security
    
    const secureAdmin = new Admin({
      username: adminUsername,
      password: hashedPassword,
      role: 'admin',
      fullName: adminFullName || 'Blog Administrator',
      email: adminEmail || 'admin@abdulblog.com',
      bio: 'Secure Administrator Account',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await secureAdmin.save();

    console.log('✅ Secure admin account created successfully!');
    console.log('');
    console.log('🔐 Security Features:');
    console.log('✓ Password hashed with bcrypt (12 rounds)');
    console.log('✓ Credentials stored in environment variables');
    console.log('✓ All old hardcoded admins removed');
    console.log('');
    console.log('📋 Login Information:');
    console.log(`👤 Username: ${adminUsername}`);
    console.log(`🔑 Password: [FROM .ENV FILE]`);
    console.log(`📧 Email: ${adminEmail}`);
    console.log('');
    console.log('🌐 How to Login:');
    console.log('1. Go to http://localhost:3000/login');
    console.log(`2. Username: ${adminUsername}`);
    console.log('3. Password: (check your .env file)');
    console.log('4. Click Login to access admin dashboard');
    console.log('');
    console.log('🛡️ Security Recommendations:');
    console.log('- Never commit .env file to version control');
    console.log('- Use strong passwords with special characters');
    console.log('- Change default passwords in production');
    console.log('- Enable 2FA if implementing in future');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
};

setupSecureAdmin();
