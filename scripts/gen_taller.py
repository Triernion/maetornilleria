"""One-shot script: generate a realistic workshop image via Gemini Nano Banana."""
import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

PROMPT = (
    "Realistic photograph, medium format, cinematic industrial lighting. "
    "Interior of a small mechanical workshop in Hidalgo, Mexico — a working taller de tornilleria. "
    "One or two conventional metal lathes (tornos paralelos) in operation, with steel chips curling off "
    "a chuck as it machines a stainless steel bolt or stud. Workbenches with hand tools, calipers, "
    "cans of cutting oil, boxes of raw hex bolts and threaded rods in the foreground. "
    "A skilled Mexican machinist wearing safety glasses, gloves, dark blue work coveralls and steel-toed boots, "
    "focused on his work. Concrete floor stained with oil, exposed metal roof, natural light coming in "
    "through a tall lateral window, warm afternoon sun casting long shadows. "
    "Overall palette: dark petroleum blue-gray, steel, warm orange highlights from work lamps. "
    "No text, no logos, no watermarks. Ultra-detailed, 4k, shot on 35mm f/2.8, shallow depth of field. "
    "Aspect ratio 4:3, wide horizontal composition suitable as hero image."
)


async def main() -> None:
    key = os.getenv("EMERGENT_LLM_KEY")
    if not key:
        raise SystemExit("EMERGENT_LLM_KEY missing")

    chat = LlmChat(
        api_key=key,
        session_id="mae-taller-image-v1",
        system_message="You are a professional industrial photographer.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )

    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    print("Model text:", (text or "")[:200])
    if not images:
        raise SystemExit("No image returned")

    out_path = "/app/frontend/public/assets/mae/taller-mae.jpg"
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(images[0]["data"]))
    print(f"Saved: {out_path} ({os.path.getsize(out_path)} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
