import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock } from 'lucide-react';

// --- DATA MOCKS ---

const RON_MAPS = [
  {
    id: 'ron_213',
    game: 'ron',
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
    game: 'ron',
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
    game: 'ron',
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
    game: 'ron',
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
    game: 'pubg',
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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const springTransition = {
  type: "spring",
  stiffness: 450,
  damping: 35
};

// --- COMPONENTS ---

const GlassCard = ({ children, className = '', onClick }) => (
  <motion.div
    whileHover={onClick ? { y: -8, scale: 1.015 } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick}
    className={`relative group bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[2rem] shadow-xl transition-all duration-500 overflow-hidden ${onClick ? 'cursor-pointer hover:bg-white/10 hover:border-white/20' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

const DynamicNavItem = ({ id, icon: Icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className="relative px-8 py-3 rounded-full flex items-center gap-2 group outline-none z-10"
    >
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full"
          transition={springTransition}
        />
      )}
      <Icon size={18} className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'}`} />
      <span className={`relative z-10 font-bold tracking-tight text-sm ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{label}</span>
    </button>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ronSubTab, setRonSubTab] = useState('maps');
  const [activeDlc, setActiveDlc] = useState('base');
  const [selectedMap, setSelectedMap] = useState(null);

  const renderHome = () => (
    <motion.div {...pageTransition} className="pt-28 pb-20 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-white select-none italic leading-none">
          in<span className="text-blue-500">TACTICS</span>
        </h1>
        <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-xl">
          <Activity size={14} className="text-green-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">System Online • Ready for Deployment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quick Access Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard onClick={() => setActiveTab('ron')} className="p-10 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
              <Shield size={40} className="text-red-500 mb-6" />
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Ready or Not</h2>
              <p className="text-white/40 text-sm mt-2 font-medium">Tactical SWAT Simulation Data</p>
            </GlassCard>
            <GlassCard onClick={() => setActiveTab('pubg')} className="p-10 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
              <Crosshair size={40} className="text-yellow-500 mb-6" />
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">PUBG</h2>
              <p className="text-white/40 text-sm mt-2 font-medium">Battle Royale Reconnaissance</p>
            </GlassCard>
          </div>

          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="flex items-center gap-3 text-xl font-black italic uppercase tracking-tighter text-white">
                <Zap size={20} className="text-blue-400" /> Live Intel Feed
              </h3>
              <span className="text-[10px] text-white/20 font-mono">ID: 992-X-TACT</span>
            </div>
            <div className="space-y-4">
              {[
                { time: 'vor 2 Min', msg: 'Neue Meth-Labor Koordinaten in Twisted Nerve verifiziert.', status: 'info' },
                { time: 'vor 14 Min', msg: 'Erangel Geheimkeller-Update: Neue Standorte markiert.', status: 'update' },
                { time: 'vor 1 Std', msg: 'System-Abgleich abgeschlossen. Alle Karten-Layer aktiv.', status: 'system' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <div>
                    <p className="text-sm font-medium text-white/80 leading-snug">{item.msg}</p>
                    <span className="text-[10px] font-black uppercase text-white/20 mt-1 block tracking-wider">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Active Mission / Stats */}
        <div className="space-y-8">
          <GlassCard className="p-8 bg-blue-600/5 border-blue-500/20">
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-6">Last Viewed Intel</h3>
            {selectedMap ? (
              <div className="space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <img src={selectedMap.image} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-2xl font-black italic uppercase text-white leading-none">{selectedMap.name}</h4>
                  <p className="text-white/40 text-xs mt-2 font-mono uppercase tracking-tighter">{selectedMap.game === 'ron' ? 'Operation Area' : 'Combat Zone'}</p>
                </div>
                <button
                  onClick={() => setActiveTab(selectedMap.game)}
                  className="w-full py-4 bg-white text-black font-black uppercase italic tracking-tighter text-sm rounded-xl hover:bg-blue-400 transition-colors"
                >
                  Return to Intel
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center opacity-20">
                <Clock size={48} className="mb-4" />
                <p className="text-xs font-black uppercase tracking-widest italic">No Recent Activity</p>
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6">Tactical Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-black text-white/20 uppercase mb-1">Maps</p>
                <p className="text-2xl font-black italic text-white">05</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-black text-white/20 uppercase mb-1">Intel</p>
                <p className="text-2xl font-black italic text-white">42</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );

  const renderReadyOrNot = () => {
    // Check if a RoN map is selected
    if (selectedMap && selectedMap.game === 'ron') return (
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
            <div className="relative h-[50vh] rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <span className="bg-red-600 text-white font-black px-4 py-1 rounded-md text-xs uppercase tracking-widest mb-4 inline-block shadow-lg shadow-red-600/20">Tactical Analysis</span>
                <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedMap.name}</h1>
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
            {(selectedMap.screenshots || []).map((img, i) => (
              <GlassCard key={i} className="aspect-video">
                <img src={img} className="w-full h-full object-cover" alt="Intel" />
              </GlassCard>
            ))}
          </div>
        </div>
      </motion.div>
    );

    const currentMaps = RON_MAPS.filter(map => map.dlc === activeDlc);

    return (
      <motion.div {...pageTransition} key="ron-main" className="space-y-12 pt-28 pb-20">
        <div className="flex flex-col items-center gap-12">
          <div className="flex p-1.5 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full relative shadow-2xl">
            {['maps', 'weapons'].map((tab) => (
              <button
                key={tab}
                onClick={() => setRonSubTab(tab)}
                className={`relative px-12 py-3.5 rounded-full font-black uppercase italic tracking-tighter text-sm z-10 transition-colors duration-500 ${ronSubTab === tab ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                {ronSubTab === tab && (
                  <motion.div layoutId="ron-active-sub" className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_35px_rgba(220,38,38,0.4)]" transition={springTransition} />
                )}
                {tab === 'maps' ? 'Operations' : 'Armory'}
              </button>
            ))}
          </div>

          {ronSubTab === 'maps' && (
            <div className="flex items-center justify-center gap-10 w-full overflow-x-auto no-scrollbar px-6">
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
                    <motion.div layoutId="dlc-bar" className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]" transition={springTransition} />
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {ronSubTab === 'maps' ? currentMaps.map(map => (
              <GlassCard key={map.id} onClick={() => setSelectedMap(map)} className="h-[480px]">
                <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <p className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4">{map.codename}</p>
                  <h3 className="text-4xl font-black text-white italic uppercase leading-none tracking-tighter">{map.name}</h3>
                </div>
              </GlassCard>
            )) : RON_WEAPONS.map(w => (
              <GlassCard key={w.id} className="p-12 border-red-500/20 bg-white/[0.03]">
                <h4 className="text-3xl font-black text-white italic uppercase mb-2 tracking-tighter">{w.name}</h4>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-red-600/30 text-red-400 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-red-500/10">{w.type}</span>
                </div>
                <p className="text-gray-300 text-base font-medium leading-relaxed">{w.desc}</p>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderPubg = () => {
    if (selectedMap && selectedMap.game === 'pubg') return (
      <motion.div {...pageTransition} className="space-y-8 pt-24 pb-20">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => setSelectedMap(null)}
          className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all"
        >
          <ChevronLeft size={20} /> Zurück zur Auswahl
        </motion.button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative h-[60vh] rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-black">
            <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12">
              <span className="bg-yellow-500 text-black font-black px-4 py-1 rounded-md text-xs uppercase tracking-widest mb-4 inline-block shadow-lg shadow-yellow-500/20">Map Intel</span>
              <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedMap.name}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <GlassCard className="p-10">
              <h3 className="text-yellow-500 font-black uppercase text-xs tracking-widest mb-4">Übersicht</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-medium">{selectedMap.info}</p>
            </GlassCard>
            <GlassCard className="p-10 border-yellow-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={18} className="text-yellow-500" />
                <h3 className="text-yellow-500 font-black uppercase text-xs tracking-widest">Map Secrets</h3>
              </div>
              <p className="text-gray-200 text-lg leading-relaxed font-medium mb-4">{selectedMap.secrets}</p>
              <div className="p-6 bg-black/40 rounded-2xl border border-white/10">
                <p className="text-sm text-white/60 italic leading-relaxed">{selectedMap.locations}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    );

    return (
      <motion.div {...pageTransition} className="pt-28 space-y-12 pb-20">
        <h2 className="text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Battlegrounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PUBG_MAPS.map(map => (
            <GlassCard key={map.id} onClick={() => setSelectedMap(map)} className="h-[480px]">
              <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
              <div className="absolute bottom-0 left-0 p-12 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                <span className="bg-yellow-500 text-black font-black text-[10px] px-3 py-1 rounded uppercase tracking-[0.2em]">{map.size}</span>
                <h3 className="text-5xl font-black text-white italic uppercase mt-4 tracking-tighter leading-none">{map.name}</h3>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#010101] font-sans text-white overflow-x-hidden selection:bg-blue-600/40">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeTab === 'ron' ? (
            <motion.div key="bg-ron" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <motion.div
                animate={{ backgroundColor: ['rgba(0,0,255,0)', 'rgba(0,0,255,0.08)', 'rgba(255,0,0,0.05)', 'rgba(0,0,255,0)'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101] z-20"></div>
            </motion.div>
          ) : (
            <motion.div key="bg-default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <div className="absolute top-[-15%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[180px]"></div>
              <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[180px]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        <header className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex items-center shadow-2xl"
          >
            <div className="flex relative">
              <DynamicNavItem id="home" icon={Home} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
              <DynamicNavItem id="ron" icon={Shield} label="RoN" activeTab={activeTab} setActiveTab={setActiveTab} />
              <DynamicNavItem id="pubg" icon={Crosshair} label="PUBG" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </motion.nav>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab + (selectedMap?.id || 'list')} className="w-full">
              {activeTab === 'home' && renderHome()}
              {activeTab === 'ron' && renderReadyOrNot()}
              {activeTab === 'pubg' && renderPubg()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="w-full py-10 text-center text-white/10 font-black text-[10px] tracking-[1em] uppercase">
          Tactical Repository // inTACTICS v2.8
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #010101; cursor: default; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}} />
    </div>
  );
}