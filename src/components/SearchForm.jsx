export default function SearchForm({ name, setName, realm, setRealm, onSearch, loading }) {
    const REALMS = [
        { name: "Aman'Thul", slug: "amanthul" },
        { name: "Arathi", slug: "arathi" },
        { name: "Archimonde", slug: "archimonde" },
        { name: "Chants éternels", slug: "chants-eternels" },
        { name: "Cho'gall", slug: "chogall" },
        { name: "Conseil des Ombres", slug: "conseil-des-ombres" },
        { name: "Dalaran", slug: "dalaran" },
        { name: "Drek'Thar", slug: "drekthar" },
        { name: "Eitrigg", slug: "eitrigg" },
        { name: "Elune", slug: "elune" },
        { name: "Hyjal", slug: "hyjal" },
        { name: "Kael'thas", slug: "kaelthas" },
        { name: "Khaz Modan", slug: "khaz-modan" },
        { name: "Kirin Tor", slug: "kirin-tor" },
        { name: "Krasus", slug: "krasus" },
        { name: "La Croisade brûlante", slug: "la-croisade-brulante" },
        { name: "Les Sentinelles", slug: "les-sentinelles" },
        { name: "Marécage de Zangar", slug: "marecage-de-zangar" },
        { name: "Medivh", slug: "medivh" },
        { name: "Naxxramas", slug: "naxxramas" },
        { name: "Ner'zhul", slug: "nerzhul" },
        { name: "Rashgarroth", slug: "rashgarroth" },
        { name: "Sargeras", slug: "sargeras" },
        { name: "Sinstralis", slug: "sinstralis" },
        { name: "Suramar", slug: "suramar" },
        { name: "Temple noir", slug: "temple-noir" },
        { name: "Throk'Feroth", slug: "throkferoth" },
        { name: "Uldaman", slug: "uldaman" },
        { name: "Varimathras", slug: "varimathras" },
        { name: "Vol'jin", slug: "voljin" },
        { name: "Ysondre", slug: "ysondre" }
    ].sort((a) => a.name.localeCompare(a.name));

    return (
        <section className="mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-[#FFD100]">Trouve ton héros</h1>

            <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="flex flex-col md:flex-row gap-4 justify-center items-center bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full md:w-auto px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-yellow-500 text-white" />

                <select value={realm} onChange={e => setRealm(e.target.value)} className="w-full md:w-auto px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-yellow-500 text-white cursor-pointer">
                    {REALMS.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
                </select>

                <button type="submit" disabled={loading} className="w-full md:w-auto px-6 py-2 bg-yellow-600 hover:bg-yellow-700 transition-colors rounded font-bold uppercase disabled:opacity-50 cursor-pointer">
                    {loading ? 'Chargement...' : 'Rechercher'}
                </button>
            </form>
        </section>
    );
}
