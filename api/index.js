const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// MOCK DATA: This simulates the "hacked" profile content
const mockData = {
    photos: ['https://via.placeholder.com/150?text=Private+Photo+1', 'https://via.placeholder.com/150?text=Private+Photo+2'],
    reels: ['https://via.placeholder.com/150?text=Private+Reel+1', 'https://via.placeholder.com/150?text=Private+Reel+2']
};

app.get('/search', (req, res) => {
    const profileUrl = req.query.url;
    const debugMode = req.query.debug; // The hidden loophole trigger

    // If the student finds the hidden 'debug' parameter, they get "Admin Access"
    if (debugMode === 'true') {
        return res.send(`
            <body style="background:black; color:lime; font-family:monospace; padding:20px;">
                <h1>SYSTEM OVERRIDE: ADMIN CONSOLE</h1>
                <p>Welcome, Developer. You found the backdoor.</p>
                <p>Server Status: Vulnerable</p>
                <p>Database: Mock_Insta_DB</p>
                <a href="/" style="color:white;">Return to User View</a>
            </body>
        `);
    }

    res.send(`
        <html>
            <head>
                <style>
                    body { 
                        background-color: black; 
                        color: white; 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        text-align: center; 
                        margin: 0;
                        overflow-x: hidden;
                    }
                    /* Blood Splash Design */
                    .blood {
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: radial-gradient(circle at 10% 10%, rgba(139, 0, 0, 0.4) 0%, transparent 40%),
                                    radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.4) 0%, transparent 40%);
                        z-index: -1;
                        pointer-events: none;
                    }
                    .container { max-width: 800px; margin: 50px auto; padding: 20px; border: 2px solid #8B0000; background: rgba(0,0,0,0.8); box-shadow: 0 0 20px #ff0000; }
                    .gallery { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 20px; }
                    .item { width: 150px; height: 150px; border: 2px solid #fff; object-fit: cover; }
                    .back-btn { color: #ff0000; text-decoration: none; font-weight: bold; cursor: pointer; }
                    h2 { color: #ff0000; text-transform: uppercase; letter-spacing: 2px; }
                </style>
            </head>
            <body>
                <div class="blood"></div>
                <div class="container">
                    <a class="back-btn" href="/">← ABORT MISSION</a>
                    <h2>Accessing Private Profile...</h2>
                    <p style="font-family: monospace;">Target: ${profileUrl}</p>
                    <hr style="border: 1px solid #8B0000;">
                    <div class="gallery">
                        ${mockData.photos.map(img => `<img src="${img}" class="item">`).join('')}
                        ${mockData.reels.map(img => `<img src="${img}" class="item">`).join('')}
                    </div>
                </div>
            </body>
        </html>
    `);
});

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body { 
                        background-color: black; 
                        color: white; 
                        font-family: 'Courier New', Courier, monospace; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        margin: 0; 
                    }
                    .blood {
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: radial-gradient(circle at 50% 0%, rgba(139, 0, 0, 0.6) 0%, transparent 70%);
                        z-index: -1;
                    }
                    .search-box { 
                        text-align: center; 
                        padding: 40px; 
                        border: 3px double #ff0000; 
                        background: rgba(20, 20, 20, 0.9); 
                        box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
                    }
                    h1 { color: #ff0000; font-size: 3rem; margin-bottom: 20px; text-shadow: 2px 2px #550000; }
                    input { 
                        padding: 15px; 
                        width: 350px; 
                        background: white; 
                        border: none; 
                        outline: none; 
                        font-size: 1rem; 
                        border-radius: 0px; 
                    }
                    button { 
                        padding: 15px 25px; 
                        background: #8B0000; 
                        color: white; 
                        border: none; 
                        cursor: pointer; 
                        font-weight: bold; 
                        transition: 0.3s; 
                    }
                    button:hover { background: #ff0000; box-shadow: 0 0 10px #ff0000; }
                </style>
            </head>
            <body>
                <div class="blood"></div>
                <div class="search-box">
                    <h1>INSTA-BREACH</h1>
                    <form action="/search" method="GET">
                        <input type="text" name="url" placeholder="Enter Private Profile URL..." required>
                        <button type="submit">BYPASS PRIVACY</button>
                    </form>
                    <p style="font-size: 0.8rem; margin-top: 20px; color: #666;">Security Level: Maximum</p>
                </div>
            </body>
        </html>
    `);
});

module.exports = app;
;
