import { useState, useEffect } from 'react';
import Header from './components/Header';
import FavoritesBar from './components/FavoritesBar';
import SearchForm from './components/SearchForm';
import CharacterCard from './components/CharacterCard';
import './App.css';

function App() {
    const [name, setName] = useState('Labríoche');
    const [realm, setRealm] = useState('hyjal');
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoris');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const saved = localStorage.getItem('favoris');
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('favoris', JSON.stringify(favorites));
    }, [favorites]);

    const fetchHero = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!name || !realm) return;

        setLoading(true);

        try {
            const res = await fetch(`/api/get-character?name=${name}&realm=${realm}`);
            const data = await res.json();

            if (res.ok) {
                console.log(data);
                setCharacter(data);
            } else {
                alert(data.error || "Erreur lors de la recherche");
            }
        } catch (err) {
            console.error("Erreur:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = () => {
        if (!character) return;

        // On compare le nom et le slug du royaume pour être unique
        const charKey = `${character.name}-${character.realm.slug}`;
        const isAlreadyFav = favorites.some(f => `${f.name}-${f.realm}` === charKey);

        if (isAlreadyFav) {
            setFavorites(prev => prev.filter(f => `${f.name}-${f.realm}` !== charKey));
        } else {
            const newFav = {
                name: character.name,
                realm: character.realm.slug,
                realmName: character.realm.name,
                avatar: character.assets?.find(a => a.key === 'avatar')?.value ||
                        character.assets?.find(a => a.key === 'inset')?.value ||
                        (character.assets && character.assets[0]?.value) || ""
            };
            setFavorites(prev => [...prev, newFav]);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans">
            <Header />

            <FavoritesBar
                favorites={favorites}
                onSelectCharacter={(n, r) => fetchHero(n, r)}
            />

            <main className="container max-w-5xl mx-auto px-4 py-10">
                <SearchForm
                    name={name}
                    setName={setName}
                    realm={realm}
                    setRealm={setRealm}
                    onSearch={() => fetchHero(name, realm)}
                    loading={loading}
                />

                {character && (
                    <CharacterCard
                        character={character}
                        isFavorite={favorites.some(f => `${f.name}-${f.realm}` === `${character.name}-${character.realm.slug}`)}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
            </main>

            <footer className="mt-auto py-8 text-center text-slate-500 border-t border-slate-800">
                <span>© 2026 - Développé avec l'API Blizzard</span>
            </footer>
        </div>
    );
}

export default App;
