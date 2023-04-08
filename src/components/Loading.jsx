import React from "react";
import "./loading.css";
function Loading() {
  return (
    <div>
      <div className="about">
        <a
          className="bg_links social portfolio"
          href="https://www.rafaelalucas.com"
        >
          <span className="icon"></span>
        </a>
        <a
          className="bg_links social dribbble"
          href="https://dribbble.com/rafaelalucas"
        >
          <span className="icon"></span>
        </a>
        <a
          className="bg_links social linkedin"
          href="https://www.linkedin.com/in/rafaelalucas/"
        >
          <span className="icon"></span>
        </a>
        <a className="bg_links logo"></a>
      </div>

      <div className="content">
        <div className="loading">
          <p>loading</p>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
