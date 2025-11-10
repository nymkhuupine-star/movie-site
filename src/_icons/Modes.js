import * as React from "react";
const Modes = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={41}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#fff"
        d="M2 11.5c0-5.523 4.477-10 10-10h16c5.523 0 10 4.477 10 10v16c0 5.523-4.477 10-10 10H12c-5.523 0-10-4.477-10-10v-16Z"
        shapeRendering="crispEdges"
      />
      <path
        stroke="#E4E4E7"
        d="M12 2h16a9.5 9.5 0 0 1 9.5 9.5v16A9.5 9.5 0 0 1 28 37H12a9.5 9.5 0 0 1-9.5-9.5v-16A9.5 9.5 0 0 1 12 2Z"
        shapeRendering="crispEdges"
      />
      <path
        stroke="#18181B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13.5a4.243 4.243 0 0 0 6 6 6 6 0 1 1-6-6Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={40}
        height={40}
        x={0}
        y={0.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_24248_1270"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_24248_1270"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default Modes;
