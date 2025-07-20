import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    {/* Add header, sidebar, etc. here if needed */}
    <main>{children}</main>
  </div>
);

export default MainLayout; 