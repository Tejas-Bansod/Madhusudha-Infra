"use client";

import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ArrowRight, Send } from "lucide-react";
import { useState } from "react";

// Custom SVG brand icons (lucide-react does not export brand icons)
const SocialSVGs = {
  Facebook: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Twitter: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
  ),
  Youtube: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.47 12.31 12.31 0 00-7.64 0A4.83 4.83 0 014.41 6.69 28.5 28.5 0 004 12a28.5 28.5 0 00.41 5.31 4.83 4.83 0 003.77 2.47 12.31 12.31 0 007.64 0 4.83 4.83 0 003.77-2.47A28.5 28.5 0 0020 12a28.5 28.5 0 00-.41-5.31zM10 15V9l5 3-5 3z" />
    </svg>
  ),
};

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Properties for Sale", href: "#" },
  { label: "Properties for Rent", href: "#" },
  { label: "Commercial Spaces", href: "#" },
  { label: "New Projects", href: "#" },
  { label: "About Us", href: "#" },
];

const propertyTypes = [
  { label: "Luxury Villas", href: "#" },
  { label: "Apartments", href: "#" },
  { label: "Independent Houses", href: "#" },
  { label: "Office Spaces", href: "#" },
  { label: "Retail Shops", href: "#" },
  { label: "Plots & Land", href: "#" },
];

const socials = [
  { Icon: SocialSVGs.Facebook, href: "#", label: "Facebook" },
  { Icon: SocialSVGs.Instagram, href: "#", label: "Instagram" },
  { Icon: SocialSVGs.Twitter, href: "#", label: "Twitter" },
  { Icon: SocialSVGs.Linkedin, href: "#", label: "LinkedIn" },
  { Icon: SocialSVGs.Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800">


      {/* Newsletter banner */}
      <div className="bg-sky-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-extrabold text-lg">Stay Ahead of the Market</h3>
            <p className="text-sky-100/80 text-sm">Get the latest property listings, market insights, and exclusive deals in your inbox.</p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 bg-sky-500/40 border border-sky-400/50 rounded-xl px-5 py-3">
              <Send className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">You&apos;re subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-white/15 border border-white/30 text-white placeholder-sky-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white focus:bg-white/25 transition-all"
              />
              <button
                type="submit"
                className="bg-white text-sky-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-sky-50 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

            {/* Google Maps Section */}
      <div className="w-full h-80 md:h-[300px] border-b border-slate-800 overflow-hidden relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3721.2545559679425!2d79.09830807525974!3d21.142265580535508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA4JzMyLjIiTiA3OcKwMDYnMDMuMiJF!5e0!3m2!1sen!2sin!4v1780199276720!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-white text-base leading-tight block">Madhusudha</span>
                <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.15em]">Infra</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building Hyderabad&apos;s future, one premium property at a time. 15+ years of trust, quality, and innovation.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 border border-slate-700 hover:border-sky-600"
                >
                  <s.Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6">Property Types</h4>
            <ul className="space-y-3">
              {propertyTypes.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-200">
                  <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">6th Floor, Skyview Tower,<br />Financial District, Hyderabad — 500032</p>
                </div>
              </li>
              <li className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-200">
                  <Phone className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <Link href="tel:+914000000000" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">+91 40 0000 0000</Link>
                  <br />
                  <Link href="tel:+919000000000" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">+91 90 0000 0000</Link>
                </div>
              </li>
              <li className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-200">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <Link href="mailto:info@madhusudhainfra.com" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">info@madhusudhainfra.com</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Madhusudha Infra Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "RERA Disclosures"].map((item) => (
              <Link key={item} href="#" className="text-slate-500 hover:text-sky-400 text-xs transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
