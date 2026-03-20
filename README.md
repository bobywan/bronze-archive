# Bronze Archive

Une mini-application web (React + Vite) qui permet de rechercher un personnage World of Warcraft via l’API Blizzard, d’afficher ses infos et images, et de gérer une liste de favoris persistée en `localStorage`.

## Aperçu rapide

- Recherche d’un héros par `name` + `realm` (liste de royaumes en dur côté UI).
- Appel côté serveur à l’API Blizzard :
  - récupération du profil du personnage
  - récupération des médias (avatar/illustrations)
- Affichage des stats clés + bouton “Ajouter/Retirer des favoris”.
- Gestion des favoris :
  - stockage dans le navigateur sous la clé `favoris`
  - affichage dans la barre `FavoritesBar`

## Stack

- Frontend : `react` / `react-dom` (React 19) + `vite`
- Styling : Tailwind via `@tailwindcss/vite` (classes utilitaires dans les composants)
- Backend/API : fonctions serveur dans le dossier `api/` (format “handler req/res” compatible Vercel)

## Architecture

### Frontend (UI)

- `src/App.jsx`
  - état global : `name`, `realm`, `character`, `loading`, `favorites`
  - déclenche l’appel `fetch('/api/get-character?...')`
  - gère `toggleFavorite()` et la persistance `localStorage`
- `src/components/SearchForm.jsx`
  - champ `name` + select `realm`
  - liste des royaumes (table `REALMS` en dur)
  - bouton “Rechercher”
- `src/components/CharacterCard.jsx`
  - rend le profil (serveur/guilde/faction/race/classe/spé/niveau…)
  - affiche une image issue de `character.assets`
  - bouton “Ajouter/Retirer des favoris”
- `src/components/FavoritesBar.jsx`
  - affiche les favoris en ligne
  - bouton “Voir mes favoris (N)” / “Cacher”
- `src/components/Header.jsx` : titre/branding

### API (côté serveur)

Endpoint principal :

- `GET /api/get-character?name=...&realm=...`

Implémentation :

- `api/get-character.js`
  - valide `name` et `realm`
  - obtient un token OAuth Blizzard via `getAccessToken()`
  - lance en parallèle :
    - `getProfile(realm, name, token)` (données du personnage)
    - `getMedia(realm, name, token)` (assets/médias)
  - renvoie :
    - `200` + le profil enrichi avec `assets: mediaData.assets` (ou `[]`)
    - `400` si paramètres manquants
    - `404` si personnage introuvable
    - `500` en cas d’erreur serveur

Helpers :

- `api/_lib/blizzardAuth.js`
  - récupère `BLIZZARD_CLIENT_ID` / `BLIZZARD_CLIENT_SECRET`
  - demande un token via `POST https://eu.battle.net/oauth/token`
- `api/_lib/wowService.js`
  - construit les URLs Blizzard (namespace `profile-eu`, locale `fr_FR`)
  - normalise `realm` (slug) et `name` (lowercase + unicode NFC)
  - appelle :
    - `.../profile/wow/character/...` (profil)
    - `.../character-media?...` (médias)

## Variables d’environnement

Les identifiants Blizzard **ne doivent jamais** être exposés au client. Ils sont attendus côté serveur via `.env`.

Variables requises :

```bash
BLIZZARD_CLIENT_ID=...
BLIZZARD_CLIENT_SECRET=...
```

Assurez-vous que le fichier `.env` n’est pas versionné. (Dans ce dépôt, `.gitignore` ignore `*.local` mais il peut être nécessaire d’ajouter `.env` explicitement.)

## Démarrer le projet

1. Installer les dépendances :
   - `npm install`
2. Lancer le serveur de dev (frontend) :
   - `npm run dev`

### Note importante sur l’API en local

Les routes `api/*` sont prévues pour fonctionner dans un environnement “serverless” (ex. Vercel). Selon votre configuration locale, l’appel `/api/get-character?...` peut ne pas être servi par le seul `vite dev`.

Pour un test local proche de la prod, utilisez typiquement `vercel dev` (si vous avez Vercel CLI).

## Exemple d’appel

```http
GET /api/get-character?name=Labríoche&realm=hyjal
```

Réponse (forme générale) :

- objet profil Blizzard (ex. `name`, `level`, `realm`, `faction`, `race`, etc.)
- champ additionnel :
  - `assets`: tableau provenant de `character-media`

## Points d’attention / TODO (repérés)

- `src/App.jsx` : la sélection d’un favori via `FavoritesBar` appelle `fetchHero(n, r)` mais la fonction `fetchHero` n’utilise que les états React `name`/`realm` via fermeture (elle n’emploie pas les arguments). Résultat : cliquer un favori ne recharge potentiellement pas le bon personnage. (À corriger en mettant à jour `name`/`realm` ou en ajustant `fetchHero`.)
- `src/constants/realms.js` existe mais n’est pas utilisé par `SearchForm.jsx` (liste de royaumes dupliquée en dur dans `SearchForm`).

## Dépannage

- OAuth/Blizzard :
  - erreurs `500` -> vérifier la présence/correctness des variables `BLIZZARD_CLIENT_ID` et `BLIZZARD_CLIENT_SECRET`
  - erreurs `404` -> vérifier `name`/`realm` et la normalisation (slug/locale)
- CORS/accès :
  - l’UI appelle un endpoint relatif (`/api/...`), donc le CORS est généralement géré par le même domaine (selon l’hébergement)

