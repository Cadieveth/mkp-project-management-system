import React, { useState, useEffect } from "react";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { useStateContext } from "../../../ContextProvider";
import ParameterPackageTable from "./ParameterPackageTable";

function ParameterPackage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useStateContext();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-7 py-7 w-full max-w-full mx-auto">
            {" "}
            <ParameterPackageTable dataParam={data} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ParameterPackage;
