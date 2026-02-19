import React from "react";

const TreeGraph = ({ data }) => {
  const renderNode = (node) => {
    return (
      <li key={node.id} className="relative flex flex-col items-center">
        
        {/* Node Box */}
        <div className="px-4 py-2 bg-amber-300 rounded-md text-sm font-medium shadow whitespace-nowrap">
          {node.label}
        </div>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <>
            {/* Vertical Line */}
            <div className="w-px h-6 bg-gray-400"></div>

            {/* Children Container */}
            <ul className="flex gap-8 relative pt-6">
              
              {/* Horizontal Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gray-400"></div>

              {node.children.map((child) => (
                <li key={child.id} className="flex flex-col items-center relative">
                  
                  {/* Vertical Line */}
                  <div className="w-px h-6 bg-gray-400"></div>

                  {renderNode(child)}
                </li>
              ))}
            </ul>
          </>
        )}
      </li>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Important Wrapper */}
      <div className="min-w-max px-10 py-8">
        <ul className="flex">
          {data.map((node) => renderNode(node))}
        </ul>
      </div>
    </div>
  );
};

export default TreeGraph;
