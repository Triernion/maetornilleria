import React from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/constants/testIds";
import { PROCESS } from "@/constants/content";

export default function Process() {
  return (
    <section className="relative bg-[#0E141A] py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-mae mb-3">
              ⟶ Cómo trabajamos · 05
            </p>
            <h2 className="font-display font-black uppercase text-white text-4xl md:text-5xl tracking-tighter leading-[0.95]">
              De plano a <span className="text-orange-mae">producción</span> en 4 pasos
            </h2>
          </div>
          <p className="text-slate-400 font-body text-base md:text-lg leading-relaxed">
            Proceso transparente con seguimiento técnico en cada etapa.
            Recibe asesoría real desde el primer contacto.
          </p>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Horizontal connector */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-orange-mae via-orange-mae/40 to-transparent" />

          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative bg-[#1A2832] border border-white/5 p-7 hover:border-orange-mae/40 transition-colors"
            >
              <div className="relative w-16 h-16 bg-petroleum-deep border border-orange-mae/40 flex items-center justify-center font-display font-black text-orange-mae text-2xl">
                {p.step}
              </div>
              <h3 className="font-display font-bold uppercase text-white text-xl mt-5 tracking-tight">
                {p.title}
              </h3>
              <p className="text-slate-400 font-body text-sm mt-2 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
