import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function createTables() {
    try {
        const db = await open({
            filename: process.env.DB_PATH || 'incognito.db',
            driver: sqlite3.Database
        });

        const createUsersTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME NOT NULL,
            bio TEXT
        );
    `;

    await db.exec(createUsersTableSQL);
    console.log('SQLite tables created successfully');
    } catch (error) {
        console.error('Error creating SQLite tables:', error);
    }
};

export default createTables;