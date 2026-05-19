"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import * as THREE from "three";

type Stat = { label: string; value: number; suffix: string };

const services = [
  "Modular Kitchens",
  "Bedroom Interiors",
  "Living Room Designs",
  "TV Units",
  "Wardrobes",
  "False Ceiling",
  "Commercial Interiors",
  "Custom Furniture",
];

const processSteps = [
  "Consultation",
  "3D Visualization",
  "Material Selection",
  "Execution",
  "Final Handover",
];

const stats: Stat[] = [
  { label: "Happy Clients", value: 500, suffix: "+" },
  { label: "Design Concepts", value: 1000, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Satisfaction", value: 98, suffix: "%" },
];

const portfolio = [
  { name: "Skyline Penthouse", category: "Residential" },
  { name: "Imperial Villa", category: "Residential" },
  { name: "Zen Corporate Suite", category: "Commercial" },
  { name: "Coastal Luxe Home", category: "Residential" },
  { name: "Auric Workspace", category: "Commercial" },
  { name: "Noir Living Studio", category: "Residential" },
];

function AnimatedCounter({ value, suffix, label }: Stat) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 60;
    const timer = setInterval(() => {
      frame += 1;
      setCount(Math.round((value * frame) / totalFrames));
      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-card rounded-2xl p-6 text-center">
      <p className="text-4xl font-semibold text-[var(--text-primary)]">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [slider, setSlider] = useState(50);
  const [contactState, setContactState] = useState("Submit Inquiry");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navLinks = useMemo(
    () => ["About", "Services", "Portfolio", "Process", "Contact"],
    [],
  );

  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  const whatsappLink = whatsappNumber.length >= 10 ? `https://wa.me/${whatsappNumber}` : "#contact";
  const displayPhone = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "Phone available on consultation request";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(value);
    };

    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const geometry = new THREE.TorusKnotGeometry(1, 0.28, 120, 14);
    const material = new THREE.MeshStandardMaterial({ color: "#d7b991", metalness: 0.82, roughness: 0.24 });
    const mesh = new THREE.Mesh(geometry, material);

    const ambient = new THREE.AmbientLight("#ffe4c4", 1.2);
    const point = new THREE.PointLight("#f5c98c", 1.5);
    point.position.set(3, 3, 3);

    scene.add(mesh, ambient, point);

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", resize);

    let animationId = 0;
    const animate = () => {
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.004;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setContactState("Sending...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");
      setContactState("Inquiry Sent ✓");
      e.currentTarget.reset();
    } catch {
      setContactState("Try Again");
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.4em] text-[var(--text-secondary)]">SAI INTERIOR DESIGNERS</p>
          <h1 className="mt-4 text-3xl font-semibold">Crafting Luxury Experiences</h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-20 opacity-30" aria-hidden />
      <p className="sr-only">Decorative 3D ambient animation in the background.</p>
      <div className="ambient-light" aria-hidden />
      <div className="custom-cursor hidden md:block" style={{ transform: `translate(${cursor.x - 10}px, ${cursor.y - 10}px)` }} />
      <div className="fixed left-0 top-0 z-50 h-1 bg-[var(--accent)]" style={{ width: `${progress}%` }} />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm tracking-[0.35em] text-[var(--text-secondary)]">SAI INTERIOR</p>
            <p className="text-base">Designers</p>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="menu-link text-sm">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-white/20 px-4 py-2 text-xs"
              aria-label="Toggle color mode"
            >
              {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
            <a href={whatsappLink} className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-black">
              WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section relative flex min-h-[90vh] items-center px-6" id="home">
          <div className="mx-auto grid w-full max-w-7xl gap-10 py-20 lg:grid-cols-2">
            <div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-[0.4em] text-[var(--text-secondary)]">
                MANGALORE & BANGALORE
              </motion.p>
              <h1 ref={headingRef} className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
                Designing Spaces That Define Luxury Living
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
                Sai Interior Designers crafts cinematic home interiors through futuristic aesthetics, artisan precision, and emotionally rich storytelling.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary">
                  Book Free Consultation
                </a>
                <a href="#portfolio" className="btn-secondary">
                  Explore Projects
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0.7, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="glass-card h-[420px] rounded-3xl p-6"
            >
              <div className="h-full rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(210,177,118,0.28),transparent_40%),linear-gradient(140deg,#191511,#2e251d_35%,#120f0b)]" />
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="section-label">ABOUT BRAND EXPERIENCE</p>
              <h2 className="section-title">A founder-led vision where architecture meets emotion.</h2>
              <p className="section-copy">
                We blend modern form, warm materiality, and intelligent planning to shape interiors that look luxurious and feel deeply personal.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "2015 · Began premium residential transformations",
                "2019 · Expanded into commercial luxury spaces",
                "2024 · Introduced immersive 3D design previews",
              ].map((item) => (
                <div key={item} className="glass-card rounded-2xl p-5 text-sm text-[var(--text-secondary)]">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">SERVICES</p>
          <h2 className="section-title">Future-ready luxury interior services.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <motion.div
                key={service}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 transition-shadow hover:shadow-[0_0_35px_rgba(210,177,118,0.3)]"
              >
                <p className="text-sm tracking-[0.2em] text-[var(--text-secondary)]">LUXURY</p>
                <h3 className="mt-3 text-xl">{service}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">PORTFOLIO SHOWCASE</p>
          <h2 className="section-title">Cinematic portfolio with premium presentation.</h2>
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {portfolio.map((item, idx) => (
              <motion.div key={item.name} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="glass-card mb-5 break-inside-avoid rounded-2xl p-5" style={{ height: idx % 2 === 0 ? "220px" : "300px" }}>
                <p className="text-xs tracking-[0.2em] text-[var(--text-secondary)]">{item.category}</p>
                <h3 className="mt-2 text-xl">{item.name}</h3>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border border-white/10 p-6">
            <p className="text-sm text-[var(--text-secondary)]">Interactive before / after reveal</p>
            <div className="relative mt-4 h-56 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(130deg,#2a2119,#18120d_40%,#0f0c08)]" />
              <div
                className="absolute inset-0 bg-[linear-gradient(120deg,#dbc29b,#9f7f52_55%,#4a3623)]"
                style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
              />
              <input
                className="absolute bottom-4 left-1/2 w-2/3 -translate-x-1/2"
                type="range"
                min={1}
                max={99}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                aria-label="Before after slider"
              />
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">OUR PROCESS</p>
          <h2 className="section-title">Transparent and futuristic workflow.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <motion.div key={step} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} className="glass-card rounded-2xl p-5 text-center">
                <p className="text-xs text-[var(--text-secondary)]">STEP {index + 1}</p>
                <p className="mt-2 font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">WHY CHOOSE US</p>
          <h2 className="section-title">Precision, trust, and premium execution.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "10+ Years Experience",
              "Premium Materials",
              "On-Time Delivery",
              "End-to-End Solutions",
              "500+ Projects",
              "Transparent Pricing",
              "Expert Designers",
              "3D Design Preview",
            ].map((point) => (
              <div key={point} className="glass-card rounded-2xl p-5 text-sm">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">TESTIMONIALS</p>
          <h2 className="section-title">Loved by families and business owners.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "“Our villa feels like a boutique hotel now.” — Akash, Mangalore",
              "“The 3D walkthrough gave us confidence before execution.” — Sana, Bangalore",
              "“Premium finish, transparent process, zero stress.” — Rohan, Bangalore",
            ].map((review) => (
              <motion.div key={review} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 text-[var(--text-secondary)]">
                {review}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">STATISTICS</p>
          <h2 className="section-title">Performance that builds confidence instantly.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <AnimatedCounter key={item.label} {...item} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="glass-card rounded-3xl px-8 py-14 text-center">
            <p className="section-label">CALL TO ACTION</p>
            <h2 className="section-title">Your Dream Space Begins Here</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              Book your free design consultation and discover how premium interior architecture can transform the way you live.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#contact" className="btn-primary">
                Schedule Consultation
              </a>
              <a href={whatsappLink} className="btn-secondary">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">CONTACT EXPERIENCE</p>
          <h2 className="section-title">Let’s design your signature space.</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <form onSubmit={submitForm} className="glass-card space-y-4 rounded-3xl p-6">
              <input required name="name" placeholder="Name" className="contact-input" />
              <input required name="phone" placeholder="Phone" className="contact-input" />
              <input required type="email" name="email" placeholder="Email" className="contact-input" />
              <textarea required name="message" placeholder="Tell us about your dream home" className="contact-input min-h-32" />
              <button className="btn-primary w-full" type="submit">
                {contactState}
              </button>
            </form>
            <div className="space-y-4">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="text-xl">Visit us</h3>
                <p className="mt-2 text-[var(--text-secondary)]">Mangalore & Bangalore, India</p>
                <p className="text-[var(--text-secondary)]">{displayPhone}</p>
              </div>
              <iframe
                title="Sai Interior Designers location"
                src="https://www.google.com/maps?q=Mangalore&output=embed"
                className="h-60 w-full rounded-3xl border border-white/10"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[var(--text-secondary)] md:flex-row">
          <p>© {new Date().getFullYear()} Sai Interior Designers</p>
          <div className="flex flex-wrap gap-4">
            <a href="#services">Services</a>
            <a href="#portfolio">Projects</a>
            <a href="#contact">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
