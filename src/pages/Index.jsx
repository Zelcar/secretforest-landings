import React, { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import styles from "./styles/index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-cards";
import Navbar from "../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Index = ({ lang }) => {
  const [loader, setLoader] = useState(false);
  const [emailCounter, setEmailCounter] = useState(0);
  const [captchaState, setCaptchaState] = useState(true);
  const [fixedNumber, setFixedNumber] = useState(null);
  const [headerEmailInput, setHeaderEmailInput] = useState("");
  const [footerEmailInput, setFooterEmailInput] = useState("");
  const [modalKickstarter, setModalKickstarter] = useState(false);
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);
  const swiperRef3 = useRef(null);
  let selectedLang = lang.id == 1 ? "es" : lang.id == 2 ? "en" : "br";

  const sendFirstEmail = (e, emailInput) => {
    e.preventDefault();
    console.log("IsValidEmail: ", isValidEmail(emailInput));
    if (captchaState && isValidEmail(emailInput)) {
      axios
        .post(
          `https://starfish-app-licfp.ondigitalocean.app/api/auth/register`,
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
        "https://starfish-app-licfp.ondigitalocean.app/api/secretForestEmails/sendEmail",
        { emailTo: emailInput }
      )
      .then(() => {
        getEmailsCounter();
        fetchFixedNumber();
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
        setHeaderEmailInput("");
        setFooterEmailInput("");
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
      .get(`https://starfish-app-licfp.ondigitalocean.app/api/auth/cuantity`)
      .then((response) => {
        setEmailCounter(response.data.emailCuantity - 8775);
      });
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const fetchFixedNumber = () => {
    const API_URL =
      "https://starfish-app-licfp.ondigitalocean.app/api/auth/cuantity";

    axios
      .get(API_URL)
      .then((response) => {
        setFixedNumber(response.data.emailCuantity - 8775);
      })
      .catch((error) => {});
  };
  function onChange(value) {
    console.log("Captcha value:", value);
    setCaptchaState(true);

    if (isValidEmail(emailFront)) {
      setInputSubmit(false);
    }
  }
  useEffect(() => {
    getEmailsCounter();
    fetchFixedNumber();
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
  const handlePrev = () => {
    if (swiperRef1.current && swiperRef1.current.swiper) {
      swiperRef1.current.swiper.slidePrev();
    }
    if (swiperRef2.current && swiperRef2.current.swiper) {
      swiperRef2.current.swiper.slidePrev();
    }
    if (swiperRef3.current && swiperRef3.current.swiper) {
      swiperRef3.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef1.current && swiperRef1.current.swiper) {
      swiperRef1.current.swiper.slideNext();
    }
    if (swiperRef2.current && swiperRef2.current.swiper) {
      swiperRef2.current.swiper.slideNext();
    }
    if (swiperRef3.current && swiperRef3.current.swiper) {
      swiperRef3.current.swiper.slideNext();
    }
  };
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
              <img loading="lazy"  src="/modal/xl.jpg" alt="" />
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
              <img loading="lazy" src="/modal/md.jpg" alt="" />
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
              <img loading="lazy" src="/modal/xs.jpg" alt="" />
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
      <Loader loader={loader}></Loader>
      <Navbar lang={lang} isHome={true} />
      <a href="#header" className={styles.upBtn}>
        <img loading="lazy" src="/btnUp.png" alt="" />
      </a>
      <header id="header" className={styles.header}>
        <img loading="lazy"
          src="/header/axolotl.png"
          className={styles.headerAxolotl}
          alt=""
        />
        <img loading="lazy" src="/header/cat.png" className={styles.headerCat} alt="" />
        <img loading="lazy"
          src="/header/logo.png"
          className={styles.headerLogo}
          alt="Secret Forest Logo"
        />
        <h1>{lang.header.title1}</h1>
        <h1>{lang.header.title2}</h1>
        <h3>{lang.header.subtitle}</h3>
        <p>{lang.header.label}</p>
        <div>
          <label>{lang.header.email}</label>
          <input
            type="text"
            placeholder={lang.header.placeholder}
            value={headerEmailInput}
            onChange={(e) => setHeaderEmailInput(e.target.value)}
          />
          <ReCAPTCHA
            size="normal"
            className={styles.headerCaptcha}
            sitekey="6LcKs2MoAAAAANbEb8FgM_zGq-AZx2SegfCCegkn"
            onChange={onChange}
          />
          <button onClick={(e) => sendFirstEmail(e, headerEmailInput)}>
            {lang.header.signUp}
          </button>
          <label className={styles.headerJoinNumber}>
            {lang.toast.counter1} {fixedNumber} {lang.toast.counter2}
          </label>
        </div>
        <img loading="lazy" className={styles.headerGame} src="/header/game.png" alt="" />
        <img loading="lazy" className={styles.headerFade} src="/header/fade.png" alt="" />
      </header>
      <section className={styles.combatSystem}>
        <div>
          <p>{lang.header.text1}</p>
          <p>
            {lang.header.text2pre} <strong>{lang.header.text2mid}</strong>{" "}
            {lang.header.text2final}
          </p>
        </div>
      </section>
      <section className={styles.races}>
        <div className={styles.racesMainContainer}>
          <div className={styles.racesTitle}>
            <h3>10</h3>
            <h3>{lang.races.title}</h3>
          </div>
          <div className={styles.racesImagesContainer}>
            <button className={styles.racesArrows} onClick={handlePrev}>
              <img loading="lazy" src="/arrow.png" alt="" />
            </button>
            <Swiper
              spaceBetween={50}
              ref={swiperRef1}
              grabCursor={true}
              className={styles.mySwiper}
              centeredSlides={true}
              effect={"cards"}
              slidesPerView={"auto"}
              cardsEffect={{
                perSlideOffset: 35,
                rotate: true,
              }}
              modules={[EffectCards]}
              initialSlide={5}
            >
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/dog.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/embear.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/cat.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/aquan.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/axolotl.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/foxy.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/fairan.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/elve.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/troll.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/goblin.png"></img>
              </SwiperSlide>
            </Swiper>
            <Swiper
              spaceBetween={50}
              ref={swiperRef2}
              grabCursor={true}
              className={styles.myMobileSwiper}
              effect={"cards"}
              slidesPerView={"auto"}
              cardsEffect={{
                perSlideOffset: 20,
                slideShadows: false,
                centeredSlides: true,
              }}
              modules={[EffectCards]}
              initialSlide={5}
            >
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/dog.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/embear.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/cat.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/aquan.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/axolotl.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/foxy.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/fairan.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/elve.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/troll.png"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy" className={styles.racesImg} src="/races/goblin.png"></img>
              </SwiperSlide>
            </Swiper>
            <Swiper
              spaceBetween={50}
              ref={swiperRef3}
              grabCursor={true}
              className={styles.myMobile2Swiper}
              effect={"cards"}
              slidesPerView={"auto"}
              cardsEffect={{
                perSlideOffset: 15,
                slideShadows: false,
                centeredSlides: true,
              }}
              modules={[EffectCards]}
              initialSlide={5}
            >
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileDog.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileEmbear.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileCat.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileAquan.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileAxolotl.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileFoxy.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileFairan.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileElve.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileTroll.png"
                ></img>
              </SwiperSlide>
              <SwiperSlide>
                <img loading="lazy"
                  className={styles.racesImg}
                  src="/races/mobileGoblin.png"
                ></img>
              </SwiperSlide>
            </Swiper>
            <button className={styles.racesArrows} onClick={handleNext}>
              <img loading="lazy" src="/arrow.png" alt="" />
            </button>
          </div>
        </div>
        <p className={styles.racesText}>
          {lang.races.text1} <br /> {lang.races.text2} <br /> {lang.races.text3}{" "}
        </p>
      </section>
      <section className={styles.biomes}>
        <div className={styles.biomesTitle}>
          <h3>10</h3>
          <h3>{lang.biomes.title1}</h3>
          <h3>{lang.biomes.title2}</h3>
        </div>
        <div className={styles.biomesText}>
          <p>
            {lang.biomes.text1} <br /> {lang.biomes.text2} <br />{" "}
            {lang.biomes.text3} <br /> {lang.biomes.text4}{" "}
          </p>
        </div>
      </section>
      <section className={styles.professions}>
        <img loading="lazy"
          src="/professions/image.png"
          alt=""
          className={styles.professionsImage}
        />
        <img loading="lazy"
          src="/professions/mobileImage.png"
          alt=""
          className={styles.professionsMobileImage}
        />
        <p className={styles.professionsTexts}>
          {lang.professions.text1} <br /> {lang.professions.text2} <br />{" "}
          {lang.professions.text3}{" "}
        </p>
      </section>
      <section className={styles.skills}>
        {/* <div className={styles.skillTitle}> */}
        <div
          className={
            selectedLang !== "en"
              ? styles.skillNoEnglishTitle
              : styles.skillTitle
          }
        >
          <h3>{lang.skills.title1}</h3>
          <h3>{lang.skills.title2}</h3>
          <h3>{lang.skills.title3}</h3>
        </div>
      </section>
      <section className={styles.world}>
        <div className={styles.worldTitle}>
          <h3>150</h3>
          <h3>{lang.world.title1}</h3>
          <h4>{lang.world.title2}</h4>
          <h4>{lang.world.title3}</h4>
        </div>
      </section>
      <section className={styles.gameplay}>
        <div className={styles.gameplayAlufis}>
          <img loading="lazy" src="/gameplay/alufis.png" alt="" />
        </div>
        <div className={styles.gameplayTitle}>
          <h3>150</h3>
          <h3>{lang.gameplay.title1}</h3>
          <h4>{lang.gameplay.title2}</h4>
          <h4>{lang.gameplay.title3}</h4>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10c-4.6 0-8.45-3.08-9.64-7.27l3.83 1.58a2.84 2.84 0 0 0 2.78 2.27c1.56 0 2.83-1.27 2.83-2.83v-.13l3.4-2.43h.08c2.08 0 3.77-1.69 3.77-3.77s-1.69-3.77-3.77-3.77s-3.78 1.69-3.78 3.77v.05l-2.37 3.46l-.16-.01c-.59 0-1.14.18-1.59.49L2 11.2C2.43 6.05 6.73 2 12 2M8.28 17.17c.8.33 1.72-.04 2.05-.84s-.05-1.71-.83-2.04l-1.28-.53c.49-.18 1.04-.19 1.56.03c.53.21.94.62 1.15 1.15c.22.52.22 1.1 0 1.62c-.43 1.08-1.7 1.6-2.78 1.15c-.5-.21-.88-.59-1.09-1.04zm9.52-7.75c0 1.39-1.13 2.52-2.52 2.52a2.52 2.52 0 0 1-2.51-2.52a2.5 2.5 0 0 1 2.51-2.51a2.52 2.52 0 0 1 2.52 2.51m-4.4 0c0 1.04.84 1.89 1.89 1.89c1.04 0 1.88-.85 1.88-1.89s-.84-1.89-1.88-1.89c-1.05 0-1.89.85-1.89 1.89"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22.585 17.011c-.43.543-1.483.93-1.483.93l-7.832 2.817V18.68l5.764-2.057c.654-.234.754-.566.223-.74c-.531-.175-1.492-.125-2.147.111l-3.84 1.354v-2.155l.221-.076s1.11-.393 2.67-.566c1.561-.172 3.472.024 4.972.593c1.69.535 1.88 1.323 1.452 1.866m-8.57-3.537V8.162c0-.624-.115-1.198-.7-1.36c-.447-.144-.725.272-.725.895V21l-3.583-1.139V4c1.523.283 3.743.953 4.936 1.355c3.035 1.043 4.064 2.342 4.064 5.267c0 2.851-1.758 3.932-3.992 2.852m-11.583 4.99c-1.736-.49-2.025-1.51-1.234-2.097c.731-.542 1.975-.95 1.975-.95l5.138-1.83v2.086l-3.698 1.325c-.653.234-.753.566-.223.74c.532.175 1.493.125 2.147-.11l1.774-.644v1.865l-.354.06c-1.774.29-3.663.169-5.525-.445"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5.42 19.528A9.956 9.956 0 0 0 12 22a9.967 9.967 0 0 0 6.585-2.472c1.564-1.594-3.597-7.258-6.585-9.515c-2.985 2.257-8.15 7.921-6.582 9.515m9.3-12.005c2.083 2.467 6.236 8.594 5.063 10.76A9.952 9.952 0 0 0 22 12.002a9.958 9.958 0 0 0-2.975-7.113s-.023-.018-.068-.035a.686.686 0 0 0-.234-.038c-.494 0-1.655.362-4.005 2.706M5.045 4.855c-.048.017-.068.034-.072.035A9.963 9.963 0 0 0 2 12.003c0 2.379.832 4.561 2.217 6.278C3.051 16.11 7.201 9.988 9.285 7.523C6.935 5.178 5.772 4.818 5.28 4.818a.604.604 0 0 0-.234.039zM12 4.959S9.546 3.523 7.63 3.455c-.753-.027-1.213.246-1.268.282C8.15 2.539 10.05 2 11.988 2H12c1.945 0 3.838.538 5.638 1.737c-.056-.038-.512-.31-1.266-.282c-1.917.068-4.372 1.5-4.372 1.5z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10.04 20.4H7.12c-.93 0-1.82-.4-2.48-1.04C4 18.7 3.6 17.81 3.6 16.88V7.12c0-.93.4-1.82 1.04-2.48C5.3 4 6.19 3.62 7.12 3.62h2.92zM7.12 2A5.12 5.12 0 0 0 2 7.12v9.76C2 19.71 4.29 22 7.12 22h4.53V2zM5.11 8c0 1.04.84 1.88 1.89 1.88c1.03 0 1.87-.84 1.87-1.88S8.03 6.12 7 6.12c-1.05 0-1.89.84-1.89 1.88m12.5 3c1.11 0 2.01.89 2.01 2c0 1.12-.9 2-2.01 2s-2.03-.88-2.03-2c0-1.11.92-2 2.03-2m-.73 11A5.12 5.12 0 0 0 22 16.88V7.12C22 4.29 19.71 2 16.88 2h-3.23v20z"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className={styles.elements}>
        <div className={styles.elementsUpFade}></div>

        <div className={styles.elementsMain}>
          <div className={styles.elementsTitle}>
            <h3>8</h3>
            <h3>{lang.elements.title}</h3>
          </div>
          <div className={styles.elementsContainer}>
            <div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/light.png" alt="" />
                <p>{lang.elements.light}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/darkness.png" alt="" />
                <p>{lang.elements.darkness}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/water.png" alt="" />
                <p>{lang.elements.water}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/fire.png" alt="" />
                <p>{lang.elements.fire}</p>
              </div>
            </div>
            <div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/earth.png" alt="" />
                <p>{lang.elements.earth}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/plant.png" alt="" />
                <p>{lang.elements.plant}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/ice.png" alt="" />
                <p>{lang.elements.ice}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/poison.png" alt="" />
                <p>{lang.elements.poison}</p>
              </div>
            </div>
          </div>
          <div className={styles.mobileElementsContainer}>
            <div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/light.png" alt="" />
                <p>{lang.elements.light}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/darkness.png" alt="" />
                <p>{lang.elements.darkness}</p>
              </div>
            </div>
            <div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/water.png" alt="" />
                <p>{lang.elements.water}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/fire.png" alt="" />
                <p>{lang.elements.fire}</p>
              </div>
            </div>
            <div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/earth.png" alt="" />
                <p>{lang.elements.earth}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/plant.png" alt="" />
                <p>{lang.elements.plant}</p>
              </div>
            </div>
            <div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/ice.png" alt="" />
                <p>{lang.elements.ice}</p>
              </div>
              <div className={styles.element}>
                <img loading="lazy" src="/elements/poison.png" alt="" />
                <p>{lang.elements.poison}</p>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.elementsText}>
          {lang.elements.text1} <br /> {lang.elements.text2}{" "}
        </p>
        <div className={styles.elementsDownFade}></div>
      </section>
      <section className={styles.mounts}>
        <div className={styles.mountsTitle}>
          <h3>{lang.mounts.title}</h3>
        </div>
        {/* <div className={styles.mountsText}> */}
        <div
          className={
            selectedLang !== "en"
              ? styles.mountsNoEnglishText
              : styles.mountsText
          }
        >
          <p>
            {lang.mounts.text1} <br /> {lang.mounts.text2} <br />{" "}
            {lang.mounts.text3}{" "}
          </p>
        </div>
      </section>
      <section className={styles.form}>
        <div className={styles.formLeft}>
          <div className={styles.formLeftTitleContainer}>
            <h3>{lang.form.text1}</h3>
            <h3>{lang.form.text2}</h3>
            <h3>{lang.form.text3}</h3>
          </div>
          <div>
            <label>{lang.form.email}</label>
            <input
              type="text"
              placeholder={lang.form.placeholder}
              value={footerEmailInput}
              onChange={(e) => setFooterEmailInput(e.target.value)}
            />
            <ReCAPTCHA
              size="normal"
              className={styles.formCaptcha}
              sitekey="6LcKs2MoAAAAANbEb8FgM_zGq-AZx2SegfCCegkn"
              onChange={onChange}
            />
            <button onClick={(e) => sendFirstEmail(e, footerEmailInput)}>
              {lang.form.signUp}
            </button>
            <label className={styles.headerJoinNumber}>
              {lang.toast.counter1} {fixedNumber} {lang.toast.counter2}
            </label>
          </div>
        </div>
        <div className={styles.formRight}>
          <img loading="lazy" src="/form/aquan.png" alt="" />
        </div>
        <div className={styles.formUpFade}></div>
        <img loading="lazy" src="/form/overlay.png" className={styles.formOverlay} alt="" />
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <h4>{lang.footer.title}</h4>
          <button>
            <img loading="lazy" src="/btnDiscord.png" alt="" />
          </button>
        </div>
      </footer>
    </main>
  );
};

export default Index;
