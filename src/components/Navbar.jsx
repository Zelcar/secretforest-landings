import React, { useState } from "react";
import "./styles/navbar.scss";
const Navbar = ({ lang, location }) => {
  const [pressedNav, setPressedNav] = useState(false);
  const [pressedLang, setPressedLang] = useState(false);
  return (
    <nav>
      <div className="navMain">
        <button
          onClick={() => {
            setPressedLang(!pressedLang);
            setPressedNav(false);
          }}
        >
          <img src="/landingPage/nav/langHam.png" alt="Ham Image" />
        </button>
      </div>
      <div className={pressedLang ? "navLangActive active " : "navLangActive"}>
        <ul>
          <li>
            {/* <a href="/landing/es">Español</a> */}
            <a href={location == "landing" ? "/landing/es" : "/es"}>
              Español
            </a>
          </li>
          <li>
            {/* <a href="/landing/en">English</a> */}
            <a href={location == "landing" ? "/landing/en" : "/en"}>
              English
            </a>
          </li>
          <li>
            {/* <a href="/landing/br">Portuguese</a> */}
            <a href={location == "landing" ? "/landing/br" : "/br"}>
              Portuguese
            </a>
          </li>
          <li>
            {/* <a href="/landing/kr">Korean</a> */}
            <a href={location == "landing" ? "/landing/kr" : "/kr"}>
              Korean
            </a>
          </li>
          <li>
            {/* <a href="/landing/ja">Japanese</a> */}
            <a href={location == "landing" ? "/landing/ja" : "/ja"}>
              Japanese
            </a>
          </li>
          <li>
            {/* <a href="/landing/de">German</a> */}
            <a href={location == "landing" ? "/landing/de" : "/de"}>
              German
            </a>
          </li>
          <li>
            {/* <a href="/landing/nl">Dutch</a> */}
            <a href={location == "landing" ? "/landing/nl" : "/nl"}>
              Dutch
            </a>
          </li>
          <li>
            {/* <a href="/landing/ru">Russian</a> */}
            <a href={location == "landing" ? "/landing/ru" : "/ru"}>
              Russian
            </a>
          </li>
          <li>
            {/* <a href="/landing/fr">French</a> */}
            <a href={location == "landing" ? "/landing/fr" : "/fr"}>
              French
            </a>
          </li>
          <li>
            {/* <a href="/landing/zh">Chinese</a> */}
            <a href={location == "landing" ? "/landing/zh" : "/zh"}>
              Chinese
            </a>
          </li>
          <li>
            {/* <a href="/landing/it">Italian</a> */}
            <a href={location == "landing" ? "/landing/it" : "/it"}>
              Italian
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
