const db = require('../config/db');

const initDatabase = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            contenu TEXT NOT NULL,
            auteur TEXT NOT NULL,
            date TEXT NOT NULL,
            categorie TEXT,
            tags TEXT
        )
    `;
    db.run(query, (err) => {
        if (err) console.error("❌ Erreur création table :", err.message);
        else console.log("📅 Table 'articles' prête.");
    });
};

module.exports = { initDatabase };
