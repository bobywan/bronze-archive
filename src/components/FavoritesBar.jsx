import { useState } from 'react';

export default function FavoritesBar({ favorites, onSelectCharacter }) {
    const [isFavOpen, setIsFavOpen] = useState(false);

    return (
        favorites.length !== 0 && ( <section className={`relative bg-slate-800 border-slate-700`}>
            <div className={`container mx-auto px-4 overflow-x-auto scrollbar-hide transition-all duration-300 ${isFavOpen ? 'h-fit' : 'h-0 overflow-hidden'}`}>
                <div className="flex gap-4 py-4">
                    {favorites.map((fav, idx) => (
                        <div key={idx} onClick={() => onSelectCharacter(fav.name, fav.realm)} className="flex-shrink-0 flex items-center gap-3 bg-slate-900 p-2 rounded-lg border border-slate-700 hover:border-yellow-500 cursor-pointer transition-all hover:scale-105">
                            <img src={fav.avatar} className="w-10 h-10 rounded-full border border-slate-600" />

                            <div className="text-left">
                                <p className="font-bold text-md text-yellow-400 leading-none">{fav.name}</p>
                                <p className="text-xs text-slate-500 uppercase mt-1 italic">{fav.realmName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => setIsFavOpen(!isFavOpen)} className="absolute top-full w-full py-2 text-sm text-slate-400 hover:text-yellow-500 transition-colors flex items-center justify-center gap-2">
                {isFavOpen ? 'Cacher' : `Voir mes favoris (${favorites.length})`}
            </button>
        </section> )
    );
}
