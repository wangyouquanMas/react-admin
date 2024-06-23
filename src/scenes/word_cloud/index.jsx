import { Box, Button, CircularProgress, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import { useFirstRender } from "@mui/x-data-grid";
import { useLocation } from 'react-router-dom';


const WorldCloud = () => {
    const location = useLocation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchID, setsearchID] = useState("");
    const [tempQuery, setTempQuery] = useState("");
    const [questionId, setQuestionId] = useState();



    useEffect(() => {
        if (location.state && location.state.questionId) {
            setsearchID(location.state.questionId);
            localStorage.setItem("questionId", location.state.questionId); // Save to local storage
        } else {
            const storedQuestionId = localStorage.getItem("questionId");
            console.log("****************", storedQuestionId)
            if (storedQuestionId) {
                setsearchID(storedQuestionId);
            }
        }
    }, [location.state]);


    useEffect(() => {
        if (!searchID) return;  // Prevent fetching if `questionId` is undefined or empty
        console.log("*********111111111*******")

        const cachedImageUrl = localStorage.getItem(`wordcloud_${searchID}`);
        if (cachedImageUrl) {
            console.log("*********22*******")
            setImageUrl(cachedImageUrl);
            return;
        }

        const fetchWordCloud = async () => {
            setLoading(true);
            try {
                console.log("*********111111111*******")
                const response = await fetch('http://127.0.0.1:8002/wordcloud', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question_id: searchID })  // Replace with your actual question ID
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrl(imageUrl);
                    localStorage.setItem(`wordcloud_${searchID}`, imageUrl);
                } else {
                    console.error('Failed to fetch word cloud image');
                }
            } catch (error) {
                console.error('Error fetching word cloud image:', error);
            }
            setLoading(false);
        };

        fetchWordCloud();
    }, [searchID]);


    const handleSearchInputChange = (event) => {
        setTempQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setsearchID(event.target.value);
            localStorage.setItem('searchQuery', event.target.value);
        }
    };

    return (

        <Box m="20px">
            <Header title="Word Cloud" subtitle="Generated Word Cloud for the selected question" />

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
                <IconButton onClick={() => setsearchID(searchID)}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                {loading ? (
                    <CircularProgress />
                ) : (
                    imageUrl ? (
                        <img src={imageUrl} alt="Word Cloud" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                        <Typography variant="h6">No word cloud available</Typography>
                    )
                )}
            </Box>
        </Box>

    );
};

export default WorldCloud;
