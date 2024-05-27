import React from "react";

function DirectionImage({ windDirection, name }) {
  const matchObj = windDirection.find((item) => item.name === name);

  return (
    <div className="text-end my-2" >      
      <svg viewBox="0 0 100 100"  style={{width:"50px", marginLeft:"auto"}}>
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
            transform: `rotate(${matchObj?.degree}) scale(${matchObj?.scale})`,
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
          d="m 42.5,75 h 15 V 50 H 70 L 50,27.5 30,50 h 12.5 z"
        />
      </svg>

      <h1 className="font-medium text-end text-2xl my-2">{name}</h1>
    </div>
  );
}

export default DirectionImage;
