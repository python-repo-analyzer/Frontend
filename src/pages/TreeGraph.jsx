import React from "react";

const TreeGraph = ({ data }) => {

  const renderNode = (node) => {
    const id = node.id || node.name; // fallback id
    const label = node.label || node.name;

    return (
      <li key={id} className="relative flex flex-col items-center">
        
        {/* Node Box */}
        <div className="px-4 py-2 bg-amber-300 rounded-md text-sm font-medium shadow whitespace-nowrap">
          {label}
        </div>

        {/* Children Section */}
        {Array.isArray(node.children) && node.children.length > 0 && (
          <>
            {/* Vertical Line */}
            <div className="w-px h-6 bg-gray-400"></div>

            <ul className="flex justify-center gap-8 relative pt-6">
              
              {/* Horizontal Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gray-400"></div>

              {node.children.map((child) => (
                <div
                  key={child.id || child.name}
                  className="relative flex flex-col items-center"
                >
                  {/* Vertical line */}
                  <div className="w-px h-6 bg-gray-400 absolute -top-6"></div>

                  {renderNode(child)}
                </div>
              ))}
            </ul>
          </>
        )}
      </li>
    );
  };

  // ✅ SAFE ROOT HANDLING
  const safeData = Array.isArray(data) ? data : [data];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max px-10 py-8">
        <ul className="flex justify-center">
          {safeData.map((node) => renderNode(node))}
        </ul>
      </div>
    </div>
  );
};

export default TreeGraph;
