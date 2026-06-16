import React from "react";
import { motion } from "framer-motion";
import { Anchor, Shield, Cog, Wrench, Siren, ArrowUpRight } from "lucide-react";
import { SECTIONS, SERVICES } from "@/constants/testIds";
import { SERVICES_LIST } from "@/constants/content";

const ICONS = {
  anchor: Anchor,
  shield: Shield,
  cog: Cog,
  wrench: Wrench,
  siren: Siren,
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Services() {
  const featured = SERVICES_LIST.find((s) => s.featured);
  const rest = SERVICES_LIST.filter((s) => !s.featured);

  return (
    <section
      id="servicios"
      data-testid={SECTIONS.services}
      className="relative bg-[#0E141A] py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae mb-3">
              ⟶ Servicios · 03
            </p>
            <h2 className="font-display font-black uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95]">
              Soluciones <span className="text-orange-mae">integrales</span> en tornillería industrial
            </h2>
          </div>
          <p className="text-slate-300 font-body text-base md:text-lg leading-relaxed">
            Diseñados para garantizar la operatividad continua de sus equipos
            críticos en los sectores más exigentes.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Featured big card */}
          <FeaturedCard service={featured} />

          {/* Other cards */}
          {rest.map((s, i) => (
            <ServiceCard key={s.slug} service={s} delay={i * 0.08} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-16 bg-[#1A2832] border border-white/5 border-l-4 border-l-orange-mae p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 corner-cuts">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-mae mb-2">
              ¿Necesitas algo a la medida?
            </p>
            <h3 className="font-display font-bold uppercase text-white text-2xl md:text-3xl tracking-tight">
              Cotizamos a partir de tu plano, muestra o especificación
            </h3>
          </div>
          <button
            onClick={() => scrollTo("cotizar")}
            className="industrial-shadow bg-orange-mae text-white font-display font-bold uppercase tracking-widest px-6 py-4 self-start md:self-auto"
            data-testid="services-cta-cotizar"
          >
            Iniciar Cotización
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ service }) {
  const Icon = ICONS[service.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      data-testid={SERVICES.card(service.slug)}
      className="relative group md:col-span-2 lg:row-span-2 lg:col-span-2 bg-[#1A2832] border border-white/5 hover:border-orange-mae/50 p-8 md:p-10 overflow-hidden transition-colors min-h-[400px]"
    >
      <img
        src="/assets/mae/crane.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2832] via-[#1A2832]/85 to-transparent" />

      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 bg-orange-mae text-white clip-hex flex items-center justify-center">
            <Icon size={26} strokeWidth={2} />
          </div>
          <span className="font-mono text-xs text-orange-mae uppercase tracking-widest">
            ★ Principal
          </span>
        </div>

        <div className="mt-auto pt-12">
          <h3 className="font-display font-black uppercase text-white text-3xl md:text-4xl tracking-tight">
            {service.title}
          </h3>
          <p className="text-slate-300 font-body mt-4 text-base md:text-lg max-w-md leading-relaxed">
            {service.desc}
          </p>
          <div className="flex items-center gap-2 mt-6 text-orange-mae font-display font-bold uppercase text-sm tracking-widest group-hover:gap-3 transition-all">
            <span>Cotizar este servicio</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, delay = 0 }) {
  const Icon = ICONS[service.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      data-testid={SERVICES.card(service.slug)}
      className="group relative bg-[#1A2832] border border-white/5 hover:border-orange-mae/50 p-7 transition-colors min-h-[260px] flex flex-col"
    >
      <div className="w-14 h-14 bg-petroleum-deep clip-hex flex items-center justify-center border border-orange-mae/40 group-hover:bg-orange-mae transition-colors">
        <Icon
          size={22}
          className="text-orange-mae group-hover:text-white transition-colors"
          strokeWidth={2}
        />
      </div>
      <h3 className="font-display font-bold uppercase text-white text-xl mt-6 tracking-tight leading-tight">
        {service.title}
      </h3>
      <p className="text-slate-400 font-body text-sm mt-3 leading-relaxed flex-1">
        {service.short}
      </p>
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-slate-500 group-hover:text-orange-mae transition-colors">
        <span>0{SERVICES_LIST.findIndex((s) => s.slug === service.slug) + 1}</span>
        <ArrowUpRight size={14} />
      </div>
    </motion.div>
  );
}
