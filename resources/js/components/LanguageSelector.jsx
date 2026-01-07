import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation(); // ← must use this
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "zh", label: "中文" },
    { code: "hi", label: "हिन्दी" },
    { code: "ar", label: "العربية" },
    { code: "fr", label: "Français" },
    { code: "pt", label: "Português" }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // ← this actually updates language
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", cursor: "pointer" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px", background: "#fff" }}
      >
        {languages.find(l => l.code === i18n.language)?.label || "Language"}
      </div>

      {open && (
        <ul style={{
          position: "absolute",
          top: "100%",
          right: 0,
          background: "white",
          border: "1px solid #ccc",
          listStyle: "none",
          margin: 0,
          padding: 0,
          width: "150px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
        }}>
          {languages.map(lang => (
            <li
              key={lang.code}
              style={{ padding: "8px 12px", cursor: "pointer" }}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;
