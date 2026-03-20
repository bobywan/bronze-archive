import React from 'react';

export default function CharacterCard({ character, isFavorite, onToggleFavorite }) {
    // Si pas de perso, on n'affiche rien
    if (!character) return null;

    // Extraction des stats pour plus de clarté dans le HTML
    const stats = [
        { label: "Serveur", val: character.realm.name },
        { label: "Guilde", val: character.guild?.name || "Sans guilde" },
        { label: "Faction", val: character.faction.name },
        { label: "Race", val: character.race.name },
        { label: "Classe", val: character.character_class.name },
        { label: "Spécialisation", val: character.active_spec.name },
    ];

    return (
        <section className="flex flex-col max-w-xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border-2 border-yellow-600/50 shadow-2xl animate-in fade-in zoom-in duration-300 relative">

            <div className="bg-yellow-600/20 p-4 border-b border-yellow-600/30 flex items-center gap-4">
                {character.assets && character.assets.length > 0 && (
                    <div className="w-14 h-14 relative bg-slate-950 rounded-full border-2 border-yellow-500 overflow-hidden shadow-inner flex-shrink-0">
                        <img
                            src={
                                character.assets.find(a => a.key === 'avatar')?.value ||
                                character.assets.find(a => a.key === 'inset')?.value ||
                                character.assets[0].value
                            }
                            alt={character.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-yellow-400 leading-tight">
                        {character.name}
                    </h2>

                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                        {character.active_spec.name} {character.character_class.name}
                    </p>
                </div>

                <div className="">
                    <span className="bg-slate-900 px-3 py-1 rounded-full text-sm font-semibold border border-yellow-600/50 shadow-sm text-yellow-100">
                        Niv. {character.level}
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-3 text-slate-200">
                {stats.map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-700/50 pb-2 last:border-0">
                        <span className="text-slate-400 font-medium text-sm">
                            {item.label}
                        </span>

                        <span className={`font-semibold ${item.label === 'Classe' ? 'text-white' : ''}`}>
                            {item.val}
                        </span>
                    </div>
                ))}

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-slate-400 font-medium text-xs uppercase tracking-tighter">Niveau d'objet</span>
                        <span className="text-slate-300 text-sm font-bold italic">Équipé</span>
                    </div>

                    <span className="text-4xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">
                        {character.equipped_item_level}
                    </span>
                </div>
            </div>

            <button
                onClick={onToggleFavorite}
                className={`w-full md:w-auto px-6 py-2 transition-colors rounded font-bold uppercase disabled:opacity-50 cursor-pointer ${isFavorite ? 'bg-red-800 hover:bg-red-900' : 'bg-green-800 hover:bg-green-900'}`}
            >
                {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
        </section>
    );
}
