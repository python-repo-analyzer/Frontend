import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

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
    items.forEach((item) => {
      if (!visibleNodes[item.id]) return;

      nodes.push({
        id: item.id,
        data: {
          label: (
            <div className={getNodeStyle(level)}>
              {item.label}
            </div>
          ),
        },
        position: { x: level * 250, y: y.value * 120 },
        type: "default",
      });

      if (parent) {
        edges.push({
          id: `${parent}-${item.id}`,
          source: parent,
          target: item.id,
          type: "smoothstep",
          animated: false,
          style: {
            strokeWidth: 2,
          },
        });
      }

      y.value++;

      if (item.children) {
        traverse(item.children, item.id, level + 1, y);
      }
    });
  };

  traverse(data);

  return { nodes, edges };
};

export default function VerticalGraph({ data, visibleNodes }) {
  const { nodes, edges } = useMemo(
    () => generateFlow(data, visibleNodes),
    [data, visibleNodes]
  );

  return (
    <div className="h-[70vh] w-full bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
