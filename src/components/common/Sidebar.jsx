import { X, GitBranch, Settings, FolderTree } from "lucide-react";
import HorizontalTree from "../../pages/HorizontalTree.jsx";

export default function Sidebar({
  closeSidebar,
  repoData,
  visibleNodes,
  setVisibleNodes,
}) {
  return (
    <div className="h-full w-full flex flex-col bg-white border-r">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <FolderTree className="w-5 h-5 text-blue-600" />
          Structure
        </div>

        {/* Close Button (Mobile Only) */}
        <button
          onClick={closeSidebar}
          className="lg:hidden p-1 rounded hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-3 space-y-2 border-b">
        <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 text-gray-700">
          <GitBranch className="w-4 h-4" />
          <span className="text-sm font-medium">Graph Tree</span>
        </div>
      </nav>

      {/* Tree Section */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
          Code Tree
        </h3>

        <HorizontalTree
          data={repoData}
          visibleNodes={visibleNodes}
          setVisibleNodes={setVisibleNodes}
        />
      </div>
    </div>
  );
}
