import React from "react";
import {
  Folder,
  FileCode,
  Boxes,
  FunctionSquare,
} from "lucide-react";

const HorizontalTree = ({ data, visibleNodes, setVisibleNodes }) => {
  const toggleNode = (id) => {
    setVisibleNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (type) => {
    switch (type) {
      case "folder":
        return <Folder className="w-4 h-4 text-yellow-500" />;
      case "file":
        return <FileCode className="w-4 h-4 text-blue-500" />;
      case "class":
        return <Boxes className="w-4 h-4 text-purple-500" />;
      case "function":
        return <FunctionSquare className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const renderTree = (items, level = 0) =>
    items.map((item) => (
      <div key={item.id} className="relative">

        {/* Row */}
        <div
          className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 transition"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <input
            type="checkbox"
            checked={visibleNodes[item.id] || false}
            onChange={() => toggleNode(item.id)}
            className="accent-blue-600"
          />

          {getIcon(item.type)}

          <span className="text-sm text-gray-700 font-medium">
            {item.label}
          </span>

          <span className="text-xs text-gray-400 ml-auto uppercase">
            {item.type}
          </span>
        </div>

        {/* Children */}
        {item.children && (
          <div className="border-l border-gray-200 ml-3">
            {renderTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));

  return (
    <div className="text-sm">
      {renderTree(data)}
    </div>
  );
};

export default HorizontalTree;
