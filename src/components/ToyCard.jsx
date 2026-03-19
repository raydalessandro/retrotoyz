import { Link } from 'react-router-dom'
import { Heart, Sparkles, Package } from 'lucide-react'
import { CATEGORIES } from '../lib/constants'

export default function ToyCard({ toy, isInCollection, onToggleCollection }) {
  const cat = CATEGORIES.find(c => c.id === toy.category)
  const colorClass = cat?.color === 'neon-magenta' ? 'text-neon-magenta' :
                     cat?.color === 'neon-cyan' ? 'text-neon-cyan' :
                     cat?.color === 'neon-yellow' ? 'text-neon-yellow' :
                     'text-neon-green'

  return (
    <div className="card-hover bg-retro-card border border-retro-border rounded-xl overflow-hidden group">
      <Link to={`/toy/${toy.id}`} className="block">
        <div className="aspect-square bg-retro-dark/50 flex items-center justify-center relative overflow-hidden">
          {toy.image ? (
            <img
              src={toy.image}
              alt={toy.name}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-retro-text/30">
              <Package className="w-12 h-12" />
              <span className="text-xs">No image</span>
            </div>
          )}
          {toy.aiGenerated && (
            <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-neon-cyan/20 border border-neon-cyan/30 rounded text-[10px] text-neon-cyan">
              <Sparkles className="w-3 h-3" /> AI
            </span>
          )}
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-retro-dark/80 rounded text-[10px] text-retro-text">
            {toy.year}
          </span>
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/toy/${toy.id}`}>
          <h3 className="text-sm font-semibold text-retro-text-bright truncate hover:text-neon-cyan transition-colors">
            {toy.name}
          </h3>
        </Link>
        <p className="text-xs text-retro-text mt-0.5">{toy.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <span className={`text-[10px] font-medium ${colorClass}`}>
            {cat?.name || toy.category}
          </span>
          <button
            onClick={() => onToggleCollection(toy.id)}
            className="p-1.5 rounded-lg hover:bg-retro-dark/50 transition-colors"
            title={isInCollection ? 'Rimuovi dalla collezione' : 'Lo avevi? Aggiungilo!'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isInCollection
                  ? 'fill-neon-magenta text-neon-magenta'
                  : 'text-retro-text/40 hover:text-neon-magenta'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
