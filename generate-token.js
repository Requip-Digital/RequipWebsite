const { google } = require('googleapis');
const http = require('http');
const url = require('url');

// STEP 1: Replace these with your credentials from Google Cloud Console
const CLIENT_ID = '872428949746-ru6bla7jhgdmjciac92mpggckav1jp61.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
  prompt: 'consent' // This ensures we get a refresh token
});

// Start a temporary HTTP server to catch the redirect
const server = http.createServer(async (req, res) => {
  if (req.url.startsWith(url.parse(REDIRECT_URI).pathname)) {
    const query = url.parse(req.url, true).query;
    const code = query.code;

    if (code) {
      try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('\n✅ SUCCESS! Your OAuth2 credentials:');
        console.log('=====================================');
        console.log('Refresh Token:', tokens.refresh_token);
        console.log('Access Token:', tokens.access_token);
        console.log('\n📝 Add these to your .env.local file:');
        console.log('=====================================');
        console.log(`EMAIL_SERVICE=gmail`);
        console.log(`EMAIL_USER=your-email@gmail.com`);
        console.log(`EMAIL_CLIENT_ID=${CLIENT_ID}`);
        console.log(`EMAIL_CLIENT_SECRET=${CLIENT_SECRET}`);
        console.log(`EMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
        console.log(`EMAIL_ACCESS_TOKEN=${tokens.access_token}`);
        console.log(`EMAIL_TO=recipient@example.com`);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>✅ Authentication successful! You can close this tab.</h1>');
      } catch (error) {
        console.error('❌ Error getting tokens:', error.message);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>❌ Authentication failed. Check console for errors.</h1>');
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h1>❌ No code found in redirect.</h1>');
    }
    server.close(); // Close the server after handling the request
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('🚀 OAuth2 Token Generator Started');
  console.log('================================');
  console.log('1. Make sure your Next.js development server is NOT running on port 3000');
  console.log('2. Visit this URL to authorize the application:');
  console.log('\n' + authUrl + '\n');
  console.log('3. After authorization, you will be redirected and tokens will be displayed');
  console.log('\nWaiting for redirect on http://localhost:3000/api/auth/callback/google...');
}); 