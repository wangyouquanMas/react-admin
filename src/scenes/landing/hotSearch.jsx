import "./hotSearch.css";
import React, { useState, useEffect } from 'react';

const HotSearch = () => {

    const [hotSearchTerms, setHotSearchTerms] = useState([]);

    useEffect(() => {
        fetchHotSearchTerms();
    }, []);

    const fetchHotSearchTerms = async () => {
        try {
            const response = await fetch('https://api.oioweb.cn/api/common/HotList');
            const data = await response.json();
            setHotSearchTerms(data.result['人人都是产品经理']); // Assuming data is an array of hot search terms
        } catch (error) {
            console.error('Error fetching hot search terms:', error);
        }
    };


    return (
        <div className="hot-search">
            <ul className="hot-search-list">
                <label className="hot-label">产品热搜🔥</label>
                {hotSearchTerms.map((item, index) => (
                    <li><a key={index} href={item.href} className="hot-search-item" target="_blank" rel="noopener noreferrer">
                        {item.title} {item.hot}
                    </a>
                    </li>
                ))}
            </ul>
        </div>);
};

export default HotSearch;