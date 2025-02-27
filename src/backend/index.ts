import express from "express";
import path from "path";
import { Request, Response } from 'express';

const app = express();

app.set("view engine", "ejs");
app.set("views", "templates");

// Serve static files
app.use('/assets', express.static(path.join("dist/frontend")));
app.use("/", express.static(path.join("public")));

// Routes
app.get("/board", (req: Request, res: Response) => {
    res.render('index', { isLoginPage: false });
});

app.get("/login", (req: Request, res: Response) => {
    res.render('login', { isLoginPage: true });
});

// Default route redirects to login
app.get("/", (req: Request, res: Response) => {
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server đang chạy tại Port : http://localhost:3000/login');
});
