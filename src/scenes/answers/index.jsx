import { Box, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Answers = () => {
    const location = useLocation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [questionId, setQuestionId] = useState();
    const [analysisOption, setAnalysisOption] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 100,
    });

    const navigate = useNavigate(); // For navigation
    useEffect(() => {
        if (location.state && location.state.questionId) {
            setQuestionId(location.state.questionId);
            localStorage.setItem("questionId", location.state.questionId); // Save to local storage
        } else {
            const storedQuestionId = localStorage.getItem("questionId");
            if (storedQuestionId) {
                setQuestionId(storedQuestionId);
            }
        }
        console.log("questionId log:", questionId);
    }, [location.state]);

    useEffect(() => {
        const fetchData = (questionId) => {
            setLoading(true);
            const { page, pageSize } = paginationModel;
            console.log("current page1111:", page);
            fetch(`http://127.0.0.1:8080/api/answers?question_id=${questionId}&page=${page}&pageSize=${pageSize}`)
                .then(response => response.json())
                .then(response => {
                    console.log("current results1", response.data[0]);

                    const results = response.data.filter(answer => {
                        return (
                            answer.content &&
                            answer.emotion !== "" &&
                            answer.emotion !== undefined &&
                            answer.reason !== "" &&
                            answer.reason !== undefined &&
                            answer.voteup_count >= 0 &&
                            answer.voteup_count !== undefined &&
                            answer.comment_count !== "" &&
                            answer.comment_count !== undefined &&
                            answer.favlists_count !== "" &&
                            answer.favlists_count !== undefined &&
                            answer.category !== "" &&
                            answer.category !== undefined &&
                            answer.sub_category !== "" &&
                            answer.sub_category !== undefined
                        );
                    }
                    );
                    console.log("current results", results[0]);
                    setRows(results);
                    setRowCount(response.totalCount); // Assume the API returns a total count
                    setLoading(false);
                }).catch(error => {
                    console.error('There was an error!', error);
                    setLoading(false);

                })
        };

        if (questionId) {
            fetchData(questionId);
        }
    }, [paginationModel, questionId]);



    const columns = [
        { field: "id", headerName: "ID" },
        { field: "content", headerName: "Content", width: 600 },
        { field: "emotion", headerName: "Emotion", width: 300 },
        { field: "category", headerName: "category", width: 100 },
        { field: "sub_category", headerName: "subCategory", width: 100 },
        { field: "reason", headerName: "Reason", width: 300 },
        { field: "voteup_count", headerName: "vote", width: 100 },
        { field: "comment_count", headerName: "comment", width: 100 },
        { field: "favlists_count", headerName: "favlists", width: 100 },
    ];

    const autosizeOptions = {
        includeOutliers: true,
    };

    const handleAnalysisChange = (event) => {
        setAnalysisOption(event.target.value);
    };

    const handleAnalysisClick = () => {
        console.log(`Selected analysis option: ${analysisOption}`);
        // Add your analysis logic here based on the selected option
    };

    return (
        <Box m="20px">
            <Header
                title="Answers"
                subtitle="List of Answers for Product Analysis"
            />
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}  >
                <FormControl sx={{ minWidth: 150, mr: 2 }}>
                    <InputLabel id="analysis-select-label">Analysis</InputLabel>
                    <Select
                        labelId="analysis-select-label"
                        value={analysisOption}
                        label="Analysis"
                        onChange={handleAnalysisChange}
                    >
                        <MenuItem value="painpoint">Painpoint</MenuItem>
                        <MenuItem value="category">Category</MenuItem>
                        <MenuItem value="addiction">Addiction</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={handleAnalysisClick}
                >Analysis</Button>
            </Box>
            <Box
                mt={1}
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={rows}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    autosizeOptions={autosizeOptions}
                    pagination
                    paginationMode="server"
                    pageSizeOptions={[25, 50, 100]}
                    rowCount={rowCount}
                    loading={loading}
                    page={paginationModel.page}
                    pageSize={paginationModel.pageSize}
                    onPageSizeChange={(newPageSize) => setPaginationModel(prev => ({ ...prev, pageSize: newPageSize }))}
                    onPageChange={(newPage) => setPaginationModel(prev => ({ ...prev, page: newPage }))}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: { sx: { mt: -6 } } // Adds margin bottom to the toolbar
                    }}
                />
            </Box>
        </Box >
    );
};

export default Answers;
