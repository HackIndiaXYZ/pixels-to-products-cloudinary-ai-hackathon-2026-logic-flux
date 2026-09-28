# EchoLens AI

> **One source. Many experiences. Every claim traceable.**  
> *Built for the Pixels to Products — Cloudinary AI Hackathon 2026*

---

## 1. Problem Statement

Long-form multimedia (keynotes, research interviews, webinars, tech podcasts, university lectures) contains rich, dense knowledge. However:
1. **The Repackaging Bottleneck**: Converting a 60-minute video into specialized formats for students, content creators, business executives, and journalists requires hours of manual cutting, transcript reading, and reformatting.
2. **The Hallucination & Trust Deficit**: Standard AI summarizers generate assertions without verifiable provenance. In education, journalism, and enterprise compliance, trusting ungrounded AI summaries is unacceptable.
3. **The Multi-Format Media Overhead**: Generating vertical shorts, teasers, and teasers traditionally requires heavyweight server-side rendering pipelines and duplicate video storage.

---

## 2. Solution: EchoLens AI

**EchoLens AI** transforms one piece of multimedia content into multiple audience-specific experiences while keeping every single generated claim anchored to its exact source audio-visual timestamp.

```
ONE SOURCE → UNDERSTAND → STORY GRAPH → AUDIENCE LENS → GENERATE → TRUTHTRACE
```

---

## 3. Key Innovations

### 🔍 TruthTrace (Core Differentiator)
> *"Don't just trust the AI. Trace it."*

Every important AI-generated claim retains a permanent connection to its source timestamp (e.g., `01:24 — View Source`). Clicking the timestamp jumps the Cloudinary video player directly to that millisecond, highlights the verified statement, and displays raw evidence quotes alongside acoustic confidence scores (98% Source-backed).

### 🕸️ Story Graph
A modern interactive relational graph mapping:
- **Central Topic / Thesis**
- **Semantic Sub-clusters**
- **People & Entities**
- **Milestone Events**
- **Source-anchored Claims**

Nodes are interactive: clicking any node displays its context and allows 1-click video jumping.

### 🎭 Audience Lens (5 Tailored Cognitive Personas)
The exact same source generates 5 radically different deliverables:
1. **🎓 Student Lens**: Plain-English explanation, structured study notes, flashcard concepts, interactive assessment quiz with immediate citation checks, and exam revision points.
2. **🎬 Creator Lens**: High-retention video hooks, 45-second 9:16 vertical reel script with visual/voiceover cues, viral Twitter/X threads, LinkedIn executive posts, and Instagram carousels.
3. **💼 Business Lens**: Executive summary, ROI impact metrics, market opportunities, and a 90-day phased enterprise implementation roadmap.
4. **📰 Journalist Lens**: Audited claims with primary source quotes, entity credential cards, verification status badges, and objective neutral reporting.
5. **🌐 General Lens**: Accessible plain-language overview, 5 memorable takeaways, and a "Why It Matters" briefing.

### ⚡ Cloudinary Shorts Studio
Direct URL-based video transformation engine that creates derived 9:16 vertical shorts, 1:1 feeds, and 16:9 landscape teasers directly at the CDN edge using Cloudinary transformation parameters (`so_<start>,eo_<end>,c_fill,ar_9:16,g_auto`) without local compute overhead.

### 🌐 Vernacular Multilingual Support
Built-in contextual localization for **English, Hindi (हिंदी), Marathi (मराठी), Tamil (தமிழ்), and Telugu (తెలుగు)**.

### ♿ Accessibility First
Custom accessibility controls for Large Text, High Contrast Mode, Simplified Jargon-free Language, and Persistent Timestamp Badges.

---

## 4. Cloudinary Integration

Cloudinary is a genuine, deep architectural pillar of EchoLens AI:

1. **Multimedia Ingestion**: Secure direct upload via the Python Cloudinary SDK (`cloudinary.uploader.upload`) with automatic format negotiation (`mp4`, `webm`, `mov`, `mp3`, `wav`).
2. **Asset Management & CDN Delivery**: Zero-latency global video streaming using Cloudinary's optimized asset URLs with dynamic format and quality delivery (`f_auto, q_auto`).
3. **Derived Short Clip Generation**: Programmatic video slicing at the CDN edge:
   ```
   https://res.cloudinary.com/<cloud_name>/video/upload/so_75,eo_105,c_fill,ar_9:16,g_auto,q_auto,f_auto/<public_id>.mp4
   ```
4. **Smart Gravity Cropping (`g_auto`)**: Automatically tracks and centers speakers when converting horizontal 16:9 master videos into vertical 9:16 reels for TikTok and YouTube Shorts.
5. **Dynamic Poster & GIF Generation**: Instant generation of video poster frames and animated preview GIFs (`f_gif, w_360`) at exact timestamps.

---

## 5. System Architecture

```
User (Browser)
      ↓
React 19 + Vite 8 Frontend
  ├── Tailwind CSS v4 Dark SaaS UI
  ├── Synchronized Cloudinary Video Player
  ├── Story Graph Interactive Canvas
  ├── Audience Lens Persona Switcher
  └── TruthTrace Millisecond Ground-Truth Scrubber
      ↓ REST API (Port 8000)
FastAPI Backend
  ├── Cloudinary Media Service (Upload, CDN, Video Trimming)
  ├── AI Understanding Core (Google Gemini 2.5 Flash API)
  ├── Deterministic Fallback Engine (Zero-key Hackathon Guarantee)
  ├── Story Graph & Claims Extraction Pipeline
  └── Multilingual Translation Engine
      ↓
Deliverables: Ground-truth Claims + Derived Cloudinary Shorts + 5 Audiences
```

---

## 6. Directory Structure

```
echolens-ai/
├── backend/
│   ├── main.py                 # FastAPI application & REST endpoints
│   ├── cloudinary_service.py   # Cloudinary SDK upload & dynamic transform engine
│   ├── ai_service.py           # Gemini 2.5 Flash & deterministic fallback parser
│   ├── demo_data.py            # Master demo dataset ('Future of AI & Digital Media')
│   ├── requirements.txt        # Python backend dependencies
│   └── .env.example            # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Global header, audience & language switchers
│   │   │   ├── Sidebar.jsx             # Navigation tabs & TruthTrace spotlight
│   │   │   ├── VideoPlayer.jsx         # Cloudinary stream with TruthTrace seeking
│   │   │   └── AccessibilityModal.jsx  # Contrast, text size & caption options
│   │   ├── views/
│   │   │   ├── DashboardView.jsx       # Landing hero, pillars, and recent sources
│   │   │   ├── UploadView.jsx          # Drag-and-drop & animated 4-step pipeline
│   │   │   ├── StoryGraphView.jsx      # Interactive SVG graph with timestamp nodes
│   │   │   ├── AudienceLensView.jsx    # 5 tailored persona studios with quizzes & scripts
│   │   │   ├── TruthTraceView.jsx      # The core differentiator: timeline & claim audit
│   │   │   ├── ShortsStudioView.jsx    # Cloudinary dynamic video short generator
│   │   │   ├── GeneratedContentView.jsx# Content export hub with interactive quizzes
│   │   │   └── SettingsView.jsx        # Architecture, Cloudinary status & security
│   │   ├── data/
│   │   │   └── mockData.js             # Offline client demo data
│   │   ├── App.jsx                     # Root application coordinator
│   │   └── index.css                   # Tailwind v4 styles & glassmorphism
│   ├── package.json
│   └── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

---

## 7. Installation & Local Setup

### Prerequisites
- **Node.js**: v18+ (tested on v24)
- **Python**: 3.10+ (tested on 3.14)

### 1. Clone & Configure Environment
```bash
git clone https://github.com/your-username/echolens-ai.git
cd echolens-ai

# Copy environment template
cp .env.example backend/.env
```

Edit `backend/.env` with your Cloudinary and Gemini credentials:
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

> **Note on Hackathon Demo Mode**: If you do not have Cloudinary or Gemini API keys, leave them as default. EchoLens AI automatically activates its **Interactive Demo Mode** utilizing Cloudinary's public demo CDN and realistic grounded datasets without throwing errors!

### 2. Run Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Backend API will be live at `http://127.0.0.1:8000`.  
Swagger documentation at `http://127.0.0.1:8000/docs`.

### 3. Run Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---


---

## 9. Security & Privacy

- All sensitive keys (`CLOUDINARY_API_SECRET`, `GEMINI_API_KEY`) are kept strictly on the backend.
- The React frontend communicates with the backend via local proxy (`/api/*`), completely preventing credential leakage in client-side bundles.
- `.env` is safeguarded in `.gitignore`.

---

## 10. Future Roadmap

- [ ] **Whisper Live Edge Transcription**: Streaming speech-to-text directly during Cloudinary chunked upload.
- [ ] **Automated Facial Emotion Bounding**: Automatically trigger short clips based on speaker emotional peaks and audience laughter cues.
- [ ] **Enterprise Provenance Ledger**: Publish TruthTrace hashes to decentralized provenance registries for syndicated broadcast networks.
- [ ] **Multi-Speaker Diarization**: Separate conversation tracks for panel discussions and multi-guest podcasts.

---

## License

Built with ❤️ for the **Pixels to Products — Cloudinary AI Hackathon 2026**.
