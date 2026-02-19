import { useState } from "react";
import Sidebar from "./common/Sidebar.jsx";
import Header from "./common/Header.jsx";
import GraphCanvas from "../pages/GraphCanvas.jsx";

// DATA.
 const initialRepoData = [
  {
    id: "folder-src",
    label: "src",
    type: "folder",
    children: [

      // ------------------ Controllers ------------------
      {
        id: "folder-controllers",
        label: "controllers",
        type: "folder",
        children: [
          {
            id: "file-user-controller",
            label: "user_controller.py",
            type: "file",
            children: [
              {
                id: "class-user-controller",
                label: "UserController",
                type: "class",
                children: [
                  {
                    id: "func-create-user",
                    label: "create_user()",
                    type: "function",
                  },
                  {
                    id: "func-delete-user",
                    label: "delete_user()",
                    type: "function",
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------ Services ------------------
      {
        id: "folder-services",
        label: "services",
        type: "folder",
        children: [
          {
            id: "file-auth-service",
            label: "auth_service.py",
            type: "file",
            children: [
              {
                id: "class-auth-service",
                label: "AuthService",
                type: "class",
                children: [
                  {
                    id: "func-login",
                    label: "login()",
                    type: "function",
                  },
                  {
                    id: "func-logout",
                    label: "logout()",
                    type: "function",
                  },
                ],
              },
            ],
          },
          {
            id: "file-email-service",
            label: "email_service.py",
            type: "file",
            children: [
              {
                id: "class-email-service",
                label: "EmailService",
                type: "class",
                children: [
                  {
                    id: "func-send-email",
                    label: "send_email()",
                    type: "function",
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------ Models ------------------
      {
        id: "folder-models",
        label: "models",
        type: "folder",
        children: [
          {
            id: "file-user-model",
            label: "user.py",
            type: "file",
            children: [
              {
                id: "class-user",
                label: "User",
                type: "class",
                children: [
                  {
                    id: "func-save",
                    label: "save()",
                    type: "function",
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------ Utils ------------------
      {
        id: "folder-utils",
        label: "utils",
        type: "folder",
        children: [
          {
            id: "file-helper",
            label: "helpers.py",
            type: "file",
            children: [
              {
                id: "class-helper",
                label: "Helper",
                type: "class",
                children: [
                  {
                    id: "func-format-date",
                    label: "format_date()",
                    type: "function",
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------ Direct Files ------------------
      {
        id: "file-main",
        label: "main.py",
        type: "file",
        children: [
          {
            id: "class-main",
            label: "MainApp",
            type: "class",
            children: [
              {
                id: "func-start",
                label: "start()",
                type: "function",
              },
            ],
          },
        ],
      },

      {
        id: "file-config",
        label: "config.py",
        type: "file",
        children: [
          {
            id: "class-config",
            label: "Config",
            type: "class",
            children: [
              {
                id: "func-load-config",
                label: "load_config()",
                type: "function",
              },
            ],
          },
        ],
      },
    ],
  },
];


const generateVisibilityMap = (data) => {
  const map = {};

  const traverse = (items) => {
    items.forEach((item) => {
      map[item.id] = true;
      if (item.children) traverse(item.children);
    });
  };

  traverse(data);
  return map;
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [repoData, setRepoData] = useState(initialRepoData);

  const [visibleNodes, setVisibleNodes] = useState(
    generateVisibilityMap(initialRepoData)
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header onMenuClick={() => setSidebarOpen(true)} />

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
