import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailedCard() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
        } catch (error) {
            setError("Failed to fetch Pokemon details.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (error) return <div>{error}</div>;

    // Check if sprite and dream_world are available before accessing them
    const pokemonImage = pokemon.sprites?.other?.dream_world?.front_default;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:w-7/10 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-xl lg:mt-8 lg:mb-8">
                <h1 className="font-extrabold text-3xl lg:text-4xl text-center text-yellow-600 mb-6 uppercase">{pokemon.name}</h1>

                {/* Pokemon Image with fallback placeholder */}
                <div className="flex justify-center mb-6">
                    <img
                        src={pokemonImage || "https://via.placeholder.com/200"}
                        alt={pokemon.name}
                        className="w-68 h-68 p-5 object-contain border-4 border-white shadow-lg"
                    />
                </div>

                {/* Pokemon Details */}
                <div className="mb-6 text-gray-800">
                    <p className="text-2xl lg:text-3xl mb-3">
                        <span className="font-semibold text-yellow-600">Experience:</span> {pokemon.base_experience}
                    </p>
                    <p className="text-2xl lg:text-3xl mb-3">
                        <span className="font-semibold text-yellow-600">Height:</span> {pokemon.height} decimetres
                    </p>
                    <p className="text-2xl lg:text-3xl mb-3">
                        <span className="font-semibold text-yellow-600">Weight:</span> {pokemon.weight / 10} kilograms
                    </p>
                </div>

                {/* Types */}
                <div className="mb-6">
                    <p className="font-semibold text-2xl lg:text-3xl text-yellow-600 uppercase">Type</p>
                    <div className="flex flex-wrap mt-2">
                        {pokemon.types?.map((typeObj, index) => (
                            <span key={index} className="bg-gray-800 text-yellow-600 py-1 px-3 rounded-full mr-2 mb-2 text-xl">
                                {typeObj.type.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Abilities */}
                <div className="mb-6">
                    <p className="font-semibold text-2xl lg:text-3xl text-yellow-600 uppercase">Abilities</p>
                    <div className="flex flex-wrap mt-2">
                        {pokemon.abilities?.map((abilityObj, index) => (
                            <span key={index} className="bg-gray-800 text-yellow-600 py-1 px-3 rounded-full mr-2 mb-2 text-xl">
                                {abilityObj.ability.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-6">
                    <p className="font-semibold text-2xl lg:text-3xl text-yellow-600 uppercase">Stats</p>
                    {pokemon.stats?.map((statObj, index) => (
                        <p key={index} className="text-xl lg:text-2xl mb-3">
                            <span className="font-semibold">{statObj.stat.name.toUpperCase()}:</span> {statObj.base_stat}
                        </p>
                    ))}
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link
                        to='/'
                        className="bg-yellow-600 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition duration-300 uppercase">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DetailedCard;