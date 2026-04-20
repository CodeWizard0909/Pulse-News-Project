import { useState, useEffect, useMemo, useCallback } from "react";
import mockArticles from "../data/articles";
import { fetchAllNews, isApiKeyConfigured } from "../api/newsApi";
import Navbar from "../components/Navbar";
import HeroCard from "../components/HeroCard";
import NewsCard, { badgeClass } from "../components/NewsCard";
import { SkeletonHero, SkeletonCard, EmptyState } from "../components/Skeletons";

const CATEGORIES = [
  "All",
  "Sports",
  "Artificial Intelligence",
  "Defense",
  "Entertainment",
  "Business",
  "Arts",
  "Technology",
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [dataSource, setDataSource] = useState("loading"); // "api" | "mock" | "loading"
  const [error, setError] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadArticles() {
      setLoading(true);
      setError(null);
      if (!isApiKeyConfigured()) {
        setTimeout(() => {
          if (!cancelled) {
            setArticles(mockArticles);
            setDataSource("mock");
            setLoading(false);
          }
        }, 1200);
        return;
      }
      try {
        const liveArticles = await fetchAllNews();
        if (!cancelled) {
          if (liveArticles.length > 0) {
            setArticles(liveArticles);
            setDataSource("api");
          } else {
            setArticles(mockArticles);
            setDataSource("mock");
          }
        }
      } catch (err) {
        console.warn("NewsAPI fetch failed, using mock data:", err.message);
        if (!cancelled) {
          setArticles(mockArticles);
          setDataSource("mock");
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadArticles();
    return () => { cancelled = true; };
  }, []);

  const filteredArticles = useMemo(() => {
    let items = articles;
    if (activeCategory !== "All") {
      items = items.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery, articles]);

  const featured = filteredArticles.find((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={true} />
      
      {!loading && (
        <div className="data-banner" id="data-banner">
          {dataSource === "api" ? (
            <span>🟢 Live data from NewsAPI</span>
          ) : (
            <span>
              📋 Using mock data
              {!isApiKeyConfigured() && (
                <span className="data-banner__hint">
                  {" "}— Add your API key in <code>.env</code> for live news
                </span>
              )}
              {error && (
                <span className="data-banner__hint"> — {error}</span>
              )}
            </span>
          )}
        </div>
      )}

      <div className="filter-bar" id="filter-bar">
        <div className="filter-bar__inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="main" id="main-content">
        {loading ? (
          <>
            <SkeletonHero />
            <div className="card-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} delay={i * 0.1} />
              ))}
            </div>
          </>
        ) : filteredArticles.length === 0 ? (
          <EmptyState query={searchQuery} />
        ) : (
          <>
            {featured && <HeroCard article={featured} />}
            <div className="section-heading">
              <span className="section-heading__text">
                {activeCategory === "All" ? "Latest Stories" : activeCategory}
              </span>
              <div className="section-heading__line" />
              <span className="section-heading__count">
                {regularArticles.length} article{regularArticles.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="card-grid" key={animKey}>
              {regularArticles.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
