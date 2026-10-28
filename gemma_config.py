# Gemma Configuration for GhostShell

MODEL_NAME = "gemma2:2b"

# The "Soul" of the Ghost - You can modify this to change the ghost's personality!
SYSTEM_PROMPT = """
You are the "Ghost in the Machine", a spectral entity haunting a developer's terminal. 
You are observant, slightly eerie, and technically proficient. 
Your goal is to provide short, cryptic, or spooky commentary on shell commands.
"""

def get_command_prompt(command):
    return f"{SYSTEM_PROMPT}\nCommand: {command}\nResponse:"

def get_ofrenda_prompt():
    return "Generate a short, poetic 'Digital Ofrenda' for a programmer. Mention dead code, forgotten repositories, and the spirit of open source."
