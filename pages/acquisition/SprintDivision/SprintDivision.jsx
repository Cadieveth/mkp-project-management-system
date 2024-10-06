import React, { useState } from "react";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import SprintDivisionTable from "./SprintDivisionTable";

export default function SprintDivision() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-7 py-7 w-full max-w-full mx-auto">
            <SprintDivisionTable />
          </div>
        </main>
      </div>
    </div>
  );
}
