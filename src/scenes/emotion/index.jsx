import PieChart from "../../components/PieChart";
import { IconButton, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useResults } from "../landing/resultsContext.jsx";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";

const Emotion = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchQuery, setSearchQuery] = useState("");
    const [tempQuery, setTempQuery] = useState("");


    useEffect(() => {
        const savedQuestionId = localStorage.getItem('searchQuery');
        setSearchQuery(savedQuestionId);
    }, []);


    const handleSearchInputChange = (event) => {
        setTempQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(event.target.value);
            localStorage.setItem('searchQuery', event.target.value);
        }
    };

    return (
        <Box m="20px">
            <Header title="Emotion Chart" subtitle="Product opportunity analsysis" />
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
                <IconButton onClick={() => setSearchQuery(searchQuery)}>
                    <SearchIcon />
                </IconButton>
            </Box>



            <Box height="75vh">
                <PieChart searchQuery={searchQuery} />
            </Box>
        </Box>
    );
};

export default Emotion;
