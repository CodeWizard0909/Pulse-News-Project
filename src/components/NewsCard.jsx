import { useAuth } from "../hooks/useAuth";
import { saveBookmark } from "../services/dbOperations";
import { Bookmark } from "lucide-react";

export function badgeClass(category) {
  if (!category) return 'badge--all';
  return `badge--${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function NewsCard({ article, index }) {
  const { user } = useAuth();

  const handleClick = (e) => {
    if (e.target.closest('.bookmark-btn')) return;
    if (article.url && article.url !== "#") {
      window.open(article.url, "_blank", "noopener");
    }
  };

  const handleBookmark = async () => {
    if (!user) return alert("Please login to bookmark articles");
    try {
      await saveBookmark(user.uid, article);
      alert("Article bookmarked!");
    } catch(err) {
      alert("Failed to bookmark.");
    }
  };

  return (
    <article
      className="news-card card-animate"
      style={{ animationDelay: `${index * 0.07}s` }}
      id={`card-${article.id}`}
      onClick={handleClick}
    >
      <div className="news-card__image-wrap">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title}
          loading="lazy"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${article.id}/600/400`; }}
        />
        <span className={`news-card__badge ${badgeClass(article.category)}`}>
          {article.category}
        </span>
      </div>

      <div className="news-card__body">
        <h2 className="news-card__title">{article.title}</h2>
        <p className="news-card__excerpt">{article.excerpt}</p>

        <div className="news-card__footer">
          <div className="news-card__meta">
            <span className="news-card__source">{article.source}</span>
            <span className="news-card__time">{article.time}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <button onClick={handleBookmark} className="bookmark-btn" aria-label="Bookmark" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)'}}>
              <Bookmark size={20} />
            </button>
            <span className="news-card__read-more">
              Read More <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
