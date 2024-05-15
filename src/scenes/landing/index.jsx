// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import SearchBar from './search.jsx';
import SearchResultsList from './searchResult.jsx';
import HotSearch from './hotSearch.jsx';
import { useNavigate } from 'react-router-dom';
import Hero from './hero.jsx';
import Questions from '../questions/index.jsx';

function LandingPage() {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleResultClick = (item) => {
        navigate('/dashboard', { state: { results } });
    };

    const displayComponent = results.length > 0 ?
        <SearchResultsList results={results} onResultClick={handleResultClick} /> :
        <HotSearch />;



    return (
        <div >
            <div className="flex  flex-col items-center ">
                <Hero />
                <SearchBar setResults={setResults} />
                {displayComponent}
            </div>
            {/* <div className="search-bar-container">
                <Questions results={results} />
            </div> */}
        </div >
    );
}

export default LandingPage;
