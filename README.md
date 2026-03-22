# INF222_TAF1
# API Backend Blog

Ce projet consiste en la réalisation d'une **API RESTful** complète pour la gestion d'un blog. Il a été développé dans le cadre de l'unité d'enseignement **INF222 - Développement Backend**.

L'objectif est de fournir une solution robuste pour la manipulation d'articles (CRUD), incluant une recherche textuelle et une documentation interactive via Swagger.

---
## 🛠️ Architecture Technique

Le projet repose sur une architecture **MVC (Modèle-Vue-Contrôleur)** simplifiée pour assurer une séparation claire des responsabilités :

*   **Runtime** : Node.js
*   **Framework** : Express.js
*   **Base de données** : SQLite3 (Base de données relationnelle légère)
*   **Documentation** : Swagger UI (OpenAPI 3.0)
*   **Middlewares** : CORS (Gestion des accès), Express JSON (Parsing des requêtes)

---

## 📁 Structure du Répertoire

```
blog-api-backend/
├── src/
│   ├── config/          # Connexion à la base de données SQLite
│   ├── controllers/     # Logique métier et manipulation des données
│   ├── models/          # Initialisation des tables SQL
│   ├── routes/          # Définition des points d'entrée et doc Swagger
│   └── app.js           # Configuration et lancement du serveur
├── .gitignore           # Exclusion des fichiers inutiles (node_modules, etc.)
├── database.sqlite      # Fichier de stockage des données (généré au lancement)
├── package.json         # Gestion des dépendances et scripts
└── README.md            # Documentation détaillée du projet
```

---

# ⚙️ Installation et Utilisation

### 1. Installation des dépendances

Ouvrez votre terminal dans le dossier du projet et exécutez :
~~~
npm install
~~~

### 2. Lancement du serveur

Pour démarrer l'API avec rechargement automatique (Nodemon) :
~~~
npm run dev
~~~
Le serveur sera actif sur : http://localhost:3000

---
# 📖 Guide d'Utilisation : Swagger UI pour l'API Blog

Une fois que votre serveur est lancé (npm run dev), ouvrez votre navigateur à l'adresse suivante :
👉 http://localhost:3000/api-docs

### Méthode	Chemin	Description
~~~
GET /api/articles	                     # Récupère la liste de tous les articles.

POST /api/articles                     # Crée un nouvel article.

GET /api/articles/:id	                 # Récupère un article spécifique par son identifiant unique.

PUT /api/articles/:id	                 # Met à jour les informations d'un article existant.

DELETE	/api/articles/:id	             # Supprime un article de la base de données.

GET	/api/articles/search	             # Recherche des articles par mot-clé dans le titre ou le contenu.
~~~

Exemple de corps de requête (POST / PUT)
~~~
code JSON
{
  "titre": "Développement Backend avec Node.js",
  "contenu": "Le framework Express facilite la création d'APIs...",
  "auteur": "Charles Njiosseu",
  "date": "2026-03-21",
  "categorie": "Technologie",
  "tags": "node, express, backend"
}
~~~
---
## Comment ça marche ?
### 1. Règle d'or : Le bouton "Try it out"

Pour chaque requête ci-dessous, vous ne pouvez rien modifier tant que vous n'avez pas cliqué sur le bouton blanc "Try it out" situé à droite de la barre de la requête. Une fois cliqué, les champs deviennent modifiables.

### 2. Lister tous les articles (GET /api/articles)

- Objectif : Voir tous les articles enregistrés dans la base de données.
- Action :
  1. Cliquez sur la barre bleue GET /api/articles.
  2. Cliquez sur "Try it out".
  3. Cliquez sur le gros bouton bleu "Execute".
- Résultat : Dans la section "Responses" en bas, vous verrez le code 200 et la liste de vos articles en format JSON.

### 3. Créer un nouvel article (POST /api/articles)

- Objectif : Ajouter un article dans la base de données.
- Action :
  1. Cliquez sur la barre verte POST /api/articles.
  2. Cliquez sur "Try it out".
  3. Dans le cadre "Request body", remplacez le texte par vos données (Titre, Contenu, Auteur, Date...).
  4. Cliquez sur "Execute".
- Résultat : Si tout est bon, vous verrez le code 201 (Created) et l'ID de l'article créé.

### 4. Rechercher un article (GET /api/articles/search)

- Objectif : Trouver des articles contenant un mot précis.
- Action :
  1. Cliquez sur la barre bleue GET /api/articles/search.
  2. Cliquez sur "Try it out".
  3. Dans le champ "query", tapez le mot que vous cherchez (ex: Node).
  4. Cliquez sur "Execute".
- Résultat : L'API affiche uniquement les articles dont le titre ou le contenu contient ce mot.

### 5. Voir un article spécifique (GET /api/articles/{id})
- Objectif : Afficher les détails d'un seul article grâce à son numéro (ID).
- Action :
  1. Cliquez sur la barre bleue GET /api/articles/{id}.
  2. Cliquez sur "Try it out".
  3. Dans le champ "id", tapez le numéro de l'article (ex: 1).
  4. Cliquez sur "Execute".
- Résultat : L'article correspondant s'affiche. Si l'ID n'existe pas, vous verrez une erreur 404.

### 6. Modifier un article (PUT /api/articles/{id})
- Objectif : Changer le texte ou l'auteur d'un article existant.
- Action :
  1. Cliquez sur la barre orange PUT /api/articles/{id}.
  2. Cliquez sur "Try it out".
  3. Entrez l'ID de l'article à modifier.
  4. Dans le "Request body", modifiez les textes comme vous le souhaitez.
  5. Cliquez sur "Execute".
- Résultat : Vous recevrez un message "Article mis à jour".

### 7. Supprimer un article (DELETE /api/articles/{id})
- Objectif : Effacer définitivement un article.
- Action :
  1. Cliquez sur la barre rouge DELETE /api/articles/{id}.
  2. Cliquez sur "Try it out".
  3. Entre l'ID de l'article à supprimer.
  4. Cliquez sur "Execute".
- Résultat : L'article est supprimé de la base SQLite.

---

## 🛡️ Bonnes Pratiques Appliquées

1. Validation des entrées : Vérification systématique de la présence des champs obligatoires (Titre, Contenu, Auteur, Date).
2. Gestion des codes HTTP :
  - 201 Created pour une création réussie.
  - 200 OK pour les lectures, mises à jour et suppressions.
  - 404 Not Found si une ressource est inexistante.
  - 400 Bad Request en cas de données manquantes dans la requête.
3. Persistance des données : Utilisation de SQLite pour conserver les articles même après redémarrage du serveur.
4. Sécurité de base : Implémentation du middleware cors pour autoriser les requêtes provenant d'origines différentes.

---
