const API_URL = 'http://localhost:3000/api/articles';

// --- 1. CHARGEMENT ET AFFICHAGE ---
async function fetchArticles() {
    const res = await fetch(API_URL);
    const data = await res.json();
    displayArticles(data.articles);
}

function displayArticles(articles) {
    const container = document.getElementById('articlesList');
    container.innerHTML = '';
    
    if (articles.length === 0) {
        container.innerHTML = '<p>Aucun article trouvé.</p>';
        return;
    }

    articles.forEach(art => {
        container.innerHTML += `
            <div class="article-card">
                <h3>${art.titre}</h3>
                <p>${art.contenu}</p>
                <div class="meta">Par ${art.auteur} | Catégorie: ${art.categorie}</div>
                <div style="margin-top:10px;">
                    <button onclick="prepareEdit(${art.id})" style="width:auto; padding:5px 15px; background:orange;">Modifier</button>
                    <button onclick="deleteArticle(${art.id})" style="width:auto; padding:5px 15px; background:red;">Supprimer</button>
                </div>
            </div>
        `;
    });
}

// --- 2. RECHERCHE ---
async function searchArticles() {
    const query = document.getElementById('searchInput').value;
    console.log("🔍 Tentative de recherche pour :", query); // Pour vérifier dans F12

    if (!query || query.trim() === "") {
        fetchArticles(); // Si vide, on recharge tout
        return;
    }

    try {
        // On appelle bien /api/articles/search?query=...
        const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        console.log("✅ Résultats reçus :", data);

        // Attention : vérifie si ton backend renvoie { articles: [...] } ou { results: [...] }
        // Dans le code précédent, nous avons utilisé "articles"
        displayArticles(data.articles || data.results || []);
    } catch (error) {
        console.error("❌ Erreur lors de la recherche :", error);
    }
}

// OPTIONNEL : Permettre de chercher en appuyant sur "Entrée"
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchArticles();
    }
});

// --- 3. CRÉATION ET MODIFICATION (SUBMIT) ---
document.getElementById('articleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('articleId').value;
    const articleData = {
        titre: document.getElementById('titre').value,
        auteur: document.getElementById('auteur').value,
        contenu: document.getElementById('contenu').value,
        date: new Date().toLocaleDateString('fr-FR'),
        categorie: document.getElementById('categorie').value || 'Général'
    };

    if (id) {
        // --- CAS MODIFICATION (PUT) ---
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(articleData)
        });
        alert("Article mis à jour !");
    } else {
        // --- CAS CRÉATION (POST) ---
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(articleData)
        });
        alert("Article créé !");
    }

    resetForm();
    fetchArticles();
});

// --- 4. PRÉPARER LA MODIFICATION (remplir le formulaire) ---
async function prepareEdit(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const art = await res.json();

    // On remplit les champs du formulaire
    document.getElementById('articleId').value = art.id;
    document.getElementById('titre').value = art.titre;
    document.getElementById('auteur').value = art.auteur;
    document.getElementById('contenu').value = art.contenu;
    document.getElementById('categorie').value = art.categorie;

    // On change l'apparence du formulaire
    document.getElementById('formTitle').innerText = "Modifier l'article #" + id;
    document.getElementById('submitBtn').innerText = "Enregistrer les modifications";
    document.getElementById('cancelBtn').style.display = "block";
}

// --- 5. SUPPRESSION ---
async function deleteArticle(id) {
    if(confirm("Voulez-vous vraiment supprimer cet article ?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchArticles();
    }
}

// --- 6. RÉINITIALISER LE FORMULAIRE ---
function resetForm() {
    document.getElementById('articleForm').reset();
    document.getElementById('articleId').value = '';
    document.getElementById('formTitle').innerText = "Ajouter un article";
    document.getElementById('submitBtn').innerText = "Publier l'article";
    document.getElementById('cancelBtn').style.display = "none";
}

// Lancement initial
fetchArticles();