import { Link } from 'react-router-dom'
import { Swords, Blocks, Baby, Car, Gamepad2, Heart } from 'lucide-react'

const ICONS = { Swords, Blocks, Baby, Car, Gamepad2, Heart }

export default function CategoryCard({ category, count }) {
  const Icon = ICONS[category.icon] || Blocks
  const borderColor = category.color === 'neon-magenta' ? 'border-neon-magenta/30 hover:border-neon-magenta/60' :
                      category.color === 'neon-cyan' ? 'border-neon-cyan/30 hover:border-neon-cyan/60' :
                      category.color === 'neon-yellow' ? 'border-neon-yellow/30 hover:border-neon-yellow/60' :
                      'border-neon-green/30 hover:border-neon-green/60'
  const textColor = category.color === 'neon-magenta' ? 'text-neon-magenta' :
                    category.color === 'neon-cyan' ? 'text-neon-cyan' :
                    category.color === 'neon-yellow' ? 'text-neon-yellow' :
                    'text-neon-green'

  return (
    <Link
      to={`/catalogo?category=${category.id}`}
      className={`card-hover bg-retro-card border ${borderColor} rounded-xl p-5 flex flex-col items-center gap-3 text-center transition-colors`}
    >
      <Icon className={`w-8 h-8 ${textColor}`} />
      <div>
        <h3 className="text-sm font-semibold text-retro-text-bright">{category.name}</h3>
        <p className="text-[11px] text-retro-text mt-1">{category.description}</p>
      </div>
      {count > 0 && (
        <span className="text-[10px] text-retro-text/50">{count} giocattoli</span>
      )}
    </Link>
  )
}
