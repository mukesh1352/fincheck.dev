from fastapi import FastAPI

app = FastAPI(
    title="FastAPI Backend",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "FastAPI is running successfully 🚀"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "backend"}
