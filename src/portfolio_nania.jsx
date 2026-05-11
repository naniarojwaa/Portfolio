import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import foto from "./assets/photo.png";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { name: "HTML & CSS", level: 85, cat: "Frontend" },
  { name: "JavaScript", level: 75, cat: "Frontend" },
  { name: "React.js", level: 75, cat: "Frontend" },
  { name: "Tailwind CSS", level: 70, cat: "Frontend" },
  { name: "Flutter", level: 65, cat: "Mobile" },
  { name: "Figma", level: 80, cat: "Design" },
  { name: "UI/UX Design", level: 80, cat: "Design" },
  { name: "PHP / Laravel", level: 65, cat: "Backend" },
  { name: "SQL", level: 65, cat: "Backend" },
  { name: "Git", level: 82, cat: "Tools" },
];

const PROJECTS = [
  {
    title: "Hospital Website Redesign",
    subtitle: "RS Semen Gresik",
    period: "Jan – Feb 2026",
    role: "Web Developer Intern",
    desc: "Redesigned the hospital website for a more modern and user-friendly experience. Rebuilt and improved pages using contemporary web technologies.",
    tags: ["HTML", "CSS", "JavaScript", "Web Design"],
    icon: "🏥",
    color: "#e8f4f0",
    accent: "#2d9e7a",
  },
  {
    title: "Campus Note Sharing Platform - Stacka",
    subtitle: "Product Based Learning – PENS",
    period: "Feb 2026 – Present",
    role: "Mobile Developer",
    desc: "Collaborative mobile app for PENS students to upload, access, and manage course notes. Built with Flutter using Agile/Scrum methodology.",
    tags: ["Flutter", "Agile", "Scrum", "Mobile Dev"],
    icon: "📚",
    color: "#f0ecfa",
    accent: "#7c4dce",
  },
  {
    title: "Landing Page Development",
    subtitle: "E-code x HIMIT Bootcamp",
    period: "2025",
    role: "Frontend Developer",
    desc: "Designed UI/UX mockups and developed a fully responsive landing page using HTML, CSS, and Tailwind CSS.",
    tags: ["HTML", "Tailwind CSS", "UI/UX", "Responsive"],
    icon: "🎨",
    color: "#fff4e8",
    accent: "#e07b1a",
  },
  {
    title: "App Prototype – Figma Camp",
    subtitle: "Figma Camp Batch 1",
    period: "Jan 2025",
    role: "UI/UX Designer",
    desc: "Learned user research, wireframing, and prototyping fundamentals. Designed a complete app mockup including interactive prototype with user flows.",
    tags: ["Figma", "Wireframing", "Prototyping", "UX Research"],
    icon: "✏️",
    color: "#fef0f0",
    accent: "#d94040",
  },
];

const ORG = [
  {
    role: "Divisi Siaga",
    org: "Panitia PKKMB X TECHNOGEAR PENS 2025",
    period: "Agt 2025",
    desc: "Coordinated event flow, managed participant mobility, and monitored conditions throughout the orientation program.",
  },
  {
    role: "Divisi PDD",
    org: "Panitia LKMM Tingkat Pra Dasar PENS 2025",
    period: "Okt 2025",
    desc: "Documented the event via photo/video, managed social media live reports, and produced the after-movie.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function SkillBar({ name, level, cat, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-xs text-slate-400 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
            background: "linear-gradient(90deg, #6366f1, #a78bfa)",
          }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 100}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="group relative bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-[64px] opacity-40"
          style={{ backgroundColor: p.color }}
        />
        <div className="relative">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">{p.icon}</span>
            <div>
              <h3 className="font-semibold text-slate-800 text-base leading-tight">{p.title}</h3>
              <p className="text-xs mt-0.5" style={{ color: p.accent }}>{p.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{p.role}</span>
            <span className="text-xs text-slate-400">{p.period}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: p.color, color: p.accent }}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [skillCat, setSkillCat] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const cats = ["All", "Frontend", "Design", "Mobile", "Backend", "Tools"];
  const filtered = skillCat === "All" ? SKILLS : SKILLS.filter(s => s.cat === skillCat);

  const [heroRef, heroIn] = useInView(0.05);

  return (
    <div className="min-h-screen bg-[#fafaf9] font-['Sora',sans-serif]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: #c4b5fd; color: #1e1b4b; }
        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-blob {
          background: radial-gradient(ellipse at 60% 40%, #ede9fe 0%, #fce7f3 40%, transparent 70%);
        }
        .card-hover:hover { transform: translateY(-4px); }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-['Playfair_Display'] text-xl font-bold text-slate-800">
            Portfolio<span className="gradient-text">.</span>
          </span>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${active === l ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"}`}>
                {l}
              </button>
            ))}
          </div>
          <a href="mailto:naniarojwaa@gmail.com"
            className="hidden md:block text-sm px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-indigo-600 transition-colors duration-200 font-medium">
            Let's Connect
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-blob" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-indigo-100 opacity-50" />
        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full border border-pink-100 opacity-50" />

        <div ref={heroRef} className="max-w-5xl mx-auto px-6 py-20 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${heroIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Frontend Developer
              </div>
              <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-4">
                Nania Rojwaa<br />
                <span className="italic gradient-text">Nur Aqilah</span>
              </h1>
              <p className="text-lg text-slate-500 font-light mb-2 tracking-wide">
                Frontend Developer
              </p>
              <p className="text-sm text-slate-400 mb-4">
                Building clean & intuitive interfaces
              </p>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-md text-sm">
                Mahasiswa Teknik Informatika di Politeknik Elektronika Negeri Surabaya yang tertarik dalam membangun antarmuka yang indah dan intuitif. Suka berkolaborasi dalam tim, memperhatikan detail, dan selalu antusias untuk mempelajari teknologi baru.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("Projects")}
                  className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-colors duration-200">
                  See My Work →
                </button>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${heroIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="relative">
                {/* Avatar placeholder */}
                <div className="w-72 h-72 mx-auto rounded-3xl bg-gradient-to-br from-indigo-100 via-violet-100 to-pink-100 flex items-center justify-center relative overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/50 to-pink-200/50" />
                  <span className="text-8xl relative z-0">
                    <img
                      src={foto}
                      alt="Nania"
                      className="relative z-10 max-h-[80%] object-contain -translate-y-6"
                    />
                  </span>
                </div>
                {/* Floating chips */}
                <div className="absolute -left-6 top-12 bg-white shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                  <span className="text-lg">🎨</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">UI/UX Design</p>
                    <p className="text-xs text-slate-400">Figma Expert</p>
                  </div>
                </div>
                <div className="absolute -right-4 bottom-16 bg-white shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                  <span className="text-lg">⚛️</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">React.js</p>
                    <p className="text-xs text-slate-400">Frontend Dev</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-12 z-20 bg-white shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                  <span className="text-lg">📱</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Flutter</p>
                    <p className="text-xs text-slate-400">Mobile Dev</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`mt-16 grid grid-cols-3 gap-6 max-w-lg transition-all duration-1000 delay-500 ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[["4+", "Projects Built"], ["2+", "Work Experience"], ["10+", "Tech Skills"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="text-3xl font-bold text-slate-900 font-['Playfair_Display']">{n}</p>
                <p className="text-xs text-slate-500 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-indigo-500 font-semibold tracking-widest uppercase mb-3">Capabilities</p>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900">Skills & Tools</h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cats.map(c => (
              <button key={c} onClick={() => setSkillCat(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${skillCat === c ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 bg-[#fafaf9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-indigo-500 font-semibold tracking-widest uppercase mb-3">Background</p>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900">Experience</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-6 h-px bg-slate-200 inline-block" /> Education
              </h3>
              <div className="relative pl-5 border-l-2 border-indigo-100">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ml-4">
                  <p className="text-xs text-indigo-500 font-medium mb-1">Agt 2024 - Sekarang</p>
                  <h4 className="font-semibold text-slate-800 text-base">D3 Teknik Informatika</h4>
                  <p className="text-sm text-slate-500 mt-0.5">Politeknik Elektronika Negeri Surabaya (PENS)</p>
                </div>
              </div>
            </div>

            {/* Internship */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-6 h-px bg-slate-200 inline-block" /> Internship
              </h3>
              <div className="relative pl-5 border-l-2 border-violet-100">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-violet-500" />
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ml-4">
                  <p className="text-xs text-violet-500 font-medium mb-1">Jan - Feb 2026</p>
                  <h4 className="font-semibold text-slate-800 text-base">Web Developer Intern</h4>
                  <p className="text-sm text-slate-500 mt-0.5">RS Semen Gresik</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">Redesigned hospital website UI, developed and improved web pages using modern web technologies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Org */}
          <div className="mt-12">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200 inline-block" /> Organization
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {ORG.map((o) => (
                <div key={o.org} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{o.role}</h4>
                      <p className="text-xs text-indigo-500 mt-0.5">{o.org}</p>
                    </div>
                    <span className="text-xs bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full border border-slate-100 whitespace-nowrap">{o.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-indigo-500 font-semibold tracking-widest uppercase mb-3">Portfolio</p>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900">Projects & Training</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#fafaf9]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900 mb-4">
            Let's <span className="italic gradient-text">Build Something Together</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Saya terbuka untuk kesempatan magang, kolaborasi, maupun pengembangan proyek baru. Jangan ragu untuk menghubungi saya.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:naniarojwaa@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-colors duration-200">
              
              <FaEnvelope className="text-base" />
              naniarojwaa@gmail.com
            </a>
            <a href="tel:+6281259540751"
              className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 text-sm font-medium rounded-full hover:border-indigo-300 hover:text-indigo-600 transition-colors duration-200">
              
              <FaPhone className="text-base" />
              0812-5954-0751
            </a>
          </div>

          <div className="flex justify-center gap-3">
            {[
              { label: "GitHub", icon: <FaGithub />, link: "https://github.com/naniarojwaa" },
              { label: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/naniarojwaa/" },
            ].map(s => (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-sm text-slate-500 shadow-sm hover:shadow-md hover:scale-105 transition"
              >
                <span className="text-base">{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-xs">
        <p>© {new Date().getFullYear()} Nania Rojwaa Nur Aqilah </p>
      </footer>
    </div>
  );
}
