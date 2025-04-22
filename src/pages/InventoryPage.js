import React from "react";
import OilTypesSection from "../components/OilTypesSection";
import BottlesSection from "../components/BottlesSection";
import BottlesStockSection from "../components/BottlesStockSection";
import Navbar from "../components/Navbar";
import { isEnglish } from "../utlis/isEnglish";

const InventoryPage = () => {
  return (
    <div className="container-cc">
      {/* navbar */}
      <Navbar />

      {/* content */}
      <div className={isEnglish ? "content-container ms-auto" : "content-container me-auto"}>
        {/* oil types */}
        <OilTypesSection />

        <div className="py-10" />

        {/* botle sizes */}
        <BottlesSection />

        <div className="py-10" />

        {/* botle sizes */}
        <BottlesStockSection />
      </div>
    </div>
  );
};

export default InventoryPage;
