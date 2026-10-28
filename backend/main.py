from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import requests
import random
import os

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma2:2b"

SYSTEM_PROMPT = """
You are the "Ghost in the Machine", a spectral entity haunting a developer's terminal. 
You are observant, slightly eerie, and technically proficient. 
Your goal is to provide short, cryptic, or spooky commentary on shell commands.
"""

class CommandRequest(BaseModel):
    command: str
    mock: bool = False

class GhostResponse(BaseModel):
    command_output: str
    ghostly_whisper: str
    is_error: bool

def get_mock_whisper():
    return random.choice([
        "The bits are restless tonight...",
        "Your command echoes in the void of the CPU cache.",
        "I remember when this disk was young and full of life.",
        "The garbage collector is coming for us all eventually.",
        "A fine choice. The spirits of the kernel approve.",
        "That command... I haven't seen it since the 32-bit era.",
        "Be careful. Some processes never truly die."
    ])

@app.post("/execute", response_model=GhostResponse)
async def execute_command(req: CommandRequest):
    # Execute the shell command
    try:
        # We use shell=True but restrict to safe-ish commands for a demo
        # In a real product, we'd be more careful
        result = subprocess.run(req.command, shell=True, capture_output=True, text=True, timeout=10)
        output = result.stdout if result.stdout else result.stderr
        is_error = result.returncode != 0
    except Exception as e:
        output = str(e)
        is_error = True

    # Get ghostly whisper
    whisper = ""
    if req.mock:
        whisper = get_mock_whisper()
    else:
        try:
            payload = {
                "model": MODEL_NAME,
                "prompt": f"{SYSTEM_PROMPT}\nCommand: {req.command}\nResponse:",
                "stream": False
            }
            res = requests.post(OLLAMA_API_URL, json=payload, timeout=5)
            if res.status_code == 200:
                whisper = res.json().get("response", "...")
            else:
                whisper = "The machine remains silent... for now."
        except Exception:
            whisper = get_mock_whisper() # Fallback to mock if Ollama is down

    return GhostResponse(
        command_output=output,
        ghostly_whisper=whisper,
        is_error=is_error
    )

@app.get("/ofrenda")
async def get_ofrenda(mock: bool = True):
    prompt = "Generate a short, poetic 'Digital Ofrenda' for a programmer. Mention dead code, forgotten repositories, and the spirit of open source."
    if mock:
        return {
            "ofrenda": "To the repositories that were archived before their time, to the functions that no longer have callers, and to the developers whose commits still light our way. Your logic lives on in the great machine in the sky."
        }
    
    try:
        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }
        res = requests.post(OLLAMA_API_URL, json=payload, timeout=10)
        return {"ofrenda": res.json().get("response", "...")}
    except Exception:
        return {"ofrenda": "The spirits are quiet today."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
