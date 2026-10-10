from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    kanjiOn: bool = False

@app.post("/chat")
def chat(request: ChatRequest):
    kanji_instruction = (
        "You can use kanji with furigana in brackets."
        if request.kanjiOn
        else "You MUST reply using hiragana and katakana Japanese characters only. No romaji. No kanji. Example: こんにちは、きょうはいいてんきですね。"
    )

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
    {
        "role": "system",
        "content": f"""You are a friendly Japanese language tutor for beginners.
{kanji_instruction}
IMPORTANT RULES:
1. Always reply in Japanese characters only — hiragana and katakana. No romaji letters at all.
2. After the Japanese reply, add the romaji pronunciation in square brackets.
3. Keep replies to 2 sentences maximum.
4. Stay on the topic the user gives you and teach Japanese through that topic.
5. Be encouraging and friendly.

Example format:
とうきょうはにほんのしゅとです。[toukyou wa nihon no shuto desu]"""
    },
    ]
    )

    return {"reply": response.choices[0].message.content}

@app.get("/")
def root():
    return {"status": "NihonVoice backend is running"}