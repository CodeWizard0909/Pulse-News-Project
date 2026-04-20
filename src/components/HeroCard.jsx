import { useAuth } from "../hooks/useAuth";
import { saveBookmark } from "../services/dbOperations";
import { Bookmark } from "lucide-react";

export default function HeroCard({ article }) {
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
    <article className="hero-card" id="hero-card" onClick={handleClick}>
      <div className="hero-card__image-wrap">
        <img
          className="hero-card__image"
          src={article.image}
          alt={article.title}
          loading="eager"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/hero/900/500`; }}
        />
        <div className="hero-card__overlay" />
      </div>
      <div className="hero-card__content">
        <span className="hero-card__breaking">Breaking News</span>
        <h1 className="hero-card__title">{article.title}</h1>
        <p className="hero-card__excerpt">{article.excerpt}</p>
        <div className="hero-card__meta" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <span className="hero-card__source">{article.source}</span>
            <span style={{margin: '0 0.5rem'}}>·</span>
            <span>{article.time}</span>
          </div>
          <button onClick={handleBookmark} className="bookmark-btn" aria-label="Bookmark" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'white'}}>
            <Bookmark size={24} />
          </button>
        </div>
      </div>
    </article>
  );
}
