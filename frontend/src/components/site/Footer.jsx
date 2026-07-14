import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SECTIONS, FOOTER } from "@/constants/testIds";
import { COMPANY, SERVICES_LIST, INDUSTRIES_LIST } from "@/constants/content";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contacto"
      data-testid={FOOTER.root}
      className="relative bg-[#0a1015] border-t border-white/5"
    >
      <section
        data-testid={SECTIONS.contact}
        className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid lg:grid-cols-12 gap-12"
      >
        {/* Brand */}
        <div className="lg:col-span-4">
          <img
            src="/assets/mae/logo.png"
            alt="MAE Tornillería"
            className="h-12 w-auto mb-6"
          />
          <p className="text-slate-400 font-body text-sm leading-relaxed max-w-sm">
            Tornillería industrial especializada para minería, cementeras y
            sectores de alta exigencia. Más de {COMPANY.yearsExperience} años fabricando piezas
            críticas con servicio nacional.
          </p>

          <div className="mt-8 space-y-3">
            <FooterRow
              icon={<Phone size={16} />}
              label={COMPANY.phone}
              href={`tel:${COMPANY.phoneRaw}`}
            />
            <FooterRow
              icon={<MessageCircle size={16} />}
              label={`WhatsApp: ${COMPANY.whatsapp}`}
              href={`https://wa.me/${COMPANY.whatsappRaw}`}
            />
            <FooterRow
              icon={<Mail size={16} />}
              label={COMPANY.email}
              href={`mailto:${COMPANY.email}`}
            />
            <FooterRow icon={<MapPin size={16} />} label={COMPANY.address} href={COMPANY.mapsUrl} />
            <FooterRow icon={<Clock size={16} />} label={COMPANY.hours} />
          </div>
        </div>

        {/* Nav columns */}
        <div className="lg:col-span-2">
          <h4 className="font-display font-bold uppercase text-white text-sm tracking-widest mb-5 border-b border-orange-mae/40 pb-3">
            Empresa
          </h4>
          <ul className="space-y-3 text-sm text-slate-400 font-body">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "nosotros", label: "Nosotros" },
              { id: "servicios", label: "Servicios" },
              { id: "industrias", label: "Industrias" },
              { id: "cotizar", label: "Cotización" },
            ].map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="hover:text-orange-mae transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display font-bold uppercase text-white text-sm tracking-widest mb-5 border-b border-orange-mae/40 pb-3">
            Servicios
          </h4>
          <ul className="space-y-3 text-sm text-slate-400 font-body">
            {SERVICES_LIST.map((s) => (
              <li key={s.slug}>
                <button
                  onClick={() => scrollTo("servicios")}
                  className="text-left hover:text-orange-mae transition-colors"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display font-bold uppercase text-white text-sm tracking-widest mb-5 border-b border-orange-mae/40 pb-3">
            Industrias
          </h4>
          <ul className="space-y-3 text-sm text-slate-400 font-body">
            {INDUSTRIES_LIST.map((i) => (
              <li key={i.slug}>{i.name}</li>
            ))}
          </ul>

          <div className="mt-8">
            <button
              onClick={() => scrollTo("cotizar")}
              className="w-full industrial-shadow bg-orange-mae text-white font-display font-bold uppercase tracking-widest px-5 py-3 text-sm"
            >
              Cotizar ahora
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
          <span data-testid={FOOTER.copyright}>
            © {year} MAE Tornillería · Todos los derechos reservados
          </span>
          <span>
            Servicio nacional en México · Hecho con precisión industrial
          </span>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${COMPANY.whatsappRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 industrial-shadow hover:scale-105 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </footer>
  );
}

function FooterRow({ icon, label, href }) {
  const inner = (
    <span className="flex items-center gap-3 text-slate-400 hover:text-orange-mae transition-colors text-sm font-body">
      <span className="text-orange-mae">{icon}</span>
      <span>{label}</span>
    </span>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}
