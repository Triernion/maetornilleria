"""Tests for MAE Tornillería contact / quote API."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ferreteria-build.preview.emergentagent.com").rstrip("/")
# Frontend env is the public URL; use it
try:
    with open("/app/frontend/.env") as f:
        for ln in f:
            if ln.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = ln.split("=", 1)[1].strip().rstrip("/")
                break
except Exception:
    pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health / Root ----------
class TestHealth:
    def test_health_ok(self, client):
        r = client.get(f"{API}/health", timeout=20)
        assert r.status_code == 200
        assert r.json() == {"ok": True}

    def test_root(self, client):
        r = client.get(f"{API}/", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "MAE" in data.get("service", "")


# ---------- Quote submission ----------
class TestContactSubmissions:
    def test_quote_submission_persists(self, client):
        unique_email = f"TEST_quote_{int(time.time())}@example.com"
        payload = {
            "full_name": "Juan Pérez Test",
            "email": unique_email,
            "phone": "+525555555555",
            "company": "Acme Mining",
            "industry": "Minería",
            "service": "Fabricación de Pernos de Anclaje",
            "quantity": "100",
            "message": "Necesito cotizar pernos M20x150 grado 8.8.",
            "form_type": "quote",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["ok"] is True
        assert isinstance(body["id"], str) and len(body["id"]) > 0
        assert "message" in body and isinstance(body["message"], str)

        # Verify persistence via /api/submissions
        time.sleep(0.5)
        r2 = client.get(f"{API}/submissions?limit=50", timeout=20)
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        found = next((it for it in items if it.get("email") == unique_email), None)
        assert found is not None, f"Quote with email {unique_email} not found in submissions"
        assert found["form_type"] == "quote"
        assert found["full_name"] == "Juan Pérez Test"
        assert found["service"] == "Fabricación de Pernos de Anclaje"

    def test_contact_form_submission(self, client):
        unique_email = f"TEST_contact_{int(time.time())}@example.com"
        payload = {
            "full_name": "María López",
            "email": unique_email,
            "message": "Mensaje de contacto general para preguntas.",
            "form_type": "contact",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True

    # ---------- Validation ----------
    def test_missing_full_name(self, client):
        r = client.post(f"{API}/contact", json={
            "email": "x@y.com",
            "message": "hello world test",
            "form_type": "quote",
        }, timeout=20)
        assert r.status_code == 422

    def test_missing_email(self, client):
        r = client.post(f"{API}/contact", json={
            "full_name": "No Email",
            "message": "hello world test",
            "form_type": "quote",
        }, timeout=20)
        assert r.status_code == 422

    def test_missing_message(self, client):
        r = client.post(f"{API}/contact", json={
            "full_name": "No Msg",
            "email": "x@y.com",
            "form_type": "quote",
        }, timeout=20)
        assert r.status_code == 422

    def test_invalid_email(self, client):
        r = client.post(f"{API}/contact", json={
            "full_name": "Bad Email",
            "email": "not-an-email",
            "message": "valid message text",
            "form_type": "quote",
        }, timeout=20)
        assert r.status_code == 422

    def test_short_message(self, client):
        r = client.post(f"{API}/contact", json={
            "full_name": "Short Msg",
            "email": "x@y.com",
            "message": "hi",
            "form_type": "quote",
        }, timeout=20)
        assert r.status_code == 422

    def test_invalid_form_type(self, client):
        r = client.post(f"{API}/contact", json={
            "full_name": "Spam Type",
            "email": "x@y.com",
            "message": "Hello there valid",
            "form_type": "spam",
        }, timeout=20)
        assert r.status_code == 400


# ---------- Listing ----------
class TestListSubmissions:
    def test_submissions_listed_desc(self, client):
        r = client.get(f"{API}/submissions?limit=10", timeout=20)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        if len(items) >= 2:
            # created_at descending
            ts = [it.get("created_at") for it in items if it.get("created_at")]
            assert ts == sorted(ts, reverse=True)
