export function SkeletonHero() {
  return (
    <div className="skeleton-card" style={{ marginBottom: "2.5rem", borderRadius: "var(--radius-lg)" }}>
      <div className="skeleton-image" style={{ height: "clamp(280px, 40vw, 480px)" }} />
      <div className="skeleton-body" style={{ padding: "2rem" }}>
        <div className="skeleton-line" style={{ width: "120px", height: "24px", borderRadius: "var(--radius-pill)" }} />
        <div className="skeleton-line skeleton-line--title" style={{ height: "28px" }} />
        <div className="skeleton-line" style={{ width: "90%" }} />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    </div>
  );
}

export function SkeletonCard({ delay = 0 }) {
  return (
    <div className="skeleton-card" style={{ animationDelay: `${delay}s` }}>
      <div className="skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-line--title" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-line--short" />
        <div className="skeleton-line skeleton-line--meta" />
      </div>
    </div>
  );
}

export function EmptyState({ query }) {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-state__icon">🔎</div>
      <h2 className="empty-state__title">No items found</h2>
      <p className="empty-state__text">
        {query
          ? `No items match "${query}". Try a different search term.`
          : "No items to show yet. Check back soon!"}
      </p>
    </div>
  );
}
