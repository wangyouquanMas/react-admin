import { IconButton, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useResults } from "../landing/resultsContext.jsx";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
// import { Box, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


const Psychologys = () => {
    const { psychology } = useResults();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [analysisOption, setAnalysisOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [tempQuery, setTempQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 100,
    });

    const navigate = useNavigate(); // For navigation
    let filteredResults = [];

    // console.log("psychology：", psychology);

    // useEffect(() => {
    //     if (psychology && psychology.length) {
    //         filteredResults = psychology.filter(user => {
    //             return (
    //                 user.name &&
    //                 user.id
    //             );
    //         });
    //         console.log("filteredResults:", filteredResults)
    //         localStorage.setItem("results", JSON.stringify(filteredResults));
    //     } else {
    //         const storedResults = localStorage.getItem("results");
    //         if (storedResults) {
    //             filteredResults = JSON.parse(storedResults);
    //         }
    //     }
    //     console.log("current results", filteredResults[0]);
    //     setRows(filteredResults);
    //     setRowCount(filteredResults.length); // Assume the API returns a total count
    //     setLoading(false);
    // }, [psychology])


    useEffect(() => {
        const fetchData = () => {
            fetch(`http://127.0.0.1:8080/psychology?query=${searchQuery}`)
                .then(response => response.json())
                .then(psychologyData => {
                    const filteredResults = psychologyData.map((content) => {
                        return { name: content.source.name, description: content.source.description, id: content.source.id, psychology_id: content.source.psychology_id, frequency: content.source.frequency };
                    });
                    console.log("filteredResults:", filteredResults);
                    localStorage.setItem('psychology', JSON.stringify(filteredResults));
                    setRows(filteredResults);
                    setRowCount(filteredResults.length); // Assume the API returns a total count
                    setLoading(false);
                }).catch(error => {
                    console.error('There was an error!', error);
                    setLoading(false);
                })
        };
        if (searchQuery) {
            fetchData();
        } else {
            const storedResults = localStorage.getItem('psychology');
            if (storedResults) {
                const parsedResults = JSON.parse(storedResults);
                setRows(parsedResults);
                setRowCount(parsedResults.length);
            }
        }
    }, [searchQuery]);

    const handleSearchInputChange = (event) => {
        setTempQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(event.target.value);
            localStorage.setItem('searchQuery', event.target.value);
        }
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "psychology_id", headerName: "PID" },
        {
            field: "name",
            headerName: "Name",
            renderCell: (params) => (
                <div
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => {
                        let id = params.row.id;
                        localStorage.setItem("pid", id); // Save questionId to local storage
                        navigate(`/psychology_analysis`, { state: { pid: id } }); // Navigate on click
                    }}
                >
                    {params.value}
                </div>
            )
        },
        { field: "description", headerName: "Description", width: 500 },
        { field: "frequency", headerName: "Frequency" }
    ];

    return (
        <Box m="20px">
            <Header title="Psychology" subtitle="Related psychology" />

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

            {rows ? (
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        checkboxSelection
                        rows={rows}
                        columns={columns}
                        getRowHeight={() => 'auto'}
                        pagination
                        paginationMode="server"
                        pageSizeOptions={[25, 50, 100]}
                        rowCount={rowCount}
                        loading={loading}
                        page={paginationModel.page}
                        pageSize={paginationModel.pageSize}
                        onPageSizeChange={(newPageSize) => setPaginationModel(prev => ({ ...prev, pageSize: newPageSize }))}
                        onPageChange={(newPage) => setPaginationModel(prev => ({ ...prev, page: newPage }))}
                        getRowId={(row) => row.id} // Specify custom ID using getRowId
                    />
                </Box>
            ) : (
                <Typography variant="h6" align="center" mt={4}>
                    Please enter a search query to display results.
                </Typography>
            )}
        </Box>
    );
};

export default Psychologys;
