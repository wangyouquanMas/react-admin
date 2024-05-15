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
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                console.log(data); // See what the data actually is.
                console.log(Array.isArray(data)); // Check if it's an array.
                const results = data.filter((content) => {
                    return value && content.title; //value : no input no display 
                });
                console.log(results);
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



    const handlerChange = (value) => {
        setValue(value)
        fetchData(value)
        // fetchData()
    };

    return (
        <div className="mt-[-100px] flex items-center space-x-2 p-2 w-full md:w-96">
            <FaSearch id="search-icon" />
            <input className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={input} placeholder="Enter your input..." onChange={(event) => handlerChange(event.target.value)} />
        </div>
    )
}
export default SearchBar