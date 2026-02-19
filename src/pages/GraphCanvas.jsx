import React, { useState } from "react";
import VerticleTreeGraph from "./VerticaleTreeGraph.jsx";
import HorizontalTreeGraph from "./HorizontalTreeGraph.jsx";

const GraphCanvas = ({ repoData }) => {

  // Get all node ids initially ON
  const getAllNodeIds = (items, acc = {}) => {
    if (!items) return acc;

    const safeItems = Array.isArray(items) ? items : [items];

    safeItems.forEach((item) => {
      const id = item.id || item.name;
      acc[id] = true;

      if (item.children) {
        getAllNodeIds(item.children, acc);
      }
    });

    return acc;
  };

  const [visibleNodes, setVisibleNodes] = useState(() =>
    getAllNodeIds(repoData)
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Code Structure Visualizer
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Toggle nodes to control the graph visibility
        </p>
      </div>

      <div className="w-full min-h-screen bg-gray-100 px-4 md:px-8 py-8 space-y-8">
        
        {/* Top Panel - Toggle Tree */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              🌳 Vertical Graph Tree
            </h2>
            <span className="text-sm text-gray-500">
              Control visibility
            </span>
          </div>

          <div className="h-[70vh] overflow-auto border rounded-lg p-4 bg-gray-50">
            <VerticleTreeGraph
              data={repoData}
              visibleNodes={visibleNodes}
              setVisibleNodes={setVisibleNodes}   
            />
          </div>
        </div>

        {/* Bottom Panel - Graph */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              📊 Horizontal Graph Tree
            </h2>
            <span className="text-sm text-gray-500">
              Live Preview
            </span>
          </div>

          <div className="w-full h-auto border rounded-lg bg-gray-50">
            <HorizontalTreeGraph
              data={repoData}
              visibleNodes={visibleNodes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphCanvas;
