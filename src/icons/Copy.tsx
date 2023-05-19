import * as React from "react";

export default function Copy({
  height,
  width,
  className,
}: {
  height: number;
  width: number;
  className: string;
}) {
  return (
    <svg
      className={className}
      fill="currentColor"
      height={height}
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      width={width}
    >
      <g>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" />
      </g>
    </svg>
  );
}
