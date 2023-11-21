import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

const dbCreation = db.serialize(() => {
    // table for users
    db.run("CREATE TABLE IF NOT EXISTS users ( \
        id INTEGER PRIMARY KEY AUTOINCREMENT, \
        username TEXT NOT NULL, \
        email TEXT NOT NULL, \
        password TEXT NOT NULL, \
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, \
        bio TEXT \
    )");

    // table for messages
    db.run("CREATE TABLE IF NOT EXISTS messages ( \
        id INTEGER PRIMARY KEY AUTOINCREMENT, \
        conversationID INTEGER NOT NULL, \
        senderID INTEGER NOT NULL, \
        content TEXT NOT NULL, \
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP \
    )");
});

export default dbCreation;