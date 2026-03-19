import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ToyCard from '../components/ToyCard'
import { CATEGORIES, DECADES } from '../lib/constants'
import { searchLegoSets } from '../lib/api'

export default function CatalogPage({ searchToys, isInCollection, toggleCollection, addToys }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [period, setPeriod] = useState('')
  const [sort, setSort] = useState('year-desc')
  const [showFilters, setShowFilters] = useState(false)
  const [legoLoading, setLegoLoading] = useState(false)

  const decade = DECADES.find(d => d.label === period)
  const results = searchToys(query, {
    category: category || undefined,
    yearStart: decade?.start,
    yearEnd: decade?.end,
    sort,
  })

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setCategory(searchParams.get('category') || '')
  }, [searchParams])

  async function handleLegoSearch() {
    if (!query.trim()) return
    setLegoLoading(true)
    try {
      const sets = await searchLegoSets(query)
      if (sets.length > 0) addToys(sets)
    } catch { /* ignore */ }
    setLegoLoading(false)
  }

  function handleSearch(e) {
    e.preventDefault()
    const params = {}
    if (query) params.q = query
    if (category) params.category = category
    setSearchParams(params)
  }

  function clearFilters() {
    setQuery('')
    setCategory('')
    setPeriod('')
    setSort('year-desc')
    setSearchParams({})
  }

  const hasFilters = query || category || period

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-retro text-lg text-neon-cyan neon-text mb-8">CATALOGO</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-retro-text" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca per nome, brand o linea..."
            className="w-full pl-10 pr-4 py-2.5 bg-retro-card border border-retro-border rounded-lg text-sm text-retro-text-bright placeholder:text-retro-text/50 focus:outline-none focus:border-neon-cyan/50"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-lg border transition-colors ${
            showFilters ? 'bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan' : 'bg-retro-card border-retro-border text-retro-text'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 bg-neon-cyan/10 border border-neon-cyan/40 rounded-lg text-sm text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
        >
          Cerca
        </button>
      </form>

      {/* LEGO search */}
      {query && (
        <button
          onClick={handleLegoSearch}
          disabled={legoLoading}
          className="mb-4 text-xs text-neon-yellow hover:text-neon-yellow/80 disabled:opacity-50"
        >
          {legoLoading ? 'Cerco su Rebrickable...' : `Cerca "${query}" anche nei set LEGO (Rebrickable)`}
        </button>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-retro-card border border-retro-border rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] text-retro-text/60 uppercase tracking-wider mb-1 block">Categoria</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full py-2 px-3 bg-retro-dark border border-retro-border rounded-lg text-sm text-retro-text-bright"
            >
              <option value="">Tutte</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-retro-text/60 uppercase tracking-wider mb-1 block">Periodo</label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="w-full py-2 px-3 bg-retro-dark border border-retro-border rounded-lg text-sm text-retro-text-bright"
            >
              <option value="">Tutti</option>
              {DECADES.map(d => <option key={d.label} value={d.label}>{d.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-retro-text/60 uppercase tracking-wider mb-1 block">Ordina per</label>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full py-2 px-3 bg-retro-dark border border-retro-border rounded-lg text-sm text-retro-text-bright"
            >
              <option value="year-desc">Anno (recenti prima)</option>
              <option value="year-asc">Anno (vecchi prima)</option>
              <option value="name">Nome A-Z</option>
            </select>
          </div>
        </div>
      )}

      {/* Active filters */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-retro-text/50">Filtri attivi:</span>
          {query && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-retro-card border border-retro-border rounded text-xs text-retro-text-bright">
              "{query}" <X className="w-3 h-3 cursor-pointer" onClick={() => setQuery('')} />
            </span>
          )}
          {category && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-retro-card border border-retro-border rounded text-xs text-retro-text-bright">
              {CATEGORIES.find(c => c.id === category)?.name} <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory('')} />
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-neon-magenta hover:underline">Rimuovi tutti</button>
        </div>
      )}

      {/* Results */}
      <p className="text-xs text-retro-text/50 mb-4">{results.length} risultati</p>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-retro-text/50 mb-2">Nessun giocattolo trovato</p>
          <p className="text-xs text-retro-text/30">Prova a cercare qualcos'altro o aggiungilo tu!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(toy => (
            <ToyCard
              key={toy.id}
              toy={toy}
              isInCollection={isInCollection(toy.id)}
              onToggleCollection={toggleCollection}
            />
          ))}
        </div>
      )}
    </div>
  )
}
