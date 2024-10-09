from pathlib import Path
import json

LOCAL_DIR = Path(__file__).resolve().parent

with open(LOCAL_DIR / "schema.json", "r", encoding="utf8") as file:
    schema = json.load(file)