import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card.jsx';
import { Outlet } from 'react-router-dom';
import PokeImage from "../assets/pokemonImage.png";

const Pokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState({
        pokemon: "",
        type: "",
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=500');
            const pokemonPromises = response.data.results.map(async (currElement) => {
                const res = await axios.get(currElement.url);
                return await res.data;
            });
            const pokemonData = await Promise.all(pokemonPromises);
            setPokemons(pokemonData);
        } catch (err) {
            console.log(err);
        }
    }

    const searchData = pokemons.filter((pokemon) => {
        const nameMatch = pokemon.name.toLowerCase().includes(search.pokemon.toLowerCase());
        const typeMatch = pokemon.types.some((type) => {
            return type.type.name.toLowerCase().includes(search.type.toLowerCase());
        });
        return nameMatch && typeMatch;
    });

    function handleSubmit(event) {
        event.preventDefault();
        setSearch({
            pokemon: "",
            type: "",
        });
    }

    function handleChange(event) {
        setSearch((prevState) => {
            const obj = { ...prevState };
            obj[event.target.name] = event.target.value;
            return obj;
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            {/* Logo Image */}
            <div className="flex justify-center mb-4">
                <img src={PokeImage} alt="logo-image" className="w-36 h-24 object-contain" />
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <input
                    type="text"
                    name="pokemon"
                    id="pokemon"
                    placeholder="Search For Pokemon"
                    value={search.pokemon}
                    onChange={handleChange}
                    className="font-semibold p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                />
                <input
                    type="text"
                    placeholder="Search by Type"
                    name="type"
                    id="type"
                    value={search.type}
                    onChange={handleChange}
                    className="font-semibold p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                />
                <button
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full text-sm">
                    CLEAR
                </button>
            </form>

            {/* Pokemon Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
                {searchData.map((pokemon) => {
                    return <Card key={pokemon.id} pokemon={pokemon} />;
                })}
            </div>

            <Outlet /> {/* Insert Outlet here for rendering nested routes */}
        </div>
    );
}

export default Pokemon;