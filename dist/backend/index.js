"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Serve static files from the frontend dist directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend')));
// Route for the login page
app.get('/Login', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend/index.html'));
});
// Default route redirects to login
app.get('/', (req, res) => {
    res.redirect('/Login');
});
app.listen(port, () => {
    console.log(`Server đang chạy tại Port : http://localhost:${port}/Login`);
});
//# sourceMappingURL=index.js.map