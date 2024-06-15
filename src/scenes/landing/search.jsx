import React, { useState } from "react"
import InputField from "./InputField"
import { fetchSearchResults, fetchProducts, fetchPsychologyData, analyzePainPoints } from "./fetchData"

function SearchBar({ setResults, setProducts, setPainpoints, setPsychology }) {
    const [input, setInput] = useState("")

    const handleChange = (event) => {
        setInput(event.target.value)
    }

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
            const searchResults = await fetchSearchResults(input)
            setResults(searchResults)

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
        <InputField input={input} onChange={handleChange} onSearch={handleSearch} />
    )
}

export default SearchBar
