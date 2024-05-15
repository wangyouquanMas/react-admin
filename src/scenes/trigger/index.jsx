import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Triggers = () => {
  return (
    <Box m="20px">
      <Header title="Triggers " subtitle="Top triggers" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Triggers;
