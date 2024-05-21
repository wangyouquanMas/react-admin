import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import './custom-tree.css'; // Import the custom styles
import { initialMindMapData } from "../../data/mindMapData.jsx"; // Adjust the import path as necessary

const MindMap = () => {
    const containerStyles = {
        width: "100%",
        height: "100vh",
    };
    const [mindMapData, setMindMapData] = useState(initialMindMapData); // Initial state with some default data or empty object

    let direction = "horizontal"

    // let mindMapData = {};
    // useEffect(() => {
    //     fetch(`http://localhost:8080/chat?content=${content}`).
    //         then(response => response.json).
    //         then(data => {
    //             mindMapData = data.result;
    //         })
    // }, [content])

    let content = "失业的农村程序员的焦虑有哪些";

    useEffect(() => {
        const fetchMindMapData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/chat?content=${content}`);
                const data = await response.json();
                console.log("current result:", data.result);

                // Check if data.result is a string and parse it if necessary
                const parsedData = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
                setMindMapData(parsedData); // Update state with the fetched data
            } catch (error) {
                console.error("Error fetching mind map data:", error);
            }
        };

        fetchMindMapData();
    }, [content]); // Dependency array with content

    console.log("mindMapData:", mindMapData);
    const customNodeShape = {
        shape: 'circle',
        shapeProps: {
            r: 10, // adjust the radius as needed
            fill: 'lightblue', // fill color of the node circle
        },
        textProps: {
            x: 0,
            y: 0,
            dy: '.35em',
            textAnchor: 'middle',
            fill: 'white', // font color of the node text
            fontSize: '12px', // font size of the node text
        },
    };

    return (
        <div style={containerStyles}>
            <Tree data={mindMapData} orientation={direction} rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf" nodeSvgShape={customNodeShape} />
        </div>
    );
};

export default MindMap;
