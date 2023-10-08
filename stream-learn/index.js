const express = require('express')
const fs = require('fs')

const app = express();
const PORT = 8000

app.get('/', (req, res) => {
    fs.readFile('./sam.txt', (err, data) => {
        res.end(data);
    })
})

app.listen(PORT,()=>"Server Started")