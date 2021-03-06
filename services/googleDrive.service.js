const { google } = require('googleapis');
const fs = require('fs');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});


exports.uploadFile = async (file) => {
    const response = await drive.files.create({
        requestBody: {
            name: 'google.png', //This can be name of your choice
            mimeType: 'image/png',
            parents: ['1erEDWzBVTABls6aaQNYTYzwFEdvR7yyh']
        },
        media: {
            mimeType: 'image/png',
            body: fs.createReadStream(file.path),
        },
    });
    return response
}


exports.deleteFile = async (fileId) => {
    const response = await drive.files.delete({ fileId });
    return response
}


exports.generatePublicUrl = async (fileId) => {
    await drive.permissions.create({
        fileId,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });
    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const response = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
    });
    return response
}