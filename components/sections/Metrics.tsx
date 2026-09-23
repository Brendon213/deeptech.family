const metrics = [
  ["500+", "участников"],
  ["15+", "стран"],
  ["100+", "пилотных проектов"],
  ["$50M+", "TVL пайплайна"],
];

export default function Metrics() {
  return (
    <section className="section">
      <div className="container metric-grid">
        {metrics.map(([value, label]) => (
          <div className="metric-card" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
