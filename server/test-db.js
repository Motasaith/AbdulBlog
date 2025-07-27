require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const testDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ MongoDB Connected successfully');

    // Check existing posts
    const posts = await Post.find({ deleted: false });
    console.log(`📝 Found ${posts.length} posts in database:`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (Created: ${post.createdAt})`);
    });

    if (posts.length === 0) {
      console.log('📝 No posts found. Database might be empty or posts might be in a different collection.');
      
      // Check all collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:', collections.map(c => c.name));
    }

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
};

testDatabase();
