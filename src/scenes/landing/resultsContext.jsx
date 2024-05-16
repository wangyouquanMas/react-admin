import React, { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

export const useResults = () => useContext(ResultsContext);

const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    console.log(children); // Check if children is defined

    return (
        <ResultsContext.Provider value={{ results, setResults }}>
            {children}
        </ResultsContext.Provider>
    );
};

export default ResultsProvider;