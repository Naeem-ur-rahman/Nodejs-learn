const express = require('express')
const fs = require('fs')
const status = require('express-status-monitor')

const app = express();
const PORT = 8000

app.use(status())

// app.get('/', (req, res) => {
//     fs.readFile('./sample.txt', (_err, data) => {
//         res.json({data});
//     })
// })

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end())
})

app.listen(PORT, () => `Server Started at PORT:${PORT}`)