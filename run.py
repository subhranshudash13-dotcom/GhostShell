import subprocess
import sys
import time
import os

def start_backend():
    print("Starting backend...")
    return subprocess.Popen([sys.executable, "backend/main.py"], shell=True)

def start_frontend():
    print("Starting frontend...")
    # Change directory to frontend and run npm run dev
    return subprocess.Popen("npm run dev", cwd="frontend", shell=True)

if __name__ == "__main__":
    backend_proc = start_backend()
    time.sleep(2) # Give backend time to start
    frontend_proc = start_frontend()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Shutting down...")
        backend_proc.terminate()
        frontend_proc.terminate()
