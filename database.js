const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbUserPath = path.resolve(__dirname, "users.db");
const usersDB = new sqlite3.Database(dbUserPath);
usersDB.serialize(() => {
  usersDB.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    token TEXT
  )`);
});

const dbTransactionPath = path.resolve(__dirname, "transactions.db");
const transactionsDB = new sqlite3.Database(dbTransactionPath);
transactionsDB.serialize(() => {
  transactionsDB.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transactionid INTEGER,
    status TEXT,
    type TEXT,
    clientname TEXT,
    amount REAL
  )`);
});

module.exports = {
  usersDB,
  transactionsDB,
};

// const sqlite3 = require("sqlite3").verbose();
// const usersDB = new sqlite3.Database("./users.db");

// // Видалення таблиці, якщо вона існує
// usersDB.run(`DROP TABLE IF EXISTS transactions`, (err) => {
//   if (err) {
//     console.error("Error dropping table:", err.message);
//   } else {
//     console.log("Table 'transactions' dropped successfully");
//   }
// });

// usersDB.close();
