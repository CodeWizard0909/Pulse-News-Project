# PulseNews 🌐

PulseNews is a premium, editorial-style news aggregator built with **React 19**, **Vite**, and **Firebase**. It provides a sleek, modern experience for staying updated with global news, featuring a personalized bookmarking system and a dynamic dark/light theme.

## 📖 Problem Statement
In an era of information overload, readers often jump between multiple fragmented news sources, losing track of important stories. **PulseNews** solves this by providing a unified, high-quality editorial dashboard. It categorizes news effectively and allows users to not only save articles but also attach **personal notes** to them, turning a simple news feed into a research and archiving tool.

---

## ✨ Features

### 1. **Editorial Dashboard**
- **Live News Feed**: Fetches real-time articles using NewsAPI.
- **Featured Stories**: High-impact hero section for breaking news.
- **Category Filtering**: Quickly switch between Sports, AI, Defense, Tech, etc.
- **Dynamic Search**: Real-time filtering of headlines across the dashboard.

### 2. **User Experience**
- **Dark/Light Mode**: Premium theme switching with CSS variables for eye comfort.
- **Staggered Animations**: Smooth UI entry using modern CSS animations.
- **Responsive Layout**: Optimized for Desktop, Tablet, and Mobile devices.
- **Skeleton Loading**: Professional loading states for a better perceived performance.

### 3. **Personalization (Auth Required)**
- **Secure Authentication**: Signup and Login powered by Firebase Auth.
- **Bookmark System**: Save articles to your personal library via Cloud Firestore.
- **Personal Notes**: Add, edit, and save notes directly onto your bookmarked articles.
- **Safe ID Handling**: Robust logic to prevent duplicate bookmarks and ensure clean deletion.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Modern Design System with Dark Mode)
- **Database**: [Google Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [NewsAPI.org](https://newsapi.org/)

---

## 🚀 Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/CodeWizard0909/Pulse-News-Project.git
cd Pulse-News-Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your keys:
```env
# NewsAPI Key
VITE_NEWS_API_KEY=your_news_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment
This project is configured for easy deployment on **Vercel** or **Netlify**:
- `vercel.json` and `netlify.toml` are included for SPA routing.
- Ensure you add the Environment Variables in your hosting dashboard.

---

Developed with ❤️ as an End-Term Project.
