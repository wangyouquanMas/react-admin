import React from "react";
import Tree from "react-d3-tree";
import './custom-tree.css'; // Import the custom styles
import { mindMapData } from "../../data/mindMapData.jsx"; // Adjust the import path as necessary

const MindMap = () => {
    const containerStyles = {
        width: "100%",
        height: "100vh",
    };

    let direction = "horizontal"
    return (
        <div style={containerStyles}>
            <Tree data={mindMapData} orientation={direction} rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf" />
        </div>
    );
};

export default MindMap;
