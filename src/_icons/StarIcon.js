import * as React from "react";
const StarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#FDE047"
      stroke="#FDE047"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m13 1.333 3.605 7.304 8.061 1.178-5.833 5.682 1.377 8.026L13 19.732l-7.21 3.791 1.376-8.026-5.833-5.682 8.062-1.178L13 1.333Z"
    />
  </svg>
);
export default StarIcon;
