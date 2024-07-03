import { twMerge } from "tailwind-merge";

export default function P({
  children,
  className,
  uppercase = false,
  gradient = false,
  extrabold = false,
  sans = false,
  center = false,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  gradient?: boolean;
  extrabold?: boolean;
  sans?: boolean;
  center?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <p
      onClick={onClick}
      style={style}
      className={twMerge(
        "text-[16px] font-general-sans text-agwhite font-medium",
        uppercase ? "uppercase tracking-widest" : "",
        gradient
          ? "bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
          : "",
        extrabold ? "font-extrabold" : "",
        sans ? "font-sans" : "",
        center ? "text-center" : "",
        className ?? "",
      )}
    >
      {children}
    </p>
  );
}
