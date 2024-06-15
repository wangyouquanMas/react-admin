import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false, searchId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [questionId, setQuestionId] = useState(320535511);

  useEffect(() => {
    setQuestionId(searchId);
  }, [searchId]);

  useEffect(() => {
    const fetchTriggers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/triggers/${questionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const triggers = await response.json();

        const formattedData = triggers.map(trigger => ({
          tigger: trigger.sub_category,
          "hot dog": trigger.frequency, // Assuming 'hot dog' is a placeholder for frequency
          "hot dogColor": `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color generation for illustrative purposes
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch emotions:', error);
      }
    };

    fetchTriggers();
  }, [questionId]);

  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog"]}
      indexBy="tigger"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Category",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Frequency",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in category: ${e.indexValue}`}
    />
  );
};

export default BarChart;
