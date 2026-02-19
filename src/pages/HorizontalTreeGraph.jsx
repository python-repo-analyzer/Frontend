import React, { useState } from "react";

const branchColors = [
  "from-sky-400 to-sky-600",
  "from-indigo-400 to-indigo-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-red-400 to-red-600",
];

const strokeColors = [
  "#38bdf8",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#ef4444",
];

const NODE_SIZE = 70;
const HORIZONTAL_GAP = 200;
const VERTICAL_GAP = 90;

const Node = ({ node, level = 0, branchIndex = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children?.length > 0;

  const gradient =
    branchColors[level === 0 ? 0 : branchIndex + 1] ||
    "from-gray-400 to-gray-600";

  const stroke =
    strokeColors[level === 0 ? 0 : branchIndex + 1] || "#64748b";

  return (
    <div className="flex items-center">
      
      {/* Node */}
      <div
        onClick={() => hasChildren && setOpen(!open)}
        className={`
          w-17.5 h-17.5 rounded-full
          bg-linear-to-br ${gradient}
          text-white flex items-center justify-center
          font-semibold text-sm
          shadow-xl shadow-black/20
          border-4 border-white/80
          backdrop-blur-md
          transition-all duration-300
          hover:scale-110 hover:shadow-2xl
          ${hasChildren ? "cursor-pointer" : ""}
        `}
      >
        {node.name}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div
          className="relative flex flex-col"
          style={{
            marginLeft: HORIZONTAL_GAP,
            gap: VERTICAL_GAP,
          }}
        >
          {node.children.map((child, i) => (
            <div key={i} className="relative flex items-center">
              
              {/* Connector */}
              <svg
                width={HORIZONTAL_GAP}
                height={NODE_SIZE}
                className="absolute"
                style={{
                  left: -HORIZONTAL_GAP,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <path
                  d={`M${HORIZONTAL_GAP} ${NODE_SIZE / 2}
                     C ${HORIZONTAL_GAP / 2} ${NODE_SIZE / 2},
                       ${HORIZONTAL_GAP / 2} ${NODE_SIZE / 2},
                       0 ${NODE_SIZE / 2}`}
                  stroke={stroke}
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>

              <Node
                node={child}
                level={level + 1}
                branchIndex={level === 0 ? i : branchIndex}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HorizontalTreeGraph = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomAmount = -e.deltaY * 0.001;
    setScale((prev) => Math.min(Math.max(prev + zoomAmount, 0.5), 2));
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="h-screen overflow-hidden relative bg-linear-to-r from-slate-50 to-slate-200 cursor-grab active:cursor-grabbing"
    >
      {/* Zoom Controls */}
      <div className="absolute right-6 top-6 flex flex-col gap-3 z-10">
        <button
          onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
          className="w-12 h-12 rounded-full bg-slate-900 text-white text-xl shadow-lg hover:scale-110 transition"
        >
          +
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
          className="w-12 h-12 rounded-full bg-slate-900 text-white text-xl shadow-lg hover:scale-110 transition"
        >
          −
        </button>
      </div>

      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "0 0",
        }}
        className="p-40"
      >
        <Node node={data} />
      </div>
    </div>
  );
};

export default HorizontalTreeGraph;
