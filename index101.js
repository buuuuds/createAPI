import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Wow, Maruong na ako gumawa ng API");
});

app.get('/update', (req, res) => {
    res.send("This is update page");
});

app.listen(3000, () => {
    console.log("Running in port" + 3000);
    console.log("Server is running on http://localhost:3000");
});