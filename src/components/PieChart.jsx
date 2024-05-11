import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { useEffect, useState } from "react";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [questionId, setQuestionId] = useState(578277952);
  const [emotionConfig, setEmotionConfig] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configResponse = await fetch('emotionsConfig.json');
        const config = await configResponse.json();
        setEmotionConfig(config.emotions);
      } catch (error) {
        console.error('Failed to load configuration:', error);
      }
    };

    fetchConfig();
  }, []);


  useEffect(() => {
    if (!questionId || !emotionConfig) return;

    const fetchEmotions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/emotions/${questionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const emotions = await response.json();
        const emotionScores = {};

        // Process each emotion entry
        emotions.forEach(emotionData => {
          // Split the emotion string into individual emotions
          const splitEmotions = emotionData.emotion.split(",").map(em => em.trim());

          // Categorize each emotion
          splitEmotions.forEach(singleEmotion => {
            Object.keys(emotionConfig).forEach(category => {
              if (emotionConfig[category].includes(singleEmotion)) {
                if (!emotionScores[category]) {
                  emotionScores[category] = {};
                }
                emotionScores[category][singleEmotion] = (emotionScores[category][singleEmotion] || 0) + 1;
              }
            });
          });
        });

        // Transform the scores into data suitable for the pie chart
        const chartData = Object.entries(emotionScores).flatMap(([category, emotions]) => {
          return Object.entries(emotions).map(([emotionType, count]) => ({
            id: emotionType,
            label: emotionType,
            value: count,
            color: getColorForCategory(category)
          }));
        });

        setData(chartData);
      } catch (error) {
        console.error('Failed to fetch emotions:', error);
      }
    };

    fetchEmotions();
  }, [questionId, emotionConfig]);

  const getColorForCategory = (category) => {
    const baseColors = {
      positive: "hsl(104, 70%, 50%)",
      negative: "hsl(0, 70%, 50%)",
      // Add other categories as needed
    };
    return baseColors[category] || "hsl(210, 70%, 50%)"; // Default color if category not found
  };


  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
