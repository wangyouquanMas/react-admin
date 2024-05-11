import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { useEffect, useState } from "react";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [questionId, setQuestionId] = useState(578277952);
  const [positiveScore, setPositiveScore] = useState(0);
  const [negativeScore, setNegativeScore] = useState(0);
  // const [fearScore, setNegativeScore] = useState(0);
  // const [anxietyScore, setNegativeScore] = useState(0);
  // const [anxietyScore, setNegativeScore] = useState(0);

  const positive = new Set([
    "admiration", "amusement", "approval", "caring", "curiosity", "desire", "excitement", "gratitude", "joy",
    "love", "optimism", "pride", "realization", "relief", "surprise", "compassion", "interest",
    "anticipation", "fascination", "encouragement", "appreciation",
    "satisfaction", "sympathy", "advice", "advocacy", "suggestion", "empathy", "humor", "nostalgia",
    "recommendation", "hope"
  ]);

  // const positive = new Set([
  //   "admiration", "amusement", "caring", "curiosity", "desire", "excitement", "gratitude", "joy",
  //   "love", "optimism", "pride", "realization", "relief", "surprise", "interest",
  //   "anticipation", "fascination", "encouragement", "appreciation",
  //   "satisfaction", "nostalgia", "hope"
  // ]);
  // const negative = new Set([
  //   "anger", "annoyance", "confusion", "disappointment", "disapproval", "disgust", "embarrassment", "fear",
  //   "grief", "nervousness", "remorse", "sadness", "neutral", "disbelief", "concern", "skepticism",
  //   "frustration", "disdain", "determination", "discomfort", "dismissal",
  //   "criticism", "inconvenience", "warning", "offense", "uncertainty", "urgency"
  // ]);

  const negative = new Set([
    "anger", "annoyance", "confusion", "disappointment", "disgust", "embarrassment", "fear",
    "grief", "nervousness", "remorse", "sadness", "concern", "skepticism",
    "frustration", "disdain", "determination", "discomfort", "criticism", "inconvenience", "offense", "uncertainty", "urgency"
  ]);


  const painpoint = new Set([
    "fear", "nervousness", "Anger", "Anxiety", "Shame", "Guilt", "Sadness", "Frustration", "Despair", "Insecurity", "Stress", "Disappointment", "Helplessness"
  ]);

  const exhilarating = new Set([
    "Joy", "Excitement", "Satisfaction", "Amusement", "Inspiration", "Pride", "Contentment", "Wonder", "Gratitude", "Relief", "Love", "Optimism"
  ]);




  //todo: capatial unform 
  //todo: emotion dislay in detail


  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/emotions/${questionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const emotions = await response.json();
        let tempPositiveScore = 0;
        let tempNegativeScore = 0;
        const currentEmotions = emotions.flatMap(item => item.emotion.split(","));
        currentEmotions.forEach(emotion => {
          if (positive.has(emotion.trim())) {
            tempPositiveScore++;
          } else if (negative.has(emotion.trim())) {
            tempNegativeScore++;
          }
        });
        setPositiveScore(tempPositiveScore);
        setNegativeScore(tempNegativeScore);
      } catch (error) {
        console.error('Failed to fetch emotions:', error);
      }
    };

    fetchEmotions();
  }, [questionId]);


  console.log("positive score:", positiveScore);
  console.log("negative  score:", negativeScore);

  const data = [
    {
      id: "positive",
      label: "positive",
      value: positiveScore,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "negative",
      label: "negative",
      value: negativeScore,
      color: "hsl(162, 70%, 50%)",
    },
  ];


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
