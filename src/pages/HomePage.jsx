import { Link } from 'react-router-dom'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import Timeline from '../components/Timeline'
import CategoryCard from '../components/CategoryCard'
import ToyCard from '../components/ToyCard'
import { CATEGORIES } from '../lib/constants'

export default function HomePage({ toys, isInCollection, toggleCollection }) {
  const featured = toys.slice(0, 12)
  const counts = CATEGORIES.map(c => ({
    ...c,
    count: toys.filter(t => t.category === c.id).length,
  }))
  const totalToys = toys.length

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 neon-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-dark via-retro-dark/95 to-retro-dark" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-magenta/10 border border-neon-magenta/30 rounded-full text-[11px] text-neon-magenta mb-6">
            <Sparkles className="w-3 h-3" />
            {totalToys} giocattoli nel catalogo
          </div>

          <h1 className="font-retro text-3xl sm:text-4xl lg:text-5xl text-neon-cyan neon-text leading-relaxed tracking-wider">
            RETROTOYZ
          </h1>

          <p className="text-lg sm:text-xl text-retro-text-bright mt-5 font-light">
            L'enciclopedia dei giocattoli <span className="text-neon-magenta font-semibold">1980–2005</span>
          </p>
          <p className="text-sm text-retro-text mt-3 max-w-md mx-auto leading-relaxed">
            Riscopri i giocattoli della tua infanzia. Cerca, esplora e costruisci la tua collezione nostalgica.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neon-cyan text-retro-dark font-semibold rounded-lg hover:bg-neon-cyan/90 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <Search className="w-4 h-4" />
              Esplora il catalogo
            </Link>
            <Link
              to="/collezione"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-neon-magenta/50 text-neon-magenta rounded-lg hover:bg-neon-magenta/10 transition-colors"
            >
              La mia cameretta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 px-4 border-t border-retro-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-retro text-[11px] text-neon-yellow mb-10 text-center tracking-[0.2em] uppercase">
            Timeline 1980 — 2005
          </h2>
          <Timeline />
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 px-4 bg-retro-card/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-retro text-[11px] text-neon-cyan mb-8 text-center tracking-[0.2em] uppercase">
            Categorie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {counts.map(c => (
              <CategoryCard key={c.id} category={c} count={c.count} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured toys */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-retro text-[11px] text-neon-magenta tracking-[0.2em] uppercase">
              Nel catalogo
            </h2>
            <Link to="/catalogo" className="text-xs text-retro-text hover:text-neon-cyan transition-colors flex items-center gap-1.5 group">
              Vedi tutti ({totalToys})
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {featured.map(toy => (
              <ToyCard
                key={toy.id}
                toy={toy}
                isInCollection={isInCollection(toy.id)}
                onToggleCollection={toggleCollection}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-retro-border/40 py-10 px-4 text-center">
        <p className="font-retro text-[10px] text-retro-text/30 tracking-wider">
          RETROTOYZ — Enciclopedia giocattoli 1980-2005
        </p>
        <p className="text-[11px] text-retro-text/20 mt-2">
          Dati LEGO via Rebrickable API · Schede AI via DeepSeek
        </p>
      </footer>
    </div>
  )
}
