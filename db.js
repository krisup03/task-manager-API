const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // XAMPP default username
  password: "",       // XAMPP default is empty
  database: "auth_system"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("MySQL connected ✅");
});

module.exports = db;
