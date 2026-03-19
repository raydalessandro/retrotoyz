import { TOYS_ACTION_FIGURES } from './toys-action-figures'
import { TOYS_COSTRUZIONI } from './toys-costruzioni'
import { TOYS_BAMBOLE } from './toys-bambole'
import { TOYS_VEICOLI } from './toys-veicoli'
import { TOYS_ELETTRONICI } from './toys-elettronici'
import { TOYS_PELUCHE_ALTRO } from './toys-peluche-altro'

export const CATEGORIES = [
  { id: 'action-figures', name: 'Action Figures', icon: 'Swords', description: 'Transformers, TMNT, Power Rangers, He-Man, GI Joe...', color: 'neon-magenta' },
  { id: 'costruzioni', name: 'Costruzioni', icon: 'Blocks', description: 'LEGO, Meccano, K\'NEX, Playmobil...', color: 'neon-cyan' },
  { id: 'bambole', name: 'Bambole', icon: 'Baby', description: 'Barbie, Polly Pocket, Bratz, Cicciobello...', color: 'neon-yellow' },
  { id: 'veicoli', name: 'Veicoli', icon: 'Car', description: 'Hot Wheels, Matchbox, Micro Machines, Bburago...', color: 'neon-green' },
  { id: 'elettronici', name: 'Elettronici', icon: 'Gamepad2', description: 'Tamagotchi, Furby, Game Boy, Digimon...', color: 'neon-cyan' },
  { id: 'peluche-altro', name: 'Peluche & Altro', icon: 'Heart', description: 'Beanie Babies, Beyblade, Pogs, figurine Panini...', color: 'neon-magenta' },
]

export const DECADES = [
  { label: '1980-1984', start: 1980, end: 1984 },
  { label: '1985-1989', start: 1985, end: 1989 },
  { label: '1990-1994', start: 1990, end: 1994 },
  { label: '1995-1999', start: 1995, end: 1999 },
  { label: '2000-2005', start: 2000, end: 2005 },
]

export const TIMELINE_HIGHLIGHTS = [
  { id: 'cubo-di-rubik-1980', year: 1980, name: 'Cubo di Rubik', brand: 'Ideal Toy' },
  { id: 'simon-1980', year: 1980, name: 'Simon', brand: 'Milton Bradley' },
  { id: 'playmobil-castello-1981', year: 1981, name: 'Playmobil Castello', brand: 'Playmobil' },
  { id: 'he-man-1982', year: 1982, name: 'He-Man', brand: 'Mattel' },
  { id: 'gi-joe-snake-eyes-1982', year: 1982, name: 'GI Joe: A Real American Hero', brand: 'Hasbro' },
  { id: 'cabbage-patch-kids-1983', year: 1983, name: 'Cabbage Patch Kids', brand: 'Coleco' },
  { id: 'my-little-pony-1983', year: 1983, name: 'My Little Pony', brand: 'Hasbro' },
  { id: 'optimus-prime-1984', year: 1984, name: 'Transformers G1', brand: 'Hasbro' },
  { id: 'voltron-1984', year: 1984, name: 'Voltron', brand: 'Matchbox' },
  { id: 'lego-castle-kings-castle-1984', year: 1984, name: 'LEGO Castle', brand: 'LEGO' },
  { id: 'thundercats-1985', year: 1985, name: 'Thundercats', brand: 'LJN' },
  { id: 'pegasus-saint-seiya-1986', year: 1986, name: 'Cavalieri dello Zodiaco', brand: 'Bandai' },
  { id: 'jem-bambola-1986', year: 1986, name: 'Jem and the Holograms', brand: 'Hasbro' },
  { id: 'egon-spengler-ghostbusters-1986', year: 1986, name: 'Ghostbusters', brand: 'Kenner' },
  { id: 'lego-pirates-1986', year: 1986, name: 'LEGO Pirates', brand: 'LEGO' },
  { id: 'micro-machines-1987', year: 1987, name: 'Micro Machines', brand: 'Galoob' },
  { id: 'leonardo-tmnt-1988', year: 1988, name: 'Tartarughe Ninja', brand: 'Playmates' },
  { id: 'bburago-ferrari-f40-1988', year: 1988, name: 'Bburago Ferrari F40', brand: 'Bburago' },
  { id: 'game-boy-1989', year: 1989, name: 'Game Boy', brand: 'Nintendo' },
  { id: 'polly-pocket-1989', year: 1989, name: 'Polly Pocket', brand: 'Bluebird Toys' },
  { id: 'sega-game-gear-1990', year: 1990, name: 'Sega Game Gear', brand: 'Sega' },
  { id: 'lego-space-mtron-1990', year: 1990, name: 'LEGO Space M-Tron', brand: 'LEGO' },
  { id: 'exogini-1986', year: 1991, name: 'Exogini', brand: 'Giochi Preziosi' },
  { id: 'sailor-moon-doll-1992', year: 1992, name: 'Sailor Moon', brand: 'Bandai' },
  { id: 'barbie-totally-hair-1992', year: 1992, name: 'Barbie Totally Hair', brand: 'Mattel' },
  { id: 'batman-returns-1992', year: 1992, name: 'Batman Returns', brand: 'Kenner' },
  { id: 'megazord-1993', year: 1993, name: 'Power Rangers', brand: 'Bandai' },
  { id: 'biker-mice-throttle-1993', year: 1993, name: 'Biker Mice da Marte', brand: 'Galoob' },
  { id: 'talkboy-1993', year: 1993, name: 'Talkboy', brand: 'Tiger Electronics' },
  { id: 'spider-man-toy-biz-1994', year: 1994, name: 'Spider-Man Animated', brand: 'Toy Biz' },
  { id: 'street-sharks-ripster-1994', year: 1994, name: 'Street Sharks', brand: 'Mattel' },
  { id: 'pogs-slammer-1995', year: 1995, name: 'Pogs / Slammer', brand: 'Various' },
  { id: 'tamiya-mini-4wd-magnum-1988', year: 1995, name: 'Tamiya Mini 4WD', brand: 'Tamiya' },
  { id: 'tamagotchi-1996', year: 1996, name: 'Tamagotchi', brand: 'Bandai' },
  { id: 'pokemon-cards-1996', year: 1996, name: 'Pokemon Cards', brand: 'Nintendo / Wizards' },
  { id: 'goku-dragon-ball-z-1996', year: 1996, name: 'Dragon Ball Z Figures', brand: 'Giochi Preziosi' },
  { id: 'gogos-crazy-bones-1996', year: 1996, name: 'GoGo\'s Crazy Bones', brand: 'Magic Box Int.' },
  { id: 'beanie-babies-1997', year: 1997, name: 'Beanie Babies Mania', brand: 'Ty Inc.' },
  { id: 'digimon-vpet-1997', year: 1997, name: 'Digimon Virtual Pet', brand: 'Bandai' },
  { id: 'furby-1998', year: 1998, name: 'Furby', brand: 'Tiger Electronics' },
  { id: 'lego-mindstorms-1998', year: 1998, name: 'LEGO Mindstorms', brand: 'LEGO' },
  { id: 'game-boy-color-1998', year: 1998, name: 'Game Boy Color', brand: 'Nintendo' },
  { id: 'pokemon-toys-1999', year: 1999, name: 'Pokemon Toys', brand: 'Various' },
  { id: 'yu-gi-oh-cards-1999', year: 1999, name: 'Yu-Gi-Oh! Cards', brand: 'Konami' },
  { id: 'beyblade-2000', year: 2000, name: 'Beyblade', brand: 'Takara' },
  { id: 'lego-bionicle-tahu-2001', year: 2001, name: 'LEGO Bionicle', brand: 'LEGO' },
  { id: 'bratz-2001', year: 2001, name: 'Bratz', brand: 'MGA' },
  { id: 'game-boy-advance-2001', year: 2001, name: 'Game Boy Advance', brand: 'Nintendo' },
  { id: 'yu-gi-oh-duel-disk-2004', year: 2004, name: 'Yu-Gi-Oh Duel Disk', brand: 'Mattel' },
  { id: 'gormiti-2005', year: 2005, name: 'Gormiti', brand: 'Giochi Preziosi' },
]

// Merge all category files, deduplicate by id
const allToys = [
  ...TOYS_ACTION_FIGURES,
  ...TOYS_COSTRUZIONI,
  ...TOYS_BAMBOLE,
  ...TOYS_VEICOLI,
  ...TOYS_ELETTRONICI,
  ...TOYS_PELUCHE_ALTRO,
]
const seen = new Set()
export const SEED_TOYS = allToys.filter(t => {
  if (seen.has(t.id)) return false
  seen.add(t.id)
  return true
})

