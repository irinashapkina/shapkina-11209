import './StatBlock.css'
import React, { useEffect, useState } from 'react';

const StatBlock = (props) => {

    const [data, setData] = useState([])
    const [abilities, setAbilities] = useState([]);

    async function getInfo(){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
        const data = await response.json()
        setData(data)
        setAbilities(data.abilities);
    }

    useEffect(() =>{
        getInfo()
        console.log(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
    }, [])
    
    return (
        <div className="wrapper-info">
            <div className='stat-card stat-card_general'>
                <div className="stat-card__wrapper">
                    {data.stats && data.stats.length > 0 && ( 
                        <>
                        <div className="stat-card__general-header">
                            <div className="number-name">
                                <h3>#{data.id.toString().padStart(3, '0')}</h3>
                                <h2>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                            </div>
                            <div className="types-info">
                                {data.types.map((type, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className={`type ${type.type.name.toLowerCase()}`}>
                                            {type.type.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="stat-card__general-content">
                            <div className="stats">
                                <div className="hot-bar">
                                    <div className="stat-item">
                                        <h4>HP</h4>
                                        <div className="stat-bar hp">
                                            <div className="stat-fill" style={{ width: `${(data.stats[0].base_stat)}px` }}></div>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <h4>Attack</h4>
                                        <div className="stat-bar attack">
                                            <div className="stat-fill" style={{ width: `${(data.stats[1].base_stat)}px` }}></div>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <h4>Defense</h4>
                                        <div className="stat-bar defense">
                                            <div className="stat-fill" style={{ width: `${(data.stats[2].base_stat)}px` }}></div>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <h4>Speed</h4>
                                        <div className="stat-bar speed">
                                            <div className="stat-fill" style={{ width: `${(data.stats[5].base_stat)}px` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt={data.name} />
                        </div>
                        </>
                    )}
                </div>
            </div>
            
            <div className="stat-card stat-card_breeding">
                <div className="stat-card__wrapper">
                    <div className="stat-card__header">
                        <h2>Breeding</h2>
                    </div>

                    <div className="stat-card__breeding-content">
                        <div className="breeding-content">
                            <h4>Height</h4>
                            <div>
                                <h4>
                                {data.height ? (
                                    data.height.toString().length === 1
                                        ? `0.${data.height} m`
                                        : `${data.height.toString().slice(0, -1)}.${data.height.toString().slice(-1)} m`
                                ) : (
                                    'Unknown'
                                )}
                                </h4>
                            </div>
                        </div>
                        <div className="breeding-content">
                            <h4>Weight</h4>
                            <div>
                                <h4>
                                {data.weight ? (
                                    data.weight.toString().length === 1
                                        ? `0.${data.weight} kg`
                                        : `${data.weight.toString().slice(0, -1)}.${data.weight.toString().slice(-1)} kg`
                                ) : (
                                    'Unknown'
                                )}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-card__wrapper">
                    <div className="stat-card__header">
                        <h2>Abilities</h2>
                    </div>
                    <div className="stat-card__abilities-content">
                        {abilities.map((ability, index) => (
                            <div key={index} className="ability-box">
                                <div className={`ability ${index === 0 ? 'yellow' : index === 1 ? 'orange' : 'red'}`}>
                                    <div className="ability-circle">
                                        {ability.ability.name.charAt(0).toUpperCase()}
                                    </div>
                                    <p>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatBlock;
