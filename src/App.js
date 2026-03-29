import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle } from 'lucide-react';

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
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
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
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: ['https://images.unsplash.com/photo-1582719478250-c8940062db08?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'ron_gas_station',
    game: 'ron',
    dlc: 'base',
    name: '4U Gas Station',
    codename: 'Thank You, Come Again',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&q=80&w=800',
    situation: 'Ein lokaler Drogenring überfällt eine Tankstelle. Zivilisten in Gefahr.',
    suspects: 'Desorganisierte Kriminelle, meist bewaffnet mit Pistolen und Schrotflinten.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_mindjot',
    game: 'ron',
    dlc: 'base',
    name: 'Mindjot Data Center',
    codename: 'The Spider',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    situation: 'Razzia in einem illegal operierenden Rechenzentrum.',
    suspects: 'Bewaffnete private Sicherheitskräfte. Taktisches Vorgehen erforderlich.',
    tacticalMap: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_brisa',
    game: 'ron',
    dlc: 'base',
    name: 'Brisa Cove',
    codename: 'Ides of March',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?auto=format&fit=crop&q=80&w=800',
    situation: 'Schwer bewaffnete Veteranen haben sich in einem Apartmentkomplex verschanzt.',
    suspects: 'Ex-Militärs. Extrem gefährlich, mit Körperpanzerung und Sprengfallen ausgestattet.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_neon',
    game: 'ron',
    dlc: 'base',
    name: 'Neon Nightclub',
    codename: 'Neon Tomb',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    situation: 'Aktiver Schütze in einem überfüllten Nachtclub.',
    suspects: 'Terrormiliz, zielt auf maximale zivile Verluste ab. Sprengstoffwesten wahrscheinlich.',
    tacticalMap: 'https://images.unsplash.com/photo-1598368195835-91e67f80c9d7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_voll',
    game: 'ron',
    dlc: 'base',
    name: 'Voll Health House',
    codename: 'Valley of the Dolls',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    situation: 'Zugriff auf die Luxusvilla eines verdächtigten Ringführers für illegalen Handel.',
    suspects: 'Private Security Forces mit schnellen Reaktionszeiten. Schweres Gerät.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_postal',
    game: 'ron',
    dlc: 'base',
    name: 'Los Suenos Postal Service',
    codename: 'Greased Palms',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed745eb33?auto=format&fit=crop&q=80&w=800',
    situation: 'Große Sortieranlage der Post wurde von einem Kartell infiltriert.',
    suspects: 'Stark bewaffnete Kartellmitglieder. Große, offene Areale mit vielen Sichtlinien.',
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_college',
    game: 'ron',
    dlc: 'base',
    name: 'Watt Community College',
    codename: 'Elephant',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    situation: 'Amoklauf auf einem College-Campus. Zeitkritische Mission.',
    suspects: 'Mehrere aktive Schützen, die Sprengfallen ausgelegt haben könnten.',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_hospital',
    game: 'ron',
    dlc: 'base',
    name: 'Coastal Grove Medical Center',
    codename: 'Relapse',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    situation: 'Terroristen haben ein Krankenhaus gestürmt. Ärzte und Patienten sind Geiseln.',
    suspects: 'Gut ausgebildete Extremisten mit automatischen Waffen.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_farm',
    game: 'ron',
    dlc: 'base',
    name: 'Cherryessa Farm',
    codename: 'Carriers of the Vine',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=800',
    situation: 'Razzia bei einem gefährlichen Kult auf einer abgelegenen Farm.',
    suspects: 'Fanatische Kultmitglieder, die bereit sind, bis zum Tod zu kämpfen.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
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
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'ron_dormer',
    game: 'ron',
    dlc: 'home_invasion',
    name: 'Dormer',
    codename: 'Lawmaker',
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800',
    situation: 'Notruf wegen eines Überfalls auf ein suburbanes Haus.',
    suspects: 'Drei bis vier bewaffnete Einbrecher mit kriminellem Hintergrund.',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_narcos',
    game: 'ron',
    dlc: 'home_invasion',
    name: 'Narcos',
    codename: 'Gated Community',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    situation: 'Schwere Auseinandersetzung in einer abgeschotteten Wohnanlage nach dem Hurrikan.',
    suspects: 'Organisierte Gangmitglieder, die das Chaos ausnutzen.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
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
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
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

const NEWS_POOL = [
  {
    id: 'n1',
    mapId: 'ron_213',
    type: 'CRITICAL',
    headline: 'Razzia in Vorort eskaliert: Kartell-Beteiligung vermutet',
    fact: 'Die Verdächtigen in 213 Park Homes haben in den letzten 48 Stunden ein provisorisches Tunnelsystem zwischen zwei Häusern fertiggestellt.',
    content: 'Jüngste Überwachungsdaten zeigen ungewöhnlich hohe thermische Signaturen im Bereich von 213 Park Homes. Informanten berichten, dass die lokale Gang Unterstützung von einem überregionalen Kartell erhalten hat. Das bedeutet: Bessere Bewaffnung, Sprengfallen an den Eingängen und eine extrem hohe Bereitschaft, tödliche Gewalt anzuwenden. Das SWAT-Team muss mit durchschlagender Munition und improvisierter Panzerung der Feinde rechnen.'
  },
  {
    id: 'n2',
    mapId: 'ron_hotel',
    type: 'UPDATE',
    headline: 'Geiselnahme Wenderly Hills: Forderungen bekannt',
    fact: 'Die Täter im Wenderly Hills Hotel fordern 50 Millionen Dollar in einer unregulierten Kryptowährung, ansonsten droht stündlich eine Exekution.',
    content: 'Die Situation im obersten Stockwerk des Wenderly Hills ist hochgradig volatil. Bei den Angreifern handelt es sich nicht um gewöhnliche Kriminelle, sondern um paramilitärisch ausgebildete Söldner. Sie haben C4-Sprengladungen an den tragenden Säulen des Penthouses angebracht. Ein direkter Frontalangriff durch die Aufzugsschächte gilt als Suizidkommando. Alternative Zugänge über das Dach oder Belüftungsschächte werden derzeit vom LSPD geprüft.'
  },
  {
    id: 'n3',
    mapId: 'ron_redwood',
    type: 'INFO',
    headline: 'Redwood-Anwesen: Plünderer hochgradig bewaffnet',
    fact: 'Die Waffen der Plünderer stammen aus einem FEMA-Konvoi, der während des jüngsten Sturms überfallen wurde.',
    content: 'Was als unkoordinierte Plünderung nach einem verheerenden Unwetter begann, hat sich zu einer Festungssituation entwickelt. Die Verdächtigen auf dem Redwood-Anwesen haben militärische Sturmgewehre erbeutet und Schutzwesten der Klasse III. Das unübersichtliche Gelände und die durch den Sturm verursachten Trümmer machen eine lautlose Annäherung extrem schwierig. Scharfschützen-Support ist aufgrund der dichten Bewaldung nur bedingt möglich.'
  },
  {
    id: 'n4',
    mapId: 'ron_port',
    type: 'FLASH',
    headline: 'Port Hokan: Militärische Sprengsätze in Container 404',
    fact: 'Der Schmuggelring nutzt das regnerische Wetter, um thermische Drohnen des LSPD zu blenden.',
    content: 'Operation "Versteckte Fracht" geht in die heiße Phase. Zollpapiere, die von Undercover-Agenten sichergestellt wurden, deuten darauf hin, dass illegale russische Waffentechnologie verschifft werden soll. Die Verdächtigen tragen modernste Nachtsichtgeräte. Es wird dringend empfohlen, die Stromversorgung des Docks vor dem Zugriff zu kappen und auf NVG-Ausrüstung zu setzen, um den taktischen Vorteil auf unsere Seite zu ziehen.'
  },
  {
    id: 'n5',
    mapId: 'pubg_erangel',
    type: 'RECON',
    headline: 'Erangel: Neue Untergrund-Bunker verifiziert',
    fact: 'Die sowjetischen Bunkeranlagen unter Erangel wurden ursprünglich 1968 erbaut und kürzlich von Überlebenden aufgebrochen.',
    content: 'Unsere Satellitenaufklärung hat neue Eingänge zu den Geheimkellern auf Erangel markiert. Besonders das Gebiet südlich von Yasnaya Polyana zeigt frische Reifenspuren, die im Nichts enden. Die Keller sind mit hochstufigem Loot (Level 3 Ausrüstung) gefüllt, jedoch oft von anderen Squads stark umkämpft. Wir raten zu äußerster Vorsicht bei der Annäherung: Flashbangs sind essenziell, bevor man in die engen Korridore hinabsteigt.'
  }
];

// --- STYLES & ANIMATIONS ---

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" }
};

const springTransition = {
  type: "spring",
  stiffness: 450,
  damping: 35
};

// --- CONSTANTS ---
const SESSION_TIMEOUT = 10 * 60 * 1000;
const STORAGE_KEY_STATE = 'inTactics_app_state';
const STORAGE_KEY_TIME = 'inTactics_last_active';

// --- COMPONENTS ---

const GlassCard = ({ children, className = '', onClick }) => (
  <motion.div
    whileHover={onClick ? { y: -5, scale: 1.01 } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick}
    className={`relative group bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] shadow-xl transition-all duration-300 overflow-hidden ${onClick ? 'cursor-pointer hover:bg-white/10 hover:border-white/20' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

const DynamicNavItem = ({ id, icon: Icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className="relative flex-1 md:flex-none px-4 md:px-8 py-4 md:py-3 rounded-full flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 group outline-none z-10"
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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ronSubTab, setRonSubTab] = useState('maps');
  const [activeDlc, setActiveDlc] = useState('base');
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [isRestored, setIsRestored] = useState(false);
  const [liveFeed, setLiveFeed] = useState([]);

  // --- LIVE FEED LOGIC ---
  useEffect(() => {
    // Initial feed (take 3 random)
    const shuffled = [...NEWS_POOL].sort(() => 0.5 - Math.random());
    setLiveFeed(shuffled.slice(0, 3).map(item => ({ ...item, timestamp: new Date() })));

    // Update feed every 15 minutes
    const intervalId = setInterval(() => {
      setLiveFeed(currentFeed => {
        // Find an item not currently in the feed
        const currentIds = currentFeed.map(i => i.id);
        const availablePool = NEWS_POOL.filter(i => !currentIds.includes(i.id));

        if (availablePool.length === 0) return currentFeed; // Failsafe

        const nextItem = availablePool[Math.floor(Math.random() * availablePool.length)];
        const newItemWithTime = { ...nextItem, timestamp: new Date() };

        // Add to top, remove oldest
        return [newItemWithTime, ...currentFeed.slice(0, 2)];
      });
    }, 15 * 60 * 1000); // Geändert von 8000 (8 Sek.) zu 15 * 60 * 1000 (15 Min.)

    return () => clearInterval(intervalId);
  }, []);

  // --- STATE PERSISTENCE LOGIC ---
  useEffect(() => {
    const lastActive = localStorage.getItem(STORAGE_KEY_TIME);
    const now = Date.now();

    if (lastActive && (now - parseInt(lastActive)) < SESSION_TIMEOUT) {
      try {
        const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY_STATE));
        if (savedState) {
          setActiveTab(savedState.activeTab || 'home');
          setRonSubTab(savedState.ronSubTab || 'maps');
          setActiveDlc(savedState.activeDlc || 'base');

          if (savedState.selectedMapId) {
            const allMaps = [...RON_MAPS, ...PUBG_MAPS];
            const mapToSelect = allMaps.find(m => m.id === savedState.selectedMapId);
            setSelectedMap(mapToSelect || null);
          }

          if (savedState.selectedArticleId) {
            const articleToSelect = NEWS_POOL.find(n => n.id === savedState.selectedArticleId);
            setSelectedArticle(articleToSelect || null);
          }

          if (savedState.scrollPosition) {
            setTimeout(() => window.scrollTo(0, savedState.scrollPosition), 150);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY_STATE);
      localStorage.removeItem(STORAGE_KEY_TIME);
    }

    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (!isRestored) return;

    const stateToSave = {
      activeTab,
      ronSubTab,
      activeDlc,
      selectedMapId: selectedMap?.id || null,
      selectedArticleId: selectedArticle?.id || null,
      scrollPosition: window.scrollY
    };

    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(stateToSave));
    localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
  }, [activeTab, ronSubTab, activeDlc, selectedMap, selectedArticle, isRestored]);

  useEffect(() => {
    if (!isRestored) return;

    let timeoutId = null;
    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          try {
            const currentState = JSON.parse(localStorage.getItem(STORAGE_KEY_STATE) || '{}');
            currentState.scrollPosition = window.scrollY;
            localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(currentState));
            localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
          } catch (e) { }
          timeoutId = null;
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    const handleClick = () => localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isRestored]);

  // --- ACTIONS ---
  const handleOpenMissionFromArticle = (mapId) => {
    const allMaps = [...RON_MAPS, ...PUBG_MAPS];
    const map = allMaps.find(m => m.id === mapId);
    if (map) {
      setSelectedArticle(null);
      setActiveTab(map.game);
      setSelectedMap(map);
      if (map.game === 'ron') {
        setActiveDlc(map.dlc);
        setRonSubTab('maps');
      }
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'FLASH': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'UPDATE': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  // --- RENDER FUNCTIONS ---

  const renderHome = () => {
    if (selectedArticle) {
      // --- INSIDER ARTICLE DOSSIER VIEW ---
      return (
        <motion.div {...pageTransition} className="pt-20 md:pt-24 pb-32 md:pb-20 space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm w-fit"
          >
            <ChevronLeft size={18} /> Zurück zum Feed
          </motion.button>

          <GlassCard className="p-8 md:p-14 border-t-4 border-t-red-600 bg-gradient-to-b from-red-900/10 to-transparent">
            <div className="flex items-center gap-4 mb-8">
              <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${getTypeColor(selectedArticle.type)}`}>
                {selectedArticle.type}
              </span>
              <span className="text-white/40 text-xs font-mono">ID: {selectedArticle.id}-CLASS</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 leading-tight">
              {selectedArticle.headline}
            </h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 flex items-start gap-4">
              <Info className="text-blue-400 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">Random Fact // Intel</h4>
                <p className="text-blue-100 font-medium italic leading-relaxed text-sm md:text-base">
                  "{selectedArticle.fact}"
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-red-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <FileText size={16} /> Volles Dossier
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                {selectedArticle.content}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <button
                onClick={() => handleOpenMissionFromArticle(selectedArticle.mapId)}
                className="w-full flex items-center justify-center gap-3 py-4 md:py-5 bg-white text-black rounded-2xl font-black italic uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              >
                <Target size={20} /> Zum Taktischen Briefing
              </button>
            </div>
          </GlassCard>
        </motion.div>
      );
    }

    // --- DEFAULT HOME VIEW ---
    return (
      <motion.div {...pageTransition} className="pt-20 md:pt-28 pb-32 md:pb-20 space-y-8 md:space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-16">
          <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-black tracking-tighter text-white select-none italic leading-none">
            in<span className="text-blue-500">TACTICS</span>
          </h1>
          <div className="flex items-center gap-3 bg-white/5 px-4 md:px-6 py-2 rounded-full border border-white/10 backdrop-blur-xl">
            <Activity size={12} className="text-green-500 animate-pulse" />
            <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/60">System Online • Ready for Deployment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <GlassCard onClick={() => setActiveTab('ron')} className="p-6 md:p-10 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
                <Shield size={32} className="text-red-500 mb-4 md:mb-6" />
                <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Ready or Not</h2>
                <p className="text-white/40 text-xs md:text-sm mt-1 md:mt-2 font-medium">Tactical SWAT Simulation Data</p>
              </GlassCard>
              <GlassCard onClick={() => setActiveTab('pubg')} className="p-6 md:p-10 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
                <Crosshair size={32} className="text-yellow-500 mb-4 md:mb-6" />
                <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">PUBG</h2>
                <p className="text-white/40 text-xs md:text-sm mt-1 md:mt-2 font-medium">Battle Royale Reconnaissance</p>
              </GlassCard>
            </div>

            {/* LIVE INTEL FEED */}
            <GlassCard className="p-6 md:p-8 flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-black italic uppercase tracking-tighter text-white">
                  <Zap size={18} className="text-blue-400 animate-pulse" /> Live Intel Feed
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Syncing</span>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 mask-image-b space-y-3 md:space-y-4">
                  <AnimatePresence>
                    {liveFeed.map((item, index) => (
                      <motion.div
                        key={item.id + item.timestamp.getTime()}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={() => setSelectedArticle(item)}
                        className="group flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <span className="text-[10px] text-white/30 font-mono">
                            {index === 0 ? 'GERADE EBEN' : 'AKTUALISIERT'}
                          </span>
                        </div>
                        <h4 className="text-sm md:text-base font-bold text-white/90 leading-tight group-hover:text-blue-400 transition-colors">
                          {item.headline}
                        </h4>
                        <p className="text-xs text-white/50 italic line-clamp-1 group-hover:text-white/70">
                          <span className="font-bold text-white/40">Fact:</span> {item.fact}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6 md:space-y-8">
            <GlassCard className="p-6 md:p-8 bg-blue-600/5 border-blue-500/20">
              <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-blue-400 mb-4 md:mb-6">Last Viewed Intel</h3>
              {selectedMap ? (
                <div className="space-y-4 md:space-y-6">
                  <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
                    <img src={selectedMap.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black italic uppercase text-white leading-none">{selectedMap.name}</h4>
                    <p className="text-white/40 text-[10px] mt-2 font-mono uppercase tracking-tighter">{selectedMap.game === 'ron' ? 'Operation Area' : 'Combat Zone'}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab(selectedMap.game)}
                    className="w-full py-3 md:py-4 bg-white text-black font-black uppercase italic tracking-tighter text-xs md:text-sm rounded-xl hover:bg-blue-400 transition-colors"
                  >
                    Return to Intel
                  </button>
                </div>
              ) : (
                <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center opacity-20">
                  <Clock size={40} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest italic">No Recent Activity</p>
                </div>
              )}
            </GlassCard>

            <GlassCard className="p-6 md:p-8">
              <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/40 mb-4 md:mb-6">Tactical Status</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Maps</p>
                  <p className="text-xl md:text-2xl font-black italic text-white">05</p>
                </div>
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Intel</p>
                  <p className="text-xl md:text-2xl font-black italic text-white">42</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderReadyOrNot = () => {
    if (selectedMap && selectedMap.game === 'ron') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => setSelectedMap(null)}
          className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"
        >
          <ChevronLeft size={18} /> Zurück zur Auswahl
        </motion.button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="relative h-[40vh] md:h-[50vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 pr-6">
                <span className="bg-red-600 text-white font-black px-3 md:px-4 py-1 rounded-md text-[8px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 inline-block shadow-lg shadow-red-600/20">Tactical Analysis</span>
                <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none">{selectedMap.name}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <GlassCard className="p-6 md:p-10">
                <h3 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-3 md:mb-4">Missionsprofil</h3>
                <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">{selectedMap.situation}</p>
              </GlassCard>
              <GlassCard className="p-6 md:p-10">
                <h3 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-3 md:mb-4">Feindlage</h3>
                <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">{selectedMap.suspects}</p>
              </GlassCard>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {selectedMap.tacticalMap && (
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4">Tactical Blueprint</h3>
                <GlassCard className="aspect-square md:aspect-[4/3] bg-black/50 p-4 border-red-500/20">
                  <div className="relative w-full h-full bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                    <img src={selectedMap.tacticalMap} className="w-full h-full object-cover opacity-70 contrast-125 grayscale" alt="Blueprint" style={{ filter: 'invert(1) hue-rotate(180deg)' }} />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="bg-red-600/80 text-white text-[8px] px-2 py-1 rounded font-mono uppercase tracking-widest animate-pulse">Top Secret</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4 mt-4 md:mt-0">Intel Footage</h3>
              {(selectedMap.screenshots || []).map((img, i) => (
                <GlassCard key={i} className="aspect-video relative overflow-hidden group">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Intel" />
                  <div className="absolute inset-0 border-[2px] border-white/0 group-hover:border-red-500/50 transition-colors pointer-events-none rounded-[1.5rem] md:rounded-[2rem]"></div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );

    const currentMaps = RON_MAPS.filter(map => map.dlc === activeDlc);

    return (
      <motion.div {...pageTransition} key="ron-main" className="space-y-8 md:space-y-12 pt-20 md:pt-28 pb-32 md:pb-20">
        <div className="flex flex-col items-center gap-6 md:gap-12">
          <div className="w-fit mx-auto">
            <div className="flex p-[3px] md:p-1 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full relative shadow-2xl overflow-hidden">
              {['maps', 'weapons'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRonSubTab(tab)}
                  className={`relative px-8 md:px-14 py-2 md:py-3.5 rounded-full font-black uppercase italic tracking-tighter text-[10px] md:text-[13px] z-10 transition-colors duration-500 ${ronSubTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  {ronSubTab === tab && (
                    <motion.div
                      layoutId="ron-active-sub"
                      className="absolute inset-0 bg-[#e31e24] rounded-full -z-10 shadow-[0_0_30px_rgba(227,30,36,0.3)]"
                      transition={springTransition}
                    />
                  )}
                  {tab === 'maps' ? 'Operations' : 'Armory'}
                </button>
              ))}
            </div>
          </div>

          {ronSubTab === 'maps' && (
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 w-full overflow-x-auto no-scrollbar px-6 border-b border-white/5">
              {[
                { id: 'base', label: 'READY OR NOT' },
                { id: 'home_invasion', label: 'HOME INVASION' },
                { id: 'dark_waters', label: 'DARK WATERS' }
              ].map(dlc => (
                <button
                  key={dlc.id}
                  onClick={() => setActiveDlc(dlc.id)}
                  className={`relative uppercase font-black italic tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[11px] transition-all shrink-0 py-4 md:py-5 ${activeDlc === dlc.id ? 'text-white' : 'text-white/20 hover:text-white/50'}`}
                >
                  {dlc.label}
                  {activeDlc === dlc.id && (
                    <motion.div layoutId="dlc-bar" className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]" transition={springTransition} />
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
          >
            {ronSubTab === 'maps' ? currentMaps.map(map => (
              <GlassCard key={map.id} onClick={() => setSelectedMap(map)} className="h-[350px] md:h-[480px]">
                <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                  <p className="text-red-600 font-mono text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4">{map.codename}</p>
                  <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase leading-tight tracking-tighter">{map.name}</h3>
                </div>
              </GlassCard>
            )) : RON_WEAPONS.map(w => (
              <GlassCard key={w.id} className="p-8 md:p-12 border-red-500/20 bg-white/[0.03]">
                <h4 className="text-xl md:text-3xl font-black text-white italic uppercase mb-2 tracking-tighter">{w.name}</h4>
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <span className="bg-red-600/30 text-red-400 text-[8px] md:text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-red-500/10">{w.type}</span>
                </div>
                <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed">{w.desc}</p>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderPubg = () => {
    if (selectedMap && selectedMap.game === 'pubg') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => setSelectedMap(null)}
          className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"
        >
          <ChevronLeft size={18} /> Zurück zur Auswahl
        </motion.button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="relative h-[40vh] md:h-[60vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-black">
            <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12">
              <span className="bg-yellow-500 text-black font-black px-3 md:px-4 py-1 rounded-md text-[8px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 inline-block shadow-lg shadow-yellow-500/20">Map Intel</span>
              <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedMap.name}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-8">
            <GlassCard className="p-6 md:p-10">
              <h3 className="text-yellow-500 font-black uppercase text-[10px] tracking-widest mb-3 md:mb-4">Übersicht</h3>
              <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">{selectedMap.info}</p>
            </GlassCard>
            <GlassCard className="p-6 md:p-10 border-yellow-500/20">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Lock size={16} className="text-yellow-500" />
                <h3 className="text-yellow-500 font-black uppercase text-[10px] tracking-widest">Map Secrets</h3>
              </div>
              <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium mb-4">{selectedMap.secrets}</p>
              <div className="p-4 md:p-6 bg-black/40 rounded-xl md:rounded-2xl border border-white/10">
                <p className="text-xs md:text-sm text-white/60 italic leading-relaxed">{selectedMap.locations}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    );

    return (
      <motion.div {...pageTransition} className="pt-20 md:pt-28 space-y-8 md:space-y-12 pb-32 md:pb-20">
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Battlegrounds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {PUBG_MAPS.map(map => (
            <GlassCard key={map.id} onClick={() => setSelectedMap(map)} className="h-[350px] md:h-[480px]">
              <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                <span className="bg-yellow-500 text-black font-black text-[8px] md:text-[10px] px-3 py-1 rounded uppercase tracking-[0.2em]">{map.size}</span>
                <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase mt-3 md:mt-4 tracking-tighter leading-none">{map.name}</h3>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#010101] font-sans text-white overflow-x-hidden selection:bg-blue-600/40">

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

        <header className="fixed md:top-8 max-md:bottom-0 left-0 right-0 z-50 flex justify-center md:px-6 max-md:pb-0">
          <motion.nav
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/60 md:bg-black/40 backdrop-blur-3xl border-t md:border border-white/10 max-md:rounded-t-[2rem] md:rounded-full p-2 flex items-center shadow-2xl w-full md:w-auto"
          >
            <div className="flex relative w-full md:w-auto px-2 md:px-0">
              <DynamicNavItem id="home" icon={Home} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
              <DynamicNavItem id="ron" icon={Shield} label="RoN" activeTab={activeTab} setActiveTab={setActiveTab} />
              <DynamicNavItem id="pubg" icon={Crosshair} label="PUBG" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </motion.nav>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            {isRestored && (
              <motion.div key={activeTab + (selectedMap?.id || 'list') + (selectedArticle?.id || 'no-art')} className="w-full">
                {activeTab === 'home' && renderHome()}
                {activeTab === 'ron' && renderReadyOrNot()}
                {activeTab === 'pubg' && renderPubg()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="w-full py-8 md:py-10 text-center text-white/10 font-black text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[1em] uppercase mb-20 md:mb-0">
          Tactical Repository // inTACTICS v2.9
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #010101; cursor: default; -webkit-font-smoothing: antialiased; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-image-b { -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%); mask-image: linear-gradient(to bottom, black 70%, transparent 100%); }
        * { -webkit-tap-highlight-color: transparent; }
        
        @media (max-width: 768px) {
          h1 { word-break: break-word; }
        }
      `}} />
    </div>
  );
}