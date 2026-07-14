import React from "react";
import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";
import { SECTIONS } from "@/constants/testIds";
import { VALUES, COMPANY } from "@/constants/content";

export default function About() {
  return (
    <section
      id="nosotros"
      data-testid={SECTIONS.about}
      className="relative bg-petroleum-deep py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae mb-4">
            ⟶ Sobre nosotros · 02
          </p>
          <h2 className="font-display font-black uppercase text-white text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter">
            Especialistas en <span className="text-orange-mae">fijación crítica</span> para industria pesada
          </h2>
          <div className="tick-divider my-8" />
          <p className="text-slate-300 font-body leading-relaxed text-base md:text-lg">
            Durante <strong className="text-white">{COMPANY.yearsExperience} años</strong> nuestro
            equipo ha logrado comprender las necesidades de la industria y crear
            productos confiables para satisfacerlas todas.
          </p>
          <p className="text-slate-300/90 font-body leading-relaxed text-base mt-4">
            Trabajamos de la mano con áreas de <strong className="text-white">mantenimiento,
            ingeniería y compras</strong>, ofreciendo piezas fabricadas bajo plano,
            muestra o especificación técnica. Nuestra fortaleza es la flexibilidad,
            precisión y atención técnica personalizada.
          </p>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[4/5] sm:aspect-[16/12] overflow-hidden corner-cuts">
            <img
              src="/assets/mae/taller-mae.jpg"
              alt="Taller MAE Tornillería en Hidalgo, México"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#12181E]/80 via-transparent to-orange-mae/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#0E141A] via-[#0E141A]/85 to-transparent">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-mae">
                Taller · Producción a medida
              </p>
              <p className="text-white font-display font-bold uppercase text-xl md:text-2xl mt-2">
                Pernos, tornillos, espárragos y anclas bajo plano
              </p>
            </div>
          </div>

          {/* Hex stat float */}
          <div className="hidden md:flex absolute -top-6 -left-6 w-32 h-32 bg-orange-mae text-white items-center justify-center flex-col clip-hex shadow-2xl">
            <div className="font-display font-black text-3xl leading-none">
              {COMPANY.yearsExperience}+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest mt-1">
              Años
            </div>
          </div>
        </div>
      </div>

      {/* Values grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 md:mt-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae mb-3">
              ⟶ Nuestros valores
            </p>
            <h3 className="font-display font-black uppercase text-white text-3xl md:text-4xl tracking-tight">
              5 principios no negociables
            </h3>
          </div>
          <div className="hidden md:block font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
            MAE / VALORES
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-[#1A2832] border border-white/5 hover:border-orange-mae/60 p-6 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-petroleum-deep clip-hex flex items-center justify-center">
                  <Hexagon size={18} className="text-orange-mae" strokeWidth={2.5} />
                </div>
                <span className="font-mono text-[11px] text-slate-500 group-hover:text-orange-mae transition-colors">
                  / {v.code}
                </span>
              </div>
              <h4 className="font-display font-bold uppercase text-white text-lg tracking-wide">
                {v.name}
              </h4>
              <p className="text-slate-400 text-sm font-body mt-2 leading-snug">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
