import React from "react";

function DirectionImage({ wind_mph, name, newclass, windDir }) {
  // const matchObj = windDirection.find((item) => item.name === name);

  return (
    <div className="block">
      <svg
        viewBox="0 0 100 100"
        className={`${newclass ? "w-[80px]" : "w-[60px] slate-mobile"} direction-image`}
        style={{ margin: "auto" }}
      >
        <path
          style={{
            fill: "#0099ed",
            stroke: "#000000",
            strokeWidth: 2,
          }}
          d="M 50,100 0,50 c 0,0 0.06517378,-50.15270589 50,-50 49.934826,0.15270589 50,50 50,50 z"
        />
        <path
          style={{
            fill: "#ffffff",
            stroke: "#000000",
            strokeWidth: 2,
          }}
          d="M 50,100 C 0,50 0,50 0,50 L 50,0 100,50 Z"
        />
        <path
          style={{
            fill: "#f99d1e",
            stroke: "#000000",
            transform: `rotate(${windDir}deg) scale(1.11)`,
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
          d="m 42.5,75 h 15 V 50 H 70 L 50,27.5 30,50 h 12.5 z"
        />
      </svg>

     <div className="flex items-center wind-speed">
     <h1
        className={`font-medium ${
          newclass ? "text-4xl" : "text-2xl wind-mdh"
        }`}
      >
        {name}
      </h1>
      <h1 className={`font-medium  ${newclass ? "text-4xl" : "text-2xl wind-mdh"} text-center mx-2`}>
        {`${wind_mph}MPH`}
      </h1>
     </div>
    </div>
  );
}

export default DirectionImage;
