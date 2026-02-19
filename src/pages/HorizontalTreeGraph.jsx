import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";


// ✅ Stable references (outside component)
const nodeTypes = {};
const edgeTypes = {};


const getNodeStyle = (level) => {
  const colors = [
    "bg-sky-400",
    "bg-indigo-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-red-400",
  ];

  return `
    ${colors[level % colors.length]}
    text-white
    rounded-full
    px-4 py-2
    text-sm
    font-semibold
    shadow-md
  `;
};


const generateFlow = (data, visibleNodes) => {
  const nodes = [];
  const edges = [];

  const traverse = (items, parent = null, level = 0, y = { value: 0 }) => {
    if (!items) return;

    // ✅ Make safe array
    const safeItems = Array.isArray(items) ? items : [items];

    safeItems.forEach((item) => {
      const id = item.id || item.name; // fallback id
      const label = item.label || item.name;

      if (!visibleNodes?.[id]) return;

      nodes.push({
        id: id,
        data: {
          label: (
            <div className={getNodeStyle(level)}>
              {label}
            </div>
          ),
        },
        position: { x: level * 250, y: y.value * 120 },
        type: "default",
      });

      if (parent) {
        edges.push({
          id: `${parent}-${id}`,
          source: parent,
          target: id,
          type: "smoothstep",
          animated: false,
          style: {
            strokeWidth: 2,
          },
        });
      }

      y.value++;

      if (Array.isArray(item.children) && item.children.length > 0) {
        traverse(item.children, id, level + 1, y);
      }
    });
  };

  traverse(data);

  return { nodes, edges };
};



export default function HorizontalTreeGraph({ data, visibleNodes }) {
  const { nodes, edges } = useMemo(
    () => generateFlow(data, visibleNodes),
    [data, visibleNodes]
  );

  return (
    <div className="h-[70vh] w-full bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}    
        edgeTypes={edgeTypes}      
        fitView
        className="rounded-xl"
      >
        <Background gap={20} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
