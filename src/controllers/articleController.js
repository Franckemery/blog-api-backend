const db = require('../config/db');

// Créer
exports.createArticle = (req, res) => {
    const { titre, contenu, auteur, date, categorie, tags } = req.body || {};
    if (!titre || !contenu || !auteur || !date) {
        return res.status(400).json({ error: "Champs obligatoires manquants" });
    }
    const sql = `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [titre, contenu, auteur, date, categorie, tags], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        console.log(`📝 Article créé (ID: ${this.lastID})`);
        res.status(201).json({ message: "Succès", id: this.lastID });
    });
};

// Lire tout
exports.getAllArticles = (req, res) => {
    db.all("SELECT * FROM articles", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ articles: rows });
    });
};

// Lire un seul
exports.getArticleById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM articles WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Non trouvé" });
        res.status(200).json(row);
    });
};

// Recherche
exports.searchArticles = (req, res) => {
    const { query } = req.query;
    const term = `%${query}%`;
    db.all("SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?", [term, term], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ results: rows });
    });
};

// Modifier
exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const { titre, contenu, auteur, date, categorie, tags } = req.body || {};
    const sql = `UPDATE articles SET titre=?, contenu=?, auteur=?, date=?, categorie=?, tags=? WHERE id=?`;
    db.run(sql, [titre, contenu, auteur, date, categorie, tags, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Non trouvé" });
        res.status(200).json({ message: "Mis à jour" });
    });
};

// Supprimer
exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM articles WHERE id = ?", id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Non trouvé" });
        res.status(200).json({ message: "Supprimé" });
    });
};
