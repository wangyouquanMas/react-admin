import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import { IconButton, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import { useResults } from "../landing/resultsContext.jsx";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import { toCanvas } from 'html-to-image';


const Triggers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchID, setsearchID] = useState("");
  const [tempQuery, setTempQuery] = useState("");
  const chartRef = useRef(null);


  useEffect(() => {
    const savedQuestionId = localStorage.getItem('questionId');
    setsearchID(savedQuestionId);
  }, []);


  const handleSearchInputChange = (event) => {
    setTempQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setsearchID(event.target.value);
      localStorage.setItem('questionId', event.target.value);
    }
  };

  const handleExport = () => {
    if (chartRef.current) {
      toCanvas(chartRef.current, { pixelRatio: 10 }) // Increase pixel ratio for higher quality
        .then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png', 1.0); // Use highest quality for PNG
          link.download = 'chart.png';
          link.click();
        })
        .catch((err) => {
          console.error('Failed to export chart as image', err);
        });
    }
  };


  // const handleExport = async () => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:8080/triggers/${searchID}/image`);
  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch image paths: ${data.message}`);
  //     }

  //     const { categoryImagePath, subCategoryImagePath } = data;

  //     // Download category image
  //     const categoryLink = document.createElement('a');
  //     categoryLink.href = `/images/${categoryImagePath.split('/').pop()}`;
  //     categoryLink.download = 'category_chart.png';
  //     categoryLink.click();

  //     // Download sub-category image
  //     const subCategoryLink = document.createElement('a');
  //     subCategoryLink.href = `/images/${subCategoryImagePath.split('/').pop()}`;
  //     subCategoryLink.download = 'subcategory_chart.png';
  //     subCategoryLink.click();
  //   } catch (err) {
  //     console.error('Error exporting image:', err);
  //   }
  // };


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



      <Box height="75vh" ref={chartRef}>
        <BarChart searchId={searchID} />
      </Box>

      <Button onClick={handleExport} variant="contained" color="primary" sx={{ mt: 2 }}>
        Export Chart as Image
      </Button>
    </Box>
  );
};

export default Triggers;
