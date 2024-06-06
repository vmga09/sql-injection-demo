// {
    const express = require('express');
    const bodyParser = require('body-parser');
    const sqlite3 = require('sqlite3').verbose();
    
    const app = express();
    app.use(express.static('.'));
    app.use(bodyParser.urlencoded({extended: true}));
    
    const db = new sqlite3.Database(':memory:');
    db.serialize(function() {
      db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
      db.run("INSERT INTO user VALUES ('admin', 'admin123', 'App Administrator')");
      db.run("INSERT INTO user VALUES ('user', 'user123', 'App User')");
    });
    // }
    app.post('/login', function (req, res) {
        const username = req.body.username; // a valid username is admin
        const password = req.body.password; // a valid password is admin123
        const query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";
    
        console.log("username: " + username);
        console.log("password: " + password);
        console.log('query: ' + query);
        
        db.get(query , function(err, row) {
    
            if(err) {
                console.log('ERROR', err);
                res.redirect("/index.html#error");
            } else if (!row) {
                res.redirect("/index.html#unauthorized");
            } else {
                res.send('Hello <b>' + row.name + '</b><br /><a href="/index.html">Go back to login</a>');
            }
        });
    
    });
    
    app.listen(3100);
    console.log("APP corriendo puerto 3100");
    