const bs3 = require('better-sqlite3')

const Database = bs3('data.db', { verbose: console.log })
Database.exec(
    `
    CREATE TABLE IF NOT EXISTS reminder (
    userId TEXT,
    reminderId TEXT,
    expiryDate TEXT,
    content TEXT,
    PRIMARY KEY (userId, reminderId)
    );
    `
)

module.exports = Database