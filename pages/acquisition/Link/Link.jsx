import React, { useState } from "react";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import LinkTable from "./LinkTable";

function LinkMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-7 py-7 w-full max-w-full mx-auto">
            <LinkTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LinkMain;
