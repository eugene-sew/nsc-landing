import React from "react";

export default function Marquee() {
  return (
    <>
      <div id="marquee-1" className="marquee-wrap top-[50%] -translate-y-1/2">
        <div className="marquee-text">
          NanorSmart Home Controller &nbsp;·&nbsp; Robust Hardware &nbsp;·&nbsp;
          Beautiful Interface &nbsp;·&nbsp; Master Your Space &nbsp;·&nbsp;
        </div>
      </div>
      <div
        id="marquee-2"
        className="marquee-wrap top-[calc(50%+14vw)] -translate-y-1/2"
      >
        <div className="marquee-text">
          Nanorlab &nbsp;·&nbsp; Total Control &nbsp;·&nbsp; Zero Clutter
          &nbsp;·&nbsp; Intelligent Living &nbsp;·&nbsp;
        </div>
      </div>
    </>
  );
}
