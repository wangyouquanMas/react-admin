import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [results, setResults] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 100,
    });



    useEffect(() => {
        const fetchData = (page, pageSize) => {
            console.log("this is a test:", page);
            fetch(`http://127.0.0.1:8080/questions?page=${page}&pageSize=${pageSize}`)
                .then(response => response.json())
                .then(data => {
                    const results = data.results.filter(user => {
                        return (
                            user.title &&
                            user.frequency
                        );
                    }
                    );
                    setResults(results);
                    setRowCount(data.totalCount); // Assume the API returns a total count
                    setLoading(false);
                }).catch(error => {
                    console.error('There was an error!', error);
                    setLoading(false);

                })
        };

        fetchData(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel.page, paginationModel.pageSize]);


    const columns = [
        { field: "id", headerName: "ID" },
        { field: "title", headerName: "Title", width: 600 },
        { field: "frequency", headerName: "Frequency" }
    ];



    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
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
                    rows={results}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    paginationMode="server"
                    pageSizeOptions={[25, 50, 100]}
                    rowCount={rowCount}
                    loading={loading}
                    pagination
                />
            </Box>
        </Box>
    );
};

export default Team;
