import { Link } from 'react-router-dom'
import { Heart, Package, Plus } from 'lucide-react'
import { CATEGORIES } from '../lib/constants'

const CATEGORY_BORDER_STYLES = {
  'neon-magenta': 'border-neon-magenta/60 shadow-[0_0_12px_rgba(255,45,149,0.2)]',
  'neon-cyan': 'border-neon-cyan/60 shadow-[0_0_12px_rgba(0,240,255,0.2)]',
  'neon-yellow': 'border-neon-yellow/60 shadow-[0_0_12px_rgba(255,225,86,0.2)]',
  'neon-green': 'border-neon-green/60 shadow-[0_0_12px_rgba(57,255,20,0.2)]',
}

const CATEGORY_TAG_STYLES = {
  'neon-magenta': 'text-neon-magenta bg-neon-magenta/10',
  'neon-cyan': 'text-neon-cyan bg-neon-cyan/10',
  'neon-yellow': 'text-neon-yellow bg-neon-yellow/10',
  'neon-green': 'text-neon-green bg-neon-green/10',
}

function CollectionCard({ toy, toggleCollection }) {
  const cat = CATEGORIES.find(c => c.id === toy.category)
  const color = cat?.color || 'neon-cyan'
  const borderStyle = CATEGORY_BORDER_STYLES[color] || CATEGORY_BORDER_STYLES['neon-cyan']
  const tagStyle = CATEGORY_TAG_STYLES[color] || CATEGORY_TAG_STYLES['neon-cyan']

  return (
    <div
      className={`bg-retro-card/80 backdrop-blur-md border-2 rounded-xl overflow-hidden transition-transform hover:scale-[1.03] ${borderStyle}`}
    >
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
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/toy/${toy.id}`}>
          <h3 className="text-sm font-semibold text-retro-text-bright truncate hover:text-neon-cyan transition-colors">
            {toy.name}
          </h3>
        </Link>
        <p className="text-xs text-retro-text mt-0.5">
          {toy.brand} {toy.year ? `\u00B7 ${toy.year}` : ''}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagStyle}`}>
            {cat?.name || toy.category}
          </span>
          <button
            onClick={() => toggleCollection(toy.id)}
            className="p-1.5 rounded-lg hover:bg-retro-dark/50 transition-colors"
            title="Rimuovi dalla collezione"
          >
            <Heart className="w-4 h-4 fill-neon-magenta text-neon-magenta" />
          </button>
        </div>
      </div>
    </div>
  )
}

function AddSlot() {
  return (
    <Link
      to="/aggiungi"
      className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-retro-border/60 rounded-xl aspect-square hover:border-neon-cyan/60 hover:bg-retro-card/30 transition-all group"
    >
      <Plus className="w-10 h-10 text-retro-text/40 group-hover:text-neon-cyan transition-colors" />
      <span className="text-xs text-retro-text/40 group-hover:text-neon-cyan transition-colors">
        Aggiungi giocattolo
      </span>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <Heart className="w-20 h-20 text-retro-text/20 mb-6" />
      <h2 className="text-xl font-semibold text-retro-text-bright mb-2">
        La tua cameretta e' vuota!
      </h2>
      <p className="text-sm text-retro-text max-w-md mb-8">
        Esplora il catalogo e aggiungi i giocattoli che avevi da bambino
      </p>
      <Link
        to="/catalogo"
        className="px-6 py-3 bg-neon-cyan/20 border border-neon-cyan/60 text-neon-cyan rounded-lg font-semibold text-sm hover:bg-neon-cyan/30 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.2)]"
      >
        Esplora il catalogo
      </Link>
    </div>
  )
}

export default function CollectionPage({ getCollectionToys, toggleCollection, isInCollection }) {
  const toys = getCollectionToys()

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/cameretta-bg.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Neon grid overlay */}
      <div className="absolute inset-0 neon-grid" />

      {/* Content */}
      <div className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-retro text-3xl sm:text-4xl text-neon-magenta neon-magenta tracking-wider mb-2">
            LA MIA CAMERETTA
          </h1>
          <p className="text-sm text-retro-text">
            {toys.length} giocattol{toys.length === 1 ? 'o' : 'i'} nella tua collezione
          </p>
        </div>

        {/* Empty state */}
        {toys.length === 0 && <EmptyState />}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {toys.map(toy => (
            <CollectionCard
              key={toy.id}
              toy={toy}
              toggleCollection={toggleCollection}
            />
          ))}
          <AddSlot />
        </div>
      </div>
    </div>
  )
}
