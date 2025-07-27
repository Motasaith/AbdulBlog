#!/usr/bin/env node

/**
 * Production Admin Setup Script
 * 
 * This script should be run ONCE after deploying to production
 * to create the initial admin account from environment variables.
 * 
 * Usage: node scripts/deploy-setup-admin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const deploySetupAdmin = async () => {
  try {
    console.log('🚀 Production Admin Setup Starting...');
    
    // Validate environment
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️ Warning: Not running in production environment');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ Connected to production database');

    // Validate required environment variables
    const requiredVars = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'ADMIN_EMAIL'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:', missing.join(', '));
      console.error('Please set these in your deployment platform:');
      missing.forEach(varName => {
        console.error(`   ${varName}=your_value_here`);
      });
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (existingAdmin) {
      console.log('✅ Admin account already exists');
      console.log(`👤 Username: ${process.env.ADMIN_USERNAME}`);
      console.log('✋ Skipping admin creation');
      return;
    }

    // Create production admin
    console.log('👤 Creating production admin account...');
    
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    
    const productionAdmin = new Admin({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      role: 'admin',
      fullName: process.env.ADMIN_FULL_NAME || 'Production Administrator',
      email: process.env.ADMIN_EMAIL,
      bio: 'Production Administrator Account',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await productionAdmin.save();

    console.log('✅ Production admin created successfully!');
    console.log('');
    console.log('🔐 Security Status:');
    console.log('✓ Password securely hashed (bcrypt, 12 rounds)');
    console.log('✓ Credentials from environment variables');
    console.log('✓ Ready for production use');
    console.log('');
    console.log('📋 Admin Account:');
    console.log(`👤 Username: ${process.env.ADMIN_USERNAME}`);
    console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
    console.log('🔑 Password: [SECURE - FROM ENV]');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('1. Test login at your-domain.com/login');
    console.log('2. Change password after first login');
    console.log('3. Set up additional admin accounts if needed');
    console.log('4. Configure any remaining production settings');

  } catch (error) {
    console.error('❌ Production setup failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
};

// Only run if called directly
if (require.main === module) {
  deploySetupAdmin();
}

module.exports = deploySetupAdmin;
