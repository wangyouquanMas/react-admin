import React, { useState } from "react"
import InputField from "./InputField"
import { fetchSemanticSearch, fetchSearchResults, fetchProducts, fetchPsychologyData, analyzePainPoints } from "./fetchData"

function SearchBar({ setResults, setProducts, setPainpoints, setPsychology }) {
    const [input, setInput] = useState("")
    const [searchType, setSearchType] = useState("semantic"); // Default to 'semantic'
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = async () => {
        if (!input) {
            console.log("No input provided")
            setResults([])
            setProducts([])
            setPainpoints([])
            setPsychology([])
            return
        }

        try {
            let searchResults;
            if (searchType === "semantic") {
                searchResults = await fetchSemanticSearch(input);
            } else {
                searchResults = await fetchSearchResults(input);
            }
            setResults(searchResults);

            const productsResults = await fetchProducts(input)
            setProducts(productsResults)

            const psychologyResults = await fetchPsychologyData(input)
            setPsychology(psychologyResults)

            const painpoints = await analyzePainPoints(input)
            setPainpoints(painpoints)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    }

    return (
        <>
            <InputField input={input} onChange={handleChange} onSearch={handleSearch} />
            <div className="mt-4">
                <label className="mr-4">
                    <input
                        type="radio"
                        value="semantic"
                        checked={searchType === "semantic"}
                        onChange={handleTypeChange}
                    />
                    Semantic
                </label>
                <label>
                    <input
                        type="radio"
                        value="product"
                        checked={searchType === "product"}
                        onChange={handleTypeChange}
                    />
                    Product
                </label>
            </div>
            {loading && <div>Loading...</div>}
        </>
    )
}

export default SearchBar
