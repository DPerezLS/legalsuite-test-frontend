import React, { useState } from "react";
import Layout from "../../layout/Layout";
import DemandsList from "./DemandsList";

const Dashboard: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  const handleNavItemClick = (itemId: string) => {
    setActiveNavItem(itemId);
    // Here you can add navigation logic for different sections
    console.log(`Navigating to: ${itemId}`);
  };

  return (
    <Layout
      title="Demandas activas"
      activeNavItem={activeNavItem}
      onNavItemClick={handleNavItemClick}
    >
      <DemandsList />
    </Layout>
  );
};

export default Dashboard;