import React, { useRef, useState, useEffect } from "react";
import styles from "./styles/homepage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const HomePage = ({ lang }) => {
  const [langActive, setLangActive] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState(1);
  const [mobileHabilitiesButton, setMobileHabilitiesButton] = useState(1);
  const [swiperConceptArt, setSwiperConceptArt] = useState(null);
  const [footerInput, setFooterInput] = useState("");
  const navigate = useNavigate();
  const swiperRef1 = useRef(null);
  const [captchaState, setCaptchaState] = useState(false);
  const [emailCounter, setEmailCounter] = useState(0);
  const [modalKickstarter, setModalKickstarter] = useState(false);
  function navigateTo(to) {
    setLangActive(false);
    navigate(to);
  }

  const sendFirstEmail = (e, emailInput) => {
    e.preventDefault();
    console.log("IsValidEmail: ", isValidEmail(emailInput));
    if (captchaState && isValidEmail(emailInput)) {
      axios
        .post(
          `https://hammerhead-app-i4xs5.ondigitalocean.app/api/auth/register`,
          { email: emailInput }
        )
        .then(() => {
          sendSecondEmail(emailInput);
        })
        .catch((error) => {
          console.error("Error al enviar el email:", error);
          toast.error(lang.toast.emailRegistered, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      if (captchaState == false) {
        toast.error(lang.toast.verifyCaptcha, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (isValidEmail(emailInput) == false || emailInput == "") {
        toast.error(lang.toast.emailWrong, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  const sendSecondEmail = (emailInput) => {
    axios
      .post(
        "https://hammerhead-app-i4xs5.ondigitalocean.app/api/secretForestEmails/sendEmailSFXL",
        { emailTo: emailInput }
      )
      .then(() => {
        getEmailsCounter();
        toast.success(lang.toast.info1, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // setTimeout(() => {
        //   toast.info(
        //     "Now sign up for Kickstarter to be among the first to know about the campaign launch!",
        //     {
        //       position: "top-center",
        //       autoClose: 4000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //       theme: "dark",
        //     }
        //   );
        // }, 2000);
        setTimeout(() => {
          setModalKickstarter(true);
        }, 1000);
        setTimeout(() => {
          window.location.href =
            "https://www.kickstarter.com/projects/secretforest/secretforest";
        }, 7500);
        setFooterInput("");
      })
      .catch((error) => {
        toast.error(lang.toast.error, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error(error);
      });
  };

  const getEmailsCounter = () => {
    axios
      .get(`https://hammerhead-app-i4xs5.ondigitalocean.app/api/auth/cuantity`)
      .then((response) => {
        setEmailCounter(response.data.emailCuantity + 18000);
      });
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
    setCaptchaState(true);

    if (isValidEmail(emailFront)) {
      setInputSubmit(false);
    }
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
  useEffect(() => {
    getEmailsCounter();
  }, []);

  return (
    <main className={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {modalKickstarter == true && (
        <>
          <div className={styles.kickstarterXl}>
            <div>
              <img loading="lazy" src="/landingPage/modal/xl.jpg" alt="" />
              <button onClick={() => setModalKickstarter(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffff"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.kickstarterMd}>
            <div>
              <img loading="lazy" src="/landingPage/modal/md.jpg" alt="" />
              <button onClick={() => setModalKickstarter(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffff"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.kickstarterXs}>
            <div>
              <img loading="lazy" src="/landingPage/modal/xs.jpg" alt="" />
              <button onClick={() => setModalKickstarter(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffff"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

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
            <a onClick={() => navigateTo("/fr")}>French</a>
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
            <a onClick={() => setNavActive(false)} href="#home">
              {lang.nav.nav1}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#races">
              {lang.nav.nav2}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#professions">
              {lang.nav.nav3}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#combat">
              {lang.nav.nav4}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#exploration">
              {lang.nav.nav5}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#conceptArt">
              {lang.nav.nav6}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#biomes">
              {lang.nav.nav7}
            </a>
          </li>
          <li>
            <a onClick={() => setNavActive(false)} href="#roadmap">
              {lang.nav.nav8}
            </a>
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
        <div className={styles.headerFade}></div>
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
        <div className={styles.racesFadeDown}></div>
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
      </section>
      <section className={styles.professions} id="professions">
        <div className={styles.professionsTitle}>
          <div></div>
          <h3>{lang.professions.title}</h3>
          <div></div>
        </div>
        <img
          className={styles.professionsAxolotl}
          src="/homePage/professions/axolotl.webp"
          alt=""
        />
        <img
          className={styles.professionsAquan}
          src="/homePage/professions/aquan.webp"
          alt=""
        />
        <img
          className={styles.professionsFadeDown}
          src="/homePage/professions/fadeDown.webp"
          alt=""
        />
        <div className={styles.professionsSelector}>
          <div>
            <button
              className={`${
                selectedProfession == 1 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(1)}
            >
              <img src="/homePage/professions/fisherman.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 2 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(2)}
            >
              <img src="/homePage/professions/fungiculturist.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 3 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(3)}
            >
              <img src="/homePage/professions/jeweler.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 4 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(4)}
            >
              <img src="/homePage/professions/miner.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 5 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(5)}
            >
              <img src="/homePage/professions/necromancer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 6 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(6)}
            >
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
              <img src="/homePage/professions/blacksmith.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 8 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(8)}
            >
              <img src="/homePage/professions/carpenter.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 9 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(9)}
            >
              <img src="/homePage/professions/cheff.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 10 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(10)}
            >
              <img src="/homePage/professions/dressmaker.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 11 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(11)}
            >
              <img src="/homePage/professions/farmer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 12 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(12)}
            >
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
              <img src="/homePage/professions/fisherman.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 2 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(2)}
            >
              <img src="/homePage/professions/fungiculturist.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 3 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(3)}
            >
              <img src="/homePage/professions/jeweler.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 4 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(4)}
            >
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
              <img src="/homePage/professions/necromancer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 6 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(6)}
            >
              <img src="/homePage/professions/alchemist.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 7 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(7)}
            >
              <img src="/homePage/professions/blacksmith.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 8 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(8)}
            >
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
              <img src="/homePage/professions/cheff.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 10 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(10)}
            >
              <img src="/homePage/professions/dressmaker.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 11 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(11)}
            >
              <img src="/homePage/professions/farmer.webp" alt="" />
            </button>
            <button
              className={`${
                selectedProfession == 12 && `${styles.professionActive}`
              }`}
              onClick={() => setSelectedProfession(12)}
            >
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
          <p>{lang.professions.fishermanDesc}</p>
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
          <p>{lang.professions.fungiculturistDesc}</p>
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
          <p>{lang.professions.jewelerDesc}</p>
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
          <p>{lang.professions.minerDesc}</p>
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
          <p>{lang.professions.necromancerDesc}</p>
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
          <p>{lang.professions.alchemistDesc}</p>
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
          <p>{lang.professions.blacksmithDesc}</p>
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
          <p>{lang.professions.carpenterDesc}</p>
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
          <p>{lang.professions.cheffDesc}</p>
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
          <p>{lang.professions.dressmakerDesc}</p>
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
          <p>{lang.professions.farmerDesc}</p>
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
          <p>{lang.professions.breederDesc}</p>
        </div>
      </section>
      <section className={styles.professionsMinigame}>
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
        <h3>{lang.professions.minigamesTitle}</h3>
      </section>
      <section className={styles.combat} id="combat">
        <p className={styles.combatUpText}>{lang.combat.title}</p>
        <div className={styles.combatFadeDown}></div>
        <div className={styles.combatSection1}>
          <div className={styles.combatSection1Left}>
            <h4>{lang.combat.combat}</h4>
            <p>{lang.combat.combatDesc}</p>
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
          <div className={styles.combatSection1Right}>
            <img src="/homePage/combat/axolotl.webp" alt="" />
          </div>
        </div>
        <div className={styles.combatSeparator}>
          <img src="/homePage/combat/division.webp" alt="" />
        </div>
        <div className={styles.combatSection2}>
          <h4>{lang.combat.magicalAbilities}</h4>
          <div className={styles.combatSection2Main}>
            <div className={styles.combatSection2Left}>
              <img src="/homePage/combat/fairan.webp" alt="" />
            </div>
            <div className={styles.combatSection2Right}>
              <p>{lang.combat.magicalAbilitiesDesc}</p>
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
        </div>
        <div className={styles.combatSeparator}>
          <img src="/homePage/combat/division.webp" alt="" />
        </div>
        <div className={styles.combatSection3}>
          <div className={styles.combatSection3Left}>
            <h4>{lang.combat.versatility}</h4>
            <p>{lang.combat.versatilityDesc}</p>
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
          <div className={styles.combatSection3Right}>
            <img src="/homePage/combat/troll.webp" alt="" />
          </div>
        </div>
      </section>
      <section className={styles.exploration} id="exploration">
        <div className={styles.combatFadeUp}></div>
        <div className={styles.combatFadeDown}></div>
        <img
          className={styles.leftDeco}
          src="/homePage/exploration/left.webp"
          alt=""
        />
        <img
          className={styles.rightDeco}
          src="/homePage/exploration/right.webp"
          alt=""
        />
        <h3>{lang.exploration.title}</h3>
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
        <p>{lang.exploration.text}</p>
      </section>
      <section className={styles.world} id="world">
        <p>{lang.world.text}</p>
        <div className={styles.worldFadeUp}></div>

        <img src="/homePage/world/map.webp" alt="" />
      </section>
      <section className={styles.conceptArt} id="conceptArt">
        <div className={styles.conceptArtFadeUp}></div>
        <div className={styles.conceptArtFadeDown}></div>

        <h3>{lang.conceptArt.title} </h3>
        <div className={styles.conceptArtCarousel}>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            rewind={true}
            pagination={true}
            navigation={true}
            modules={[Navigation, Pagination]}
            className={styles.conceptArtSwiper}
          >
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/1.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/2.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/3.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/4.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/5.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/6.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/7.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/8.webp" alt="" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            rewind={true}
            pagination={true}
            navigation={true}
            modules={[Navigation, Pagination]}
            className={styles.mobileConceptArtSwiper}
          >
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/1.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/2.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/3.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/4.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/5.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/6.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/7.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide className={styles.conceptArtItem}>
              <img src="/homePage/conceptArt/8.webp" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className={styles.biomes} id="biomes">
        <div className={styles.biomesFadeUp}></div>
        <div className={styles.biomesFadeDown}></div>
        <img
          className={styles.biomesGoblin}
          src="/homePage/biomes/goblin.webp"
          alt=""
        />
        <img
          className={styles.biomesEmbear}
          src="/homePage/biomes/embear.webp"
          alt=""
        />
        <h3>{lang.biomes.title}</h3>
        <p>{lang.biomes.desc}</p>
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
      </section>
      <section className={styles.roadmap} id="roadmap">
        <img
          className={styles.roadmapMain}
          src="/homePage/roadmap/roadmap.webp"
          alt=""
        />
        <img
          className={styles.mobileRoadmap}
          src="/homePage/roadmap/mobileRoadmap.webp"
          alt=""
        />
        <div className={styles.roadmapFadeUp}></div>
        <div className={styles.roadmapFadeDown}></div>
      </section>
      <section className={styles.team}>
        <h3>{lang.team.title}</h3>
        <div className={styles.teamFadeUp}></div>
        <div className={styles.teamFadeDown}></div>
        <div className={styles.teamMain}>
          <div className={styles.teamCol}>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/dbrylkin.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Dimitri Brylkin</h5>
                  <p>{lang.team.ceo}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/erodriguez.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Elian Rodriguez</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/lrodriguez.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Lucas Rodriguez</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/francisco.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Francisco</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/llamiral.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Luis Lamiral</h5>
                  <p>{lang.team.webDeveloper}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.teamCol}>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/richard.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Richard</h5>
                  <p>{lang.team.threeDDesigner}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/jhon.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Jhon</h5>
                  <p>{lang.team.threeDDesigner}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/amartinez.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Adrian Martinez</h5>
                  <p>{lang.team.worldDesigner}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/cristobal.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Cristobal</h5>
                  {/* <p>{lang.team.programmer}</p> */}
                  <p>...</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/luis.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Luis</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.teamMobileMain}>
          <div className={styles.teamCol}>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/dbrylkin.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Dimitri Brylkin</h5>
                  <p>{lang.team.ceo}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/erodriguez.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Elian Rodriguez</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/lrodriguez.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Lucas Rodriguez</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.teamCol}>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/francisco.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Francisco</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/llamiral.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Luis Lamiral</h5>
                  <p>{lang.team.webDeveloper}</p>
                </div>
              </div>
            </div>

            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/richard.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Richard</h5>
                  <p>{lang.team.threeDDesigner}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.teamCol}>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/jhon.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Jhon</h5>
                  <p>{lang.team.threeDDesigner}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/amartinez.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Adrian Martinez</h5>
                  <p>{lang.team.worldDesigner}</p>
                </div>
              </div>
            </div>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/cristobal.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Cristobal</h5>
                  {/* <p>{lang.team.programmer}</p> */}
                  <p>...</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.teamCol}>
            <div className={styles.teamItem}>
              <img
                className={styles.teamItemImage}
                src="/homePage/team/luis.webp"
                alt=""
              />
              <div>
                <div className={styles.teamItemText}>
                  <h5>Luis</h5>
                  <p>{lang.team.programmer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.getReady}>
        <div className={styles.getReadyFadeUp}></div>
        <div className={styles.getReadyFadeDown}>
          <img src="/homePage/getReady/clouds.webp" alt="" />
        </div>
        <img
          className={styles.getReadyAxolotl}
          src="/homePage/getReady/axolotl.webp"
          alt=""
        />
        <img
          className={styles.getReadyEmbear}
          src="/homePage/getReady/embear.webp"
          alt=""
        />
        <h4>{lang.getReady.title}</h4>
        <p>{lang.getReady.text}</p>
        <label>{lang.getReady.label}</label>
        <label>
          {lang.toast.counter1} {emailCounter} {lang.toast.counter2}
        </label>
        <div className={styles.getReadyInput}>
          <input
            type="text"
            placeholder={lang.getReady.placeholder}
            value={footerInput}
            onChange={(e) => setFooterInput(e.target.value)}
          />
          <button onClick={(e) => sendFirstEmail(e, footerInput)}>
            {lang.getReady.signIn}
          </button>
        </div>
        <ReCAPTCHA
          size="normal"
          className={styles.formCaptcha}
          sitekey="6LcKs2MoAAAAANbEb8FgM_zGq-AZx2SegfCCegkn"
          onChange={onChange}
        />
        <div className={styles.getReadySocial}>
          <h5>{lang.getReady.joinBattle}</h5>
          <div className={styles.getReadySocialMain}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffff"
                  d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffff"
                  d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffff"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffff"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.88em"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#ffff"
                  d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffff"
                  d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div>
          <img src="/homePage/footer/zelcar.png" alt="" />
          <img src="/homePage/footer/secret.png" alt="" />
        </div>
        <div>
          <a href="#">{lang.footer.termsCondition}</a>
          <a href="#">{lang.footer.privacyPolicy}</a>
          <a href="#">{lang.footer.cookiesPolicy}</a>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
