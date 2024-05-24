// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import SearchBar from './search.jsx';
import SearchResultsList from './searchResult.jsx';
import HotSearch from './hotSearch.jsx';
import { useNavigate } from 'react-router-dom';
import Hero from './hero.jsx';
import Questions from '../questions/index.jsx';
import { useResults } from './resultsContext.jsx';


function LandingPage() {
    const { results, setResults, products, setProducts, painpoints, setPainpoints, psychology, setPsychology } = useResults();

    //TODO: set another state or SWOT 

    const displayComponent = results.length > 0 ?
        <SearchResultsList results={results} products={products} painpoints={painpoints} /> :
        <HotSearch />;


    return (
        <div >
            <div className="flex  flex-col items-center ">
                <Hero />
                <SearchBar setResults={setResults} setProducts={setProducts} setPainpoints={setPainpoints} setPsychology={setPsychology} />
                {displayComponent}
            </div>
        </div >
    );
}

export default LandingPage;
