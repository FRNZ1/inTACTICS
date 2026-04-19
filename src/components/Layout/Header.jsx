import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle, Search, Play, Pause, ZoomIn, ZoomOut, Layers } from 'lucide-react';

import { pageTransition, springTransition, DynamicNavItem, handleTabSwitch } from './utils/helpers.js'
export const Header = ({ activeTab, handleTabSwitch, isScrollingDown }) => {
return ( 
    <header className="fixed md:top-8 max-md:bottom-0 left-0 right-0 z-50 flex justify-center md:px-6 max-md:h-[68px] pointer-events-none">
    <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#050505] md:bg-black/20 backdrop-blur-3xl border-t md:border border-white/10 max-md:rounded-none md:rounded-full p-0 flex items-center shadow-2xl w-full md:w-auto pointer-events-auto max-md:h-full"
    >
        <div className="flex relative w-full md:w-auto px-2 md:px-0 h-full">
            <DynamicNavItem id="home" icon={Home} label="Home" activeTab={activeTab} setActiveTab={handleTabSwitch} />
            <DynamicNavItem id="ron" icon={Shield} label="RoN" activeTab={activeTab} setActiveTab={handleTabSwitch} />
            <DynamicNavItem id="pubg" icon={Crosshair} label="PUBG" activeTab={activeTab} setActiveTab={handleTabSwitch} />
        </div>
        <div className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all md:hidden`}></div>
    </motion.nav>
</header>
)
};