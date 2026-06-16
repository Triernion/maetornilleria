import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Hexagon } from "lucide-react";
import { HERO, SECTIONS } from "@/constants/testIds";
import { COMPANY, STATS } from "@/constants/content";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-petroleum-deep overflow-hidden pt-24"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/assets/mae/bg-hero-2.jpg')" }}
      />
      {/* Heavy dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E141A] via-[#0E141A]/95 to-[#12181E]/70" />
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-50" />
      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-50" />
      {/* Decorative giant hexagon */}
      <Hexagon
        className="absolute -right-20 top-1/4 w-[520px] h-[520px] text-orange-mae opacity-10"
        strokeWidth={0.5}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 grid lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-8">
          <motion.div
            data-testid={HERO.badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8 border border-orange-mae/40 bg-orange-mae/10 px-4 py-2"
          >
            <span className="w-2 h-2 bg-orange-mae pulse-orange" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae">
              + {COMPANY.yearsExperience} años en industria pesada
            </span>
          </motion.div>

          <motion.h1
            data-testid={HERO.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black uppercase text-white leading-[0.92] tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            Tornillería <br />
            <span className="text-orange-mae">industrial</span>
            <br />
            para minería y <br />
            cementeras
          </motion.h1>

          <motion.p
            data-testid={HERO.subtitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-slate-300 text-base md:text-lg max-w-2xl font-body leading-relaxed"
          >
            Fabricamos <strong className="text-white">pernos, tornillos, espárragos y sistemas
            de fijación</strong> para proyectos críticos con altas cargas, vibración y
            ambientes extremos. Servicio y envíos a nivel nacional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              data-testid={HERO.ctaPrimary}
              onClick={() => scrollTo("cotizar")}
              className="industrial-shadow group bg-orange-mae text-white font-display font-bold uppercase tracking-widest px-7 py-4 flex items-center justify-center gap-3 transition-all"
            >
              Solicitar Cotización
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              data-testid={HERO.ctaSecondary}
              onClick={() => scrollTo("servicios")}
              className="border-2 border-white/20 hover:border-orange-mae hover:text-orange-mae text-white font-display font-bold uppercase tracking-widest px-7 py-4 transition-colors"
            >
              Ver Servicios
            </button>
          </motion.div>
        </div>

        {/* Right column: stats vertical */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="lg:col-span-4 hidden lg:block"
        >
          <div className="border-l-2 border-orange-mae pl-6 space-y-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-black text-5xl text-white leading-none">
                  {s.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom marker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0E141A]/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
          <span>MAE / 001 — tornillería de precisión</span>
          <span className="hidden md:inline">SCROLL ↓</span>
        </div>
      </div>
    </section>
  );
}
