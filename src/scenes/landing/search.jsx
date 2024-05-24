import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ setResults, setProducts, setPainpoints, setPsychology }) {
    const [input, setValue] = useState("");

    const fetchData = async (value) => {
        if (!value) {
            console.log("No input provided");
            setResults([]);
            setProducts([]);
            setPainpoints([]);
            return;
        }

        try {
            let url = new URL("http://127.0.0.1:8080/search");
            url.searchParams.append('query', value);
            console.log("url:", url);
            const searchResponse = await fetch(url);
            const searchData = await searchResponse.json();
            console.log(searchData);
            const searchResults = searchData.map((content) => {
                return { uid: content.source.uid, title: content.source.title, frequency: content.source.frequency };
            });
            console.log("searchResults:", searchResults);
            setResults(searchResults);

            url = new URL("http://127.0.0.1:8080/products");
            url.searchParams.append('query', value);
            console.log("url:", url);
            const productsResponse = await fetch(url);
            const productsData = await productsResponse.json();
            console.log(productsData);
            const productsResults = productsData.map((content) => {
                return { name: content.source.name, description: content.source.description };
            });
            console.log("productsResults:", productsResults);
            setProducts(productsResults);



            url = new URL("http://127.0.0.1:8080/psychology");
            url.searchParams.append('query', value);
            console.log("url:", url);
            const psychologyResponse = await fetch(url);
            const psychologyData = await psychologyResponse.json();
            console.log(psychologyData);
            const psychologyResults = psychologyData.map((content) => {
                return { name: content.source.name, description: content.source.description, id: content.source.id, psychology_id: content.source.psychology_id, frequency: content.source.frequency };
            });
            console.log("psychologyResults:", psychologyResults);
            setPsychology(psychologyResults);

            const openaiResponse = await fetch('http://172.235.13.33:5001/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: value }) // Assuming 'value' is the content to be sent to OpenAI API
            });

            if (!openaiResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const openaiResult = await openaiResponse.json();
            console.log("openaiResult:", openaiResult);
            setPainpoints(openaiResult.text);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = () => {
        fetchData(input);
    };

    return (
        <div className="mt-[-100px] flex items-center space-x-2 p-2 w-full md:w-96">
            <FaSearch id="search-icon" />
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={input}
                placeholder="Get started with your idea..."
                onChange={handleChange}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                onClick={handleClick}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
