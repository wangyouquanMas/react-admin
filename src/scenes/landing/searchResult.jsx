import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./searchResultsList.css";
import { Box, Typography, useTheme } from "@mui/material";

function SearchResultsList({ results, products }) {
    const navigate = useNavigate();

    const handleResultClick = (item) => {
        console.log("item", item);
        // Navigate to the dashboard page and pass the clicked item as state
        navigate('/dashboard', { state: { question_id: item.uid } });
    };

    return (
        <Box display="flex">
            <div className="results-column">
                <Typography variant="h5" className="column-title">Questions</Typography>
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
            <div className="divider"></div>
            <div className="products-column">
                <Typography variant="h5" className="column-title">SWOT</Typography>
                {
                    products.map((product, id) => {
                        return (
                            <div key={id} className="product-item">
                                {product.name}
                            </div>
                        )
                    })
                }
            </div>
        </Box>
    );
}

export default SearchResultsList;
