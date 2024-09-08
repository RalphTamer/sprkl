import type { CSSProperties } from "react";
import { Fragment } from "react";
type Props = {
  color?: string;
  size?: number;
  fill?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
  name: "search" | "x" | "loader";
};

const SVGIcon = (props: Props) => {
  const strokeColor = props.color || "black";
  const size = props.size || 26;
  const strokeWidth = props.strokeWidth || 1.5;
  const fill = props.fill || "none";

  let svgInnerElem: null | JSX.Element;

  if (props.name === "x") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </Fragment>
    );
  } else if (props.name === "search") {
    svgInnerElem = (
      <Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </Fragment>
    );
  } else if (props.name === "loader") {
    svgInnerElem = (
      <Fragment>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </Fragment>
    );
  } else {
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icn icon-tabler ${props.className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={props.style}
    >
      {svgInnerElem}
    </svg>
  );
};
export default SVGIcon;
