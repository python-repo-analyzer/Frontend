import { Menu, GitBranch, Search } from "lucide-react";
import { useState } from "react";

export default function Header({ onMenuClick, onAnalyze }) {
  const isValidGithubRepo = (url) => {
    const githubRepoRegex =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

    return githubRepoRegex.test(url.trim());
  };

  const [githubPath, setGithubPath] = useState("");
  const [error, setError] = useState("");

  // handle ANAYLYZE FETCH METHOD
  const handleAnalyze = () => {
    if (!isValidGithubRepo(githubPath)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setError("");

    // ✅ Safe to analyze here
    onAnalyze(githubPath);
  };

  return (
    <div className="bg-gray-200 shadow-md">
      {/* Top Row */}
      <div className="h-24 flex items-center justify-between px-4 md:px-6 gap-4">
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
        <div className="hidden md:flex flex-col w-87">
          <div
            className={`flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 transition
      ${error ? "border border-red-500 bg-red-50" : "border border-transparent"}
    `}
          >
            <Search className="w-4 h-4 text-gray-500" />

            <input
              type="text"
              name="repoUrl"
              placeholder="Enter GitHub repo URL..."
              value={githubPath}
              onChange={(e) => {
                setGithubPath(e.target.value);
                if (error) setError("");
              }}
              className="bg-transparent outline-none flex-1 text-sm"
            />

            <button
              onClick={handleAnalyze}
              disabled={!githubPath}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-3 py-1.5 rounded-md transition"
            >
              Analyze
            </button>
          </div>

          {/* Error Message */}
          <div className="h-5 mt-1">
            {error && (
              <p className="text-red-500 text-xs animate-fadeIn">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search (Below Header) */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex flex-col w-full">
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition
        ${
          error
            ? "bg-red-50 border border-red-500"
            : "bg-gray-100 border border-transparent"
        }
      `}
          >
            <Search className="w-4 h-4 text-gray-500" />

            <input
              type="text"
              placeholder="Enter GitHub repo URL..."
              value={githubPath}
              onChange={(e) => {
                setGithubPath(e.target.value);
                if (error) setError("");
              }}
              className="bg-transparent outline-none flex-1 text-sm"
            />

            <button
              onClick={handleAnalyze}
              disabled={!githubPath}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-3 py-1.5 rounded-md transition"
            >
              Go
            </button>
          </div>

          {/* Error Message */}
          <div className="h-5 mt-1">
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
