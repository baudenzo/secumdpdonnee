// Définir bcrypt à partir de dcodeIO.bcrypt
const bcrypt = dcodeIO.bcrypt;

// Fonction pour hacher un mot de passe
function hacherMotDePasse() {
    const motDePasse = document.getElementById('motDePasse').value;
    const saltRounds = parseInt(document.getElementById('saltRounds').value, 10);

    if (!motDePasse) {
        alert('Veuillez entrer un mot de passe à hacher.');
        return;
    }

    if (isNaN(saltRounds) || saltRounds < 1 || saltRounds > 15) {
        alert('Veuillez entrer un nombre d\'itérations valide (entre 1 et 15).');
        return;
    }

    // Génération du hash avec bcrypt
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