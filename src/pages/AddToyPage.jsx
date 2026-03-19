import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Blocks, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../lib/constants';
import { generateToyWithAI, searchLegoSets } from '../lib/api';

const TABS = [
  { key: 'manual', label: 'Manuale', icon: Search },
  { key: 'ai', label: 'Cerca con AI', icon: Sparkles },
  { key: 'lego', label: 'Cerca LEGO', icon: Blocks },
];

const inputClass =
  'w-full py-2 px-3 bg-retro-dark border border-retro-border rounded-lg text-sm text-retro-text-bright focus:outline-none focus:border-neon-cyan/50';
const labelClass =
  'text-[10px] text-retro-text/60 uppercase tracking-wider mb-1 block';

export default function AddToyPage({ addToy }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('manual');

  // ── Manual tab state ──
  const [form, setForm] = useState({
    name: '',
    brand: '',
    line: '',
    year: '',
    category: '',
    country: '',
    description: '',
  });
  const [manualError, setManualError] = useState('');

  // ── AI tab state ──
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState('');

  // ── LEGO tab state ──
  const [legoQuery, setLegoQuery] = useState('');
  const [legoMinYear, setLegoMinYear] = useState(1980);
  const [legoMaxYear, setLegoMaxYear] = useState(2005);
  const [legoLoading, setLegoLoading] = useState(false);
  const [legoResults, setLegoResults] = useState(null);

  // ── Handlers ──

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleManualSubmit(e) {
    e.preventDefault();
    setManualError('');

    if (!form.name.trim() || !form.brand.trim()) {
      setManualError('Nome e brand sono obbligatori.');
      return;
    }

    const id = `manual-${Date.now()}`;
    const toy = {
      id,
      name: form.name.trim(),
      brand: form.brand.trim(),
      line: form.line.trim(),
      year: form.year ? Number(form.year) : null,
      category: form.category || null,
      country: form.country.trim(),
      description: form.description.trim(),
      image: null,
      aiGenerated: false,
    };

    addToy(toy);
    navigate(`/toy/${id}`);
  }

  function handleSaveApiKey() {
    const key = apiKeyInput.trim();
    if (!key) return;
    localStorage.setItem('deepseek_api_key', key);
    setApiKeyInput('');
  }

  async function handleAiSearch(e) {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResult(null);
    setAiError('');

    try {
      const result = await generateToyWithAI(aiQuery.trim());
      if (result) {
        setAiResult(result);
      } else {
        setAiError("Giocattolo non trovato. Prova con un nome piu' preciso.");
      }
    } catch {
      setAiError("Giocattolo non trovato. Prova con un nome piu' preciso.");
    } finally {
      setAiLoading(false);
    }
  }

  function handleAddAiResult() {
    if (!aiResult) return;
    addToy(aiResult);
    navigate(`/toy/${aiResult.id}`);
  }

  async function handleLegoSearch(e) {
    e.preventDefault();
    if (!legoQuery.trim()) return;

    setLegoLoading(true);
    setLegoResults(null);

    try {
      const results = await searchLegoSets(legoQuery.trim(), legoMinYear, legoMaxYear);
      setLegoResults(results ?? []);
    } catch {
      setLegoResults([]);
    } finally {
      setLegoLoading(false);
    }
  }

  // ── Render ──

  const hasApiKey = !!localStorage.getItem('deepseek_api_key');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <h1 className="font-retro text-lg text-neon-cyan neon-text">
        AGGIUNGI GIOCATTOLO
      </h1>

      {/* Tab bar */}
      <div className="flex gap-2 justify-center flex-wrap">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 bg-retro-card border rounded-lg px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan'
                  : 'border-retro-border text-retro-text hover:border-retro-border/80'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Manual Tab ── */}
      {activeTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="space-y-4 max-w-lg mx-auto">
          {manualError && (
            <p className="text-red-400 text-sm text-center">{manualError}</p>
          )}

          <div>
            <label className={labelClass}>Nome *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className={inputClass}
              placeholder="es. Optimus Prime"
            />
          </div>

          <div>
            <label className={labelClass}>Brand *</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleFormChange}
              className={inputClass}
              placeholder="es. Hasbro"
            />
          </div>

          <div>
            <label className={labelClass}>Linea</label>
            <input
              type="text"
              name="line"
              value={form.line}
              onChange={handleFormChange}
              className={inputClass}
              placeholder="es. Transformers G1"
            />
          </div>

          <div>
            <label className={labelClass}>Anno</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleFormChange}
              min={1980}
              max={2005}
              className={inputClass}
              placeholder="1980 - 2005"
            />
          </div>

          <div>
            <label className={labelClass}>Categoria</label>
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              className={inputClass}
            >
              <option value="">Seleziona categoria</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Paese</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleFormChange}
              className={inputClass}
              placeholder="es. Giappone"
            />
          </div>

          <div>
            <label className={labelClass}>Descrizione</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={4}
              className={inputClass}
              placeholder="Descrizione del giocattolo..."
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/40 rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
            >
              Aggiungi al catalogo
            </button>
          </div>
        </form>
      )}

      {/* ── AI Tab ── */}
      {activeTab === 'ai' && (
        <div className="max-w-lg mx-auto space-y-4">
          {!hasApiKey ? (
            <div className="space-y-3">
              <p className="text-retro-text text-sm text-center">
                Inserisci la tua API key DeepSeek per usare la ricerca AI.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className={inputClass}
                  placeholder="DeepSeek API Key"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/40 rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-colors whitespace-nowrap"
                >
                  Salva
                </button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleAiSearch} className="flex gap-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className={inputClass}
                  placeholder="Descrivi il giocattolo..."
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/40 rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {aiLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  Cerca con AI
                </button>
              </form>

              {aiLoading && (
                <p className="text-neon-cyan text-sm text-center animate-pulse">
                  Cerco con AI...
                </p>
              )}

              {aiError && (
                <p className="text-red-400 text-sm text-center">{aiError}</p>
              )}

              {aiResult && (
                <div className="bg-retro-card border border-retro-border rounded-lg p-4 space-y-3">
                  <h3 className="text-retro-text-bright font-semibold">
                    {aiResult.name}
                  </h3>
                  {aiResult.brand && (
                    <p className="text-retro-text text-sm">
                      <span className="text-retro-text/60">Brand:</span> {aiResult.brand}
                    </p>
                  )}
                  {aiResult.year && (
                    <p className="text-retro-text text-sm">
                      <span className="text-retro-text/60">Anno:</span> {aiResult.year}
                    </p>
                  )}
                  {aiResult.category && (
                    <p className="text-retro-text text-sm">
                      <span className="text-retro-text/60">Categoria:</span>{' '}
                      {aiResult.category}
                    </p>
                  )}
                  {aiResult.description && (
                    <p className="text-retro-text/80 text-sm">
                      {aiResult.description}
                    </p>
                  )}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleAddAiResult}
                      className="px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/40 rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                    >
                      Aggiungi al catalogo
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── LEGO Tab ── */}
      {activeTab === 'lego' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <form onSubmit={handleLegoSearch} className="space-y-3">
            <div>
              <label className={labelClass}>Cerca set LEGO</label>
              <input
                type="text"
                value={legoQuery}
                onChange={(e) => setLegoQuery(e.target.value)}
                className={inputClass}
                placeholder="es. Castle, Space, Pirates..."
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Anno min</label>
                <input
                  type="number"
                  value={legoMinYear}
                  onChange={(e) => setLegoMinYear(Number(e.target.value))}
                  min={1949}
                  max={2025}
                  className={inputClass}
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Anno max</label>
                <input
                  type="number"
                  value={legoMaxYear}
                  onChange={(e) => setLegoMaxYear(Number(e.target.value))}
                  min={1949}
                  max={2025}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={legoLoading}
                className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/40 rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-colors disabled:opacity-50"
              >
                {legoLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Search size={16} />
                )}
                Cerca su Rebrickable
              </button>
            </div>
          </form>

          {legoLoading && (
            <p className="text-neon-cyan text-sm text-center animate-pulse">
              Ricerca in corso...
            </p>
          )}

          {legoResults !== null && legoResults.length === 0 && (
            <p className="text-retro-text/60 text-sm text-center">
              Nessun set LEGO trovato
            </p>
          )}

          {legoResults !== null && legoResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {legoResults.map((set) => (
                <div
                  key={set.id}
                  className="bg-retro-card border border-retro-border rounded-lg overflow-hidden flex flex-col"
                >
                  {set.image && (
                    <img
                      src={set.image}
                      alt={set.name}
                      className="w-full h-32 object-contain bg-white/5 p-2"
                    />
                  )}
                  <div className="p-3 flex flex-col flex-1">
                    <h4 className="text-retro-text-bright text-xs font-semibold line-clamp-2 mb-1">
                      {set.name}
                    </h4>
                    <div className="text-[10px] text-retro-text/60 space-y-0.5 mb-2">
                      {set.year && <p>Anno: {set.year}</p>}
                      {set.parts != null && <p>Pezzi: {set.parts}</p>}
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => {
                          addToy(set);
                          navigate(`/toy/${set.id}`);
                        }}
                        className="w-full py-1.5 text-xs bg-neon-cyan/10 border border-neon-cyan/40 rounded text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                      >
                        Aggiungi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
