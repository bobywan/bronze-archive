export async function getAccessToken() {
    // Utilise les variables SANS VITE_ pour la sécurité côté serveur
    const clientId = process.env.BLIZZARD_CLIENT_ID;
    const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Identifiants Blizzard manquants dans le dashboard Vercel/fichier .env");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://eu.battle.net/oauth/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Auth échouée : ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
}
