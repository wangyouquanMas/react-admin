import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

function SearchBar({ setResults }) {

    const [input, setValue] = useState("");


    const fetchData = (value) => {
        if (!value) {
            console.log("No input provided");
            setResults([]);
            return;
        }

        const url = new URL("http://127.0.0.1:8080/search");
        url.searchParams.append('query', value);
        console.log("url:", url);
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                console.log(data); // See what the data actually is.
                console.log(Array.isArray(data)); // Check if it's an array.
                console.log("data:", data);
                const results = data.map((content) => {

                    return { uid: content.source.uid, title: content.source.title, frequency: content.source.frequency }; //value : no input no display 
                });
                console.log("result:", results);
                setResults(results);
            });
    };



    // const fetchData = () => {
    //     fetch("/questions").then(
    //         response => response.json()
    //     ).then(
    //         data => {
    //             // setResults(data)
    //             console.log(data);
    //         }
    //     )
    // };



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
    )
}
export default SearchBar