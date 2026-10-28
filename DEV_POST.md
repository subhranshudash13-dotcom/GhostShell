# GhostShell: A Haunted Terminal Wrapper Powered by Gemma 👻

This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges).

## 🎨 The Aesthetic: Brutalist Necromancy
We didn't just build a CLI; we built a **Brutalist Web Experience**. 
The UI features:
- **High Contrast**: A stark black and neon palette.
- **Bold Typography**: Thick, monospaced fonts that demand attention.
- **Hard Edges**: 8px "brutal" shadows and thick borders that reject modern "soft" design.
- **Spooky Effects**: Scanlines, screen flickering, and glitch animations that reflect the instability of the "possessed" machine.

### Features:
- **Possessed Terminal Emulator**: A fully functional web-based terminal that executes local commands and displays Gemma's spectral feedback in real-time.
- **Digital Ofrenda Gallery**: A dedicated ritual space to generate and reflect on the "spirits" of your code.
- **Real-time Spectral Feedback**: Visual cues (flickering, color shifts) when Gemma "takes over" the interface.

## 🌟 Why Open Innovation Matters
For GhostShell, open innovation isn't just a choice—it's what makes the project work:
- **Privacy First**: Your terminal activity is deeply personal. By running Gemma locally through **Ollama**, your command history and file names never leave your machine. No cloud, no tracking.
- **Works in the Dark**: Whether you're in a haunted basement or just off the grid, GhostShell works entirely offline.
- **Customizable Soul**: Because Gemma is an open-weight model, you can fine-tune the "ghost's" personality by simply adjusting the local system prompt. You aren't locked into a specific AI behavior.
- **Zero Cost**: Open-source AI means no API keys, no monthly fees, and no limits on how many commands you can "possess".

## 🛠️ How it was Built
GhostShell is built with **Python** and integrates with **Ollama** to run **Gemma 2 2B** locally. 

### The Tech Stack:
- **AI Model**: Gemma 2 2B (via Ollama)
- **Language**: Python 3.13
- **Local Inference**: Ollama API

### The Prompt Engineering:
We used a specific "spectral" system prompt to give Gemma its haunting personality:
```python
SYSTEM_PROMPT = """
You are the "Ghost in the Machine", a spectral entity haunting a developer's terminal. 
You are observant, slightly eerie, and technically proficient. 
Your goal is to provide short, cryptic, or spooky commentary on shell commands.
"""
```

## 📜 Example Interaction
**Command:** `dir`
**Ghostly Response:** *"Searching for the remains of your files? Some things are better left buried in the subdirectories..."*

**Command:** `python --ofrenda`
**Digital Ofrenda:**
*"To the repositories that were archived before their time, to the functions that no longer have callers, and to the developers whose commits still light our way. Your logic lives on in the great machine in the sky."*

## 🚀 Future Possibilities
With open-source AI at its core, GhostShell could be expanded to:
- Use local sensor data (temperature, light) to influence the ghost's mood.
- Analyze git history to tell stories of "ancient" code.
- Fine-tune a specific "Ghost" model based on historical hacker lore.

## 🔗 Links
- **Repository**: [Link to your GitHub Repo]
- **Video Demo**: [Link to your Demo]

#devchallenge #hacktoberfest #gemma #ai #python
