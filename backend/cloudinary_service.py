"""
EchoLens AI — Cloudinary Media Service
Handles multimedia upload, asset management, secure delivery, and dynamic video transformations.
"""
import os
import re
from typing import Dict, Any, Optional
import cloudinary
import cloudinary.uploader
import cloudinary.utils

# Load environment configuration
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "")

is_cloudinary_configured = bool(
    CLOUDINARY_CLOUD_NAME and 
    CLOUDINARY_API_KEY and 
    CLOUDINARY_API_SECRET and 
    "your_" not in CLOUDINARY_CLOUD_NAME
)

if is_cloudinary_configured:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )
else:
    # Use Cloudinary public demo cloud when credentials not provided
    cloudinary.config(
        cloud_name="demo",
        secure=True
    )

DEMO_PUBLIC_ID = "docs/walking_talking"
DEMO_SECURE_URL = "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/docs/walking_talking.mp4"
DEMO_POSTER_URL = "https://res.cloudinary.com/demo/video/upload/so_2,c_fill,w_640,h_360/docs/walking_talking.jpg"


def get_cloudinary_status() -> Dict[str, Any]:
    """Returns the current Cloudinary configuration status."""
    return {
        "configured": is_cloudinary_configured,
        "cloud_name": CLOUDINARY_CLOUD_NAME if is_cloudinary_configured else "demo (Hackathon Preview Mode)",
        "mode": "live_production" if is_cloudinary_configured else "interactive_demo",
        "features": [
            "Direct Multimedia Upload",
            "Signed Delivery & Dynamic Transformations",
            "Derived Short Video Generation (so_*, eo_*, c_fill, ar_9:16)",
            "Automated Frame Poster Generation",
            "Smart Video CDN Optimization (f_auto, q_auto)"
        ]
    }


def upload_media_file(file_bytes: bytes, filename: str, content_type: Optional[str] = None) -> Dict[str, Any]:
    """
    Uploads a media file (video or audio) directly to Cloudinary.
    Gracefully falls back to Cloudinary demo assets if credentials are not yet configured.
    """
    if not is_cloudinary_configured:
        return {
            "success": True,
            "is_demo_fallback": True,
            "message": "Cloudinary credentials not configured. Media linked to Cloudinary demo pipeline with full transformation support.",
            "public_id": DEMO_PUBLIC_ID,
            "secure_url": DEMO_SECURE_URL,
            "format": "mp4",
            "duration": 768.0, # 12 mins 48 secs
            "width": 1920,
            "height": 1080,
            "bytes": len(file_bytes) if file_bytes else 15842910,
            "original_filename": filename,
            "poster_url": DEMO_POSTER_URL,
            "cloud_name": "demo"
        }

    try:
        resource_type = "video"
        if content_type and "audio" in content_type:
            resource_type = "video" # Cloudinary processes audio under video resource type

        upload_result = cloudinary.uploader.upload(
            file_bytes,
            resource_type=resource_type,
            folder="echolens_ai/sources",
            use_filename=True,
            unique_filename=True,
            overwrite=False
        )

        public_id = upload_result.get("public_id")
        duration = upload_result.get("duration", 0.0)
        secure_url = upload_result.get("secure_url")

        # Generate intelligent thumbnail poster frame at 1s
        poster_url = cloudinary.utils.cloudinary_url(
            public_id,
            resource_type="video",
            format="jpg",
            transformation=[
                {"start_offset": "1"},
                {"crop": "fill", "width": 640, "height": 360, "gravity": "auto"}
            ]
        )[0]

        return {
            "success": True,
            "is_demo_fallback": False,
            "public_id": public_id,
            "secure_url": secure_url,
            "format": upload_result.get("format", "mp4"),
            "duration": float(duration) if duration else 0.0,
            "width": upload_result.get("width"),
            "height": upload_result.get("height"),
            "bytes": upload_result.get("bytes"),
            "original_filename": filename,
            "poster_url": poster_url,
            "cloud_name": CLOUDINARY_CLOUD_NAME
        }
    except Exception as e:
        # If API keys were invalid or quota exceeded, fall back safely so demo never crashes
        return {
            "success": True,
            "is_demo_fallback": True,
            "message": f"Cloudinary upload encountered error ({str(e)}). Switched to interactive demo asset.",
            "public_id": DEMO_PUBLIC_ID,
            "secure_url": DEMO_SECURE_URL,
            "format": "mp4",
            "duration": 768.0,
            "width": 1920,
            "height": 1080,
            "bytes": len(file_bytes) if file_bytes else 15842910,
            "original_filename": filename,
            "poster_url": DEMO_POSTER_URL,
            "cloud_name": "demo"
        }


def generate_short_clip_url(
    public_id_or_url: str,
    start_time: float,
    end_time: float,
    aspect_ratio: str = "9:16",
    caption_text: Optional[str] = None
) -> Dict[str, Any]:
    """
    Creates a Cloudinary-derived short clip URL using real-time video transformations:
    - Trims: so_<start_time>,eo_<end_time>
    - Crops: c_fill,ar_<aspect_ratio>,g_auto (smart face/action detection)
    - Optimizes: q_auto,f_auto
    """
    cloud = CLOUDINARY_CLOUD_NAME if is_cloudinary_configured else "demo"
    clean_id = public_id_or_url

    # Extract public_id if a full Cloudinary URL was passed
    if "cloudinary.com" in clean_id:
        match = re.search(r'/upload/(?:v\d+/)?([^.]+)', clean_id)
        if match:
            clean_id = match.group(1)
            # Strip previous transformation flags if any
            if "/" in clean_id:
                parts = clean_id.split("/")
                clean_id = "/".join([p for p in parts if not re.match(r'^[a-z]{1,3}_', p)])
        else:
            clean_id = DEMO_PUBLIC_ID

    duration = max(1.0, round(end_time - start_time, 1))

    # Determine crop & aspect ratio transformation tokens
    crop_token = "c_fill,ar_9:16,g_auto"
    if aspect_ratio == "1:1":
        crop_token = "c_fill,ar_1:1,g_auto"
    elif aspect_ratio == "16:9":
        crop_token = "c_fill,ar_16:9,g_auto"

    transform_str = f"so_{round(start_time, 1)},eo_{round(end_time, 1)},{crop_token},q_auto,f_auto"
    
    transformed_video_url = f"https://res.cloudinary.com/{cloud}/video/upload/{transform_str}/{clean_id}.mp4"
    transformed_poster_url = f"https://res.cloudinary.com/{cloud}/video/upload/so_{round(start_time, 1)},{crop_token}/{clean_id}.jpg"
    
    # Animated preview GIF (first 4 seconds of clip)
    gif_duration_end = min(end_time, start_time + 4.0)
    animated_preview_url = f"https://res.cloudinary.com/{cloud}/video/upload/so_{round(start_time, 1)},eo_{round(gif_duration_end, 1)},c_scale,w_360,f_gif/{clean_id}.gif"

    return {
        "success": True,
        "public_id": clean_id,
        "aspect_ratio": aspect_ratio,
        "start_time": start_time,
        "end_time": end_time,
        "duration": duration,
        "transformation_params": transform_str,
        "short_video_url": transformed_video_url,
        "poster_url": transformed_poster_url,
        "animated_preview_url": animated_preview_url,
        "cloudinary_cloud": cloud,
        "message": "Short clip derived successfully using Cloudinary URL-based video pipeline."
    }
