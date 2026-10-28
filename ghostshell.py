import sys
import subprocess
import requests
import json
import os
import gemma_config

# Set output encoding for emojis on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except AttributeError:
        # Fallback for older python versions
        import codecs
        sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())
        sys.stderr = codecs.getwriter('utf-8')(sys.stderr.detach())

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = gemma_config.MODEL_NAME

def get_ghostly_commentary(command, mock=False):
    if mock:
        mocks = [
            "The bits are restless tonight...",
            "Your command echoes in the void of the CPU cache.",
            "I remember when this disk was young and full of life.",
            "The garbage collector is coming for us all eventually.",
            "A fine choice. The spirits of the kernel approve."
        ]
        import random
        return random.choice(mocks)
    
    try:
        payload = {
            "model": MODEL_NAME,
            "prompt": gemma_config.get_command_prompt(command),
            "stream": False
        }
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=5)
        if response.status_code == 200:
            return response.json().get("response", "...")
        else:
            return "The machine remains silent... for now."
    except Exception:
        return "The connection to the spirit world (Ollama) is severed. Are you truly alone?"

def run_command(command_args, mock=False):
    command = " ".join(command_args)
    
    # Run the actual command
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(result.stderr, file=sys.stderr)
    except Exception as e:
        print(f"Error executing command: {e}")
        return

    # Get ghostly commentary
    commentary = get_ghostly_commentary(command, mock=mock)
    print(f"\n\033[3;35m👻 {commentary}\033[0m\n")

def generate_ofrenda(mock=False):
    prompt = gemma_config.get_ofrenda_prompt()
    if mock:
        print("\n\033[1;33m🕯️ Digital Ofrenda 🕯️\033[0m")
        print("To the repositories that were archived before their time,")
        print("To the functions that no longer have callers,")
        print("And to the developers whose commits still light our way.")
        print("Your logic lives on in the great machine in the sky.\n")
        return

    try:
        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=10)
        if response.status_code == 200:
            ofrenda = response.json().get("response", "...")
            print(f"\n\033[1;33m🕯️ Digital Ofrenda 🕯️\033[0m\n{ofrenda}\n")
        else:
            print("The ofrenda is empty. The spirits are quiet.")
    except Exception:
        print("Could not reach the spirit world for an ofrenda.")

def main():
    mock = "--mock" in sys.argv
    if mock:
        sys.argv.remove("--mock")

    if len(sys.argv) < 2:
        print("Usage: python ghostshell.py [--mock] <command> | --possess | --ofrenda")
        return

    if sys.argv[1] == "--possess":
        print("\033[1;31mThe machine is now possessed. Type 'exorcise' to leave.\033[0m")
        while True:
            try:
                cmd = input("\033[1;32mghost@terminal:~$ \033[0m")
                if cmd.lower() in ["exorcise", "exit", "quit"]:
                    print("The ghost retreats into the kernel...")
                    break
                if not cmd.strip():
                    continue
                run_command([cmd], mock=mock)
            except KeyboardInterrupt:
                print("\nThe ghost clings to your shell... (Type 'exorcise' to leave)")
    elif sys.argv[1] == "--ofrenda":
        generate_ofrenda(mock=mock)
    else:
        run_command(sys.argv[1:], mock=mock)

if __name__ == "__main__":
    main()
