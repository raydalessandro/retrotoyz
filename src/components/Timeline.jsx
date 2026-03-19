import { Link } from 'react-router-dom'

const TIMELINE_ITEMS = [
  { id: 'cubo-di-rubik-1980', year: 1980, name: "Cubo di Rubik", brand: 'Ideal Toy' },
  { id: 'he-man-1982', year: 1982, name: 'He-Man', brand: 'Mattel' },
  { id: 'optimus-prime-1984', year: 1984, name: 'Transformers', brand: 'Hasbro' },
  { id: 'leonardo-tmnt-1988', year: 1988, name: 'Tartarughe Ninja', brand: 'Playmates' },
  { id: 'game-boy-1989', year: 1989, name: 'Game Boy', brand: 'Nintendo' },
  { id: 'megazord-1993', year: 1993, name: 'Power Rangers', brand: 'Bandai' },
  { id: 'tamagotchi-1996', year: 1996, name: 'Tamagotchi', brand: 'Bandai' },
  { id: 'furby-1998', year: 1998, name: 'Furby', brand: 'Tiger' },
  { id: 'beyblade-2000', year: 2000, name: 'Beyblade', brand: 'Takara' },
  { id: 'lego-bionicle-tahu-2001', year: 2001, name: 'LEGO Bionicle', brand: 'LEGO' },
  { id: 'yu-gi-oh-duel-disk-2004', year: 2004, name: 'Yu-Gi-Oh Duel Disk', brand: 'Mattel' },
]

export default function Timeline() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[600px] relative px-4">
        {/* Horizontal line */}
        <div className="absolute top-[6px] left-4 right-4 h-0.5 bg-retro-border" />

        <div className="flex justify-between">
          {TIMELINE_ITEMS.map(item => (
            <Link
              key={item.id}
              to={`/toy/${item.id}`}
              className="flex flex-col items-center group cursor-pointer relative z-10"
            >
              {/* Dot */}
              <div className="w-3 h-3 rounded-full bg-neon-magenta border-2 border-retro-dark group-hover:bg-neon-cyan group-hover:scale-125 transition-all" />
              {/* Year */}
              <span className="font-retro text-[9px] text-neon-cyan mt-1.5">{item.year}</span>
              {/* Name */}
              <span className="text-[10px] text-retro-text-bright text-center mt-0.5 group-hover:text-neon-magenta transition-colors leading-tight max-w-[70px]">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
