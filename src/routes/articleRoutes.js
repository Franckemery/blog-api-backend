const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Liste tous les articles
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Créer un nouvel article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre: {type: string}
 *               contenu: {type: string}
 *               auteur: {type: string}
 *               date: {type: string}
 *               categorie: {type: string}
 *               tags: {type: string}
 *     responses:
 *       201:
 *         description: Article créé
 */
router.get('/', articleController.getAllArticles);
router.post('/', articleController.createArticle);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher un article
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Résultats trouvés
 */
router.get('/search', articleController.searchArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article trouvé
 *   put:
 *     summary: Modifier un article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Article mis à jour
 *   delete:
 *     summary: Supprimer un article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Article supprimé
 */
router.get('/:id', articleController.getArticleById);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
