import Button from "../ui/button";

export default function VisitCard() {
  return (
    <div className="rounded-3xl border border-slate-900/10 bg-slate-900 p-8 text-white shadow-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
        Find Us
      </p>

      <h3 className="mt-4 text-2xl font-semibold">
        Visit our constituency office in Sefwi Wiawso
      </h3>

      <p className="mt-3 text-sm text-white/80">
        Meet the team, attend office hours, or submit documents in person for
        quicker processing.
      </p>

      <div className="mt-6 space-y-3 text-sm text-white/90">
        <p>MP&apos;s Office, Sefwi Wiawso Municipal Assembly</p>
        <p>P.O Box 25, Sefwi Wiawso</p>
        <p>Western North Region, Ghana</p>
        <p>Ghana Post GPS: WG-0002-7111</p>
      </div>

      <Button
        variant="outline"
        className="mt-6 w-full rounded-full border-white/30 text-white hover:bg-white/10"
      >
        Open Maps
      </Button>
    </div>
  );
}
