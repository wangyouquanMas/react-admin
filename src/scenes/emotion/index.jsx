import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Emotion = () => {
    return (
        <Box m="20px">
            <Header title="Emotion Chart" subtitle="Product opportunity analsysis" />
            <Box height="75vh">
                <PieChart />
            </Box>
        </Box>
    );
};

export default Emotion;
