const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const fs = require('fs');
const users = require('./data.js').userDB;

const app = express();
const server = http.createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));



require('./public/image_display.js');



app.post('/upload', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join(__dirname, 'uploads', filename);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', function () {
    res.send(`<div><h1>Successfully uploaded</h1><br><br><a href="./image_upload.html">Back to Main Page</a></div>`);
  //res.send("<br><a href='./image_upload.html'>Back to main page</a>");
  });

  return req.pipe(busboy);
});

app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {

            let hashPassword = await bcrypt.hash(req.body.password, 10);

            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
          //  userDB.push(newUser);
            console.log('User list', users);

            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'></div>");
            res.send("<br><a href='./registration.html'>Register again</a>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {

            let submittedPass = req.body.password;
            let storedPass = foundUser.password;

            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send(`<div align ='center' ><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a><br><br><br><a href='./image_upload.html'>Main Page</a></div>`);

          } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {

            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);

            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});



server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});
