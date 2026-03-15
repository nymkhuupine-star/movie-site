import * as React from "react";
const LineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.333 8h9.333m0 0L8 3.333M12.666 8 8 12.667"
    />
  </svg>
);
export default LineIcon;
