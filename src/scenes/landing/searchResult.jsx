import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./searchResultsList.css";

function SearchResultsList({ results }) {
    const navigate = useNavigate();

    const handleResultClick = (item) => {
        console.log("item", item);
        // Navigate to the dashboard page and pass the clicked item as state
        navigate('/dashboard', { state: { question_id: item.uid } });
    };

    return (
        <div className="results-list">
            {results.map((result, id) => {
                return (
                    <div key={id} className="result-item">
                        <button onClick={() => handleResultClick(result)} className="result-link">
                            {result.title}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default SearchResultsList;
