import { Menu, GitBranch, Search } from "lucide-react";
import { useState } from "react";

export default function Header({ onMenuClick, onAnalyze }) {
  const [githubPath, setGithubPath] = useState("");

  const handleAnalyze = () => {
    if (!githubPath.trim()) return;
    onAnalyze(githubPath);
  };

  return (
    <div className="bg-white shadow-md">
      
      {/* Top Row */}
      <div className="h-16 flex items-center justify-between px-4 md:px-6 gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-800">
            <GitBranch className="w-5 h-5 text-blue-600" />
            Code Linking Visualizer
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-87.5">
          <Search className="w-4 h-4 text-gray-500" />

          <input
            type="text"
            placeholder="Enter GitHub repo URL..."
            value={githubPath}
            onChange={(e) => setGithubPath(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />

          <button
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md transition"
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Mobile Search (Below Header) */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-full">
          <Search className="w-4 h-4 text-gray-500" />

          <input
            type="text"
            placeholder="Enter GitHub repo URL..."
            value={githubPath}
            onChange={(e) => setGithubPath(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />

          <button
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md transition"
          >
            Go
          </button>
        </div>
      </div>

    </div>
  );
}
