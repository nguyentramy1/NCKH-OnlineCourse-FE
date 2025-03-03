import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div>
      <section className="dots-container">
        <div className="dot"> 
          <p style={{position:"relative", top:"10px"}}> Loading</p></div>
      </section>
    </div>
  );
};

export default Loading;
