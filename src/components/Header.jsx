import { Link, useNavigate } from 'react-router-dom'
import { Search, Gamepad2, Heart } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-retro-dark/90 backdrop-blur-md border-b border-retro-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Gamepad2 className="w-7 h-7 text-neon-cyan" />
          <span className="font-retro text-sm text-neon-cyan neon-text hidden sm:block">
            RETROTOYZ
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-retro-text" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cerca un giocattolo..."
              className="w-full pl-10 pr-4 py-2 bg-retro-card border border-retro-border rounded-lg text-sm text-retro-text-bright placeholder:text-retro-text/50 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          <Link
            to="/collezione"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-retro-text hover:text-neon-magenta hover:bg-retro-card transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:block">La mia cameretta</span>
          </Link>
          <Link
            to="/aggiungi"
            className="px-3 py-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg text-sm text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
          >
            + Aggiungi
          </Link>
        </div>
      </div>
    </header>
  )
}
