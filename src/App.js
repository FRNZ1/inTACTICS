import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X } from 'lucide-react';

// --- DATA MOCKS ---

const RON_MAPS = [
  {
    id: 'ron_213',
    dlc: 'base',
    name: '213 Park Homes',
    codename: 'Twisted Nerve',
    image: 'https://images.unsplash.com/photo-1501166222995-ff41349c5945?auto=format&fit=crop&q=80&w=800',
    situation: 'Ein Durchsuchungsbefehl wird bei einem vermuteten Meth-Labor in einem heruntergekommenen Vorort vollstreckt.',
    suspects: 'Unberechenbar, oft unter Drogeneinfluss. Bewaffnet mit Handfeuerwaffen.',
    screenshots: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'ron_hotel',
    dlc: 'base',
    name: 'Wenderly Hills Hotel',
    codename: 'Checkin\' In',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    situation: 'Geiselnahme im obersten Stockwerk eines Luxushotels. Mehrere VIPs sind betroffen.',
    suspects: 'Hochgradig organisiert, gut gepanzert und mit automatischen Waffen ausgestattet.',
    screenshots: ['https://images.unsplash.com/photo-1582719478250-c8940062db08?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'ron_redwood',
    dlc: 'home_invasion',
    name: 'Redwood',
    codename: 'Zutritt verboten',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    situation: 'Bewaffneter Einbruch in ein wohlhabendes Anwesen nach einem verheerenden Sturm.',
    suspects: 'Skrupellose Plünderer, teilweise mit gestohlenen Waffen.',
    screenshots: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'ron_port',
    dlc: 'dark_waters',
    name: 'Port Hokan',
    codename: 'Versteckte Fracht',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=800',
    situation: 'Razzia auf einer geheimen Anlage nahe der Docks. Verdacht auf schweren Schmuggel.',
    suspects: 'Hochprofessionelle Söldner mit Nachtsichtgeräten und schweren Waffen.',
    screenshots: ['https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=800']
  }
];

const RON_WEAPONS = [
  { id: 'w_m4a1', name: 'M4A1', type: 'Sturmgewehr', caliber: '5.56x45mm', desc: 'Zuverlässiges, starkes Standard-Sturmgewehr.' },
  { id: 'w_mp5', name: 'MP5A3', type: 'Maschinenpistole', caliber: '9x19mm', desc: 'Klassische MP. Ideal für enge Räume (CQB).' }
];

const PUBG_MAPS = [
  {
    id: 'pubg_erangel',
    name: 'Erangel',
    size: '8x8 km',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800',
    info: 'Die originale Battle Royale Karte. Eine russisch angehauchte Insel.',
    secrets: 'Geheime Kellerräume befinden sich unter bestimmten Gebäuden.',
    locations: 'Typische Keller-Standorte: Rozhok, südlich von Yasnaya Polyana.'
  }
];

// --- STYLES & ANIMATIONS ---

const pageTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] }
};

const springTransition = {
  type: "spring",
  stiffness: 450,
  damping: 35
};

// --- COMPONENTS ---

const GlassCard = ({ children, className = '', onClick }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.015 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative group bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:border-white/30 transition-colors duration-500 overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    {children}
  </motion.div>
);

// New Component for Mouse-Following Nav
const DynamicNavItem = ({ id, icon: Icon, label, activeTab, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeTab === id;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveTab(id)}
      className="relative px-8 py-3 rounded-full flex items-center gap-2 group outline-none z-10"
    >
      {isActive && (
        <motion.div 
          layoutId="nav-active-pill"
          className="absolute inset-0 bg-white/15 backdrop-blur-3xl border border-white/20 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.3)]"
          transition={springTransition}
        />
      )}
      {isHovered && !isActive && (
        <motion.div 
          layoutId="nav-hover-pill"
          className="absolute inset-0 bg-white/5 rounded-full"
          transition={{ duration: 0.2 }}
        />
      )}
      <Icon size={18} className={`relative z-10 transition-all duration-500 ${isActive ? 'scale-110 text-blue-400' : 'text-gray-400 group-hover:text-gray-200 group-hover:scale-110'}`} />
      <span className={`relative z-10 font-bold tracking-tight text-sm ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{label}</span>
    </button>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ronSubTab, setRonSubTab] = useState('maps');
  const [activeDlc, setActiveDlc] = useState('base');
  const [selectedMap, setSelectedMap] = useState(null);
  const [spoilersUnlocked, setSpoilersUnlocked] = useState({});

  // Reset states when main tab changes to avoid state carry-over artifacts
  useEffect(() => {
    if (!activeTab.startsWith('ron-')) {
       // We keep selectedMap logic if we want to persist inside a tab, 
       // but here we reset only if we leave the game entirely
       if (activeTab === 'home') setSelectedMap(null);
    }
  }, [activeTab]);

  const renderHome = () => (
    <motion.div {...pageTransition} className="flex flex-col items-center justify-center min-h-[75vh] text-center space-y-16">
      <div className="relative">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-24 bg-blue-500/20 blur-[140px] rounded-full"
        ></motion.div>
        <h1 className="relative text-8xl md:text-[11rem] font-black tracking-tighter text-white select-none italic">
          in<span className="text-blue-500">TACTICS</span>
        </h1>
        <p className="relative mt-2 text-blue-400/50 text-xs font-black tracking-[0.6em] uppercase">Intelligence • Strategy • Precision</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl px-4">
        <GlassCard onClick={() => setActiveTab('ron')} className="p-12">
          <Shield size={56} className="text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Ready or Not</h2>
          <p className="text-white/20 text-xs mt-4 tracking-widest font-black">OPEN DATABASE</p>
        </GlassCard>
        <GlassCard onClick={() => setActiveTab('pubg')} className="p-12">
          <Crosshair size={56} className="text-yellow-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">PUBG</h2>
          <p className="text-white/20 text-xs mt-4 tracking-widest font-black">OPEN DATABASE</p>
        </GlassCard>
      </div>
    </motion.div>
  );

  const renderReadyOrNot = () => {
    if (selectedMap) return (
      <motion.div {...pageTransition} className="space-y-8 pt-24 pb-20">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => setSelectedMap(null)} 
          className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all"
        >
          <ChevronLeft size={20} /> Zurück zur Auswahl
        </motion.button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[50vh] rounded-[3.5rem] overflow-hidden border border-white/20 shadow-2xl">
              <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <span className="bg-red-600 text-white font-black px-4 py-1 rounded-md text-xs uppercase tracking-widest mb-4 inline-block">Tactical Analysis</span>
                <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter">{selectedMap.name}</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="p-10">
                <h3 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">Missionsprofil</h3>
                <p className="text-gray-200 text-lg leading-relaxed font-medium">{selectedMap.situation}</p>
              </GlassCard>
              <GlassCard className="p-10">
                <h3 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">Feindlage</h3>
                <p className="text-gray-200 text-lg leading-relaxed font-medium">{selectedMap.suspects}</p>
              </GlassCard>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4">Intel Footage</h3>
            {selectedMap.screenshots.map((img, i) => (
              <GlassCard key={i} className="aspect-video">
                <img src={img} className="w-full h-full object-cover" alt="Intel" />
              </GlassCard>
            ))}
          </div>
        </div>
      </motion.div>
    );

    // FIX: Ensure RON_MAPS is filtered safely
    const currentMaps = (RON_MAPS || []).filter(map => map && map.dlc === activeDlc);

    return (
      <motion.div {...pageTransition} key="ron-main" className="space-y-12 pt-28 pb-20">
        <div className="flex flex-col items-center gap-12">
          {/* Main RoN Subnav */}
          <div className="flex p-1.5 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full relative shadow-2xl">
            {['maps', 'weapons'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setRonSubTab(tab)} 
                className={`relative px-12 py-3.5 rounded-full font-black uppercase italic tracking-tighter text-sm z-10 transition-colors duration-500 ${ronSubTab === tab ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                {ronSubTab === tab && (
                  <motion.div layoutId="ron-active-sub" className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_30px_rgba(220,38,38,0.5)]" transition={springTransition} />
                )}
                {tab === 'maps' ? 'Operations' : 'Armory'}
              </button>
            ))}
          </div>

          {/* DLC Slider */}
          {ronSubTab === 'maps' && (
            <div className="flex items-center justify-center gap-10 w-full overflow-x-auto no-scrollbar px-6">
              <div className="w-16 h-[3px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] shrink-0 hidden md:block"></div>
              {[
                { id: 'base', label: 'READY OR NOT' },
                { id: 'home_invasion', label: 'HOME INVASION' },
                { id: 'dark_waters', label: 'DARK WATERS' }
              ].map(dlc => (
                <button 
                  key={dlc.id}
                  onClick={() => setActiveDlc(dlc.id)} 
                  className={`relative uppercase font-black italic tracking-[0.3em] text-[11px] transition-all shrink-0 py-4 ${activeDlc === dlc.id ? 'text-white' : 'text-white/20 hover:text-white/50'}`}
                >
                  {dlc.label}
                  {activeDlc === dlc.id && (
                    <motion.div 
                      layoutId="dlc-bar" 
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" 
                      transition={springTransition}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeDlc + ronSubTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {ronSubTab === 'maps' ? currentMaps.map(map => (
              <GlassCard key={map.id} onClick={() => setSelectedMap(map)} className="h-[450px]">
                <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <p className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-3">{map.codename}</p>
                  <h3 className="text-4xl font-black text-white italic uppercase leading-none tracking-tighter">{map.name}</h3>
                </div>
              </GlassCard>
            )) : (RON_WEAPONS || []).map(w => (
              <GlassCard key={w.id} className="p-12 border-red-500/10">
                <h4 className="text-3xl font-black text-white italic uppercase mb-2 tracking-tighter">{w.name}</h4>
                <div className="flex items-center gap-3 mb-6">
                   <span className="bg-red-600/20 text-red-500 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">{w.type}</span>
                </div>
                <p className="text-gray-400 text-base font-medium leading-relaxed">{w.desc}</p>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderPubg = () => (
    <motion.div {...pageTransition} className="pt-28 space-y-12 pb-20">
      <h2 className="text-7xl font-black text-white italic uppercase tracking-tighter">Battlegrounds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {(PUBG_MAPS || []).map(map => (
          <GlassCard key={map.id} onClick={() => setSelectedMap(map)} className="h-[450px]">
            <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
            <div className="absolute bottom-0 left-0 p-12 w-full bg-gradient-to-t from-black via-black/40 to-transparent">
              <span className="bg-yellow-500 text-black font-black text-[10px] px-3 py-1 rounded uppercase tracking-[0.2em]">{map.size}</span>
              <h3 className="text-5xl font-black text-white italic uppercase mt-4 tracking-tighter">{map.name}</h3>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#010101] font-sans text-white overflow-x-hidden selection:bg-blue-600/40">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          {activeTab === 'ron' ? (
            <motion.div 
              key="bg-ron"
              initial={{ opacity: 0, scale: 1.1 }} 
              animate={{ opacity: 0.35, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
            >
              <img src="Ready Or Not 2025.03.08 - 23.00.12.04.DVR - frame at 0m11s.jpg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101]"></div>
            </motion.div>
          ) : (
            <motion.div 
              key="bg-default"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <motion.div animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[-15%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[180px]"></motion.div>
              <motion.div animate={{ x: [0, -50, 0], y: [0, 70, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[180px]"></motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Floating Apple-Style Bar with Mouse Hover Flow */}
        <header className="fixed top-10 left-0 right-0 z-50 flex justify-center px-6">
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-black/20 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex items-center shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-4 pl-6 pr-4 border-r border-white/10 mr-2 hidden sm:flex">
              <span className="text-xl font-black tracking-tighter italic">in<span className="text-blue-500">T</span></span>
            </div>
            <div className="flex relative">
              <DynamicNavItem id="home" icon={Home} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
              <DynamicNavItem id="ron" icon={Shield} label="RoN" activeTab={activeTab} setActiveTab={setActiveTab} />
              <DynamicNavItem id="pubg" icon={Crosshair} label="PUBG" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </motion.nav>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab + (selectedMap?.id || 'none')} className="w-full">
              {activeTab === 'home' && renderHome()}
              {activeTab === 'ron' && renderReadyOrNot()}
              {activeTab === 'pubg' && renderPubg()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="w-full py-10 text-center text-white/10 font-black text-[10px] tracking-[1em] uppercase">
          Tactical Repository // inTACTICS v2.5
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #010101; cursor: default; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}} />
    </div>
  );
}
