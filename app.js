// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./leaderboard.db');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// app.js
app.use(express.static(__dirname + '/public'));


db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS leaders (name TEXT, tree_count INTEGER)");
});
app.get('/', (req, res) => {
    
      res.render('home');
  
  });
app.get('/listele', (req, res) => {
  db.all("SELECT * FROM leaders ORDER BY tree_count DESC LIMIT 10", [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    
    res.render('listele', { leaders: rows });
  });
});

app.post('/', (req, res) => {
  const name = req.body.name;
  const tree_count = req.body.tree_count;

  db.run(`INSERT INTO leaders(name, tree_count) VALUES(?,?)`, [name, tree_count], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/listele');
  });
});



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
