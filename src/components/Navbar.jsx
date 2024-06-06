import React, { useState } from "react";
import "./styles/navbar.scss";
const Navbar = ({ lang, isHome }) => {
  const [pressedNav, setPressedNav] = useState(false);
  const [pressedLang, setPressedLang] = useState(false);
  let actualLang = lang.id == 1 ? "/es" : lang.id == 2 ? "/en" : "/br";
  return (
    <nav>
      <div className="navMain">
        <button
          onClick={() => {
            setPressedLang(!pressedLang);
            setPressedNav(false);
          }}
        >
          <img src="/nav/langHam.png" alt="Ham Image" />
        </button>
      </div>
      <div className={pressedLang ? "navLangActive active " : "navLangActive"}>
        <ul>
          <li>
            <a href="/landing/es">Español</a>
          </li>
          <li>
            <a href="/landing/en">English</a>
          </li>
          <li>
            <a href="/landing/br">Portuguese</a>
          </li>
          <li>
            <a href="/landing/kr">Korean</a>
          </li>
          <li>
            <a href="/landing/ja">Japanese</a>
          </li>
          <li>
            <a href="/landing/de">German</a>
          </li>
          <li>
            <a href="/landing/nl">Dutch</a>
          </li>
          <li>
            <a href="/landing/ru">Russian</a>
          </li>
          <li>
            <a href="/landing/fr">French</a>
          </li>
          <li>
            <a href="/landing/zh">Chinese</a>
          </li>
          <li>
            <a href="/landing/it">Italian</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
