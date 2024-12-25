import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ pokemon }) => {
    return (
        <Link
            to={`/pokemon/${pokemon.id}`}>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-xl overflow-hidden text-white">
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                    <img
                        src={pokemon.sprites.other.dream_world.front_default}
                        alt={pokemon.name}
                        className="h-full max-w-full object-contain drop-shadow-lg"
                    />
                </div>
                <div className="p-5">
                    <h1 className="font-extrabold text-2xl capitalize text-center mb-3">{pokemon.name}</h1>
                    <div className="text-center text-sm">
                        <p className="mb-2">
                            <span className="font-semibold text-yellow-300">Type: </span>
                            {pokemon.types.map((typeObj, index) => (
                                <span key={index} className="mr-1">{typeObj.type.name}</span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;