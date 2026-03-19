import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ToyDetailPage from './pages/ToyDetailPage';
import CollectionPage from './pages/CollectionPage';
import AddToyPage from './pages/AddToyPage';
import { useToys } from './hooks/useToys';

function App() {
  const {
    toys,
    addToy,
    addToys,
    toggleCollection,
    isInCollection,
    searchToys,
    getToy,
    getCollectionToys,
  } = useToys();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-retro-dark">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage toys={toys} isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
          <Route path="/catalogo" element={<CatalogPage searchToys={searchToys} isInCollection={isInCollection} toggleCollection={toggleCollection} addToys={addToys} />} />
          <Route path="/toy/:id" element={<ToyDetailPage getToy={getToy} toys={toys} isInCollection={isInCollection} toggleCollection={toggleCollection} />} />
          <Route path="/collezione" element={<CollectionPage getCollectionToys={getCollectionToys} toggleCollection={toggleCollection} isInCollection={isInCollection} />} />
          <Route path="/aggiungi" element={<AddToyPage addToy={addToy} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
