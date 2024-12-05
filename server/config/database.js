const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '',  
  database: 'heyjuice'  
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
