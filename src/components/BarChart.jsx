import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false, searchId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [displayCategory, setDisplayCategory] = useState(true);  // State to toggle between category and sub_category


  useEffect(() => {
    setQuestionId(searchId);
  }, [searchId]);

  // useEffect(() => {
  //   const fetchTriggers = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:8080/triggers/${questionId}`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const triggers = await response.json();

  //       const formattedData = triggers.map(trigger => ({
  //         category: trigger.category,  // Added category for toggling

  //         sub_category: trigger.sub_category,
  //         frequency: trigger.frequency, // Assuming 'hot dog' is a placeholder for frequency
  //         color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color generation for illustrative purposes
  //       }));

  //       setData(formattedData);
  //     } catch (error) {
  //       console.error('Failed to fetch emotions:', error);
  //     }
  //   };

  //   fetchTriggers();
  // }, [questionId]);

  useEffect(() => {
    if (!questionId) return;  // Prevent fetching if `questionId` is undefined or empty

    const fetchTriggers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/triggers/${questionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { categories, subCategories } = await response.json();

        const formattedData = displayCategory ? categories.map(cat => ({
          category: cat.category,
          percentage: cat.category_percentage,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Consider a fixed color or a color scale
        })) : subCategories.map(subCat => ({
          category: subCat.sub_category,
          percentage: subCat.sub_category_percentage,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Consider a fixed color or a color scale
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchTriggers();
  }, [questionId, displayCategory]);

  return (
    <>
      <button onClick={() => setDisplayCategory(!displayCategory)}>
        Toggle View: {displayCategory ? "Show Sub-Category" : "Show Category"}
      </button>
      <ResponsiveBar
        data={data}
        keys={["percentage"]}
        indexBy="category"
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
    </>
  );
};

export default BarChart;
