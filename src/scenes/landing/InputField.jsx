import React from 'react'
import { FaSearch } from 'react-icons/fa'

function InputField({ input, onChange, onSearch }) {
    return (
        <div className="mt-[-100px] flex items-center space-x-2 p-2 w-full md:w-96">
            <FaSearch id="search-icon" />
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={input}
                placeholder="Get started with your idea..."
                onChange={onChange}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                onClick={onSearch}
            >
                Search
            </button>
        </div>
    )
}

export default InputField
