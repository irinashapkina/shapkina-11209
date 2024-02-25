import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

const PokeCard = ({ poke }) => {
    const { name, url } = poke;
    const [pokeData, setPokeData] = useState({});
    const [pokeId, setPokeId] = useState(0);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        async function getPoke() {
            const response = await fetch(url);
            const data = await response.json();
            setPokeData(data);
            setTypes(data.types.map((type) => type.type.name));
            
            const id = url.split('/').slice(-2, -1)[0];
            setPokeId(id);
        }
        
        getPoke();
    }, [url]);

    return (
        <Link to={`/pokemon/${name}`}>
            <div className="pokemon-card">
                <div className="pokemon-content">
                    <div className="name-number">
                        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                        <p>#{(pokeId).toString().padStart(3, '0')}</p>
                    </div>
                    <img src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`} alt="" />
                    <div className="types">
                        {types.map((type, i) => {
                            return (
                                <button
                                    key={i}
                                    className={`type ${type.toLowerCase()}`}>
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PokeCard;
