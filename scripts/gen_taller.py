"""One-shot script: generate a realistic workshop image via Gemini Nano Banana."""
import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

PROMPT = (
    "Realistic professional photograph, wide horizontal composition, cinematic industrial lighting. "
    "Interior of a mid-sized, immaculately clean and organized mechanical workshop (taller de tornilleria) "
    "in Hidalgo, Mexico. NO PEOPLE visible in the scene — the workshop is empty of workers, only machines and material. "
    "Six (6) machining workstations arranged in two neat parallel rows: conventional metal lathes (tornos paralelos) "
    "and one small CNC milling machine, each station with its own tool cart and overhead LED work lamp. "
    "Freshly painted light gray industrial walls with a horizontal orange stripe accent (matching brand color #F58220) "
    "running along the wall at mid-height. Polished sealed concrete floor, absolutely spotless, "
    "with painted yellow safety walkway lines. "
    "Along one side wall: neatly labeled metal shelving with organized boxes of finished stainless steel bolts, studs, "
    "hex nuts and threaded rods ready for delivery, each box labeled. "
    "Along the opposite wall: raw material stock organized vertically on a rack — steel round bars, hex bars and rods "
    "sorted by diameter, perfectly aligned. "
    "Tool boards on the wall with calipers, wrenches and inspection gauges hung in outlined positions. "
    "Warm natural daylight from tall lateral windows and clean overhead industrial lighting. "
    "Color palette: petroleum blue-gray, clean light gray walls, polished steel, brand orange accents. "
    "No text, no logos, no watermarks, no people, no hands. "
    "Ultra-detailed, sharp focus throughout, 4k photorealistic, shot on 35mm f/8 for full depth of field. "
    "Aspect ratio approximately 4:3, professional B2B industrial hero image."
)


async def main() -> None:
    key = os.getenv("EMERGENT_LLM_KEY")
    if not key:
        raise SystemExit("EMERGENT_LLM_KEY missing")

    chat = LlmChat(
        api_key=key,
        session_id="mae-taller-image-v2",
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
