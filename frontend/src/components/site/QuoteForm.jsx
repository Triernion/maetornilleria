import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { SECTIONS, QUOTE_FORM, CONTACT } from "@/constants/testIds";
import { COMPANY, SERVICES_LIST, INDUSTRIES_LIST } from "@/constants/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  service: "",
  quantity: "",
  message: "",
  form_type: "quote",
};

export default function QuoteForm() {
  const [data, setData] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const update = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (status.state === "loading") return;
    setStatus({ state: "loading", message: "" });

    try {
      const res = await axios.post(`${API}/contact`, data);
      setStatus({ state: "success", message: res.data.message || "¡Gracias! Te contactaremos pronto." });
      setData(initialForm);
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.";
      setStatus({ state: "error", message: typeof msg === "string" ? msg : "Revisa los campos e intenta de nuevo." });
    }
  };

  return (
    <section
      id="cotizar"
      data-testid={SECTIONS.quote}
      className="relative bg-petroleum-deep py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/mae/bg-hero-1.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E141A]/95 to-[#12181E]/85" />
      <div className="absolute inset-0 bg-grid-blueprint opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12">
        {/* Left: persuasive */}
        <div className="lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae mb-3">
            ⟶ Cotización · 06
          </p>
          <h2 className="font-display font-black uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.92]">
            Solicita ahora <br />
            tu <span className="text-orange-mae">cotización</span>
          </h2>
          <p className="mt-6 text-slate-300 font-body text-base md:text-lg leading-relaxed">
            Compártenos los detalles técnicos de tu proyecto y nuestro equipo te
            responderá con propuesta y tiempos de entrega.
          </p>

          <div className="mt-10 space-y-5 border-l-2 border-orange-mae pl-6">
            <ContactRow
              label="Teléfono / WhatsApp"
              value={COMPANY.phone}
              href={`tel:${COMPANY.phoneRaw}`}
              testId={CONTACT.phone}
            />
            <ContactRow
              label="Correo de ventas"
              value={COMPANY.email}
              href={`mailto:${COMPANY.email}`}
              testId={CONTACT.email}
            />
            <ContactRow
              label="Ubicación"
              value={COMPANY.address}
              testId={CONTACT.address}
            />
            <ContactRow
              label="Horario"
              value={COMPANY.hours}
              testId={CONTACT.hours}
            />
          </div>

          <div className="mt-8 inline-flex items-center gap-3 bg-orange-mae/10 border border-orange-mae/40 px-4 py-3">
            <span className="w-2.5 h-2.5 bg-orange-mae pulse-orange" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-orange-mae">
              {COMPANY.emergency}
            </span>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          <motion.form
            data-testid={QUOTE_FORM.form}
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0E141A]/80 backdrop-blur-md border border-white/10 border-l-4 border-l-orange-mae p-6 md:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Nombre completo *"
                testId={QUOTE_FORM.fullName}
                value={data.full_name}
                onChange={update("full_name")}
                required
                minLength={2}
              />
              <Field
                label="Empresa"
                testId={QUOTE_FORM.company}
                value={data.company}
                onChange={update("company")}
              />
              <Field
                type="email"
                label="Email corporativo *"
                testId={QUOTE_FORM.email}
                value={data.email}
                onChange={update("email")}
                required
              />
              <Field
                type="tel"
                label="Teléfono"
                testId={QUOTE_FORM.phone}
                value={data.phone}
                onChange={update("phone")}
              />
              <Select
                label="Industria"
                testId={QUOTE_FORM.industry}
                value={data.industry}
                onChange={update("industry")}
                options={INDUSTRIES_LIST.map((i) => ({
                  value: i.name,
                  label: i.name,
                }))}
                placeholder="Selecciona industria"
              />
              <Select
                label="Servicio de interés"
                testId={QUOTE_FORM.service}
                value={data.service}
                onChange={update("service")}
                options={SERVICES_LIST.map((s) => ({
                  value: s.title,
                  label: s.title,
                }))}
                placeholder="Selecciona servicio"
              />
              <Field
                label="Cantidad estimada"
                testId={QUOTE_FORM.quantity}
                value={data.quantity}
                onChange={update("quantity")}
                placeholder="Ej. 500 pzs / 10 ton"
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-5">
              <label className="block font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2">
                Especificaciones técnicas *
              </label>
              <textarea
                data-testid={QUOTE_FORM.message}
                value={data.message}
                onChange={update("message")}
                required
                minLength={5}
                rows={5}
                placeholder="Describe medidas, material, normas, tratamiento térmico, plano o muestra disponible..."
                className="w-full bg-[#0a1015] border border-white/10 focus:border-orange-mae focus:outline-none focus:ring-1 focus:ring-orange-mae/40 text-white px-4 py-3 font-body text-sm placeholder:text-slate-600 transition-colors resize-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                Tu información es confidencial.
              </p>
              <button
                type="submit"
                data-testid={QUOTE_FORM.submit}
                disabled={status.state === "loading"}
                className="industrial-shadow bg-orange-mae text-white font-display font-bold uppercase tracking-widest px-7 py-4 flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.state === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar Solicitud
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>

            {status.state === "success" && (
              <div
                data-testid={QUOTE_FORM.success}
                className="mt-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 p-4 flex items-start gap-3"
              >
                <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm font-body">{status.message}</p>
              </div>
            )}

            {status.state === "error" && (
              <div
                data-testid={QUOTE_FORM.error}
                className="mt-6 bg-red-500/10 border border-red-500/40 text-red-200 p-4 flex items-start gap-3"
              >
                <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm font-body">{status.message}</p>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, testId, className = "", ...rest }) {
  return (
    <div className={className}>
      <label className="block font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2">
        {label}
      </label>
      <input
        data-testid={testId}
        {...rest}
        className="w-full bg-[#0a1015] border border-white/10 focus:border-orange-mae focus:outline-none focus:ring-1 focus:ring-orange-mae/40 text-white px-4 py-3 font-body text-sm placeholder:text-slate-600 transition-colors"
      />
    </div>
  );
}

function Select({ label, testId, options, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2">
        {label}
      </label>
      <select
        data-testid={testId}
        value={value}
        onChange={onChange}
        className="w-full bg-[#0a1015] border border-white/10 focus:border-orange-mae focus:outline-none focus:ring-1 focus:ring-orange-mae/40 text-white px-4 py-3 font-body text-sm transition-colors appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ContactRow({ label, value, href, testId }) {
  const inner = (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="font-display font-bold text-white text-lg mt-1 group-hover:text-orange-mae transition-colors">
        {value}
      </p>
    </>
  );
  return href ? (
    <a href={href} data-testid={testId} className="block group">
      {inner}
    </a>
  ) : (
    <div data-testid={testId}>{inner}</div>
  );
}
