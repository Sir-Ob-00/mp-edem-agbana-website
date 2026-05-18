export default function ServerStatusAlert({ status }) {
  if (!status?.type) return null;

  return (
    <div
      className={`mb-4 rounded-2xl border p-4 text-sm ${
        status.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-800"
      }`}
    >
      {status.message}
    </div>
  );
}
