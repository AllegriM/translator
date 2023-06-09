export default function SwitchLanguage({
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
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
