const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
     res.send(`Welcome to Home Page ! ${req.query.name} ${req.query.age}`);
});

app.get('/about', (req, res) => {
     res.send(`I am a frontend Developer Learning Backend Node js`);
});

app.get('/contact', (req, res) => {
     res.send(`Contact me for building Responsive Web pages`);
});

app.listen(port, () => console.log(`Request for Server from port ${port}`));