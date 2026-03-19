import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Sparkles, Package, ExternalLink } from 'lucide-react'
import { CATEGORIES } from '../lib/constants'

export default function ToyDetailPage({ getToy, toys, isInCollection, toggleCollection }) {
  const { id } = useParams()
  const toy = getToy(id)

  if (!toy) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-retro-text/50 mb-4">Giocattolo non trovato</p>
        <Link to="/catalogo" className="text-neon-cyan hover:underline text-sm">Torna al catalogo</Link>
      </div>
    )
  }

  const cat = CATEGORIES.find(c => c.id === toy.category)
  const sameLine = toys.filter(t => t.id !== toy.id && t.line === toy.line).slice(0, 4)
  const sameCategory = sameLine.length < 4
    ? toys.filter(t => t.id !== toy.id && t.category === toy.category && !sameLine.includes(t)).slice(0, 4 - sameLine.length)
    : []
  const related = [...sameLine, ...sameCategory]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm text-retro-text hover:text-neon-cyan transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Torna al catalogo
      </Link>

      <div className="bg-retro-card border border-retro-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-retro-dark/50 flex items-center justify-center relative">
            {toy.image ? (
              <img src={toy.image} alt={toy.name} className="w-full h-full object-contain p-6" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-retro-text/20">
                <Package className="w-20 h-20" />
                <span className="text-sm">Nessuna immagine</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-retro-text-bright">{toy.name}</h1>
                <p className="text-sm text-retro-text mt-1">{toy.brand} · {toy.year}</p>
              </div>
              <button
                onClick={() => toggleCollection(toy.id)}
                className="shrink-0 p-2 rounded-lg border border-retro-border hover:border-neon-magenta/40 transition-colors"
                title={isInCollection(toy.id) ? 'Rimuovi dalla collezione' : 'Lo avevi? Aggiungilo!'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInCollection(toy.id) ? 'fill-neon-magenta text-neon-magenta' : 'text-retro-text/40'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-retro-dark rounded text-xs text-retro-text">{cat?.name}</span>
              <span className="px-2 py-1 bg-retro-dark rounded text-xs text-retro-text">{toy.line}</span>
              <span className="px-2 py-1 bg-retro-dark rounded text-xs text-retro-text">{toy.country}</span>
              {toy.parts && (
                <span className="px-2 py-1 bg-retro-dark rounded text-xs text-retro-text">{toy.parts} pezzi</span>
              )}
            </div>

            <div className="mt-6 flex-1">
              <p className="text-sm text-retro-text leading-relaxed">{toy.description}</p>
              {toy.aiGenerated && (
                <p className="flex items-center gap-1 text-[10px] text-neon-cyan/60 mt-3">
                  <Sparkles className="w-3 h-3" /> Scheda generata con AI
                </p>
              )}
            </div>

            {toy.source === 'rebrickable' && toy.setNum && (
              <a
                href={`https://rebrickable.com/sets/${toy.setNum}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs text-neon-cyan hover:underline"
              >
                Vedi su Rebrickable <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="font-retro text-xs text-neon-yellow mb-4 tracking-wider">
            {sameLine.length > 0 ? 'DALLA STESSA LINEA' : 'NELLA STESSA CATEGORIA'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(t => (
              <Link key={t.id} to={`/toy/${t.id}`} className="card-hover bg-retro-card border border-retro-border rounded-xl overflow-hidden">
                <div className="aspect-square bg-retro-dark/50 flex items-center justify-center">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-contain p-2" loading="lazy" />
                  ) : (
                    <Package className="w-10 h-10 text-retro-text/20" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-retro-text-bright truncate">{t.name}</p>
                  <p className="text-[10px] text-retro-text">{t.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
