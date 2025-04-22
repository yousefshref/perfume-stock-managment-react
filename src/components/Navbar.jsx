import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DiamondPercent,
  Headset,
  LogOut,
  LucideLayoutDashboard,
  Milk,
  Settings,
} from "lucide-react";
import { isEnglish } from "../utlis/isEnglish";

const Navbar = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <nav className="p-5 flex flex-col gap-5 justify-between bg-white md:w-[250px] w-[70px] fixed left-3 top-3 h-[calc(100%-35px)]">
      <div className="flex flex-col gap-5">
        <h3 className="normal-font-bold tracking-widest uppercase text-2xl text-amber-700">
          <p className="hidden md:block">{"Perfumance"}</p>
          <p className="md:hidden block">PF</p>
        </h3>
        <button onClick={() => navigate("/")} className="w-fit">
          <DiamondPercent
            className="md:hidden block"
            size={28}
            strokeWidth={1}
          />
          <p className="hidden md:block">{isEnglish ? "Sales" : "المبيعات"}</p>
          {path === "/" && <div className="w-full h-[1px] bg-zinc-500 mt-2" />}
        </button>
        <button className="w-fit" onClick={() => navigate("/oil-and-bottles")}>
          <Milk className="md:hidden block" size={28} strokeWidth={1} />
          <p className="hidden md:block">{isEnglish ? "Oils & Bottles" : "الزيوت والزجاجات"}</p>
          {path === "/oil-and-bottles" && (
            <div className="w-full h-[1px] bg-zinc-500 mt-2" />
          )}
        </button>
        <button onClick={() => navigate("/settings")} className="w-fit">
          <Settings className="md:hidden block" size={28} strokeWidth={1} />
          <p className="hidden md:block">{isEnglish ? "Settings" : "الاعدادات"}</p>
          {path === "/settings" && <div className="w-full h-[1px] bg-zinc-500 mt-2" />}
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <button className="w-fit">
          <Headset className="md:hidden block" size={28} strokeWidth={1} />
          <p className="hidden md:block">{isEnglish ? "Support" : "الدعم"}</p>
        </button>
        <button className="w-fit">
          <LogOut className="md:hidden block" size={28} strokeWidth={1} />
          <p className="hidden md:block">{isEnglish ? "Log Out" : "تسجيل الخروج"}</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
