import React, { useRef, useState } from "react";
import styles from "./styles/homepage.module.scss";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
const HomePage = ({ lang }) => {
  const [langActive, setLangActive] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState(1);
  const [mobileHabilitiesButton, setMobileHabilitiesButton] = useState(1);
  const navigate = useNavigate();
  const swiperRef1 = useRef(null);

  function navigateTo(to) {
    setLangActive(false);
    navigate(to);
  }

  const handlePrev = () => {
    if (swiperRef1.current && swiperRef1.current.swiper) {
      swiperRef1.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef1.current && swiperRef1.current.swiper) {
      swiperRef1.current.swiper.slideNext();
    }
  };

  return (
    <main className={styles.container}>
      {/* Navbar */}
      <>
        <ul
          className={`${
            langActive ? `${styles.langUl} ${styles.langActive}` : styles.langUl
          }`}
        >
          <li>
            <a onClick={() => navigateTo("/es")}>Español</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/en")}>English</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/br")}>Portuguese</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/kr")}>Korean</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/ja")}>Japanese</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/de")}>German</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/nl")}>Dutch</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/ru")}>Russian</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/fr")}>Frech</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/zh")}>Chinese</a>
          </li>
          <li>
            <a onClick={() => navigateTo("/it")}>Italian</a>
          </li>
        </ul>
        <ul
          className={`${
            navActive
              ? `${styles.mobileNavUl} ${styles.mobileNavActive}`
              : styles.mobileNavUl
          }`}
        >
          <li>
            <a onClick={() => setNavActive(false)} href="#home">{lang.nav.nav1}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#races">{lang.nav.nav2}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#professions">{lang.nav.nav3}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#combat">{lang.nav.nav4}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#exploration">{lang.nav.nav5}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#conceptArt">{lang.nav.nav6}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#biomes">{lang.nav.nav7}</a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#roadmap">{lang.nav.nav8}</a>
          </li>
        </ul>
        <nav className={styles.nav}>
          <ul className={styles.navUl}>
            <li>
              <a href="#home">{lang.nav.nav1}</a>
            </li>
            <li>
              <a href="#races">{lang.nav.nav2}</a>
            </li>
            <li>
              <a href="#professions">{lang.nav.nav3}</a>
            </li>
            <li>
              <a href="#combat">{lang.nav.nav4}</a>
            </li>
            <li>
              <a href="#exploration">{lang.nav.nav5}</a>
            </li>
            <li>
              <a href="#conceptArt">{lang.nav.nav6}</a>
            </li>
            <li>
              <a href="#biomes">{lang.nav.nav7}</a>
            </li>
            <li>
              <a href="#roadmap">{lang.nav.nav8}</a>
            </li>
          </ul>
          <button
            onClick={() => {
              setNavActive(!navActive);
              setLangActive(false);
            }}
            className={styles.hamBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#ffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 17h14M5 12h14M5 7h14"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setLangActive(!langActive);
              setNavActive(false);
            }}
            className={styles.langBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                d="M5.08 8h2.95c.32-1.25.78-2.45 1.38-3.56c-1.84.63-3.37 1.9-4.33 3.56m2.42 4c0-.68.06-1.34.14-2H4.26c-.16.64-.26 1.31-.26 2s.1 1.36.26 2h3.38c-.08-.66-.14-1.32-.14-2m-2.42 4a7.987 7.987 0 0 0 4.33 3.56A15.65 15.65 0 0 1 8.03 16zM12 4.04c-.83 1.2-1.48 2.53-1.91 3.96h3.82c-.43-1.43-1.08-2.76-1.91-3.96M18.92 8a8.03 8.03 0 0 0-4.33-3.56c.6 1.11 1.06 2.31 1.38 3.56zM12 19.96c.83-1.2 1.48-2.53 1.91-3.96h-3.82c.43 1.43 1.08 2.76 1.91 3.96m2.59-.4A8.03 8.03 0 0 0 18.92 16h-2.95a15.65 15.65 0 0 1-1.38 3.56M19.74 10h-3.38c.08.66.14 1.32.14 2s-.06 1.34-.14 2h3.38c.16-.64.26-1.31.26-2s-.1-1.36-.26-2M9.66 10c-.09.65-.16 1.32-.16 2s.07 1.34.16 2h4.68c.09-.66.16-1.32.16-2s-.07-1.35-.16-2z"
                opacity="0.3"
              />
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16m2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z" />
            </svg>
          </button>
        </nav>
      </>
      {/* End navbar */}
      <a className={styles.upArrow} href="#home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#ffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="m7 10l5 5m0 0l5-5"
          />
        </svg>
      </a>
      <header id="home" className={styles.header}>
        <img
          className={styles.headerFade}
          src="/homePage/header/fadeDown.webp"
          alt=""
        />
        <img className={styles.logo} src="/homePage/header/logo.webp" alt="" />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <p>{lang.header.trailer}</p>
      </header>
      <section className={styles.races} id="races">
        <h3>{lang.races.title}</h3>
        <div className={styles.racesSelection}>
          <img
            className={styles.racesSelectionbacklights}
            src="/homePage/races/carouselBacklights.webp"
            alt=""
          />
          <button
            onClick={() =>
              selectedIcon == 1
                ? setSelectedIcon(10)
                : setSelectedIcon(selectedIcon - 1)
            }
            className={styles.racesSelectionArrow1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z" />
            </svg>
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(1)}
          >
            <img src="/homePage/races/axolotl/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 1
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(2)}
          >
            <img src="/homePage/races/aquan/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 2
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(3)}
          >
            <img src="/homePage/races/elve/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 3
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(4)}
          >
            <img src="/homePage/races/foxy/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 4
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(5)}
          >
            <img src="/homePage/races/goblin/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 5
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(6)}
          >
            <img src="/homePage/races/troll/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 6
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(7)}
          >
            <img src="/homePage/races/fairan/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 7
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(8)}
          >
            <img src="/homePage/races/embear/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 8
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(9)}
          >
            <img src="/homePage/races/cat/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 9
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            className={styles.racesIcon}
            onClick={() => setSelectedIcon(10)}
          >
            <img src="/homePage/races/dog/ico.webp" alt="" />
            <img
              className={`${
                selectedIcon == 10
                  ? `${styles.iconBorder} ${styles.iconActive}`
                  : styles.iconBorder
              }`}
              src="/homePage/races/iconSelected.webp"
              alt=""
            />
          </button>
          <button
            onClick={() =>
              selectedIcon == 10
                ? setSelectedIcon(1)
                : setSelectedIcon(selectedIcon + 1)
            }
            className={styles.racesSelectionArrow2}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z" />
            </svg>
          </button>
        </div>
        {/* Raza 1 */}
        <div
          className={`${
            selectedIcon == 1
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.axolotlTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/axolotl/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.axolotlDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/axolotl/hab1.webp" alt="" />
                  <img src="/homePage/races/axolotl/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/axolotl/hab3.webp" alt="" />
                  <img src="/homePage/races/axolotl/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesContainerMobileHabilitiesMain}>
            <h3>Habilities</h3>
            <button
              onClick={() => handlePrev()}
              className={styles.mobileHabilitiesArrow1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z" />
              </svg>
            </button>
            <button
              onClick={() => handleNext()}
              className={styles.mobileHabilitiesArrow2}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z" />
              </svg>
            </button>
            <div className={styles.racesContainerMobileHabilities}>
              <Swiper
                ref={swiperRef1}
                effect={"cards"}
                grabCursor={true}
                centeredSlides={true}
                cardsEffect={{
                  perSlideOffset: 35,
                  rotate: true,
                  slideShadows: false,
                }}
                initialSlide={2}
                modules={[EffectCards]}
                className={styles.mySwiper}
              >
                <SwiperSlide className={styles.mobileHabilitiesItem}>
                  <img src="/homePage/races/axolotl/hab1.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className={styles.mobileHabilitiesItem}>
                  <img src="/homePage/races/axolotl/hab2.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/homePage/races/axolotl/hab3.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/homePage/races/axolotl/hab4.webp" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 2 */}
        <div
          className={`${
            selectedIcon == 2
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.aquanTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/aquan/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.aquanDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/aquan/hab1.webp" alt="" />
                  <img src="/homePage/races/aquan/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/aquan/hab3.webp" alt="" />
                  <img src="/homePage/races/aquan/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 3 */}
        <div
          className={`${
            selectedIcon == 3
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.elveTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/elve/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.elveDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/elve/hab1.webp" alt="" />
                  <img src="/homePage/races/elve/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/elve/hab3.webp" alt="" />
                  <img src="/homePage/races/elve/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 4 */}
        <div
          className={`${
            selectedIcon == 4
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.foxyTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/foxy/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.foxyDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/foxy/hab1.webp" alt="" />
                  <img src="/homePage/races/foxy/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/foxy/hab3.webp" alt="" />
                  <img src="/homePage/races/foxy/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 5 */}
        <div
          className={`${
            selectedIcon == 5
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.goblinTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/goblin/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.goblinDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/goblin/hab1.webp" alt="" />
                  <img src="/homePage/races/goblin/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/goblin/hab3.webp" alt="" />
                  <img src="/homePage/races/goblin/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 6 */}
        <div
          className={`${
            selectedIcon == 6
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.trollTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/troll/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.trollDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/troll/hab1.webp" alt="" />
                  <img src="/homePage/races/troll/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/troll/hab3.webp" alt="" />
                  <img src="/homePage/races/troll/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 7 */}
        <div
          className={`${
            selectedIcon == 7
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.fairanTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/fairan/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.fairanDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/fairan/hab1.webp" alt="" />
                  <img src="/homePage/races/fairan/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/fairan/hab3.webp" alt="" />
                  <img src="/homePage/races/fairan/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 8 */}
        <div
          className={`${
            selectedIcon == 8
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.embearTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/embear/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.embearDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/embear/hab1.webp" alt="" />
                  <img src="/homePage/races/embear/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/embear/hab3.webp" alt="" />
                  <img src="/homePage/races/embear/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 8 */}
        <div
          className={`${
            selectedIcon == 9
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.catTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/cat/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.catDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/cat/hab1.webp" alt="" />
                  <img src="/homePage/races/cat/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/cat/hab3.webp" alt="" />
                  <img src="/homePage/races/cat/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* Raza 10 */}
        <div
          className={`${
            selectedIcon == 10
              ? `${styles.racesContainer} ${styles.racesActive}`
              : styles.racesContainer
          }`}
        >
          <h4>{lang.races.dogTitle}</h4>
          <div className={styles.racesContainerMain}>
            <div className={styles.racesContainerLeft}>
              <img src="/homePage/races/dog/img.webp" alt="" />
            </div>
            <div className={styles.racesContainerRight}>
              <p>{lang.races.dogDesc}</p>
              <div className={styles.racesHabilitiesContainer}>
                <h5>{lang.races.habsTitle}</h5>
                <div>
                  <img src="/homePage/races/dog/hab1.webp" alt="" />
                  <img src="/homePage/races/dog/hab2.webp" alt="" />
                </div>
                <div>
                  <img src="/homePage/races/dog/hab3.webp" alt="" />
                  <img src="/homePage/races/dog/hab4.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.racesGameplay}>
            <h5>{lang.races.gameplayTitle}</h5>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
      <section className={styles.professions} id="professions">
        <h3>{lang.professions.title}</h3>
        <div className={styles.professionsSelector}>
          <div>
            <button
              className={`${
                selectedProfession == 1 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(1)}
            >
              <p>{lang.professions.fisherman}</p>
              <img src="/homePage/professions/fisherman.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 2 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(2)}
            >
              <p>{lang.professions.fungiculturist}</p>
              <img src="/homePage/professions/fungiculturist.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 3 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(3)}
            >
              <p>{lang.professions.jeweler}</p>
              <img src="/homePage/professions/jeweler.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 4 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(4)}
            >
              <p>{lang.professions.miner}</p>
              <img src="/homePage/professions/miner.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 5 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(5)}
            >
              <p>{lang.professions.necromancer}</p>
              <img src="/homePage/professions/necromancer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 6 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(6)}
            >
              <p>{lang.professions.alchemist}</p>
              <img src="/homePage/professions/alchemist.webp" alt="" />
            </button>
          </div>
          <div>
            <button
              className={`${
                selectedProfession == 7 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(7)}
            >
              <p>{lang.professions.blacksmith}</p>
              <img src="/homePage/professions/blacksmith.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 8 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(8)}
            >
              <p>{lang.professions.carpenter}</p>
              <img src="/homePage/professions/carpenter.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 9 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(9)}
            >
              <p>{lang.professions.cheff}</p>
              <img src="/homePage/professions/cheff.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 10 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(10)}
            >
              <p>{lang.professions.dressmaker}</p>
              <img src="/homePage/professions/dressmaker.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 11 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(11)}
            >
              <p>{lang.professions.farmer}</p>
              <img src="/homePage/professions/farmer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 12 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(12)}
            >
              <p>{lang.professions.breeder}</p>
              <img src="/homePage/professions/breeder.webp" alt="" />
            </button>
          </div>
        </div>
        <div className={styles.mobileProfessionsSelector}>
          <div>
            <button
              className={`${
                selectedProfession == 1 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(1)}
            >
              <p>{lang.professions.fisherman}</p>
              <img src="/homePage/professions/fisherman.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 2 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(2)}
            >
              <p>{lang.professions.fungiculturist}</p>
              <img src="/homePage/professions/fungiculturist.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 3 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(3)}
            >
              <p>{lang.professions.jeweler}</p>
              <img src="/homePage/professions/jeweler.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 4 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(4)}
            >
              <p>{lang.professions.miner}</p>
              <img src="/homePage/professions/miner.webp" alt="" />
            </button>
          </div>
          <div>
            <button
              className={`${
                selectedProfession == 5 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(5)}
            >
              <p>{lang.professions.necromancer}</p>
              <img src="/homePage/professions/necromancer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 6 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(6)}
            >
              <p>{lang.professions.alchemist}</p>
              <img src="/homePage/professions/alchemist.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 7 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(7)}
            >
              <p>{lang.professions.blacksmith}</p>
              <img src="/homePage/professions/blacksmith.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 8 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(8)}
            >
              <p>{lang.professions.carpenter}</p>
              <img src="/homePage/professions/carpenter.webp" alt="" />
            </button>
          </div>
          <div>
            <button
              className={`${
                selectedProfession == 9 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(9)}
            >
              <p>{lang.professions.cheff}</p>
              <img src="/homePage/professions/cheff.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 10 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(10)}
            >
              <p>{lang.professions.dressmaker}</p>
              <img src="/homePage/professions/dressmaker.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 11 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(11)}
            >
              <p>{lang.professions.farmer}</p>
              <img src="/homePage/professions/farmer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 12 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(12)}
            >
              <p>{lang.professions.breeder}</p>
              <img src="/homePage/professions/breeder.webp" alt="" />
            </button>
          </div>
        </div>
        {/* Profesion 1 */}
        <div
          className={`${
            selectedProfession == 1
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.fisherman}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 2 */}
        <div
          className={`${
            selectedProfession == 2
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.fungiculturist}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 3 */}
        <div
          className={`${
            selectedProfession == 3
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.jeweler}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 4 */}
        <div
          className={`${
            selectedProfession == 4
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.miner}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 5 */}
        <div
          className={`${
            selectedProfession == 5
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.necromancer}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 6 */}
        <div
          className={`${
            selectedProfession == 6
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.alchemist}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 7 */}
        <div
          className={`${
            selectedProfession == 7
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.blacksmith}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 8 */}
        <div
          className={`${
            selectedProfession == 8
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.carpenter}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 9 */}
        <div
          className={`${
            selectedProfession == 9
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.cheff}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 10 */}
        <div
          className={`${
            selectedProfession == 10
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.dressmaker}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 11 */}
        <div
          className={`${
            selectedProfession == 11
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.farmer}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* Profesion 12 */}
        <div
          className={`${
            selectedProfession == 12
              ? `${styles.professionsContainer} ${styles.professionsActive}`
              : styles.professionsContainer
          }`}
        >
          <h4>{lang.professions.breeder}</h4>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/83HM1vGdp4I?si=HRQM_pvn76Nfc6pU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <section className={styles.combat} id="combat">
        asdasasd
      </section>
      <section className={styles.exploration} id="exploration"></section>
      <section className={styles.conceptArt} id="conceptArt"></section>
      <section className={styles.biomes} id="biomes"></section>
      <section className={styles.roadmap} id="roadmap"></section>
      <footer></footer>
    </main>
  );
};

export default HomePage;
