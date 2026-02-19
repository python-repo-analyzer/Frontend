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

 const renderTree = (items, level = 0) => {
  if (!items) return null;

  // ✅ If single object passed, wrap into array
  const safeItems = Array.isArray(items) ? items : [items];

  return safeItems.map((item) => {
    const id = item.id || item.name; // fallback since id may not exist

    return (
      <div key={id} className="relative">

        {/* Row */}
        <div
          className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 transition"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <input
            type="checkbox"
            checked={visibleNodes[id] || false}
            onChange={() => toggleNode(id)}
            className="accent-blue-600"
          />

          {getIcon(item.type)}

          <span className="text-sm text-gray-700 font-medium">
            {item.label || item.name}
          </span>

          <span className="text-xs text-gray-400 ml-auto uppercase">
            {item.type}
          </span>
        </div>

        {/* Children */}
        {Array.isArray(item.children) && item.children.length > 0 && (
          <div className="border-l border-gray-200 ml-3">
            {renderTree(item.children, level + 1)}
          </div>
        )}
      </div>
    );
  });
};


  return (
    <div className="text-sm">
      {renderTree(data)}
    </div>
  );
};

export default HorizontalTree;
