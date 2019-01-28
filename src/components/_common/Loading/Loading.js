import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="alert alert-light text-center">
      <div className="pingboard-holder">
        <div className="rowLoading clearfix">
          <div className="square one" />
          <div className="square two" />
          <div className="square three" />
        </div>

        <div className="rowLoading clearfix">
          <div className="square eight" />
          <div className="square nine" />
          <div className="square four" />
        </div>

        <div className="rowLoading clearfix">
          <div className="square seven" />
          <div className="square six" />
          <div className="square five" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
