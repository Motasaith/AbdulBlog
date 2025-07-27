require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Post = require('../models/Post');

const setupAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log('🗄️ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log('📧 Username: admin');
      console.log('🔑 Use your existing password');
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new Admin({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        fullName: 'Blog Administrator',
        email: 'admin@abdulblog.com',
        bio: 'Administrator of AbdulBlog platform'
      });

      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log('📧 Username: admin');
      console.log('🔑 Password: admin123');
    }

    // Check if posts exist
    const postCount = await Post.countDocuments({ deleted: false });
    console.log(`📝 Current posts in database: ${postCount}`);

    if (postCount === 0) {
      // Get admin ID for posts
      const admin = await Admin.findOne({ username: 'admin' });
      
      // Create sample posts
      const samplePosts = [
        {
          title: 'Welcome to Modern Blog Platform',
          excerpt: 'Discover our modern blog platform built with the MERN stack, featuring rich markdown editing, modern UI, and secure authentication.',
          content: `# Welcome to Our Blog!

This is a **modern blog platform** built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 📝 Rich markdown editor
- 🎨 Modern UI with Tailwind CSS
- 🔐 Secure authentication
- 📱 Responsive design
- ⚡ Fast and optimized

## Getting Started

You can now create, edit, and manage your blog posts through the admin dashboard.

Happy blogging! 🚀`,
          tags: ['welcome', 'blog', 'introduction'],
          thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
          createdBy: admin._id
        },
        {
          title: 'Building Modern Web Applications',
          excerpt: 'Explore the key technologies and best practices for building modern web applications with React, Node.js, and MongoDB.',
          content: `# The Future of Web Development

Modern web applications are becoming more sophisticated and user-friendly than ever before.

## Key Technologies

### Frontend
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database

## Best Practices

1. **Security First** - Always implement proper authentication
2. **Performance** - Optimize for speed and user experience
3. **Accessibility** - Make your app usable for everyone
4. **Responsive Design** - Works great on all devices

Stay tuned for more technical insights! 💻`,
          tags: ['web-development', 'technology', 'programming'],
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
          createdBy: admin._id
        },
        {
          title: 'Tips for Better Blog Writing',
          excerpt: 'Learn essential tips and strategies for creating engaging blog content that connects with your audience and drives engagement.',
          content: `# Writing Engaging Blog Posts

Creating compelling content is an art that requires practice and strategy.

## Writing Tips

### 1. Know Your Audience
Understanding who you're writing for helps you craft more relevant content.

### 2. Strong Headlines
Your title is the first thing readers see - make it count!

### 3. Clear Structure
Use headings, bullet points, and short paragraphs for better readability.

### 4. Tell Stories
People connect with stories more than dry facts.

## Content Strategy

- **Consistency** - Post regularly to build an audience
- **Value** - Always provide something useful to your readers
- **Engagement** - Respond to comments and feedback
- **SEO** - Optimize for search engines

> "The best writing is rewriting." - E.B. White

Keep practicing and your writing will improve! ✍️`,
          tags: ['writing', 'blogging', 'content-strategy'],
          thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
          createdBy: admin._id
        }
      ];

      // Insert sample posts
      await Post.insertMany(samplePosts);
      console.log(`✅ Created ${samplePosts.length} sample posts`);
    }

    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to http://localhost:3000');
    console.log('2. Navigate to admin login');
    console.log('3. Login with username: admin, password: admin123');
    console.log('4. Start creating your blog posts!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

setupAdmin();
