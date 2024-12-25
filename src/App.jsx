import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailedCard from './components/DetailedCard'; // Adjust path as necessary
import Pokemon from './components/Pokemon';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route to render the list of all Pokémon */}
                <Route path="/" element={<Pokemon />} />

                {/* Route to render the detailed page for a specific Pokémon */}
                <Route path="/pokemon/:id" element={<DetailedCard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;