import React, { useEffect } from "react";
import "./styles/loader.scss";
const Loader = ({ loader }) => {
  useEffect(() => {
    if (loader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loader]);
  return (
    <div
      className="loaderMain"
      style={loader === true ? {} : { display: "none" }}
    >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
