const express = require('express');
const os = require('os')
const cluster = require('cluster');

const totalCPUs = os.cpus().length

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 1; i <= totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express()
    const PORT = 8000;
    app.get('/', (req, res) => {
        res.json({
            message: `Hello from Express Server ${process.pid}`
        })
    })
    app.listen(PORT, () => console.log(`Server Started at Pid: ${process.pid}`))
}