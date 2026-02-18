import React from "react";
export default function Advertisement() {
  return (
    <div className="ads-restaurant-frame">
      <video autoPlay loop muted playsInline>
        <source src="video/burak-ads.mp4" type="video/mp4" />
      </video>
    </div>
  );
}