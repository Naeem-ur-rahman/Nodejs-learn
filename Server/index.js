const http = require('http');
const fs = require('fs');
const url = require('url')
const server = http.createServer((req, response) => {

     if (req.url === "/favicon.ico") return response.end();

     myurl = url.parse(req.url, true);

     if (myurl.pathname == '/') {
          response.end(`<h1>Naeem ur Rahman Sajid</h1>`);
     } else if (myurl.pathname == '/about-us') {
          response.end(`<h2>I am a Frontend Developer. I create beautifull UI's</h2>`);
     } else if (myurl.pathname == '/contact-us') {
          response.end('<p>Contact me for the frontend Services</p>')
     } else if (myurl.pathname == '/search') {
          const search = myurl.query.s;
          response.end(`Here you result for  ${search}`)
     } else {
          response.end('<h1>404 : Request Failed</h1>')
     }

     let log = `${Date.now()} ${req.method} : Request (${req.url}) \n`;

     fs.appendFile('log.txt', log, (err) => {
          if (err) throw new err;
     });
});

server.listen(3000, () => {
     console.log('Server Started');
})