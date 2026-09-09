const express = require('express');
const app = express();

const mockData = {
    photos: ['https://via.placeholder.com/150?text=Private+Photo+1', 'https://via.placeholder.com/150?text=Private+Photo+2'],
    reels: ['https://via.placeholder.com/150?text=Private+Reel+1', 'https://via.placeholder.com/150?text=Private+Reel+2']
};

app.get('/search', (req, res) => {
    const profileUrl = req.query.url;
    const debugMode = req.query.debug;

    if (debugMode === 'true') {
        return res.send(`<body style="background:black; color:lime; font-family:monospace; padding:20px;"><h1>SYSTEM OVERRIDE: ADMIN CONSOLE</h1><p>Welcome, Developer. You found the backdoor.</p><a href="/" style="color:white;">Return</a></body>`);
    }

    res.send(`
        <html style="background:black; color:white; font-family:sans-serif; text-align:center;">
            <body style="margin:0; padding:50px;">
                <div style="border:2px solid red; padding:20px; box-shadow: 0 0 20px red; background:rgba(0,0,0,0.8); max-width:600px; margin:auto;">
                    <a href="/" style="color:red; text-decoration:none;">← ABORT</a>
                    <h2 style="color:red;">Accessing Private Profile...</h2>
                    <p style="font-family:monospace;">Target: ${profileUrl}</p>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;">
                        ${mockData.photos.concat(mockData.reels).map(img => `<img src="${img}" style="width:100px; height:100px; border:1px solid white;">`).join('')}
                    </div>
                </div>
            </body>
        </html>
    `);
});

app.get('/', (req, res) => {
    res.send(`
        <html style="background:black; color:white; font-family:monospace; display:flex; justify-content:center; align-items:center; height:100vh; margin:0;">
            <body style="text-align:center;">
                <div style="border:3px double red; padding:40px; box-shadow: 0 0 30px red;">
                    <h1 style="color:red; font-size:3rem;">INSTA-BREACH</h1>
                    <form action="/search" method="GET">
                        <input type="text" name="url" placeholder="Private Profile URL..." style="padding:10px; width:300px;" required>
                        <button type="submit" style="padding:10px; background:darkred; color:white; border:none; cursor:pointer;">BYPASS</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

module.exports = app;
