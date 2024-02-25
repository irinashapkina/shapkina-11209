import React, { useEffect, useState, useRef } from 'react';
import PokemonCard from './components/PokemonCard';
import './MainPage.css';
import logo from '../../images/pika.png'


const MainPage = () => {
    const [poke, setPoke] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    async function getPoke() {
        setIsLoading(true);
        const offset = (currentPage - 1) * 50;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=200`);
        const data = await response.json();
        setPoke(prevPoke => [...prevPoke, ...data.results]);
        setIsLoading(false);
    }

    useEffect(() => {
        getPoke();
    }, [currentPage]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const filteredPoke = poke.filter((pok) =>
        pok.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="wrapper">
            <div className="header">
                <h1>Who are you looking for?</h1>
                <div className="search-bar">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                        <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
                    </svg>
                    <input
                        type="text"
                        name="q"
                        placeholder="E.g. Pikachu"
                        onChange={handleSearchChange}
                        value={searchQuery}
                    />
                    <button type="submit">Go</button>
                </div>
            </div>
            <div className="pokemon-list">
                {isLoading ? (
                    <h2 className="loader">Loading...</h2>
                ) : filteredPoke.length === 0 ? (
                    <div className='error-search'>
                        <h2>Ooops! Try again</h2>
                        <p>The Pokemon you're looking for is a unicorn. It doesn't exist in this list.</p>
                        <img src={logo} alt="Pikachu" />
                    </div>
                ) : (
                    <>
                        {filteredPoke.map((pok, index) => (
                            <PokemonCard key={index} poke={pok} />
                        ))}
                        <div className="load-more-container">
                            <button className="load-more-button" onClick={handleLoadMore}>Load More</button>
                        </div>
                    </>
                )}
            </div>
            
        </div>
    );
};

export default MainPage;
