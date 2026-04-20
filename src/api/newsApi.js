/* ═══════════════════════════════════════════════════
   PulseNews — NewsAPI Service
   ═══════════════════════════════════════════════════
   Free tier: 100 requests/day, works on localhost.
   Docs: https://newsapi.org/docs
   ═══════════════════════════════════════════════════ */

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE = "https://newsapi.org/v2";

/**
 * Category → API mapping.
 * NewsAPI /top-headlines supports: business, entertainment, general,
 * health, science, sports, technology.
 * For categories not natively supported (AI, Defense, Arts) we use the
 * /everything endpoint with keyword search.
 */
const CATEGORY_CONFIG = {
  Sports:                  { endpoint: "top-headlines", params: { category: "sports", country: "us" } },
  Technology:              { endpoint: "top-headlines", params: { category: "technology", country: "us" } },
  Business:                { endpoint: "top-headlines", params: { category: "business", country: "us" } },
  Entertainment:           { endpoint: "top-headlines", params: { category: "entertainment", country: "us" } },
  "Artificial Intelligence": { endpoint: "everything",   params: { q: "artificial intelligence OR machine learning OR AI", sortBy: "publishedAt", language: "en" } },
  Defense:                 { endpoint: "everything",   params: { q: "defense OR military OR pentagon OR NATO", sortBy: "publishedAt", language: "en" } },
  Arts:                    { endpoint: "everything",   params: { q: "fine arts OR museum OR art exhibition OR painting", sortBy: "publishedAt", language: "en" } },
};

/**
 * Format a UTC date string into a human-readable relative time.
 * e.g. "2 hours ago", "5 minutes ago"
 */
function timeAgo(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}

/**
 * Normalize a raw NewsAPI article into our app's article shape.
 */
function normalize(article, category, index) {
  return {
    id: `${category}-${index}`,
    category,
    title: article.title || "Untitled",
    excerpt: article.description || article.content || "No description available.",
    source: article.source?.name || "Unknown",
    time: article.publishedAt ? timeAgo(article.publishedAt) : "Recently",
    image: article.urlToImage || `https://picsum.photos/seed/${category.toLowerCase().replace(/\s+/g, "")}${index}/600/400`,
    url: article.url || "#",
  };
}

/**
 * Fetch articles for a single category.
 * Returns an array of normalized article objects.
 */
async function fetchCategory(category, pageSize = 6) {
  const config = CATEGORY_CONFIG[category];
  if (!config) return [];

  const params = new URLSearchParams({
    ...config.params,
    pageSize: String(pageSize),
    apiKey: API_KEY,
  });

  const res = await fetch(`${BASE}/${config.endpoint}?${params}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);

  const data = await res.json();
  if (data.status !== "ok") throw new Error(data.message || "API error");

  return (data.articles || [])
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a, i) => normalize(a, category, i));
}

/**
 * Fetch articles for ALL categories in parallel.
 * Returns a flat array with a "featured" flag on the first Technology article.
 */
export async function fetchAllNews() {
  const categories = Object.keys(CATEGORY_CONFIG);

  const results = await Promise.allSettled(
    categories.map((cat) => fetchCategory(cat))
  );

  let allArticles = [];
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      allArticles = allArticles.concat(result.value);
    }
  });

  // Mark the first article as featured
  if (allArticles.length > 0) {
    allArticles[0] = { ...allArticles[0], featured: true };
  }

  return allArticles;
}

/**
 * Check if the API key is configured.
 */
export function isApiKeyConfigured() {
  return API_KEY && API_KEY !== "YOUR_API_KEY_HERE" && API_KEY.length > 10;
}
