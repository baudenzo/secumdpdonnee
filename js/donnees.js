let donneesStockees = null;
let ivStocke = null;

async function genererCle(motDePasse) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(motDePasse),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("sel-rgpd"),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

async function chiffrerDonnees() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const cle = document.getElementById('cleChiffrement').value;
    const resultat = document.getElementById('donneesChiffrees');

    if (!nom || !prenom || !email || !dateNaissance || !cle) {
        resultat.value = "Veuillez remplir tous les champs.";
        return;
    }

    const donnees = JSON.stringify({ nom, prenom, email, dateNaissance });
    const cleAES = await genererCle(cle);
    ivStocke = crypto.getRandomValues(new Uint8Array(12));

    const encoder = new TextEncoder();
    const donneesChiffrees = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: ivStocke },
        cleAES,
        encoder.encode(donnees)
    );

    donneesStockees = donneesChiffrees;
    resultat.value = btoa(String.fromCharCode(...new Uint8Array(donneesChiffrees)));
}

async function dechiffrerDonnees() {
    const cle = document.getElementById('cleDechiffrement').value;
    const resultat = document.getElementById('donneesDechiffrees');

    if (!donneesStockees) {
        resultat.value = "Aucune donnée chiffrée disponible.";
        return;
    }
    if (!cle) {
        resultat.value = "Veuillez entrer la clé de déchiffrement.";
        return;
    }

    try {
        const cleAES = await genererCle(cle);
        const donneesDechiffrees = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: ivStocke },
            cleAES,
            donneesStockees
        );

        const decoder = new TextDecoder();
        const donnees = JSON.parse(decoder.decode(donneesDechiffrees));

        resultat.value =
            `Nom : ${donnees.nom}\n` +
            `Prénom : ${donnees.prenom}\n` +
            `Email : ${donnees.email}\n` +
            `Date de naissance : ${donnees.dateNaissance}`;
    } catch (e) {
        resultat.value = "Clé incorrecte ! Impossible de déchiffrer.";
    }
}