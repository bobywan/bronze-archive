export async function getProfile(realm, name, token) {
    const realmSlug = realm.toLowerCase().trim().replace(/\s+/g, '-');
    const normalizedName = name.toLowerCase().trim().normalize('NFC');
    const encodedName = encodeURIComponent(normalizedName);

    // CHANGEMENT : namespace=profile-eu (indispensable pour les persos)
    const url = `https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${encodedName}?namespace=profile-eu&locale=fr_FR`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}` // Plus propre de le mettre en Header qu'en URL
        }
    });

    if (!response.ok) {
        return null;
    }

    return await response.json();
}

export async function getMedia(realm, name, token) {
    const realmSlug = realm.toLowerCase().trim().replace(/\s+/g, '-');
    const normalizedName = name.toLowerCase().trim().normalize('NFC');

    // Le namespace pour le média est aussi profile-eu
    const url = `https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${encodeURIComponent(normalizedName)}/character-media?namespace=profile-eu&locale=fr_FR`;

    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) return null;
    return await response.json();
}
