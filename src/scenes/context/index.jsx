
import React from 'react';
import { Chrono } from 'react-chrono';

const items = [
    {
        title: "Childhood",
        cardTitle: "Early Education",
        cardSubtitle: "Context: Learning to read and write",
        cardDetailedText: "Problem: Difficulty in adapting to school environment.",
    },
    {
        title: "Adolescence",
        cardTitle: "High School",
        cardSubtitle: "Context: Social interactions and academic pressure",
        cardDetailedText: "Problem: Peer pressure and stress.",
    },
    {
        title: "Adulthood",
        cardTitle: "Career",
        cardSubtitle: "Context: Job stability and progression",
        cardDetailedText: "Problem: Work-life balance and job satisfaction.",
    },
    {
        title: "Old Age",
        cardTitle: "Retirement",
        cardSubtitle: "Context: Health and leisure activities",
        cardDetailedText: "Problem: Health issues and financial stability.",
    },
];

const Context = () => (
    <div style={{ width: "500px", height: "950px" }}>
        <Chrono items={items} mode="VERTICAL" />
    </div>
);

export default Context;
