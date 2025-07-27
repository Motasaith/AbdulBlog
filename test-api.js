// Simple test without requiring any dependencies
const http = require('http');

const testAPI = () => {
  console.log('Testing API endpoint...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/posts',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const posts = JSON.parse(data);
        if (Array.isArray(posts)) {
          console.log('✅ API Response received');
          console.log(`📝 Found ${posts.length} posts`);
          posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
          });
        } else {
          console.log('❌ Response is not an array:', data);
        }
      } catch (error) {
        console.error('❌ Failed to parse response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ API Error:', error.message);
  });

  req.end();
};

testAPI();
