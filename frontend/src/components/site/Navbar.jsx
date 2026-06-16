import React, { useState, useEffect } from "react";
import { Menu, X, Hexagon } from "lucide-react";
import { NAV } from "@/constants/testIds";
import { COMPANY } from "@/constants/content";

const links = [
  { id: "inicio", label: "Inicio", testId: NAV.linkInicio },
  { id: "nosotros", label: "Nosotros", testId: NAV.linkNosotros },
  { id: "servicios", label: "Servicios", testId: NAV.linkServicios },
  { id: "industrias", label: "Industrias", testId: NAV.linkIndustrias },
  { id: "contacto", label: "Contacto", testId: NAV.linkContacto },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0E141A]/85 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <button
          data-testid={NAV.logo}
          onClick={() => scrollTo("inicio")}
          className="flex items-center gap-3 group"
        >
          <img
            src="/assets/mae/logo.png"
            alt="MAE Tornillería"
            className="h-9 md:h-11 w-auto"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={l.testId}
              onClick={() => scrollTo(l.id)}
              className="px-4 py-2 text-[13px] font-display font-semibold uppercase tracking-[0.16em] text-slate-200/90 hover:text-orange-mae transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            {COMPANY.phone}
          </a>
          <button
            data-testid={NAV.ctaCotizar}
            onClick={() => scrollTo("cotizar")}
            className="industrial-shadow bg-orange-mae text-white font-display font-bold text-sm uppercase tracking-widest px-5 py-3 transition-all"
          >
            Solicitar Cotización
          </button>
        </div>

        <button
          data-testid={NAV.mobileToggle}
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0E141A]/95 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col">
            {links.map((l) => (
              <button
                key={l.id}
                data-testid={`${l.testId}-mobile`}
                onClick={() => {
                  scrollTo(l.id);
                  setOpen(false);
                }}
                className="text-left px-2 py-3 text-sm font-display font-semibold uppercase tracking-[0.16em] text-slate-200 border-b border-white/5 hover:text-orange-mae"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                scrollTo("cotizar");
                setOpen(false);
              }}
              className="mt-4 industrial-shadow bg-orange-mae text-white font-display font-bold text-sm uppercase tracking-widest px-5 py-3"
              data-testid={`${NAV.ctaCotizar}-mobile`}
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
