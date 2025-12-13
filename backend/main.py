# backend/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
import aiofiles
import json
import threading
import pika

from dotenv import load_dotenv
import os

# Load .env.local if it exists, otherwise .env
env_local_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env.local")
if os.path.exists(env_local_path):
    load_dotenv(env_local_path)
    print(f"[Backend] Loaded environment from {env_local_path}")
else:
    load_dotenv()
    print("[Backend] Loaded environment from .env")

from backend.msgqueue.connection import get_connection
from backend.msgqueue.worker1 import start_worker, process_job




# -----------------------------------
# FastAPI Setup
# -----------------------------------
app = FastAPI(
    title="FASTAPI BACKEND",
    version="1.3.0",
    description="Backend service with scalable worker architecture"
)

ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status": "running", "service": "backend"}


@app.get("/health")
def health_check():
    return {
        "message": "ok",
        "service": "backend",
        "workers": ["worker1"]
    }


# -----------------------------------
# Publish Job to Queue
# -----------------------------------
def publish_inference_job(job_id: str, filepath: str):
    try:
        conn = get_connection()
        ch = conn.channel()
        ch.queue_declare(queue="model_queue", durable=True)

        msg = json.dumps({
            "job_id": job_id,
            "filepath": filepath
        })

        ch.basic_publish(
            exchange="",
            routing_key="model_queue",
            body=msg,
            properties=pika.BasicProperties(delivery_mode=2)
        )

        print(f"[Backend] Job published → {job_id}")
        conn.close()

    except Exception as e:
        print(f"[Backend] RabbitMQ Error: {e}")
        print(f"[Backend] Falling back to direct execution for job {job_id}")
        
        # Fallback: Run in background thread without queue
        t = threading.Thread(target=process_job, args=(job_id, filepath), daemon=True)
        t.start()


# -----------------------------------
# Image Upload → Job Creation
# -----------------------------------
@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid image type")

    file_size = 0
    CHUNK = 1024 * 1024

    # Stream file check
    while chunk := await file.read(CHUNK):
        file_size += len(chunk)
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File exceeds 5MB")

    await file.seek(0)

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    saved_path = os.path.abspath(os.path.join(UPLOAD_DIR, filename))

    print("[Backend] Saving file at:", saved_path)

    async with aiofiles.open(saved_path, "wb") as f:
        while chunk := await file.read(CHUNK):
            await f.write(chunk)

    job_id = str(uuid.uuid4())
    publish_inference_job(job_id, saved_path)

    return {
        "message": "Image uploaded successfully",
        "job_id": job_id,
        "filepath": saved_path,
        "size": file_size,
        "mime": file.content_type,
    }


# -----------------------------------
# Worker Startup
# -----------------------------------
def start_workers():
    workers = [
        ("worker1", start_worker),
    ]

    for name, worker_func in workers:
        try:
            print(f"[MAIN] Starting {name}...")
            t = threading.Thread(target=worker_func, daemon=True)
            t.start()
        except Exception as e:
            print(f"[MAIN] Failed to start {name}: {e}")


# -----------------------------------
# Main Entry Point
# -----------------------------------
if __name__ == "__main__":
    start_workers()

    import uvicorn
    uvicorn.run(
        "backend.main:app",
        host="127.0.0.1",
        port=8000,
        reload=False
    )
