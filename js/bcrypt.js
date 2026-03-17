// Définir bcrypt à partir de dcodeIO.bcrypt
const bcrypt = dcodeIO.bcrypt;

// Fonction pour hacher un mot de passe
function hacherMotDePasse() {
    const motDePasse = document.getElementById('motDePasse').value;
    if (!motDePasse) {
        alert('Veuillez entrer un mot de passe à hacher.');
        return;
    }

    // Génération du hash avec bcrypt
    const saltRounds = 10; // Nombre de rounds pour le sel
    const hash = bcrypt.hashSync(motDePasse, saltRounds);

    // Affichage du hash dans la zone de texte
    document.getElementById('hashResultat').value = hash;
}

// Fonction pour vérifier un mot de passe
function verifierMotDePasse() {
    const motDePasse = document.getElementById('motDePasseVerif').value;
    const hash = document.getElementById('hashResultat').value;

    if (!motDePasse || !hash) {
        alert('Veuillez entrer un mot de passe et un hash pour vérifier.');
        return;
    }

    // Vérification du mot de passe avec bcrypt
    const isValid = bcrypt.compareSync(motDePasse, hash);

    // Affichage du résultat de la vérification
    document.getElementById('verifResultat').value = isValid
        ? 'Mot de passe valide !'
        : 'Mot de passe invalide.';
}