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
            <a href="/es">Español</a>
          </li>
          <li>
            <a href="/en">English</a>
          </li>
          <li>
            <a href="/br">Portuguese</a>
          </li>
          <li>
            <a href="/kr">Korean</a>
          </li>
          <li>
            <a href="/ja">Japanese</a>
          </li>
          <li>
            <a href="/de">German</a>
          </li>
          <li>
            <a href="/nl">Dutch</a>
          </li>
          <li>
            <a href="/ru">Russian</a>
          </li>
          <li>
            <a href="/fr">French</a>
          </li>
          <li>
            <a href="/zh">Chinese</a>
          </li>
          <li>
            <a href="/it">Italian</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
