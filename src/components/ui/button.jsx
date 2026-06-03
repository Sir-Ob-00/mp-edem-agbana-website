export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

  const variants = {
    primary: "bg-primary text-white hover:bg-primaryLight",
    secondary: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
    accent: "bg-accent text-dark hover:brightness-90",
    outline: "border border-border bg-white text-text-secondary hover:bg-background",
    ghost: "bg-transparent text-text-secondary hover:bg-background",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    icon: "h-10 w-10",
  };

  const disabledStyles = disabled ? "cursor-not-allowed opacity-60" : "";

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variantStyles} ${sizes[size] || sizes.md} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
