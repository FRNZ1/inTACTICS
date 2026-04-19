import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle, Search, Play, Pause, ZoomIn, ZoomOut, Layers } from 'lucide-react';

const GlobalSearchBar = ({ searchQuery, setSearchQuery, placeholder, className = "mb-8 md:mb-12" }) => (
  <div className={`relative w-full max-w-sm mx-auto group ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full bg-white/10 border border-white/10 hover:border-white/20 focus:border-blue-500/50 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-white/40 outline-none transition-all backdrop-blur-xl shadow-xl text-xs"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" size={14} />
    {searchQuery && (
      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
        <X size={14} />
      </button>
    )}
  </div>
);

export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
};

export const springTransition = {
    type: "spring",
    stiffness: 450,
    damping: 35
};

export const DynamicNavItem = ({ id, icon: Icon, label, activeTab, setActiveTab }) => {
    const isActive = activeTab === id;
    return (
        <button
            onClick={() => setActiveTab(id)}
            className="relative flex-1 md:flex-none px-4 md:px-8 py-4 md:py-3 rounded-full flex md:flex-row items-center justify-center gap-2 md:gap-2 group outline-none z-10"
        >
            {isActive && (
                <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-xl md:rounded-full"
                    transition={springTransition}
                />
            )}
            <Icon size={20} className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'}`} />
            <span className={`relative z-10 font-bold tracking-tight text-[10px] md:text-sm ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{label}</span>
        </button>
    );
};

{/*   */ }