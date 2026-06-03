export default function ServerStatusAlert({ status }) {
  if (!status?.type) return null;

  return (
    <div
      className={`mb-4 rounded-2xl border p-4 text-sm ${
        status.type === "success"
          ? "border-successBg bg-successBg text-success"
          : "border-warningBg bg-warningBg text-warning"
      }`}
    >
      {status.message}
    </div>
  );
}
