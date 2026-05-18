export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-amber-500 ${className}`}
      {...props}
    />
  );
}
