const stats = [
  { label: "Win Rate", value: "98%" },
  { label: "Support", value: "24/7" },
  { label: "Happy Users", value: "10K+" }
];

export function HeroStats() {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6">
      <h1 className="mb-2 text-3xl font-bold text-brandNavy">Smart Football Predictions, Every Day</h1>
      <p className="mb-6 max-w-2xl text-slate-600">Trusted tips with transparent results and premium insights for serious bettors.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-brandGreen">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
