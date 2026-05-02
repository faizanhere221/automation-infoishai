"use client";
import { useState, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "Trade Advisor Pro", price: 99, status: "live", category: "finance", desc: "AI-powered stock analysis with institutional sources, halal screening, and portfolio construction.", icon: "chart" },
  { id: 2, name: "AI Contract Reviewer", price: 149, category: "business", desc: "Upload any contract — get clause-by-clause risk analysis, red flags, and revision suggestions.", icon: "shield" },
  { id: 3, name: "AI Business Plan Generator", price: 149, category: "business", desc: "Investor-ready business plans with market analysis, financial projections, and go-to-market strategy.", icon: "rocket" },
  { id: 4, name: "Real Estate Investment Analyzer", price: 149, category: "finance", desc: "Complete property analysis — cash flow, ROI, cap rate, market comparisons, and exit strategies.", icon: "building" },
];

function Icon({ name, size = 18, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 10h.01"/></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    megaphone: <><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></>,
    coins: <><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1110.34 18"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{paths[name]}</svg>;
}

export default function App() {
  const [mobOpen, setMobOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [prodFilter, setProdFilter] = useState("all");

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
      for (const id of ["contact","pricing","process","case-study","products","services"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) { setActiveNav(id); }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach(el => {
      if (el.getBoundingClientRect().top >= window.innerHeight) el.classList.add("will-animate");
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach(el => { if (el.classList.contains("will-animate")) io.observe(el); });
    return () => io.disconnect();
  }, [prodFilter]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
    setMobOpen(false);
  };

  const filtered = prodFilter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === prodFilter);
  const tickerItems = ["Lead Generation Automation","AI Demo Sites","CRM Integration","Real Estate Pipeline","AI Copywriting","GoHighLevel Automation","Google Maps Scraping","WhatsApp Outreach"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#07070F", color: "#F0EFE8", minHeight: "100vh", overflowX: "hidden", WebkitFontSmoothing: "antialiased", paddingBottom: 72 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:#0FC78F;color:#000}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#07070F}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:0.4}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulseRing{0%{transform:scale(.95);box-shadow:0 0 0 0 rgba(15,199,143,.4)}70%{transform:scale(1);box-shadow:0 0 0 14px rgba(15,199,143,0)}100%{transform:scale(.95)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .reveal{opacity:1;transform:none;transition:opacity .7s ease,transform .7s ease}
        .reveal.will-animate{opacity:0;transform:translateY(24px)}
        .reveal.will-animate.visible{opacity:1;transform:none}
        .rd1{transition-delay:.1s}.rd2{transition-delay:.2s}.rd3{transition-delay:.3s}
        @media(max-width:1024px){.hero-inner-g{grid-template-columns:1fr!important}.hero-vis{display:none!important}.bento-g{grid-template-columns:1fr!important}.prod-g{grid-template-columns:repeat(2,1fr)!important}.case-g{grid-template-columns:1fr!important;gap:40px!important}.proc-g{grid-template-columns:1fr!important;gap:40px!important}.price-g{grid-template-columns:1fr!important}.bundle-g{grid-template-columns:1fr!important}.sub-g{grid-template-columns:1fr 1fr!important}}
        @media(max-width:768px){.nav-lnks{display:none!important}.mob-tog{display:flex!important}.hero-sec{padding:100px 20px 60px!important}.sec-pad{padding:70px 20px!important}.hero-stats-g{gap:24px!important}.prod-g{grid-template-columns:1fr 1fr!important}.sub-g{grid-template-columns:1fr!important}.ft-inner{flex-direction:column!important;align-items:flex-start!important}}
        @media(max-width:480px){.prod-g{grid-template-columns:1fr!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, display: "flex", alignItems: "center", padding: "0 40px", transition: "background .3s, border-color .3s", ...(navScrolled ? { background: "rgba(7,7,15,0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.07)" } : {}) }}>
        <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#0FC78F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 14, color: "#000" }}>I</div>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#F0EFE8", letterSpacing: "-0.02em" }}>infoishai</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0FC78F", background: "rgba(15,199,143,0.12)", padding: "3px 8px", borderRadius: 4, border: "1px solid rgba(15,199,143,0.2)" }}>automation</span>
          </div>
          <div className="nav-lnks" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["services","Services"],["products","Products"],["case-study","Case Study"],["pricing","Pricing"]].map(([id,l]) => (
              <span key={id} onClick={() => goTo(id)} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 500, color: activeNav===id ? "#F0EFE8" : "#8885A0", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "color .2s" }}>{l}</span>
            ))}
            <a href="https://calendly.com/islam9039438/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", background: "#0FC78F", color: "#000", borderRadius: 6, fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s", textDecoration: "none" }}>Book a call <Icon name="arrow" size={14} color="#000"/></a>
          </div>
          <button className="mob-tog" onClick={() => setMobOpen(true)} style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#F0EFE8", width: 38, height: 38, borderRadius: 6, cursor: "pointer", alignItems: "center", justifyContent: "center" }}><Icon name="menu" size={18}/></button>
        </div>
      </nav>

      {mobOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#07070F", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button onClick={() => setMobOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#F0EFE8" }}><Icon name="x" size={24}/></button>
          {[["services","Services"],["products","Products"],["case-study","Case Study"],["pricing","Pricing"]].map(([id,l]) => (
            <span key={id} onClick={() => goTo(id)} style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 700, color: "#8885A0", cursor: "pointer", transition: "color .2s" }}>{l}</span>
          ))}
          <a href="https://calendly.com/islam9039438/30min" target="_blank" rel="noopener noreferrer" onClick={() => setMobOpen(false)} style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 700, color: "#0FC78F", cursor: "pointer", textDecoration: "none" }}>Book a call</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero-sec" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)" }}/>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,199,143,0.07) 0%, transparent 65%)" }}/>
          <div style={{ position: "absolute", top: "10%", right: "-15%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,110,246,0.06) 0%, transparent 65%)" }}/>
        </div>
        <div className="hero-inner-g" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp .8s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0FC78F", background: "rgba(15,199,143,0.06)", border: "1px solid rgba(15,199,143,0.18)", padding: "7px 14px", borderRadius: 100, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0FC78F", animation: "pulseRing 2s infinite" }}/>
              AI automation systems + digital products
            </div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(42px, 5.5vw, 72px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em", color: "#F0EFE8", marginBottom: 24 }}>
              We Build AI Systems<br/>That{" "}
              <em style={{ fontStyle: "normal", background: "linear-gradient(135deg, #0FC78F 0%, #5BEAD4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Replace<br/>Manual Work</em>
            </h1>
            <p style={{ fontSize: 17, color: "#8885A0", lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>From lead generation pipelines to real estate automation — we build, deploy, and sell AI-powered systems that save businesses thousands of hours.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => goTo("services")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#0FC78F", color: "#000", border: "none", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .25s" }}>Explore services <Icon name="arrow" size={15} color="#000"/></button>
              <button onClick={() => goTo("products")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", color: "#8885A0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .25s" }}>Browse AI products</button>
            </div>
            <div className="hero-stats-g" style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
              {[{ v: "500+", l: "Leads scraped daily" },{ v: "4", l: "Countries served" },{ v: "$2K–$15K", l: "Per engagement" },{ v: "4", l: "AI Digital Products" }].map((s,i) => (
                <div key={i}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "#0FC78F", letterSpacing: "-0.03em" }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "#5A5870", marginTop: 2, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-vis" style={{ position: "relative", animation: "floatY 6s ease-in-out infinite" }}>
            <div style={{ position: "absolute", top: -24, right: -20, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "14px 18px", backdropFilter: "blur(20px)" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "#0FC78F" }}>500+</div>
              <div style={{ fontSize: 11, color: "#5A5870", marginTop: 2 }}>Leads / day</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 28, backdropFilter: "blur(20px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5870" }}>Lead pipeline · live</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#0FC78F" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0FC78F" }}/>Running
                </span>
              </div>
              {[
                { label: "Google Maps Scraper", badge: "523 found", color: "#0FC78F", bg: "rgba(15,199,143,0.12)" },
                { label: "AI Demo Site Generator", badge: "Generating…", color: "#7B6EF6", bg: "rgba(123,110,246,0.12)" },
                { label: "CRM Sync + Tagging", badge: "Auto-tagged", color: "#F07A48", bg: "rgba(240,122,72,0.12)" },
                { label: "SMS Outreach Sequence", badge: "41 sent", color: "#0FC78F", bg: "rgba(15,199,143,0.12)" },
              ].map((row,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, marginBottom: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, flexShrink: 0 }}/>
                  <span style={{ fontSize: 13, color: "#8885A0", flex: 1 }}>{row.label}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 600, color: row.color, background: row.bg }}>{row.badge}</span>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -20, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "14px 18px", backdropFilter: "blur(20px)" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "#7B6EF6" }}>3×</div>
              <div style={{ fontSize: 11, color: "#5A5870", marginTop: 2 }}>More calls booked</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "rgba(15,199,143,0.06)", borderTop: "1px solid rgba(15,199,143,0.12)", borderBottom: "1px solid rgba(15,199,143,0.12)", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 0, whiteSpace: "nowrap", animation: "ticker 28s linear infinite" }}>
          {[...tickerItems, ...tickerItems].map((item,i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "0 40px", fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#0FC78F", fontWeight: 500 }}>
              {item}{i !== tickerItems.length * 2 - 1 && <span style={{ color: "rgba(15,199,143,0.3)" }}>◆</span>}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="sec-pad" style={{ padding: "110px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 20 }}>
              <span style={{ display: "block", width: 16, height: 1, background: "#0FC78F" }}/>Core Services
            </div>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>Two Systems.<br/>Infinite Scale.</h2>
            <p style={{ fontSize: 16, color: "#8885A0", lineHeight: 1.7, maxWidth: 500, marginTop: 12 }}>We specialize in two high-impact automation systems that agencies and real estate companies pay premium for.</p>
          </div>

          <div className="bento-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 52 }}>
            {/* Service 1 */}
            <div className="reveal rd1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 40, position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s" }}>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: "#0FC78F", marginBottom: 28 }}/>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(15,199,143,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Icon name="globe" size={24} color="#0FC78F"/></div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 8, fontWeight: 600 }}>Service 01</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>AI Demo Site Generator</h3>
              <p style={{ fontSize: 14, color: "#8885A0", lineHeight: 1.7, marginBottom: 28 }}>We scrape businesses without websites, auto-generate personalized demo sites, sync leads to your CRM, and send automated SMS/WhatsApp outreach — all on autopilot.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {["Google Maps lead scraping (any city, any trade)","AI-generated personalized websites in seconds","GoHighLevel CRM integration + auto-tagging","Automated SMS & WhatsApp follow-up sequences","Engagement tracking + analytics dashboard"].map((f,i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#8885A0" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#0FC78F", marginTop: 7, flexShrink: 0 }}/>{f}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5870" }}>For</div>
                  <div style={{ fontSize: 13, color: "#8885A0", marginTop: 4 }}>Marketing agencies + trade businesses</div>
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#0FC78F" }}>$999</div>
              </div>
            </div>
            {/* Service 2 */}
            <div className="reveal rd2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 40, position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s" }}>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: "#7B6EF6", marginBottom: 28 }}/>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(123,110,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Icon name="layers" size={24} color="#7B6EF6"/></div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7B6EF6", marginBottom: 8, fontWeight: 600 }}>Service 02</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>Real Estate Pipeline AI</h3>
              <p style={{ fontSize: 14, color: "#8885A0", lineHeight: 1.7, marginBottom: 28 }}>Plug-and-play automation for real estate calling agencies. AI lead scoring, automated follow-ups, and smart operator dashboards — all running on their existing Google Sheets.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {["AI lead scoring engine (Hot/Warm/Cold/Dead)","5 automated follow-up flows (SMS + email)","AI-generated personalized messages via Claude API","Operator performance dashboard + metrics","Works on existing Google Sheets — zero migration"].map((f,i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#8885A0" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7B6EF6", marginTop: 7, flexShrink: 0 }}/>{f}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5870" }}>For</div>
                  <div style={{ fontSize: 13, color: "#8885A0", marginTop: 4 }}>Pipeline companies + calling agencies</div>
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#7B6EF6" }}>$999</div>
              </div>
            </div>
          </div>

          <div className="sub-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
            {[
              { icon: "target", title: "Lead scraping + enrichment", desc: "Google Maps, LinkedIn, job boards — enriched with emails, socials, tech stack, and lead scores." },
              { icon: "zap", title: "AI copywriting workflows", desc: "Brand-voice-matched ad copy, emails, social posts, and proposals generated at scale." },
              { icon: "phone", title: "CRM + outreach automation", desc: "GoHighLevel, HubSpot — auto-tag leads, trigger sequences, book calls automatically." },
            ].map((s,i) => (
              <div key={i} className="reveal" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24, transition: "border-color .25s" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(15,199,143,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Icon name={s.icon} size={16} color="#0FC78F"/></div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#5A5870", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="sec-pad" style={{ padding: "110px 40px", background: "#0D0D1A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 20 }}>
                <span style={{ display: "block", width: 16, height: 1, background: "#0FC78F" }}/>AI Digital Products
              </div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>Premium AI Digital Products</h2>
              <p style={{ fontSize: 16, color: "#8885A0", lineHeight: 1.7, maxWidth: 500, marginTop: 10 }}>4 standalone AI-powered tools. One-time purchase, no subscription. Open in browser, get expert-level output instantly.</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["all","All"],["finance","Finance"],["business","Business"]].map(([v,l]) => (
                <button key={v} onClick={() => setProdFilter(v)} style={{ padding: "7px 16px", borderRadius: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, border: prodFilter===v ? "1px solid #0FC78F" : "1px solid rgba(255,255,255,0.07)", background: prodFilter===v ? "#0FC78F" : "transparent", color: prodFilter===v ? "#000" : "#5A5870", cursor: "pointer", transition: "all .2s" }}>{l}</button>
              ))}
            </div>
          </div>
          <div className="prod-g" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }}>
            {filtered.map(p => (
              <div key={p.id} className="reveal" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24, position: "relative", transition: "all .3s", cursor: "pointer" }}>
                {p.status === "live" && (
                  <div style={{ position: "absolute", top: 14, right: 14, display: "flex", alignItems: "center", gap: 5, fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0FC78F", background: "rgba(15,199,143,0.12)", padding: "4px 8px", borderRadius: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#0FC78F" }}/>Live
                  </div>
                )}
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Icon name={p.icon} size={18} color="#0FC78F"/></div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#5A5870", lineHeight: 1.6, marginBottom: 20, minHeight: 50 }}>{p.desc}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>${p.price}</span>
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(15,199,143,0.12)", color: "#0FC78F", border: "1px solid rgba(15,199,143,0.2)", borderRadius: 6, fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>Buy now <Icon name="arrow" size={12} color="#0FC78F"/></button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case-study" className="sec-pad" style={{ padding: "110px 40px", background: "linear-gradient(180deg, #0D0D1A 0%, #07070F 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="case-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div className="reveal">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 20 }}>
                <span style={{ display: "block", width: 16, height: 1, background: "#0FC78F" }}/>Case Study
              </div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>Optimo Agency,<br/>Melbourne</h2>
              <p style={{ fontSize: 16, color: "#8885A0", lineHeight: 1.7, maxWidth: 500, marginTop: 14 }}>How we automated lead generation and outreach for an Australian marketing agency — cutting manual work by 90%.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
                {[{ v: "500+", l: "Leads scraped daily" },{ v: "3×", l: "More qualified calls booked" },{ v: "3 wks", l: "Build to deploy timeline" },{ v: "90%", l: "Reduction in manual work" }].map((m,i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontFamily: "Syne, sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.04em", color: "#0FC78F" }}>{m.v}</div>
                    <div style={{ fontSize: 12, color: "#5A5870", marginTop: 4, lineHeight: 1.5 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal rd2" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Problem", text: "Craig Kelly's team was manually finding trade businesses, hand-building demo sites, and following up one by one. Hours of work per lead." },
                { label: "Solution", text: "Full-stack automation: Google Maps scraper finds leads, Claude API generates personalized demo websites, everything syncs to GoHighLevel with automated SMS outreach." },
                { label: "Result", text: "500+ leads scraped daily. Demo sites generated in seconds. 3× more qualified calls booked. Team now focuses exclusively on closing." },
              ].map((c,i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 28 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 10 }}>{c.label}</div>
                  <div style={{ fontSize: 14, color: "#8885A0", lineHeight: 1.7 }}>{c.text}</div>
                  {i === 1 && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                      {["Next.js","Python","Claude API","GoHighLevel","Google Maps API"].map(t => (
                        <span key={t} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, padding: "5px 10px", borderRadius: 4, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#5A5870" }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sec-pad" style={{ padding: "110px 40px", background: "#0D0D1A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="proc-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div className="reveal">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 20 }}>
                <span style={{ display: "block", width: 16, height: 1, background: "#0FC78F" }}/>Process
              </div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>From call to launch<br/>in weeks</h2>
              <p style={{ fontSize: 16, color: "#8885A0", lineHeight: 1.7, maxWidth: 500, marginTop: 14 }}>No bloated SOWs. No months of "discovery." We ship fast, iterate live, and charge for results.</p>
              <a href="https://calendly.com/islam9039438/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#0FC78F", color: "#000", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 36, transition: "all .25s", textDecoration: "none" }}>Start with a free call <Icon name="arrow" size={14} color="#000"/></a>
            </div>
            <div className="reveal rd2">
              {[
                { n: "01", t: "Discovery call", d: "15-minute call. We map your workflow, identify bottlenecks, and scope the automation." },
                { n: "02", t: "System design", d: "We design the architecture — what connects to what, what gets automated, what stays manual." },
                { n: "03", t: "Build + deploy", d: "Rapid development with weekly demos. Working system, not slide decks." },
                { n: "04", t: "Optimize + support", d: "Go live with full support. We monitor, iterate, and make sure it delivers real ROI." },
              ].map((s,i) => (
                <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "28px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 56, fontWeight: 800, color: "rgba(255,255,255,0.05)", lineHeight: 1, minWidth: 72, letterSpacing: "-0.04em" }}>{s.n}</div>
                  <div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>{s.t}</div>
                    <div style={{ fontSize: 13, color: "#5A5870", lineHeight: 1.7 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="sec-pad" style={{ padding: "110px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0FC78F", marginBottom: 20, justifyContent: "center" }}>
              <span style={{ display: "block", width: 16, height: 1, background: "#0FC78F" }}/>Service Pricing
            </div>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>Transparent pricing</h2>
            <p style={{ fontSize: 16, color: "#8885A0", lineHeight: 1.7, margin: "12px auto 0", textAlign: "center" }}>Pick the tier that fits your scale. Every engagement starts with a free audit call.</p>
          </div>
          <div className="price-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 52 }}>
            {[
              { tier: "Starter", price: "$500–$1.5K", desc: "Quick wins and individual automations to remove bottlenecks.", color: "#0FC78F", items: ["AI copywriting workflows","Automated content calendars","Basic reporting automation","Single integration setup"] },
              { tier: "Professional", price: "$2K–$5K", desc: "Core systems that transform how your agency operates day-to-day.", color: "#7B6EF6", featured: true, items: ["Lead scraping + enrichment system","Demo site generator","Full CRM automation","Multi-channel outreach","Operator dashboards"] },
              { tier: "Enterprise", price: "$5K–$15K", desc: "Complete AI stack built and maintained for your agency long-term.", color: "#F07A48", items: ["Everything in Professional","Custom AI agents","White-label tools to resell","Pipeline automation system","Ongoing maintenance + support"] },
            ].map((t,i) => (
              <div key={i} className="reveal" style={{ background: t.featured ? "rgba(123,110,246,0.04)" : "rgba(255,255,255,0.04)", border: t.featured ? "1px solid #7B6EF6" : "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 36, position: "relative", display: "flex", flexDirection: "column", transition: "border-color .3s" }}>
                {t.featured && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#7B6EF6", color: "#fff", fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 16px", borderRadius: "0 0 8px 8px" }}>Most popular</div>}
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: t.color, marginBottom: 12 }}>{t.tier}</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 38, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>{t.price}</div>
                <div style={{ fontSize: 13, color: "#5A5870", marginBottom: 28, lineHeight: 1.6 }}>{t.desc}</div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 24 }}/>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {t.items.map((item,j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#8885A0" }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, background: t.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><Icon name="check" size={10} color={t.color}/></div>
                      {item}
                    </div>
                  ))}
                </div>
                <a href="https://calendly.com/islam9039438/30min" target="_blank" rel="noopener noreferrer" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .25s", textDecoration: "none", ...(t.featured ? { background: "#7B6EF6", color: "#fff", border: "1px solid #7B6EF6" } : { background: "transparent", color: "#8885A0", border: "1px solid rgba(255,255,255,0.12)" }) }}>
                  Get started <Icon name="arrow" size={14} color={t.featured ? "#fff" : "currentColor"}/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="sec-pad" style={{ padding: "110px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(15,199,143,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div className="reveal" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: "rgba(15,199,143,0.12)", border: "1px solid rgba(15,199,143,0.2)", marginBottom: 28 }}><Icon name="zap" size={24} color="#0FC78F"/></div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.04, marginBottom: 20 }}>Let's Automate<br/>Your Workflow</h2>
          <p style={{ fontSize: 17, color: "#8885A0", lineHeight: 1.7, marginBottom: 40 }}>Book a free 15-minute call. We'll audit your current workflow and show you exactly what we'd automate first — no strings attached.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/islam9039438/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "#0FC78F", color: "#000", border: "none", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "all .25s" }}>Book a free call <Icon name="arrow" size={16} color="#000"/></a>
            <a href="https://mail.google.com/mail/?view=cm&to=infoishfounder@gmail.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "transparent", color: "#8885A0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "all .25s" }}>Email us</a>
          </div>
          <div style={{ display: "flex", gap: 28, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            {[{ icon: "clock", t: "15 min call" },{ icon: "check", t: "Free audit included" },{ icon: "globe", t: "AU · US · UK · UAE" }].map((b,i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#5A5870" }}><Icon name={b.icon} size={13} color="#0FC78F"/>{b.t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 40px" }}>
        <div className="ft-inner" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: "#0FC78F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 12, color: "#000" }}>I</div>
            <span style={{ fontSize: 13, color: "#5A5870", fontWeight: 500 }}>automation.infoishai.com</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/faizan-islam-41a3ab28b" },
              { label: "Upwork", href: "https://www.upwork.com/freelancers/faizanaideveloper" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#5A5870", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}>{l.label}</a>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#5A5870" }}>Multan, Pakistan — AU · US · UK · UAE</div>
        </div>
      </footer>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/923228837325"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{ position: "fixed", bottom: 88, right: 24, zIndex: 500, width: 52, height: 52, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform .2s, box-shadow .2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}
      >
        <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* STICKY FOOTER BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 400, height: 68, background: "rgba(7,7,15,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "0 20px" }}>
        <a href="https://calendly.com/islam9039438/30min" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 28px", background: "#0FC78F", color: "#000", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "all .2s", whiteSpace: "nowrap" }}>Book a call <Icon name="arrow" size={14} color="#000"/></a>
        <a href="https://mail.google.com/mail/?view=cm&to=infoishfounder@gmail.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", background: "transparent", color: "#8885A0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "all .2s", whiteSpace: "nowrap" }}>Email us</a>
      </div>
    </div>
  );
}