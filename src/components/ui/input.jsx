export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-md border border-border px-3 py-2 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
      {...props}
    />
  );
}
