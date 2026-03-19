const REBRICKABLE_BASE = 'https://rebrickable.com/api/v3/lego'
const REBRICKABLE_KEY = '668de1984a884c5f8ecfe94e67e019b7' // free key, read-only

export async function searchLegoSets(query, minYear = 1980, maxYear = 2005) {
  const params = new URLSearchParams({
    search: query,
    min_year: minYear,
    max_year: maxYear,
    page_size: 20,
    ordering: '-year',
  })

  const res = await fetch(`${REBRICKABLE_BASE}/sets/?${params}`, {
    headers: { Authorization: `key ${REBRICKABLE_KEY}` },
  })

  if (!res.ok) throw new Error('Errore Rebrickable API')
  const data = await res.json()

  return data.results.map(set => ({
    id: `lego-${set.set_num}`,
    name: set.name,
    brand: 'LEGO',
    line: set.theme_id ? `Theme ${set.theme_id}` : 'LEGO',
    year: set.year,
    category: 'costruzioni',
    country: 'Danimarca',
    description: `Set LEGO ${set.set_num} — ${set.name}. ${set.num_parts} pezzi. Anno ${set.year}.`,
    image: set.set_img_url,
    parts: set.num_parts,
    setNum: set.set_num,
    source: 'rebrickable',
  }))
}

export async function getLegoSet(setNum) {
  const res = await fetch(`${REBRICKABLE_BASE}/sets/${setNum}/`, {
    headers: { Authorization: `key ${REBRICKABLE_KEY}` },
  })
  if (!res.ok) return null
  const set = await res.json()

  return {
    id: `lego-${set.set_num}`,
    name: set.name,
    brand: 'LEGO',
    line: set.theme_id ? `Theme ${set.theme_id}` : 'LEGO',
    year: set.year,
    category: 'costruzioni',
    country: 'Danimarca',
    description: `Set LEGO ${set.set_num} — ${set.name}. ${set.num_parts} pezzi. Anno ${set.year}.`,
    image: set.set_img_url,
    parts: set.num_parts,
    setNum: set.set_num,
    source: 'rebrickable',
  }
}

export async function generateToyWithAI(query) {
  const DEEPSEEK_KEY = localStorage.getItem('deepseek_api_key')
  if (!DEEPSEEK_KEY) return null

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `Sei un esperto enciclopedico di giocattoli vintage (1980-2005). Quando l'utente nomina un giocattolo, rispondi SOLO con un JSON valido (senza markdown, senza backtick) con questa struttura:
{
  "name": "nome completo del giocattolo",
  "brand": "produttore",
  "line": "linea/serie",
  "year": anno numerico,
  "category": "una tra: action-figures, costruzioni, bambole, veicoli, elettronici, peluche-altro",
  "country": "paese di origine",
  "description": "descrizione di 2-3 frasi in italiano, con fatti e curiosità"
}
Se non riconosci il giocattolo, rispondi con {"error": "non trovato"}.`,
        },
        { role: 'user', content: query },
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  })

  if (!res.ok) return null
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content

  try {
    const parsed = JSON.parse(content)
    if (parsed.error) return null
    return {
      id: `ai-${Date.now()}`,
      ...parsed,
      image: null,
      aiGenerated: true,
    }
  } catch {
    return null
  }
}
