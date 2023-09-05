console.log("Hello Node Js");
// const { add, sub, mul, div, mod } = require('./math');

// console.log(math);

// console.log("Add : ", add(10, 2));
// console.log("sub : ", sub(10, 2));
// console.log("mul : ", mul(10, 2));
// console.log("div : ", div(10, 2));
// console.log("Mod : ", mod(9, 4));



// file system code

const fs = require('fs');

// fs.writeFileSync('./test.txt', "My name is Naeem ur Rahman Sajid");
// fs.writeFile('./test.txt', `Naeem ur rahman\n`, (err) => {
//      console.log(err);
// });

// fs.unlink('./test.tx', (err) => {
//      if (err) throw err;
// });

const d = new Date();

fs.appendFile('./date.txt', `${d.toLocaleDateString()} ${d.toLocaleTimeString()} \n`, (err) => {
     if (err) throw err;
})

const os = require('os');
console.log(os.cpus().length);

console.log('1');

fs.readFile('date.txt', "utf-8", (err, result) => {
     console.log(result);
})

console.log('2');
console.log('3');
console.log('4');