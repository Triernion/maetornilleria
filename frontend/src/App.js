import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Industries from "@/components/site/Industries";
import Process from "@/components/site/Process";
import QuoteForm from "@/components/site/QuoteForm";
import Footer from "@/components/site/Footer";

function Landing() {
  return (
    <div className="App min-h-screen bg-petroleum-deep text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Process />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
