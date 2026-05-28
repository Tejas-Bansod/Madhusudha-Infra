"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Heart,
  User,
  Menu,
  ChevronDown,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Custom SVGs for Social Platforms to ensure precise branding
const SocialIcons = {
  Facebook: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  ),
  TwitterX: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
  ),
  Pinterest: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.993 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.091.377-.293 1.194-.333 1.355-.053.218-.173.264-.4.158-1.493-.695-2.427-2.882-2.427-4.631 0-3.769 2.739-7.233 7.9-7.233 4.148 0 7.371 2.957 7.371 6.907 0 4.124-2.599 7.441-6.208 7.441-1.213 0-2.354-.63-2.744-1.374l-.749 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  ),
  YouTube: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.163c-.272-1.022-1.074-1.824-2.096-2.096C19.558 3.5 12 3.5 12 3.5s-7.558 0-9.402.567c-1.022.272-1.824 1.074-2.096 2.096C0 8.007 0 12 0 12s0 3.993.502 5.837c.272 1.022 1.074 1.824 2.096 2.096C4.442 20.5 12 20.5 12 20.5s7.558 0 9.402-.567c1.022-.272 1.824-1.074 2.096-2.096C24 15.993 24 12 24 12s0-3.993-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Vimeo: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M22.396 7.158c-.312 2.762-2.39 6.518-6.23 11.272-3.978 4.908-7.34 7.365-10.08 7.365-1.693 0-3.125-1.564-4.296-4.691-.781-3.086-1.562-6.172-2.344-9.258-.87-3.477-1.797-5.215-2.778-5.215-.209 0-.939.435-2.193 1.305l-1.305-1.67C2.073 3.65 4.316 1.748 6.776.184c2.684-1.71 4.67-1.606 5.958.312 1.433 2.138.939 5.518-.574 10.14-1.095 3.337-.625 5.006.417 5.006.885 0 2.215-1.173 3.99-3.518 1.77-2.344 2.684-4.484 2.735-6.41.105-3.049-1.848-4.52-5.859-4.417 1.874-6.12 6.096-9.13 12.658-9.026 4.85.08 7.158 2.646 6.944 7.707z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Twitch: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  ),
};

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "#",
  },
  {
    label: "Properties",
    href: "#properties",
    children: [
      { label: "Featured Listings", href: "#properties" },
      { label: "Premium Villas", href: "#properties" },
      { label: "Modern Apartments", href: "#properties" },
      { label: "Commercial Spaces", href: "#properties" },
    ],
  },
  {
    label: "About Us",
    href: "#why-us",
    children: [
      { label: "Why Choose Us", href: "#why-us" },
      { label: "Our Achievements", href: "#stats" },
      { label: "Client Testimonials", href: "#testimonials" },
    ],
  },
  {
    label: "Process",
    href: "#process",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Monitor page scroll to apply sticky header styling and show/hide top bar based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 40) {
        setIsSticky(false);
        setShowTopBar(true);
      } else {
        setIsSticky(true);
        if (currentScrollY < lastScrollY.current) {
          // Scrolling up -> show top bar
          setShowTopBar(true);
        } else {
          // Scrolling down -> hide top bar
          setShowTopBar(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex flex-col z-50 transition-all duration-300">
      {/* 1. TOP BAR */}
      <div
        className={`w-full text-slate-300 backdrop-blur-sm border-b hidden md:block transition-all duration-300 ease-in-out ${
          showTopBar
            ? "h-11 bg-[#081828]/60 border-white/10 backdrop-blur-[2px]"
            : "h-0 border-none opacity-0 overflow-hidden"
        }`}
      >
        <div className="w-full flex items-center justify-between h-full px-6 lg:px-12">
          {/* Social Icons (Left) */}
          <div className="flex h-full items-center">
            <a
              href="#"
              aria-label="Facebook"
              className="h-full flex items-center justify-center border-l border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.Facebook />
            </a>
            <a
              href="#"
              aria-label="Twitter X"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.TwitterX />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.LinkedIn />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.Pinterest />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.YouTube />
            </a>
            <a
              href="#"
              aria-label="Vimeo"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.Vimeo />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.Instagram />
            </a>
            <a
              href="#"
              aria-label="Twitch"
              className="h-full flex items-center justify-center border-r border-slate-800/40 px-3 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <SocialIcons.Twitch />
            </a>
          </div>

          {/* Quick Info & Favorites (Right) */}
          <div className="flex h-full items-center">
            {/* Favorites */}
            <a
              href="#"
              className="h-full flex items-center gap-1.5 border-l border-slate-800/40 px-4 hover:bg-white/10 hover:text-white transition-all duration-200 text-[13px]"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Favorites</span>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@mail.com"
              className="h-full flex items-center gap-1.5 border-l border-slate-800/40 px-4 hover:bg-white/10 hover:text-white transition-all duration-200 text-[13px]"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>contact@mail.com</span>
            </a>

            {/* Phone/WhatsApp */}
            <a
              href="tel:+14081671234"
              className="h-full flex items-center gap-1.5 border-l border-r border-slate-800/40 px-4 hover:bg-white/10 hover:text-white transition-all duration-200 text-[13px] font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+1 408 167 1234</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isSticky
            ? "bg-black/60 lg:bg-[#f8f9fa]/80 backdrop-blur-lg shadow-md border-b border-slate-800/10 lg:border-slate-200/80 py-2.5 sm:py-4"
            : "bg-black/60 lg:bg-transparent backdrop-blur-sm border-b border-white/10 py-3.5 sm:py-5"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-tr from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-500/10 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Building2 className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full border border-white animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span
                  className={`font-extrabold tracking-wider text-xs sm:text-lg md:text-xl leading-none transition-colors duration-300 ${
                    isSticky ? "text-white lg:text-slate-900" : "text-white"
                  }`}
                >
                  MADHUSUDHA
                </span>
                <span className="text-sky-500 font-black text-xs sm:text-lg md:text-xl leading-none ml-1">
                  INFRA
                </span>
              </div>
              <span
                className={`text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] mt-0.5 leading-none transition-colors duration-300 ${
                  isSticky ? "text-slate-300 lg:text-slate-700 hover:lg:text-sky-600" : "text-white"
                }`}
              >
                Real Estate & Infra Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <div key={item.label} className="relative group/menu py-2">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 font-semibold text-[15px] transition-colors duration-300 ${
                    isSticky ? "text-slate-700 hover:text-sky-600" : "text-slate-100 hover:text-sky-400"
                  }`}
                >
                  <span
                    className={`relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 ${
                      isSticky ? "after:bg-sky-600" : "after:bg-sky-400"
                    } after:transition-all after:duration-300 group-hover/menu:after:w-full`}
                  >
                    {item.label}
                  </span>
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        isSticky
                          ? "text-slate-500 group-hover/menu:text-sky-600"
                          : "text-slate-400 group-hover/menu:text-sky-400"
                      } group-hover/menu:rotate-180`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu Container */}
                {item.children && (
                  <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-56 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300 ease-out z-50">
                    <div
                      className={`border rounded-xl shadow-2xl p-2 overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                        isSticky
                          ? "bg-white border-slate-200/80 text-slate-800"
                          : "bg-[#0b1c30]/95 border-slate-800 text-slate-200"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                            isSticky
                              ? "text-slate-700 hover:text-sky-600 hover:bg-slate-100"
                              : "text-slate-350 hover:text-white hover:bg-slate-800/40"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right Info and CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Phone */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isSticky
                    ? "bg-slate-100 border-slate-200 text-slate-700 group-hover:bg-sky-50 group-hover:border-sky-300 group-hover:text-sky-600"
                    : "bg-white/10 border-white/10 text-slate-200 group-hover:bg-white/20 group-hover:border-sky-400/50 group-hover:text-sky-400"
                }`}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider leading-none transition-colors duration-300 ${
                    isSticky ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Call Support
                </span>
                <span
                  className={`font-extrabold text-sm mt-0.5 transition-colors duration-300 ${
                    isSticky ? "text-slate-900 group-hover:text-sky-600" : "text-slate-100 group-hover:text-sky-400"
                  }`}
                >
                  800-555-6789
                </span>
              </div>
            </div>

            {/* Profile Avatar */}
            <button
              aria-label="User profile"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isSticky
                  ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                  : "bg-white/10 border-white/10 text-slate-200 hover:bg-white/20 hover:text-white"
              }`}
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* CTA Button */}
            <Button
              className="bg-sky-600 hover:bg-sky-700 hover:scale-[1.02] active:scale-[0.98] text-white font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-sky-600/10 transition-all duration-200 text-sm"
              asChild
            >
              <Link href="#">Add Listing</Link>
            </Button>
          </div>

          {/* Mobile Hamburguer and Actions Menu */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-3">
            {/* Profile Avatar */}
            <button
              aria-label="User profile"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isSticky
                  ? "bg-white/10 border-white/10 lg:bg-slate-100 lg:border-slate-200 text-slate-200 lg:text-slate-700 hover:bg-white/20 lg:hover:bg-slate-250 hover:text-white lg:hover:text-slate-900"
                  : "bg-white/10 border-white/10 text-slate-200 hover:bg-white/20 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Sheet Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${
                    isSticky
                      ? "bg-white/10 border-white/10 lg:bg-slate-100 lg:border-slate-200 hover:bg-white/20 lg:hover:bg-slate-200 text-slate-200 lg:text-slate-700 hover:text-white lg:hover:text-slate-900"
                      : "bg-white/10 border-white/10 hover:bg-white/20 text-slate-200 hover:text-white"
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-[#071625] border-l border-slate-800 p-0 text-slate-200"
              >
                <SheetHeader className="p-6 border-b border-slate-800 text-left">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-tr from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                    <SheetTitle className="text-white font-black text-lg tracking-wider">
                      MADHUSUDHA <span className="text-sky-400">INFRA</span>
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-slate-400 text-xs">
                    Premium Real Estate & Infrastructure Solutions
                  </SheetDescription>
                </SheetHeader>

                {/* Mobile Menu Body */}
                <div className="flex flex-col h-[calc(100vh-80px)] justify-between overflow-y-auto p-6">
                  {/* Nav Links */}
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <div
                        key={item.label}
                        className="border-b border-slate-800/60 pb-3"
                      >
                        <button
                          onClick={() =>
                            setMobileExpandedItem(
                              mobileExpandedItem === item.label
                                ? null
                                : item.label
                            )
                          }
                          className="flex items-center justify-between w-full text-slate-100 hover:text-sky-400 font-bold text-base py-1 text-left"
                        >
                          <span>{item.label}</span>
                          {item.children && (
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                mobileExpandedItem === item.label
                                  ? "rotate-180 text-sky-400"
                                  : ""
                              }`}
                            />
                          )}
                        </button>

                        {/* Mobile Submenu */}
                        {item.children && (
                          <div
                            className={`pl-4 mt-2 space-y-2 overflow-hidden transition-all duration-350 ${
                              mobileExpandedItem === item.label
                                ? "max-h-60 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 text-sm text-slate-400 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile Footer / Contacts / Socials */}
                  <div className="space-y-6 pt-6 border-t border-slate-800">
                    {/* Contacts */}
                    <div className="space-y-3">
                      <a
                        href="tel:8005556789"
                        className="flex items-center gap-3 text-slate-200 hover:text-sky-400 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-800/60 flex items-center justify-center text-sky-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">
                            Call Toll-Free
                          </span>
                          <span className="font-bold text-sm">800-555-6789</span>
                        </div>
                      </a>
                      <a
                        href="mailto:contact@mail.com"
                        className="flex items-center gap-3 text-slate-200 hover:text-sky-400 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-800/60 flex items-center justify-center text-sky-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">
                            Email Inquiry
                          </span>
                          <span className="font-bold text-sm">contact@mail.com</span>
                        </div>
                      </a>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-2.5 justify-center py-1">
                      <a
                        href="#"
                        className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <SocialIcons.Facebook />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <SocialIcons.TwitterX />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <SocialIcons.LinkedIn />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <SocialIcons.Instagram />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <SocialIcons.YouTube />
                      </a>
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-sky-600/10 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                      asChild
                    >
                      <Link href="#">Add Listing</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
