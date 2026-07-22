import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30",
    secondary:
      "border border-slate-700 bg-slate-900/60 text-white hover:border-blue-500 hover:bg-slate-900",
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}