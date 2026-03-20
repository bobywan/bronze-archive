import { getAccessToken } from './_lib/blizzardAuth.js';
import { getProfile, getMedia } from './_lib/wowService.js';

export default async function handler(req, res) {
    const { name, realm } = req.query;
    if (!name || !realm) return res.status(400).json({ error: "Nom et royaume requis" });

    try {
        const token = await getAccessToken();

        // On lance les deux requêtes en parallèle pour gagner du temps
        const [characterData, mediaData] = await Promise.all([
                getProfile(realm, name, token),
                getMedia(realm, name, token)
        ]);

        if (!characterData) return res.status(404).json({ error: "Héros introuvable" });

        // On ajoute le média dans l'objet de réponse
        return res.status(200).json({
            ...characterData,
            assets: mediaData ? mediaData.assets : []
        });

    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
}
