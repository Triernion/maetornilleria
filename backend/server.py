from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import ssl
import smtplib
import html
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List
import uuid
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Mail config
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.hostinger.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SMTP_FROM = os.environ.get("SMTP_FROM", SMTP_USER)
SMTP_TO = os.environ.get("SMTP_TO", "ventas@maetornilleria.com.mx")

app = FastAPI(title="MAE Tornillería API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ----- Models -----
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    company: Optional[str] = Field(default="", max_length=120)
    industry: Optional[str] = Field(default="", max_length=80)
    service: Optional[str] = Field(default="", max_length=120)
    quantity: Optional[str] = Field(default="", max_length=60)
    message: str = Field(min_length=5, max_length=4000)
    form_type: str = Field(default="contact")  # 'contact' or 'quote'
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    industry: Optional[str] = ""
    service: Optional[str] = ""
    quantity: Optional[str] = ""
    message: str = Field(min_length=5, max_length=4000)
    form_type: str = "contact"


class ContactResponse(BaseModel):
    ok: bool
    id: str
    message: str


# ----- Email helper -----
def _build_email(data: dict) -> MIMEMultipart:
    form_label = "Solicitud de Cotización" if data.get("form_type") == "quote" else "Mensaje de Contacto"
    subject = f"[MAE Tornillería] {form_label} – {data.get('full_name','Sin nombre')}"

    plain = (
        f"{form_label}\n\n"
        f"Nombre: {data.get('full_name','')}\n"
        f"Empresa: {data.get('company','')}\n"
        f"Email: {data.get('email','')}\n"
        f"Teléfono: {data.get('phone','')}\n"
        f"Industria: {data.get('industry','')}\n"
        f"Servicio: {data.get('service','')}\n"
        f"Cantidad: {data.get('quantity','')}\n"
        f"\nMensaje:\n{data.get('message','')}\n"
    )

    safe = {k: html.escape(str(v or "")) for k, v in data.items()}
    html_body = f"""
    <html><body style="font-family:Arial,Helvetica,sans-serif;background:#f3f4f6;padding:24px;color:#12181E;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-top:6px solid #F58220;">
        <div style="background:#12181E;color:#ffffff;padding:20px 28px;">
          <h1 style="margin:0;font-size:20px;letter-spacing:.05em;text-transform:uppercase;">MAE Tornillería</h1>
          <p style="margin:6px 0 0 0;color:#FC9F4F;font-size:13px;letter-spacing:.18em;text-transform:uppercase;">{html.escape(form_label)}</p>
        </div>
        <div style="padding:24px 28px;">
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="border-bottom:1px solid #e5e7eb;width:35%;color:#3A4C5C;"><b>Nombre</b></td><td style="border-bottom:1px solid #e5e7eb;">{safe.get('full_name','')}</td></tr>
            <tr><td style="border-bottom:1px solid #e5e7eb;color:#3A4C5C;"><b>Empresa</b></td><td style="border-bottom:1px solid #e5e7eb;">{safe.get('company','')}</td></tr>
            <tr><td style="border-bottom:1px solid #e5e7eb;color:#3A4C5C;"><b>Email</b></td><td style="border-bottom:1px solid #e5e7eb;"><a href="mailto:{safe.get('email','')}">{safe.get('email','')}</a></td></tr>
            <tr><td style="border-bottom:1px solid #e5e7eb;color:#3A4C5C;"><b>Teléfono</b></td><td style="border-bottom:1px solid #e5e7eb;">{safe.get('phone','')}</td></tr>
            <tr><td style="border-bottom:1px solid #e5e7eb;color:#3A4C5C;"><b>Industria</b></td><td style="border-bottom:1px solid #e5e7eb;">{safe.get('industry','')}</td></tr>
            <tr><td style="border-bottom:1px solid #e5e7eb;color:#3A4C5C;"><b>Servicio</b></td><td style="border-bottom:1px solid #e5e7eb;">{safe.get('service','')}</td></tr>
            <tr><td style="border-bottom:1px solid #e5e7eb;color:#3A4C5C;"><b>Cantidad</b></td><td style="border-bottom:1px solid #e5e7eb;">{safe.get('quantity','')}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9fafb;border-left:4px solid #F58220;">
            <p style="margin:0 0 6px 0;color:#3A4C5C;font-weight:bold;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Mensaje</p>
            <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;">{safe.get('message','')}</p>
          </div>
        </div>
        <div style="padding:16px 28px;background:#3A4C5C;color:#cbd5e1;font-size:12px;">
          Mensaje recibido desde maetornilleria.com.mx · Responde directo a este correo para contactar al cliente.
        </div>
      </div>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = SMTP_FROM or SMTP_USER or "no-reply@maetornilleria.com.mx"
    msg["To"] = SMTP_TO
    if data.get("email"):
        msg["Reply-To"] = data["email"]
    msg.attach(MIMEText(plain, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))
    return msg


def send_email_notification(data: dict) -> None:
    if not SMTP_USER or not SMTP_PASSWORD:
        logger.warning("SMTP credentials not configured. Skipping email. Lead saved in DB id=%s", data.get("id"))
        return
    msg = _build_email(data)
    context = ssl.create_default_context()
    try:
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=30) as server:
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
        logger.info("Email sent for lead %s", data.get("id"))
    except Exception as exc:
        logger.exception("SMTP send failed for lead %s: %s", data.get("id"), exc)


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"service": "MAE Tornillería API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"ok": True}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactCreate, background_tasks: BackgroundTasks):
    if payload.form_type not in ("contact", "quote"):
        raise HTTPException(status_code=400, detail="form_type inválido")

    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()

    await db.contact_submissions.insert_one(doc)
    background_tasks.add_task(send_email_notification, doc)

    return ContactResponse(
        ok=True,
        id=submission.id,
        message="¡Gracias! Recibimos tu solicitud, nuestro equipo te contactará pronto.",
    )


@api_router.get("/submissions", response_model=List[ContactSubmission])
async def list_submissions(limit: int = 50):
    """Internal endpoint for quick review of recent submissions."""
    cursor = db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).limit(min(limit, 200))
    items = await cursor.to_list(length=limit)
    for it in items:
        if isinstance(it.get("created_at"), str):
            try:
                it["created_at"] = datetime.fromisoformat(it["created_at"])
            except Exception:
                pass
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
