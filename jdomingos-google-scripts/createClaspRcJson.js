const fs = require('fs');
const path = require('path');
function generateClaspJson(clientId, clientSecret, refreshToken) {
  return {
    token: {
      access_token: "",
      scope: "https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/logging.read https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/script.webapp.deploy https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/service.management",
      token_type: "Bearer",
      expiry_date: 0,
      refresh_token: refreshToken
    },
    oauth2ClientSettings: {
      clientId,
      clientSecret,
      redirectUri: "http://localhost"
    },
    isLocalCreds: false
  };
}
const clientId = process.env.CLASP_CLIENT_ID;
const clientSecret = process.env.CLASP_CLIENT_SECRET;
const refreshToken = process.env.CLASP_REFRESH_TOKEN;
const claspJSON = generateClaspJson(clientId, clientSecret, refreshToken);
fs.writeFileSync(path.join(__dirname,'.clasprc.json'),JSON.stringify(claspJSON));