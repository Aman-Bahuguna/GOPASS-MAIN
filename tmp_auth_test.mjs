import http from 'http';
import https from 'https';

const registerData = JSON.stringify({
    email: "test.pro@example.com",
    password: "Password123!",
    fullName: "Test Pro",
    role: "STUDENT"
});

const reqRegister = https.request({
    hostname: 'eventhub-backend-prsg.onrender.com',
    port: 443,
    path: '/api/auth/signup', // Note: User's auth slice uses /auth/login locally? Wait, what's the live URL?
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => console.log('Register Res:', data));
});
reqRegister.on('error', e => console.error(e));
reqRegister.write(registerData);
reqRegister.end();
