import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Route for the login page
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Default route redirects to login
app.get('/', (req, res) => {
    res.redirect('/Login');
});

app.listen(port, () => {
    console.log(`Server đang chạy tại Port : http://localhost:${port}/Login`);
});
