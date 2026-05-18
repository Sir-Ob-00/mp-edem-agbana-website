export default function Button({
  children,
  type = "button",
  variant = "solid",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none";

  const variants = {
    solid: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    icon: "h-10 w-10",
  };

  const disabledStyles = disabled ? "cursor-not-allowed opacity-60" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.solid} ${sizes[size] || sizes.md} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
