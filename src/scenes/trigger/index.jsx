import BarChart from "../../components/BarChart";
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


const Triggers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchID, setsearchID] = useState("");
  const [tempQuery, setTempQuery] = useState("");

  useEffect(() => {
    const savedQuestionId = localStorage.getItem('searchQuery');
    setsearchID(savedQuestionId);
  }, []);


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
      <Header title="Triggers " subtitle="Top triggers" />

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



      <Box height="75vh">
        <BarChart searchId={searchID} />
      </Box>
    </Box>
  );
};

export default Triggers;
