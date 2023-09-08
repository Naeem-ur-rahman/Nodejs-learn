const { json } = require('node:stream/consumers');
const mongoose = require('mongoose');
// const users = require('./MOCK_DATA.json');
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/learn-node')
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.log('Mongo Error', err));

// Schema
const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: true,
     },
     lastName: {
          type: String,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     jobTitle: {
          type: String,
     },
},
     { timestamps: true }
);

// Model
const User = mongoose.model('user', userSchema);

app.use(express.urlencoded({ extended: false }));
// Middlewares In express
app.use((req, res, next) => {
     console.log("middleware 1 : Security");
     next();
});

app.use((req, res, next) => {
     console.log("middleware 2 : Authetication");
     next();
});

app.get('/', (req, res) => {
     res.send(`Welcome to my REST API Tutorial <h1> Use the Route 'user' </h1>`)
});

app.get('/users', async (req, res) => {
     const allDbUsers = await User.find({});
     const html = `
     <ol>
     ${allDbUsers.map(user => `<li>${user.firstName} ${user.lastName} - ${user.email} </li>`).join("")}
     </ol>
     `
     return res.send(html);
});

app.get('/api/users', async (req, res) => {
     res.setHeader('X-Developer', "Naeem ur Rahman"); // Custom Headers
     // Custom header best practice to start with X-
     // console.log(req.headers); // Req headers
     const allDbUsers = await User.find({});
     return res.json(allDbUsers);
});

app.post('/users', async (req, res) => {
     const body = req.body;
     if (!body.first_name || !body.last_name || !body.email || !body.job_title) {
          return res.status(400).json({ msg: "All fields required!" })
     }

     const result = await User.create({
          firstName: body.first_name,
          lastName: body.last_name,
          email: body.email,
          jobTitle: body.job_title,
     });
     res.status(201).json({ msg: "success" });

     // users.push({ id: users[users.length - 1].id + 1, ...body });
     // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
     //      return res.status(201).json({
     //           status: 'Success',
     //           id: users[users.length - 1].id,
     //      });
     // });
});

app.route('/api/users/:id')
     .get((req, res) => {
          const id = Number(req.params.id);
          const user = users.find(user => user.id === id)
          if (!user) {
               return res.status(404).json({ error: "User not Found!" })
          }
          return res.json(user);
     })
     .patch((req, res) => {
          return res.json({ status: "pending" });
     })
     .delete((req, res) => {
          const id = Number(req.params.id);
          let index = -1;
          index = users.findIndex(user => user.id === id);
          if (index < 0) {
               return res.status(404).json({ msg: "User not Found" })
          }
          const deleteTuple = users[index];
          users.splice(index, 1);
          fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
               return res.json({ status: "Sucess", deltedId: index + 1, deleteTuple });
          })
     })

app.listen(PORT, () => console.log(`Server Listen at PORT:${PORT}`));