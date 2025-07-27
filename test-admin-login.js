const http = require('http');

const testAdminLogin = () => {
  console.log('🧪 Testing admin login...');
  
  const loginData = JSON.stringify({
    username: 'admin_user',
    password: 'SecureP@ssw0rd2024!'
  });
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (res.statusCode === 200 && response.token) {
          console.log('✅ Admin login successful!');
          console.log('📋 Response:');
          console.log(`🎫 Token received: ${response.token.substring(0, 20)}...`);
          console.log(`👤 User ID: ${response.user._id}`);
          console.log(`🔑 Role: ${response.user.role}`);
          console.log('');
          console.log('🌐 Ready to use admin dashboard!');
        } else {
          console.log('❌ Login failed:');
          console.log('Status:', res.statusCode);
          console.log('Response:', response);
        }
      } catch (error) {
        console.error('❌ Failed to parse response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request failed:', error.message);
  });

  req.write(loginData);
  req.end();
};

testAdminLogin();
