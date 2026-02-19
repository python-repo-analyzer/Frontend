import React from "react";
import VerticalGraph from "./VerticalGraph.jsx";
import TreeGraph from "./TreeGraph.jsx";

const GraphCanvas = ({ repoData, visibleNodes }) => {
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

      {/* Responsive Layout */}
      <div className="w-full min-h-screen bg-gray-100 px-4 md:px-8 py-8 space-y-8">
        {/* Top Panel - Toggle Tree */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              🌳 Toggle Tree
            </h2>
            <span className="text-sm text-gray-500">Control visibility</span>
          </div>

          <div className="h-[70vh] overflow-auto border rounded-lg p-4 bg-gray-50">
            <TreeGraph data={repoData} visibleNodes={visibleNodes} />
          </div>
        </div>

        {/* Bottom Panel - Graph */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              📊 Structure Graph
            </h2>
            <span className="text-sm text-gray-500">Live Preview</span>
          </div>

          <div className="w-full h-auto border rounded-lg bg-gray-50">
            <VerticalGraph data={repoData} visibleNodes={visibleNodes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphCanvas;
