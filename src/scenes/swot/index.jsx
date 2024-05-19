import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useResults } from "../landing/resultsContext.jsx";
import { useNavigate } from 'react-router-dom'; // Import useHistory


const SWOT = () => {
    const { products } = useResults();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 100,
    });

    console.log("products:", products);

    const navigate = useNavigate(); // For navigation
    let filteredResults = [];

    useEffect(() => {
        if (products && products.length) {
            filteredResults = products.filter(user => {
                return (
                    user.name &&
                    user.description
                );
            });
            localStorage.setItem("products", JSON.stringify(filteredResults));
        } else {
            const storedResults = localStorage.getItem("products");
            if (storedResults) {
                filteredResults = JSON.parse(storedResults);
            }
        }
        console.log("current results", filteredResults[0]);
        setRows(filteredResults);
        setRowCount(filteredResults.length); // Assume the API returns a total count
        setLoading(false);
    }, [products])



    // useEffect(() => {
    //     const fetchData = (p) => {
    //         setLoading(true);
    //         const { page, pageSize } = paginationModel;
    //         fetch(`http://127.0.0.1:8080/questions?page=${page}&pageSize=${pageSize}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 const results = data.results.filter(user => {
    //                     return (
    //                         user.title &&
    //                         user.frequency !== null &&
    //                         user.frequency !== undefined
    //                     );
    //                 }
    //                 );
    //                 console.log("current results", results[0]);
    //                 setRows(results);
    //                 setRowCount(data.totalCount); // Assume the API returns a total count
    //                 setLoading(false);
    //             }).catch(error => {
    //                 console.error('There was an error!', error);
    //                 setLoading(false);

    //             })
    //     };

    //     fetchData();
    // }, [paginationModel]);



    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 200,
        },
        { field: "description", headerName: "Description", width: 600 }
    ];



    return (
        <Box m="20px">
            <Header title="SWOT" subtitle="Competition and Risk Analysis" />
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
                    getRowId={(row) => row.name} // Specify custom ID using getRowId
                />
            </Box>
        </Box>
    );
};

export default SWOT;
