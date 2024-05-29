import React from "react";
import "./styles/loader.scss";
const Loader = ({ loader }) => {
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
