// Fonction pour générer le hash SHA-256 d'un fichier sélectionné par l'utilisateur
async function genererHash() {
    const fichier = document.getElementById('fichier').files[0];
    const resultat = document.getElementById('resultat');

    if (!fichier) {
        resultat.value = "Veuillez sélectionner un fichier.";
        return;
    }

    const buffer = await fichier.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    resultat.value = hashHex;
}