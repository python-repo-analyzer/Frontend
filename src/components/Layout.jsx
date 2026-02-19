import { useState } from "react";
import Sidebar from "./common/Sidebar.jsx";
import Header from "./common/Header.jsx";
import GraphCanvas from "../pages/GraphCanvas.jsx";

// INITIAL DATA
const initialRepoData = {
  name: "repo",
  type: "folder",
  children: [
    {
      name: ".gitignore",
      type: "file",
      children: [],
    },
    {
      name: "Agent-Workflows",
      type: "folder",
      children: [
        {
          name: "Agent_Workflows.ipynb",
          type: "file",
          children: [],
        },
      ],
    },
  ],
};

// SAFE VISIBILITY MAP
const generateVisibilityMap = (data) => {
  const map = {};

  const traverse = (item, path = "") => {
    if (!item) return;

    // Unique ID generate (since no id field exists)
    const id = path ? `${path}/${item.name}` : item.name;

    map[id] = true;

    if (Array.isArray(item.children) && item.children.length > 0) {
      item.children.forEach((child) => traverse(child, id));
    }
  };

  // Handle both array & object root safely
  if (Array.isArray(data)) {
    data.forEach((item) => traverse(item));
  } else {
    traverse(data);
  }

  return map;
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [repoData, setRepoData] = useState(initialRepoData);
  const [visibleNodes, setVisibleNodes] = useState(
    generateVisibilityMap(initialRepoData)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ANALYZE METHOD
  const onAnalyze = async (githubPath) => {
    if (!githubPath) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repoUrl: githubPath }),
        }
      );

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();

      // Update repo data safely
      setRepoData(data);
      setVisibleNodes(generateVisibilityMap(data));

    } catch (error) {
      console.log("Error ::", error);
      setError("Unable to analyze this repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onAnalyze={onAnalyze}
        loading={loading}
      />

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`
            fixed lg:static z-30 top-0 left-0 h-full
            w-72 bg-white shadow-lg
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <Sidebar
            closeSidebar={() => setSidebarOpen(false)}
            repoData={repoData}
            visibleNodes={visibleNodes}
            setVisibleNodes={setVisibleNodes}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <GraphCanvas
            repoData={repoData}
            visibleNodes={visibleNodes}
          />
        </div>
      </div>
    </div>
  );
}
