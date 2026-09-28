"""
EchoLens AI — FastAPI Application Core
Pixels to Products — Cloudinary AI Hackathon 2026
"""
import os
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from cloudinary_service import (
    get_cloudinary_status,
    upload_media_file,
    generate_short_clip_url,
    DEMO_PUBLIC_ID,
    DEMO_SECURE_URL
)
from ai_service import (
    get_ai_status,
    analyze_content,
    generate_audience_content,
    translate_content
)
from demo_data import (
    DEMO_SOURCE_METADATA,
    DEMO_TRANSCRIPT,
    DEMO_SUMMARY,
    DEMO_TOPICS,
    DEMO_PEOPLE,
    DEMO_EVENTS,
    DEMO_CLAIMS,
    DEMO_STORY_GRAPH,
    DEMO_AUDIENCE_OUTPUTS,
    DEMO_SHORTS_PRESETS
)

app = FastAPI(
    title="EchoLens AI Backend",
    description="One source. Many experiences. Every claim traceable. Hackathon MVP for Cloudinary 2026.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    transcript: str
    title: Optional[str] = "Uploaded Multimedia Content"
    video_url: Optional[str] = None
    public_id: Optional[str] = None


class GenerateRequest(BaseModel):
    audience: str
    source_id: Optional[str] = None


class ShortRequest(BaseModel):
    public_id: Optional[str] = "docs/walking_talking"
    start_time: float
    end_time: float
    aspect_ratio: Optional[str] = "9:16"
    caption: Optional[str] = None


class TranslateRequest(BaseModel):
    target_language: str
    summary: Optional[str] = None
    takeaways: Optional[List[str]] = None


@app.get("/api/health")
def health_check():
    """Returns system status, Cloudinary configuration, and AI engine status."""
    return {
        "status": "healthy",
        "product": "EchoLens AI",
        "hackathon": "Pixels to Products — Cloudinary AI Hackathon 2026",
        "tagline": "One source. Many experiences. Every claim traceable.",
        "cloudinary": get_cloudinary_status(),
        "ai": get_ai_status()
    }


@app.get("/api/demo")
def get_demo_project():
    """
    Returns the comprehensive, deterministic demo project dataset.
    Permits instant, flawless hackathon presentations without API key blockers.
    """
    return {
        "source": DEMO_SOURCE_METADATA,
        "transcript": DEMO_TRANSCRIPT,
        "summary": DEMO_SUMMARY.strip(),
        "topics": DEMO_TOPICS,
        "people": DEMO_PEOPLE,
        "events": DEMO_EVENTS,
        "claims": DEMO_CLAIMS,
        "story_graph": DEMO_STORY_GRAPH,
        "audiences": DEMO_AUDIENCE_OUTPUTS,
        "shorts_presets": DEMO_SHORTS_PRESETS,
        "is_demo": True,
        "truth_trace_count": len(DEMO_CLAIMS)
    }


@app.post("/api/upload")
async def upload_media(
    file: Optional[UploadFile] = File(None),
    title: Optional[str] = Form("Multimedia Source"),
    demo_fallback: Optional[bool] = Form(False)
):
    """
    Uploads video or audio file to Cloudinary.
    Returns secure CDN URL, public_id, poster thumbnail, and media metadata.
    """
    if file:
        file_bytes = await file.read()
        filename = file.filename or "upload.mp4"
        content_type = file.content_type
        
        result = upload_media_file(file_bytes, filename, content_type)
        result["title"] = title
        return result
    
    # If no file provided or demo mode requested
    return {
        "success": True,
        "is_demo_fallback": True,
        "message": "Initialized with Cloudinary demo asset.",
        "title": "The Future of AI and Digital Media",
        "public_id": DEMO_PUBLIC_ID,
        "secure_url": DEMO_SECURE_URL,
        "poster_url": DEMO_SOURCE_METADATA["poster_url"],
        "duration": 768.0,
        "format": "mp4",
        "cloud_name": "demo"
    }


@app.post("/api/analyze")
def analyze_media(req: AnalyzeRequest):
    """
    Analyzes content/transcript to extract Story Graph, TruthTrace claims, and structured entities.
    """
    if not req.transcript or not req.transcript.strip():
        raise HTTPException(status_code=400, detail="Transcript or text is required for analysis.")
    
    analysis_result = analyze_content(req.transcript, req.title)
    if req.video_url:
        analysis_result["video_url"] = req.video_url
    if req.public_id:
        analysis_result["public_id"] = req.public_id
        
    return analysis_result


@app.post("/api/generate")
def generate_for_audience(req: GenerateRequest):
    """
    Generates content customized for a specific audience:
    - student
    - creator
    - business
    - journalist
    - general
    """
    return generate_audience_content(req.audience)


@app.post("/api/truthtrace")
def get_truthtrace_claims():
    """
    Returns all verified claims mapped to original source timestamps.
    """
    return {
        "total_claims": len(DEMO_CLAIMS),
        "verified_count": len([c for c in DEMO_CLAIMS if c.get("verified")]),
        "unverified_count": len([c for c in DEMO_CLAIMS if not c.get("verified")]),
        "claims": DEMO_CLAIMS
    }


@app.post("/api/short")
def create_short_clip(req: ShortRequest):
    """
    Generates a Cloudinary dynamic video transformation URL for a selected time segment.
    Applies start offset, end offset, smart aspect ratio reframing (9:16), and CDN optimization.
    """
    if req.end_time <= req.start_time:
        raise HTTPException(status_code=400, detail="End time must be greater than start time.")
    
    result = generate_short_clip_url(
        public_id_or_url=req.public_id or DEMO_PUBLIC_ID,
        start_time=req.start_time,
        end_time=req.end_time,
        aspect_ratio=req.aspect_ratio or "9:16",
        caption_text=req.caption
    )
    return result


@app.post("/api/translate")
def translate_bundle(req: TranslateRequest):
    """
    Translates generated summary and takeaways to target language (hi, mr, ta, te, en).
    """
    bundle = {
        "summary": req.summary or DEMO_SUMMARY,
        "takeaways": req.takeaways or [c["text"] for c in DEMO_CLAIMS[:4]]
    }
    return translate_content(bundle, req.target_language)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
