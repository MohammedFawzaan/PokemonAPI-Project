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
            // fetching the pokemon url
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=350');
            // console.log(response);

            // forming an array of promises, each element of data.results
            // data.results is an array of url's for each Pokemon
            // prokemon Promises is an array of all promises for each Pokemon
            const pokemonPromises = response.data.results.map(async (currElement) => {
                // fetching each url in res
                const res = await axios.get(currElement.url);
                return await res.data;
            });
            // console.log(pokemonPromises);

            // resolving the promises in pokemonPromises 
            const pokemonData = await Promise.all(pokemonPromises);
            console.log(pokemonData);

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
        <div className="p-5">
            {/* Logo Image */}
            <div className="flex justify-center mb-5">
                <img src={PokeImage} alt="logo-image" className="w-50 h-32 object-contain" />
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="flex justify-center space-x-4 mb-5">
                <input
                    type="text"
                    name='pokemon'
                    id='pokemon'
                    placeholder='Search For Pokemon'
                    value={search.pokemon}
                    onChange={handleChange}
                    className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <input
                    type="text"
                    placeholder='Search by Type'
                    name='type'
                    id='type'
                    value={search.type}
                    onChange={handleChange}
                    className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <button type='submit' className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    CLEAR
                </button>
            </form>

            {/* Pokemon Cards Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                {searchData.map((pokemon) => {
                    return <Card key={pokemon.id} pokemon={pokemon} />;
                })}
            </div>

            <Outlet /> {/* Insert Outlet here for rendering nested routes */}
        </div>
    );
}

export default Pokemon;