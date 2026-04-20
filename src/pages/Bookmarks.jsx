import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getBookmarks, deleteBookmark, updateBookmarkNote } from "../services/dbOperations";
import Navbar from "../components/Navbar";
import { SkeletonCard, EmptyState } from "../components/Skeletons";
import { Trash2, Edit2, Save } from "lucide-react";

export default function Bookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    async function loadBookmarks() {
      if (user) {
        const data = await getBookmarks(user.uid);
        setBookmarks(data);
        setLoading(false);
      }
    }
    loadBookmarks();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this bookmark?")) {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter(b => b.id !== id));
    }
  };

  const handleUpdateNote = async (id) => {
    await updateBookmarkNote(id, editNote);
    setBookmarks(bookmarks.map(b => b.id === id ? { ...b, note: editNote } : b));
    setEditingId(null);
  };

  return (
    <>
      <Navbar showSearch={false} />
      <main className="main" style={{paddingTop: '2rem'}}>
        <div className="section-heading">
          <span className="section-heading__text">Your Bookmarks</span>
          <div className="section-heading__line" />
          <span className="section-heading__count">{bookmarks.length} saved</span>
        </div>

        {loading ? (
          <div className="card-grid">
            {Array.from({length: 3}).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : bookmarks.length === 0 ? (
          <EmptyState query={""} />
        ) : (
          <div className="card-grid">
            {bookmarks.map((b) => (
              <div key={b.id} className="news-card card-animate" style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{position: 'relative'}}>
                  <img src={b.image} style={{width: '100%', height: '200px', objectFit: 'cover'}} alt={b.title} />
                  <button onClick={() => handleDelete(b.id)} style={{position: 'absolute', top: 10, right: 10, background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer'}}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="news-card__body" style={{flex: 1}}>
                  <h2 className="news-card__title" style={{fontSize: '1.2rem'}}>{b.title}</h2>
                  
                  <div style={{marginTop: 'auto', paddingTop: '1rem'}}>
                    <strong style={{color: 'var(--text-secondary)'}}>My Note:</strong>
                    {editingId === b.id ? (
                      <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                        <input 
                          type="text" 
                          value={editNote} 
                          onChange={(e) => setEditNote(e.target.value)} 
                          style={{flex: 1, padding: '0.25rem', border: '1px solid var(--border)', borderRadius: '4px'}}
                          autoFocus
                        />
                        <button onClick={() => handleUpdateNote(b.id)} style={{background: 'var(--category-technology)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer'}}>
                          <Save size={16} />
                        </button>
                      </div>
                    ) : (
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', background: 'var(--bg-default)', padding: '0.5rem', borderRadius: '4px'}}>
                        <span style={{fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{b.note || "No note added."}</span>
                        <button onClick={() => { setEditingId(b.id); setEditNote(b.note || ""); }} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)'}}>
                          <Edit2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
