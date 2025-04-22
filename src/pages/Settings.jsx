import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { isEnglish } from "../utlis/isEnglish";

const Settings = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );
  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "English");
    localStorage.setItem("language", language);
  }, [language]);
  return (
    <div className="container-cc">
      <Navbar />
      <div className={isEnglish ? "content-container p-5 ms-auto" : "content-container p-5 me-auto"}>
        <div className="flex flex-col gap-5">
          <p className="text-3xl normal-font-bold tracking-widest">
            {isEnglish ? "Settings" : "الإعدادات"}
          </p>
        </div>
        {/* language */}
        <div className="flex flex-col mt-10 gap-5">
          <p>{isEnglish ? "Change The Language" : "تغيير اللغة"}</p>
          <select
            value={language}
            onChange={(e) => {
              localStorage.setItem("language", e.target.value);
              setLanguage(e.target.value);
              window.location.reload();
            }}
            className="inpt-2"
          >
            <option value={"English"}>{isEnglish ? "English" : "الإنجليزية"}</option>
            <option value={"Arabic"}>{isEnglish ? "Arabic" : "العربية"}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
