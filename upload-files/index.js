const express = require('express');
const multer = require('multer');
const path = require('path')

const app = express()
const PORT = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
});

const upload = multer({ storage });

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.render('fileupload')
})

app.post('/upload', upload.single('profile'), (req, res) => {
    return res.redirect('/');
})

app.listen(PORT, () => console.log(`Server Listen at PORT ${PORT}`))