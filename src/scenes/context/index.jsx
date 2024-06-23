import React, { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import { IconButton, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useResults } from "../landing/resultsContext.jsx";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import { toCanvas } from 'html-to-image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const DynamicLifeStagesTimeline = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [items, setItems] = useState([]);
    const [answerId, setanswerId] = useState(localStorage.getItem('answerId'));
    const [tempState, setTempState] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [answerIds, setAnswerIds] = useState([]);
    const [tempQuery, setTempQuery] = useState("");
    const [questionId, setQuestionId] = useState(localStorage.getItem('questionId'));
    localStorage.setItem('tempState', tempState);


    console.log("sdsss", answerIds)

    useEffect(() => {
        console.log("answer...", answerId)
        if (!answerId || answerId == 0 || answerId === null) {
            if (answerIds.length > 0) {
                setanswerId(answerIds[0]); // Set answerId to the first item in answerIds array
            }
            return; // Exit useEffect if answerId is empty
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/context/${answerId}`); // Corrected URL
                const data = await response.json(); // Parse the response data as JSON

                console.log("Fetched data:", data);

                // Check if data is an  array
                if (Array.isArray(data)) {
                    // Map the data to the format required by Chrono
                    const mappedItems = data.map(item => ({
                        title: item.stage,
                        cardTitle: `${item.role} - ${item.responsibility}`,
                        cardSubtitle: `${item.location} - ${item.time}`,
                        cardDetailedText: item.specificEvents.map(event =>
                            `#${event.event} -- #${event.emotional}`
                        )
                    }));
                    // console.log("mappedItems:", mappedItems)
                    setItems(mappedItems);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [tempState, answerId]);

    useEffect(() => {
        const tempState1 = localStorage.getItem('tempState');
        // setanswerId(localStorage.getItem('answerId'));
        setTempState(!tempState1);
        localStorage.setItem('tempState', tempState);
        localStorage.setItem('questionId', questionId);

        const fetchAnswerIds = async (questionId) => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/contexts/${questionId}`);
                const data = await response.json();
                setAnswerIds(data);
                setanswerId(data[0]);
                console.log("localStorage.getItem('currentIndex')", localStorage.getItem('currentIndex'))
                if (!localStorage.getItem('currentIndex')) {
                    setCurrentIndex(localStorage.getItem('currentIndex'))
                } else {
                    setCurrentIndex(0);
                } // Start with the first answer ID
            } catch (error) {
                console.error('Error fetching answer IDs:', error);
            }
        };

        fetchAnswerIds(questionId)
    }, [questionId]);

    const handleSearchInputChange = (event) => {
        setItems("")
        setanswerId()
        setTempQuery(event.target.value);
    };

    useEffect(() => {
        console.log("questionId", questionId)
        console.log("localStorage.getItem('questionId')", localStorage.getItem('questionId'))

        if (questionId != localStorage.getItem('questionId')) {
            return
        }
        const tempState1 = localStorage.getItem('tempState');
        setanswerId(localStorage.getItem('answerId'));
        setTempState(!tempState1);
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setanswerId(event.target.value);
            localStorage.setItem('answerId', answerId);
        }
    };


    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setItems("")
            setanswerId(answerIds[currentIndex])
            localStorage.setItem('answerId', answerId);
            localStorage.setItem('currentIndex', currentIndex);
        }
    };

    const handleNext = () => {
        if (currentIndex < answerIds.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setItems("")
            setanswerId(answerIds[currentIndex])
            localStorage.setItem('answerId', answerId);
            localStorage.setItem('currentIndex', currentIndex);
        }
    };


    return (
        <Box m="20px">
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search"
                    value={tempQuery}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                />
                <IconButton onClick={() => setanswerId(answerId)}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="20px">
                <IconButton onClick={handlePrevious} disabled={currentIndex <= 0}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={handleNext} disabled={currentIndex >= answerIds.length - 1}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>

            {/* items don't automatically rerender, so have to clear it every time */}
            <div style={{ width: '100%', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
                {items.length > 0 ? (
                    <Chrono items={items} slideShow mode="VERTICAL" />
                ) : (
                    <p>Loading timeline data...</p>
                )}
            </div>
        </Box>
    );
};

export default DynamicLifeStagesTimeline;


