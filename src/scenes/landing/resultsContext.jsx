import React, { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

export const useResults = () => useContext(ResultsContext);

const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [products, setProducts] = useState([]);
    const [painpoints, setPainpoints] = useState("");
    const [psychology, setPsychology] = useState("");
    console.log(children); // Check if children is defined

    return (
        <ResultsContext.Provider value={{ results, setResults, products, setProducts, painpoints, setPainpoints, psychology, setPsychology }}>
            {children}
        </ResultsContext.Provider>
    );
};

export default ResultsProvider;