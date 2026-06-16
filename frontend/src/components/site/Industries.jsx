import React from "react";
import { motion } from "framer-motion";
import { SECTIONS, INDUSTRIES } from "@/constants/testIds";
import { INDUSTRIES_LIST } from "@/constants/content";

export default function Industries() {
  return (
    <section
      id="industrias"
      data-testid={SECTIONS.industries}
      className="relative bg-petroleum-deep py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle marquee strip */}
      <div className="absolute top-0 left-0 right-0 border-y border-white/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3 font-display font-bold uppercase text-3xl md:text-5xl text-white/5 tracking-tight">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex shrink-0">
              {INDUSTRIES_LIST.map((i) => (
                <span key={i.slug + k} className="px-8 flex items-center gap-8">
                  <span>{i.name}</span>
                  <span className="text-orange-mae">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae mb-3">
            ⟶ Industrias · 04
          </p>
          <h2 className="font-display font-black uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95]">
            Sectores <span className="text-orange-mae">aliados</span>
          </h2>
          <p className="text-slate-300 font-body text-base md:text-lg mt-5 leading-relaxed">
            Atendemos las industrias más críticas de México con componentes
            diseñados para resistir las condiciones más exigentes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {INDUSTRIES_LIST.map((ind, i) => (
            <motion.div
              key={ind.slug}
              data-testid={INDUSTRIES.card(ind.slug)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#1A2832]"
            >
              <img
                src={ind.img}
                alt={ind.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E141A] via-[#0E141A]/60 to-transparent group-hover:from-[#0E141A]/95 transition-colors" />

              <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-orange-mae">
                / 0{i + 1}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display font-bold uppercase text-white text-xl md:text-2xl tracking-tight">
                  {ind.name}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm font-body mt-2 max-h-0 group-hover:max-h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {ind.desc}
                </p>
                <div className="mt-3 h-[2px] w-8 bg-orange-mae group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
