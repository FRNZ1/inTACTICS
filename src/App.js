import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings,
  Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle,
  Search, Play, Pause, ZoomIn, ZoomOut, Layers, CheckSquare, Square, MapPin, Skull,
  Undo, Redo, Maximize, Minimize, ChevronRight, Sun, AlignJustify, HardHat, User,
  ShieldCheck, Plus, Minus, Edit3, Hand, LogOut, Sparkles, Wand2, Save, ClipboardList, Flag
} from 'lucide-react';

// --- FIREBASE INITIALIZATION ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection } from 'firebase/firestore';

// --- DATA MOCKS RoN-Maps ---

import { RON_MAPS } from "./data/Maps/ron_maps.js";
import { RON_WEAPONS } from "./data/Armory/ron_weapons.js";
import { TacticalBlueprint } from "./data/Maps/objects.js";

let app, auth, db, appId;
try {
  const firebaseConfig = {
    apiKey: "demo",
    authDomain: "demo",
    projectId: "demo",
    appId: "demo"
  };
} catch (e) {
  console.warn("Firebase config not found or invalid. Persistence will be disabled.");
}

// --- CONSTANTS ---
const DIFFICULTIES = ['Easy', 'Moderate', 'Hard'];
const RANKS = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

// --- DATA MOCKS ---

const WEAPON_CATEGORIES = [
  { id: 'Assault Rifle', label: 'Assault Rifle' },
  { id: 'Battle Rifle', label: 'Battle Rifle' },
  { id: 'PDW', label: 'PDW' },
  { id: 'Submachine Gun', label: 'Submachine Gun' },
  { id: 'Shotgun', label: 'Shotgun' },
  { id: 'Launcher', label: 'Launcher' },
  { id: 'Less-Lethal', label: 'Less-Lethal' },
  { id: 'Pistol', label: 'Pistol' },
  { id: 'Pistol-Less-Lethal', label: 'Pistol-Less-Lethal' }
];

const RON_ATTACHMENTS = {
  Optic: [
    { id: 't1', name: 'Aimpoint T1' },
    { id: 'srs', name: 'SRS' },
    { id: 'holo_exps3', name: 'Holo (EXPS3)' },
    { id: 'magnifier_3x', name: 'Sight W/ 3X Magnifier' },
    { id: 'rmrdot', name: 'RMR Dot' }
  ],
  Muzzle: [
    { id: 'socom', name: 'SOCOM Suppressor' },
    { id: 'socom_pistol', name: 'Suppressor (Pistol)' },
    { id: 'xfbrake', name: 'XF Brake' },
    { id: 'choke', name: 'Shotgun Choke' }
  ],
  Underbarrel: [
    { id: 'combat', name: 'Combat Grip' },
    { id: 'angled', name: 'Angled Grip' },
    { id: 'flashlight_sec', name: 'Flashlight (Pistol)' }
  ],
  Overbarrel: [
    { id: 'laser', name: 'Laser Pointer' }
  ],
  Miscellaneous: [
    { id: 'nomisc', name: 'No Miscellaneous' }
  ],
  Illuminator: [
    { id: 'm600v', name: 'M600V Flashlight' }
  ]
};

const RON_HEADWEAR_OPTIONS = [
  {
    id: 'helmet_ballistic', name: 'Ballistic Helmet', type: 'helmet', image: 'https://static.wikia.nocookie.net/ready-or-not/images/d/df/Ballistic_Helmet.png/revision/latest/scale-to-width-down/150', desc: 'Schützt vor Pistolenbeschuss.',
    skins: [
      { id: 'lspd_black', name: 'LSPD Black', image: 'https://static.wikia.nocookie.net/ready-or-not/images/d/df/Ballistic_Helmet.png/revision/latest/scale-to-width-down/150' },
      { id: 'ranger_green', name: 'Ranger Green', image: 'https://static.wikia.nocookie.net/ready-or-not/images/d/df/Ballistic_Helmet.png/revision/latest/scale-to-width-down/150' },
      { id: 'multicam', name: 'MultiCam', image: 'https://static.wikia.nocookie.net/ready-or-not/images/d/df/Ballistic_Helmet.png/revision/latest/scale-to-width-down/150' }
    ]
  },
  {
    id: 'helmet_bump', name: 'Bump Helmet', type: 'helmet', image: 'https://static.wikia.nocookie.net/ready-or-not/images/7/7b/Bump_Helmet.png/revision/latest/scale-to-width-down/150', desc: 'Leichter Helm ohne ballistischen Schutz.',
    skins: [
      { id: 'black', name: 'Black', image: 'https://static.wikia.nocookie.net/ready-or-not/images/7/7b/Bump_Helmet.png/revision/latest/scale-to-width-down/150' },
      { id: 'tan', name: 'Tan', image: 'https://static.wikia.nocookie.net/ready-or-not/images/7/7b/Bump_Helmet.png/revision/latest/scale-to-width-down/150' }
    ]
  },
  {
    id: 'nvg', name: 'Night Vision (NVG)', type: 'nvg', image: 'https://static.wikia.nocookie.net/ready-or-not/images/f/f6/NVG.png/revision/latest/scale-to-width-down/150', desc: 'Sicht bei absoluter Dunkelheit.',
    skins: [
      { id: 'gpnvg_black', name: 'GPNVG-18 (Black)', image: 'https://static.wikia.nocookie.net/ready-or-not/images/f/f6/NVG.png/revision/latest/scale-to-width-down/150' },
      { id: 'gpnvg_tan', name: 'GPNVG-18 (Tan)', image: 'https://static.wikia.nocookie.net/ready-or-not/images/f/f6/NVG.png/revision/latest/scale-to-width-down/150' },
      { id: 'pvs15_black', name: 'PVS-15 (Black)', image: 'https://static.wikia.nocookie.net/ready-or-not/images/f/f6/NVG.png/revision/latest/scale-to-width-down/150' }
    ]
  },
  {
    id: 'gasmask', name: 'CBRN Gas Mask', type: 'gasmask', image: 'https://static.wikia.nocookie.net/ready-or-not/images/a/a9/Gas_Mask.png/revision/latest/scale-to-width-down/150', desc: 'Schützt komplett vor Tränengas (CS Gas).',
    skins: [
      { id: 'm50', name: 'M50 Standard', image: 'https://static.wikia.nocookie.net/ready-or-not/images/a/a9/Gas_Mask.png/revision/latest/scale-to-width-down/150' }
    ]
  },
  {
    id: 'flashgoggles', name: 'Anti-Flash Goggles', type: 'flashgoggles', image: 'https://static.wikia.nocookie.net/ready-or-not/images/3/3d/Anti-Flash_Goggles.png/revision/latest/scale-to-width-down/150', desc: 'Reduziert die Blendwirkung von Flashbangs deutlich.',
    skins: [
      { id: 'clear', name: 'Clear Lens', image: 'https://static.wikia.nocookie.net/ready-or-not/images/3/3d/Anti-Flash_Goggles.png/revision/latest/scale-to-width-down/150' },
      { id: 'tinted', name: 'Tinted Lens', image: 'https://static.wikia.nocookie.net/ready-or-not/images/3/3d/Anti-Flash_Goggles.png/revision/latest/scale-to-width-down/150' }
    ]
  },
  {
    id: 'mask_ballistic', name: 'Ballistic Facemask', type: 'ballistic_mask', image: 'https://static.wikia.nocookie.net/ready-or-not/images/0/07/Ballistic_Mask.png/revision/latest/scale-to-width-down/150', desc: 'Kevlar-Gesichtsmaske, kann kleine Kaliber abwehren.',
    skins: [
      { id: 'black', name: 'Black Standard', image: 'https://static.wikia.nocookie.net/ready-or-not/images/0/07/Ballistic_Mask.png/revision/latest/scale-to-width-down/150' }
    ]
  }
];

const RON_ARMOR_OPTIONS = [
  {
    id: 'light', name: 'Light Armor', slots: 13, image: 'https://static.wikia.nocookie.net/ready-or-not/images/0/02/LSPD_Light_Armor.png/revision/latest/scale-to-width-down/200', desc: 'Leichte Weste für Mobilität. (13 Slots)',
    skins: [
      { id: 'lspd_black', name: 'LSPD Black', image: 'https://static.wikia.nocookie.net/ready-or-not/images/0/02/LSPD_Light_Armor.png/revision/latest/scale-to-width-down/200' },
      { id: 'swat99', name: 'SWAT 99', image: 'https://static.wikia.nocookie.net/ready-or-not/images/0/02/LSPD_Light_Armor.png/revision/latest/scale-to-width-down/200' },
      { id: 'ranger_green', name: 'Ranger Green', image: 'https://static.wikia.nocookie.net/ready-or-not/images/0/02/LSPD_Light_Armor.png/revision/latest/scale-to-width-down/200' }
    ]
  },
  {
    id: 'heavy', name: 'Heavy Armor', slots: 11, image: 'https://static.wikia.nocookie.net/ready-or-not/images/b/b4/LSPD_Heavy_Armor.png/revision/latest/scale-to-width-down/200', desc: 'Maximaler Schutz. (11 Slots)',
    skins: [
      { id: 'lspd_black', name: 'LSPD Black', image: 'https://static.wikia.nocookie.net/ready-or-not/images/b/b4/LSPD_Heavy_Armor.png/revision/latest/scale-to-width-down/200' },
      { id: 'ranger_green', name: 'Ranger Green', image: 'https://static.wikia.nocookie.net/ready-or-not/images/b/b4/LSPD_Heavy_Armor.png/revision/latest/scale-to-width-down/200' },
      { id: 'fib', name: 'FIB HRT', image: 'https://static.wikia.nocookie.net/ready-or-not/images/b/b4/LSPD_Heavy_Armor.png/revision/latest/scale-to-width-down/200' },
      { id: 'multicam', name: 'MultiCam', image: 'https://static.wikia.nocookie.net/ready-or-not/images/b/b4/LSPD_Heavy_Armor.png/revision/latest/scale-to-width-down/200' }
    ]
  },
  {
    id: 'stab_vest', name: 'Stab Vest', slots: 15, image: 'https://static.wikia.nocookie.net/ready-or-not/images/c/c5/LSPD_No_Armor.png/revision/latest/scale-to-width-down/200', desc: 'Stichschutz mit extremer Magazin-Kapazität. (15 Slots)',
    skins: [
      { id: 'detective', name: 'Detective', image: 'https://static.wikia.nocookie.net/ready-or-not/images/c/c5/LSPD_No_Armor.png/revision/latest/scale-to-width-down/200' }
    ]
  },
  {
    id: 'none', name: 'No Armor', slots: 9, image: 'https://static.wikia.nocookie.net/ready-or-not/images/c/c5/LSPD_No_Armor.png/revision/latest/scale-to-width-down/200', desc: 'Kein Schutz. Minimale Slots. (9 Slots)',
    skins: [
      { id: 'cop', name: 'Beat Cop', image: 'https://static.wikia.nocookie.net/ready-or-not/images/c/c5/LSPD_No_Armor.png/revision/latest/scale-to-width-down/200' }
    ]
  }
];

const RON_UTILITIES = [
  // Throwables
  { id: 'util_flash', category: 'Throwable', slotType: 'throwable', image: 'https://static.wikia.nocookie.net/ready-or-not/images/8/87/Flashbang.png/revision/latest/scale-to-width-down/150', name: 'Flashbang', desc: 'Blendet temporär durch grellen Blitz und Knall.' },
  { id: 'util_9bang', category: 'Throwable', slotType: 'throwable', image: 'https://static.wikia.nocookie.net/ready-or-not/images/a/a2/Stinger_Grenade.png/revision/latest/scale-to-width-down/150', name: '9-Bang', desc: 'Zündet extrem schnell hintereinander. Massive Desorientierung.' },
  { id: 'util_cs', category: 'Throwable', slotType: 'throwable', image: 'https://static.wikia.nocookie.net/ready-or-not/images/b/b2/CS_Gas.png/revision/latest/scale-to-width-down/150', name: 'CS Gas', desc: 'Verursacht Husten. Zwingt zur Aufgabe. Gasmaske empfohlen.' },
  { id: 'util_stinger', category: 'Throwable', slotType: 'throwable', image: 'https://static.wikia.nocookie.net/ready-or-not/images/a/a2/Stinger_Grenade.png/revision/latest/scale-to-width-down/150', name: 'Stinger Grenade', desc: 'Verteilt schmerzhaftes Gummischrot im ganzen Raum. Sehr effektiv.' },

  // Tools
  { id: 'util_c2', category: 'Breaching', slotType: 'device', image: 'https://static.wikia.nocookie.net/ready-or-not/images/6/62/C2_Explosive.png/revision/latest/scale-to-width-down/150', name: 'C2 Explosive', desc: 'Sprengt Türen mit enormer Wucht auf und betäubt Personen dahinter.' },
  { id: 'util_taser', category: 'Tactical Device', slotType: 'device', image: 'https://static.wikia.nocookie.net/ready-or-not/images/7/75/Taser.png/revision/latest/scale-to-width-down/150', name: 'Taser', desc: 'Neutralisiert Verdächtige sofort auf kurze Distanz durch Elektroschock.' },
  { id: 'util_lockpick', category: 'Tactical Device', slotType: 'device', image: 'https://static.wikia.nocookie.net/ready-or-not/images/4/4e/Lockpick_Gun.png/revision/latest/scale-to-width-down/150', name: 'Lockpick Gun', desc: 'Öffnet verschlossene Türen lautlos und doppelt so schnell.' },
  { id: 'util_spray', category: 'Tactical Device', slotType: 'device', image: 'https://static.wikia.nocookie.net/ready-or-not/images/4/4e/Lockpick_Gun.png/revision/latest/scale-to-width-down/150', name: 'Spray', desc: 'Eine Dose damit Suspect aufgibt :c.' },

  // Long Tactical
  { id: 'util_ram', category: 'Breaching', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/2/23/Battering_Ram.png/revision/latest/scale-to-width-down/150', name: 'Battering Ram', desc: 'Schwere Ramme zum manuellen Aufbrechen von Türen mit einem Schlag.' },
  { id: 'util_breach_shotgun', category: 'Breaching', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/6/64/870_CQB.png/revision/latest/scale-to-width-down/150', name: 'Breach Shotgun', desc: 'Zerstört Türschlösser aus sicherer Entfernung. Schneller als Lockpicking.' },
  { id: 'util_mirror', category: 'Long Tactical', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/9/91/Mirrorgun.png/revision/latest/scale-to-width-down/150', name: 'Mirrorgun', desc: 'Wird unter der Tür hindurchgeschoben. Erkennt Sprengfallen und Feindlage.' },
  { id: 'util_shield', category: 'Long Tactical', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/c/cf/Ballistic_Shield.png/revision/latest/scale-to-width-down/150', name: 'Ballistic Shield', desc: 'Schützt den Träger von vorne. Zwingt zur Nutzung einer Handfeuerwaffe.' },
  { id: 'util_rescue_shield', category: 'Long Tactical', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/c/cf/Ballistic_Shield.png/revision/latest/scale-to-width-down/150', name: 'Rescue Shield', desc: 'Umfassenderer, größerer Schild für Geiselrettungen, nimmt mehr Sicht weg.' },
  { id: 'util_launcher', category: 'Long Tactical', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/1/1a/M320.png/revision/latest/scale-to-width-down/150', name: 'M320 Launcher', desc: 'Verschießt Granaten zielgenau über mittlere Distanzen.' },
  { id: 'util_pepperball', category: 'Long Tactical', slotType: 'long_tactical', image: 'https://static.wikia.nocookie.net/ready-or-not/images/9/91/Pepperball_Launcher.png/revision/latest/scale-to-width-down/150', name: 'Pepperball', desc: 'Verschießt Pfefferkugeln zur Aufruhrkontrolle. Nicht-tödlich.' }
];

const DEFAULT_STANDARD_LOADOUT = {
  primary: 'f90',
  primaryAttachments: { Optics: 'opt_holo', Muzzle: null, Underbarrel: 'ub_vert', Overbarrel: ['ob_flash'] },
  primaryMagsAP: 3,
  primaryMagsJHP: 1,
  secondary: 'w_g19',
  secondaryMagsAP: 2,
  secondaryMagsJHP: 1,
  armor: 'light',
  headwear: ['helmet_ballistic'],
  longTactical: 'util_mirror',
  throwables: { util_flash: 2, util_cs: 0, util_stinger: 0, util_9bang: 0 },
  devices: { util_c2: 1, util_taser: 1, util_lockpick: 0 },
  preferredSkins: {
    'heavy': 'lspd_black',
    'light': 'lspd_black',
    'stab_vest': 'detective',
    'none': 'cop',
    'helmet_ballistic': 'lspd_black',
    'helmet_bump': 'black',
    'nvg': 'gpnvg_black',
    'gasmask': 'm50',
    'flashgoggles': 'clear',
    'mask_ballistic': 'black'
  }
};

const PUBG_MAPS = [
  { id: 'pubg_erangel', game: 'pubg', name: 'Erangel', size: '8x8 km', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800', info: 'Die originale Battle Royale Karte.', secrets: 'Geheime Kellerräume befinden sich unter bestimmten Gebäuden.', locations: 'Typische Keller-Standorte: Rozhok, südlich von Yasnaya Polyana.' }
];

// Fallback generator
RON_MAPS.forEach(map => {
  if (!map.objectives) map.objectives = ['Bring Order to Chaos', 'Rescue all of the Civilians', 'Arrest Main Suspects', 'Secure Evidence', 'Report Status to TOC'];
  if (!map.blueprints) {
    map.blueprints = [{
      name: 'Main Floor',
      url: 'https://placehold.co/1200x800/111/FFF?text=Classified+Blueprint',
      altUrl: 'https://placehold.co/1200x800/1e1e1e/FFF?text=Alternative+Plan'
    }];
  } else {
    // Give existing maps an alternative plan placeholder if they don't have one
    map.blueprints = map.blueprints.map(bp => ({
      ...bp,
      altUrl: bp.altUrl || 'https://placehold.co/1200x800/1e1e1e/FFF?text=Alternative+Plan'
    }));
  }
  if (!map.audioLogs) map.audioLogs = [];
  if (!map.poi) map.poi = { civilians: [], suspects: [] };
  if (!map.media) map.media = [];
  if (!map.screenshots) map.screenshots = [];
});

const SIM_SERVER_TIME = Date.now();
const NEWS_POOL = [
  { id: 'n1', mapId: 'ron_elephant', type: 'CRITICAL', headline: 'Watt Community College: Active Shooter gemeldet', fact: 'Die Verdächtigen haben selbstgebaute Sprengsätze platziert. Höchster Zeitdruck.', content: 'Code 3! Mehrere Notrufe bestätigen einen Amoklauf. Ersteingreifende Kräfte melden IEDs. Das SWAT-Team muss Zivilisten ignorieren und direkt auf die Bedrohung vorrücken.', timestamp: new Date(SIM_SERVER_TIME - 1000 * 60 * 12) },
  { id: 'n2', mapId: 'ron_neon', type: 'FLASH', headline: 'Neon Nightclub: Terroranschlag von "Die Hand"', fact: 'Berichte über Selbstmordattentäter mit Sprengstoffwesten. Mindestabstand einhalten!', content: 'Katastrophe im Club Neon Tomb. Täter nutzen die Dunkelheit. Wenn ein Verdächtiger einen Zünder hält, ist ein finaler Rettungsschuss authorisiert.', timestamp: new Date(SIM_SERVER_TIME - 1000 * 60 * 45) },
  { id: 'n3', mapId: 'ron_ides', type: 'UPDATE', headline: 'Brisa Cove: Schwer bewaffnete Veteranen verbarrikadiert', fact: 'Die Gruppe "The Left Behind" trägt Level-IV-Panzerwesten, die Standardmunition absorbieren.', content: 'Sie haben Stolperdrähte an fast allen Türen angebracht. Spiegeln ist Pflicht! Frontale Feuergefechte sind tödlich.', timestamp: new Date(SIM_SERVER_TIME - 1000 * 60 * 120) }
];

// --- HELPER LOGIC FOR CAPACITIES AND VALIDATION ---

const getArmorSlots = (armorId) => {
  switch (armorId) {
    case 'stab_vest': return 15;
    case 'light': return 13;
    case 'heavy': return 11;
    case 'none': return 9;
    default: return 11;
  }
};

const getUsedSlots = (loadout) => {
  const throwablesTotal = Object.values(loadout.throwables || {}).reduce((a, b) => a + b, 0);
  const devicesTotal = Object.values(loadout.devices || {}).reduce((a, b) => a + b, 0);
  return (loadout.primaryMagsAP || 0) + (loadout.primaryMagsJHP || 0) +
    (loadout.secondaryMagsAP || 0) + (loadout.secondaryMagsJHP || 0) +
    throwablesTotal + devicesTotal;
};

const autoAdjustSlots = (loadout, maxSlots) => {
  let newLoadout = JSON.parse(JSON.stringify(loadout));
  if (!newLoadout.devices) newLoadout.devices = { util_c2: 0, util_taser: 0, util_lockpick: 0 };
  if (!newLoadout.throwables) newLoadout.throwables = { util_flash: 0, util_cs: 0, util_stinger: 0, util_9bang: 0 };

  const reductionOrder = [
    { obj: newLoadout.devices, key: 'util_lockpick' },
    { obj: newLoadout.devices, key: 'util_taser' },
    { obj: newLoadout.devices, key: 'util_c2' },
    { obj: newLoadout.devices, key: 'util_spray' },
    { obj: newLoadout.throwables, key: 'util_stinger' },
    { obj: newLoadout.throwables, key: 'util_9bang' },
    { obj: newLoadout.throwables, key: 'util_cs' },
    { obj: newLoadout.throwables, key: 'util_flash' },
    { obj: newLoadout, key: 'secondaryMagsJHP' },
    { obj: newLoadout, key: 'secondaryMagsAP' },
    { obj: newLoadout, key: 'primaryMagsJHP' },
    { obj: newLoadout, key: 'primaryMagsAP' }
  ];

  while (getUsedSlots(newLoadout) > maxSlots) {
    let reduced = false;
    for (let item of reductionOrder) {
      if (item.obj[item.key] > 0) {
        item.obj[item.key]--;
        reduced = true;
        break;
      }
    }
    if (!reduced) break;
  }
  return newLoadout;
};

const validateHeadwear = (currentList, toggledId) => {
  const isHelmet = id => id.includes('helmet');
  const isNVG = id => id.includes('nvg');
  const isGasmask = id => id.includes('gasmask');
  const isFlash = id => id.includes('flashgoggles');
  const isMask = id => id.includes('ballistic_mask') || id.includes('mask_ballistic');

  let result = [...currentList];

  if (result.includes(toggledId)) {
    return result.filter(id => id !== toggledId);
  }

  result.push(toggledId);

  if (isHelmet(toggledId)) {
    result = result.filter(id => !isHelmet(id) || id === toggledId);
  }
  if (isNVG(toggledId)) {
    result = result.filter(id => !isNVG(id) || id === toggledId);
  }
  if (isGasmask(toggledId)) {
    result = result.filter(id => !isFlash(id) && !isMask(id) && (!isGasmask(id) || id === toggledId));
  }
  if (isFlash(toggledId) || isMask(toggledId)) {
    if (isFlash(toggledId)) result = result.filter(id => !isGasmask(id) && !isMask(id) && (!isFlash(id) || id === toggledId));
    if (isMask(toggledId)) result = result.filter(id => !isGasmask(id) && !isFlash(id) && (!isMask(id) || id === toggledId));
  }

  return result;
};

// --- STYLES & ANIMATIONS ---

const pageTransition = {
  initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.4, ease: "easeOut" }
};
const springTransition = { type: "spring", stiffness: 450, damping: 35 };

const getRelativeTime = (date) => {
  const diff = Math.floor((new Date() - date) / 1000 / 60);
  if (diff < 1) return "Gerade eben";
  if (diff < 60) return `vor ${diff} Min.`;
  return "vor über 1 Std.";
};

// --- CONSTANTS ---
const SESSION_TIMEOUT = 10 * 60 * 1000;
const STORAGE_KEY_STATE = 'inTactics_app_state_v16';
const STORAGE_KEY_TIME = 'inTactics_last_active_v16';

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

/*const ProfileModal = ({
  isOpen, onClose, user, authMode, setAuthMode, handleAuth,
  username, setUsername, password, setPassword, authError,
  handleLogout, mapProgress, setActiveTab
}) => {
  if (!isOpen) return null;

  const isLoggedIn = user && !user.isAnonymous;
  const records = mapProgress || {};
  const completedMissionsCount = Object.keys(records).length;
  const rankCounts = Object.values(records).reduce((acc, curr) => {
    acc[curr.rank] = (acc[curr.rank] || 0) + 1;
    return acc;
  }, {});

  const displayUsername = user?.email ? user.email.split('@')[0] : 'Operator';

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] z-[9999] bg-black/95 backdrop-blur-3xl border-l border-white/10 flex flex-col shadow-2xl"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-3">
          <User size={24} className={isLoggedIn ? "text-blue-500" : "text-white/40"} /> {isLoggedIn ? 'Operator' : 'Identität'}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-white rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!isLoggedIn ? (
          <div className="space-y-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-white/60 mb-2">Rufname (Nutzername)</label>
                <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-white/60 mb-2">Zugangscode (Passwort)</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 outline-none" />
              </div>
              {authError && <p className="text-red-400 text-[10px] font-bold">{authError}</p>}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-sm py-3 rounded-xl transition-all">
                {authMode === 'login' ? 'Authentifizieren' : 'Registrieren'}
              </button>
            </form>
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="w-full text-[10px] text-white/40 hover:text-white uppercase font-bold tracking-widest">
              {authMode === 'login' ? 'Neu hier? Account erstellen' : 'Bereits registriert? Login'}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl border border-blue-500/50 flex items-center justify-center text-blue-500"><User size={32} /></div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-white/40 font-black uppercase">Aktiver Operator</p>
                <h3 className="text-2xl font-black italic uppercase truncate">{displayUsername}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-white/40 border-b border-white/10 pb-2">Dienstakte</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-white/40 uppercase">Einsätze</p>
                  <p className="text-3xl font-black italic">{completedMissionsCount}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-white/40 uppercase">S-Ränge</p>
                  <p className="text-3xl font-black italic text-blue-400">{rankCounts['S'] || 0}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 rounded-xl font-black uppercase text-xs transition-all">
                <LogOut size={16} /> Sitzung beenden
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};*/

const DynamicNavItem = ({ id, icon: Icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => setActiveTab(id)} className="relative flex-1 md:flex-none px-4 md:px-8 py-4 md:py-3 rounded-full flex md:flex-row items-center justify-center gap-2 group outline-none z-10">
      {isActive && <motion.div layoutId="nav-active-pill" className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-xl md:rounded-full" transition={springTransition} />}
      <Icon size={20} className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'}`} />
      <span className={`relative z-10 font-bold tracking-tight text-[10px] md:text-sm ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{label}</span>
    </button>
  );
};

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

// --- BLUEPRINT VIEWER & MAP LOGIC ---

const BlueprintViewer = ({ map, dbUser, userBlueprints }) => {
  const [activeFloor, setActiveFloor] = useState(0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [activePlan, setActivePlan] = useState('Plan A');
  const [activeTeam, setActiveTeam] = useState('blue'); // 'blue' | 'red'
  const [activeTool, setActiveTool] = useState('pan'); // 'pan' | 'move' | 'breach' | 'hold' | 'suspect'
  const [useAltMap, setUseAltMap] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [activeObjHighlight, setActiveObjHighlight] = useState(null);

  const [markersData, setMarkersData] = useState({});
  const mapContainerRef = useRef(null);
  const lastPanRef = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const hasMovedRef = useRef(false);

  const blueprints = map.blueprints;
  const objectivesData = map.mapObjectivesDetails || [];

  useEffect(() => {
    if (userBlueprints && userBlueprints[map.id]) {
      const docData = userBlueprints[map.id];
      if (docData && docData.data) {
        try { setMarkersData(JSON.parse(docData.data)); } catch (e) { console.error("Error parsing blueprint markers", e); }
      } else {
        setMarkersData(docData);
      }
    }
  }, [userBlueprints, map.id]);

  const currentFloorKey = `${activePlan}_${activeFloor}`;

  const getFloorData = (data) => {
    const fd = data[currentFloorKey];
    if (!fd) return { blue: { past: [], present: [], future: [] }, red: { past: [], present: [], future: [] } };
    if (fd.present) {
      return {
        blue: { past: fd.past || [], present: fd.present || [], future: fd.future || [] },
        red: { past: [], present: [], future: [] }
      };
    }
    return fd;
  };

  const floorData = getFloorData(markersData);
  const teamData = floorData[activeTeam] || { past: [], present: [], future: [] };

  const canUndo = teamData.past.length > 0;
  const canRedo = teamData.future.length > 0;

  const saveToDb = (newData) => {
    if (db && dbUser) {
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'blueprintMarkers', map.id), { data: JSON.stringify(newData) }).catch(console.error);
    }
  };

  // --- INTERACTION LOGIC (PAN, ZOOM, DRAW) ---

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el || !isFullscreen) return;

    const onWheel = (e) => {
      e.preventDefault();
      const zoomSensitivity = 0.002;
      setScale(s => Math.max(0.5, Math.min(s - e.deltaY * zoomSensitivity, 5)));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isFullscreen]);

  const handlePointerDown = (e) => {
    if (!isFullscreen) return;
    hasMovedRef.current = false;

    if (e.button === 2 || e.button === 1 || activeTool === 'pan' || (e.touches && e.touches.length > 1)) {
      setIsPanning(true);
      lastPanRef.current = {
        x: e.clientX || (e.touches && e.touches[0].clientX),
        y: e.clientY || (e.touches && e.touches[0].clientY)
      };
    }
  };

  const handlePointerMove = (e) => {
    if (!isFullscreen || !isPanning) return;
    hasMovedRef.current = true;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const dx = clientX - lastPanRef.current.x;
    const dy = clientY - lastPanRef.current.y;

    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPanRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => { setIsPanning(false); };

  const handleMapClick = (e) => {
    if (!isFullscreen || isPanning || activeTool === 'pan' || hasMovedRef.current || e.button === 2) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newMarker = { id: Date.now(), x, y, type: activeTool };

    setMarkersData(prev => {
      const fd = getFloorData(prev);
      const td = fd[activeTeam] || { past: [], present: [], future: [] };
      const newData = {
        ...prev,
        [currentFloorKey]: {
          ...fd,
          [activeTeam]: {
            past: [...td.past, td.present],
            present: [...td.present, newMarker],
            future: []
          }
        }
      };
      saveToDb(newData);
      return newData;
    });
  };

  const handleMarkerDoubleClick = (e, mId, team) => {
    e.stopPropagation();
    setMarkersData(prev => {
      const fd = getFloorData(prev);
      const td = fd[team] || { past: [], present: [], future: [] };
      const newData = {
        ...prev,
        [currentFloorKey]: {
          ...fd,
          [team]: {
            past: [...td.past, td.present],
            present: td.present.filter(m => m.id !== mId),
            future: []
          }
        }
      };
      saveToDb(newData);
      return newData;
    });
  };

  const undo = () => {
    setMarkersData(prev => {
      const fd = getFloorData(prev);
      const td = fd[activeTeam];
      if (!td || td.past.length === 0) return prev;

      const newPast = [...td.past];
      const newData = { ...prev, [currentFloorKey]: { ...fd, [activeTeam]: { past: newPast, present: newPast.pop(), future: [td.present, ...td.future] } } };
      saveToDb(newData);
      return newData;
    });
  };

  const redo = () => {
    setMarkersData(prev => {
      const fd = getFloorData(prev);
      const td = fd[activeTeam];
      if (!td || td.future.length === 0) return prev;

      const newFuture = [...td.future];
      const newData = { ...prev, [currentFloorKey]: { ...fd, [activeTeam]: { past: [...td.past, td.present], present: newFuture.shift(), future: newFuture } } };
      saveToDb(newData);
      return newData;
    });
  };

  const clearMarkers = () => {
    setMarkersData(prev => {
      const fd = getFloorData(prev);
      const td = fd[activeTeam];
      if (!td || td.present.length === 0) return prev;

      const newData = { ...prev, [currentFloorKey]: { ...fd, [activeTeam]: { past: [...td.past, td.present], present: [], future: [] } } };
      saveToDb(newData);
      return newData;
    });
  };

  const handleShowObjective = (obj) => {
    if (activeFloor !== obj.floor) setActiveFloor(obj.floor);
    setActiveObjHighlight(obj.id);
    setTimeout(() => setActiveObjHighlight(null), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.ctrlKey && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentFloorKey, activeTeam]);

  if (!blueprints || blueprints.length === 0) return null;

  // --- RENDERING HELPERS ---

  const getTeamColor = (team) => team === 'red' ? 'text-red-500' : 'text-blue-500';
  const getTeamHex = (team) => team === 'red' ? '#ef4444' : '#3b82f6';

  const renderMarkerIcon = (type, team) => {
    const colorClass = type === 'suspect' ? 'text-orange-500' : getTeamColor(team);
    switch (type) {
      case 'breach': return <Target size={20} className={`${colorClass} drop-shadow-md`} />;
      case 'suspect': return <Skull size={20} className={`${colorClass} drop-shadow-md`} />;
      case 'hold': return <Shield size={20} className={`${colorClass} drop-shadow-md`} />;
      case 'move': default: return <MapPin size={24} className={`${colorClass} drop-shadow-md`} />;
    }
  };

  const getMarkerTransform = (type) => {
    if (type === 'move') return 'translate(-50%, -100%)';
    return 'translate(-50%, -50%)';
  };

  const renderTeamLines = (team, markers) => {
    let lastNode = null;
    return markers.map((m, i) => {
      if (m.type === 'suspect') { lastNode = null; return null; }

      const current = m;
      const prev = lastNode;
      lastNode = current;

      if (!prev) return null;
      return (
        <line
          key={`line-${team}-${i}`}
          x1={`${prev.x}%`} y1={`${prev.y}%`}
          x2={`${current.x}%`} y2={`${current.y}%`}
          stroke={getTeamHex(team)}
          strokeWidth={3}
          strokeDasharray="6,6"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
        />
      );
    });
  };

  const renderMarkersForTeam = (team, markers) => {
    return markers.map((m, i) => (
      <motion.div
        key={`marker-${team}-${m.id}`}
        initial={{ scale: 0, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        onDoubleClick={(e) => handleMarkerDoubleClick(e, m.id, team)}
        className="absolute z-20 cursor-pointer pointer-events-auto"
        style={{ left: `${m.x}%`, top: `${m.y}%`, transform: getMarkerTransform(m.type) }}
        title="Double Click to remove"
      >
        {renderMarkerIcon(m.type, team)}
      </motion.div>
    ));
  };

  const activeBlueprint = blueprints[activeFloor];
  const displayImage = useAltMap && activeBlueprint.altUrl ? activeBlueprint.altUrl : activeBlueprint.url;

  const mainObjectives = objectivesData.filter(o => o.type === 'main');
  const softObjectives = objectivesData.filter(o => o.type === 'soft');

  const renderMapArea = (interactive) => (
    <div
      className="absolute inset-0 overflow-hidden touch-none"
      ref={interactive ? mapContainerRef : null}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: isPanning ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <div
          className="w-full h-full relative flex items-center justify-center origin-center"
          style={{ transform: `scale(${scale})` }}
        >
          <img
            src={displayImage}
            className="max-w-none w-full h-auto pointer-events-none select-none"
            style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            alt="Tactical Map"
            draggable={false}
          />

          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 15, overflow: 'visible' }}>
              {renderTeamLines('blue', floorData.blue?.present || [])}
              {renderTeamLines('red', floorData.red?.present || [])}
            </svg>

            {/* Dynamic Pre-defined Objective Markers */}
            {showObjectives && interactive && objectivesData.filter(o => o.floor === activeFloor).map(obj => (
              <div
                key={obj.id}
                className={`absolute z-[25] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500`}
                style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
              >
                <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.8)] ${obj.color} ${activeObjHighlight === obj.id ? 'animate-ping scale-150' : ''}`}>
                  {obj.icon === 'search' ? <Search size={12} className="text-white" /> : <Flag size={12} className="text-white" />}
                </div>
              </div>
            ))}

            {renderMarkersForTeam('blue', floorData.blue?.present || [])}
            {renderMarkersForTeam('red', floorData.red?.present || [])}
          </div>

          {interactive && (
            <div
              className={`absolute inset-0 z-30 touch-none ${activeTool === 'pan' ? 'cursor-grab' : 'cursor-crosshair'}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onClick={handleMapClick}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4">Tactical Blueprint</h3>
        {blueprints.length > 1 && (
          <div className="flex gap-2 bg-black/50 p-1 rounded-lg border border-white/10">
            {blueprints.map((bp, idx) => (
              <button key={idx} onClick={() => { setActiveFloor(idx); setScale(1); setPan({ x: 0, y: 0 }); }} className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${activeFloor === idx ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white'}`}>
                {bp.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <GlassCard className="relative bg-[#0a0a0a] border-red-500/20 overflow-hidden h-[400px] md:h-[600px] group">
        {renderMapArea(false)}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-40 pointer-events-none">
          <button onClick={() => setIsFullscreen(true)} className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-black uppercase tracking-widest shadow-2xl pointer-events-auto transition-transform hover:scale-105">
            <Maximize size={18} /> Route Planen
          </button>
        </div>
      </GlassCard>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#050505] flex flex-col">

            {/* Fullscreen Top Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl z-[110] shadow-2xl overflow-x-auto max-w-[95vw] pointer-events-auto">

              {/* Objectives Toggle */}
              {objectivesData.length > 0 && (
                <>
                  <button onClick={() => setShowObjectives(!showObjectives)} className={`flex items-center shrink-0 p-2 rounded-lg transition-all ${showObjectives ? 'bg-indigo-600 text-white shadow-inner' : 'hover:bg-white/10 text-white/60 hover:text-white'}`} title="Map Objectives">
                    <ClipboardList size={16} />
                  </button>
                  <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />
                </>
              )}

              <select value={activePlan} onChange={(e) => setActivePlan(e.target.value)} className="bg-white/10 border border-white/10 text-white text-[10px] md:text-xs font-bold uppercase rounded px-2 md:px-3 py-1.5 outline-none hover:bg-white/20 cursor-pointer shrink-0">
                <option className="bg-black text-white" value="Plan A">Plan A (Main)</option>
                <option className="bg-black text-white" value="Plan B">Plan B (Alt)</option>
                <option className="bg-black text-white" value="Plan C">Plan C (Dynamic)</option>
              </select>

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />

              <div className="flex bg-black/50 rounded-lg p-1 border border-white/10 shrink-0">
                <button onClick={() => setActiveTeam('blue')} className={`px-2 py-1 text-[10px] font-black uppercase rounded ${activeTeam === 'blue' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}>Blue</button>
                <button onClick={() => setActiveTeam('red')} className={`px-2 py-1 text-[10px] font-black uppercase rounded ${activeTeam === 'red' ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white'}`}>Red</button>
              </div>

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />

              {blueprints.length > 1 && (
                <>
                  <div className="flex gap-1 shrink-0">
                    {blueprints.map((bp, idx) => (
                      <button key={idx} onClick={() => { setActiveFloor(idx); setScale(1); setPan({ x: 0, y: 0 }); }} className={`px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase rounded transition-colors ${activeFloor === idx ? 'bg-white/20 text-white shadow-inner' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
                        {bp.name}
                      </button>
                    ))}
                  </div>
                  <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />
                </>
              )}

              {activeBlueprint.altUrl && (
                <>
                  <button onClick={() => setUseAltMap(!useAltMap)} className={`px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase rounded transition-colors shrink-0 ${useAltMap ? 'bg-white/20 text-white' : 'text-white/40 hover:bg-white/10'}`}>
                    {useAltMap ? 'Alt Map' : 'Game Map'}
                  </button>
                  <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />
                </>
              )}

              {[
                { id: 'pan', icon: Hand, color: 'text-white' },
                { id: 'move', icon: MapPin, color: 'text-green-500' },
                { id: 'breach', icon: Target, color: 'text-red-500' },
                { id: 'hold', icon: Shield, color: 'text-blue-500' },
                { id: 'suspect', icon: Skull, color: 'text-orange-500' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveTool(m.id)}
                  className={`flex items-center shrink-0 p-2 rounded-lg transition-all ${activeTool === m.id ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
                  title={m.id.toUpperCase()}
                >
                  <m.icon size={16} className={m.color} />
                </button>
              ))}

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />

              <button onClick={undo} disabled={!canUndo} className={`p-2 rounded-lg transition-all shrink-0 ${canUndo ? 'text-white hover:bg-white/20' : 'text-white/20 cursor-not-allowed'}`} title="Rückgängig (Ctrl+Z)"><Undo size={16} /></button>
              <button onClick={redo} disabled={!canRedo} className={`p-2 rounded-lg transition-all shrink-0 ${canRedo ? 'text-white hover:bg-white/20' : 'text-white/20 cursor-not-allowed'}`} title="Wiederholen (Ctrl+Shift+Z)"><Redo size={16} /></button>

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />
              <button onClick={clearMarkers} className="p-2 rounded-lg text-red-500 hover:bg-red-500/20 transition-all shrink-0" title="Route löschen"><X size={16} /></button>
            </div>

            <button onClick={() => setIsFullscreen(false)} className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-white/20 text-white rounded-full z-[110] transition-colors border border-white/10 pointer-events-auto"><Minimize size={20} /></button>

            {/* Overlay Panel for Objectives */}
            {showObjectives && objectivesData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="absolute top-20 right-4 w-80 lg:w-96 bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col z-[120] max-h-[70vh] pointer-events-auto"
              >
                {mainObjectives.length > 0 && (
                  <>
                    <div className="p-4 border-b border-white/10 bg-indigo-950/40 flex items-center justify-between rounded-t-xl">
                      <div className="flex items-center gap-3">
                        <ClipboardList className="text-indigo-400" size={20} />
                        <h3 className="font-black text-sm uppercase tracking-wider text-white">Objectives <span className="text-white/40 text-xs ml-2">(0/{mainObjectives.length})</span></h3>
                      </div>
                    </div>
                    <div className="overflow-y-auto p-2">
                      {mainObjectives.map(obj => (
                        <div key={obj.id} className="flex gap-3 p-3 hover:bg-white/5 rounded-lg border border-transparent transition-colors">
                          <div className="mt-1 shrink-0"><div className="w-5 h-5 rounded-full border-2 border-white/20" /></div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-white mb-1">{obj.name}</h4>
                            <p className="text-xs text-white/50 leading-relaxed">{obj.desc}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <button onClick={() => handleShowObjective(obj)} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 rounded-lg text-[10px] font-black uppercase transition-colors">
                              <Target size={12} /> Show
                            </button>
                            <span className="text-[9px] text-white/40 bg-white/5 px-2 py-1 rounded font-bold">{blueprints[obj.floor]?.name || 'Unknown'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {softObjectives.length > 0 && (
                  <>
                    <div className="p-4 border-y border-white/10 bg-indigo-950/20 flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <Search className="text-fuchsia-400" size={18} />
                        <h3 className="font-black text-xs uppercase tracking-wider text-white/80">Soft Objectives</h3>
                      </div>
                    </div>
                    <div className="overflow-y-auto p-2 pb-4">
                      {softObjectives.map(obj => (
                        <div key={obj.id} className="flex gap-3 p-3 hover:bg-white/5 rounded-lg border border-transparent transition-colors">
                          <div className="mt-1 shrink-0"><div className="w-5 h-5 rounded-full border-2 border-white/20" /></div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-white mb-1">{obj.name}</h4>
                            <p className="text-xs text-white/50 leading-relaxed">{obj.desc}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <button onClick={() => handleShowObjective(obj)} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 rounded-lg text-[10px] font-black uppercase transition-colors">
                              <Target size={12} /> Show
                            </button>
                            <span className="text-[9px] text-white/40 bg-white/5 px-2 py-1 rounded font-bold">{blueprints[obj.floor]?.name || 'Unknown'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {renderMapArea(true)}

            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[110] pointer-events-auto">
              <button onClick={() => { setScale(1); setPan({ x: 0, y: 0 }); }} className="p-4 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20 text-[10px] font-black uppercase">R</button>
              <button onClick={() => setScale(s => Math.min(s + 0.5, 5))} className="p-4 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20"><ZoomIn size={24} /></button>
              <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} className="p-4 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20"><ZoomOut size={24} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const POIViewer = ({ poi }) => {
  if (!poi || (!poi.suspects?.length && !poi.civilians?.length)) return null;
  const renderTable = (person, type) => (
    <div key={person.name} className="flex flex-col md:flex-row bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden mb-6">
      <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
        <div className="h-10 border-b border-white/10 flex items-center justify-center font-black uppercase text-[10px] tracking-widest text-white/40 bg-black/40">Image</div>
        <div className="flex-1 p-2 flex items-center justify-center bg-black/20"><img src={person.image} alt={person.name} className="max-h-[250px] object-contain rounded" /></div>
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        <div className="h-10 border-b border-white/10 flex items-center justify-center font-black uppercase text-[10px] tracking-widest text-white/40 bg-black/40">Name</div>
        <div className={`p-3 border-b border-white/10 text-lg font-black ${type === 'suspect' ? 'text-red-500' : 'text-orange-500'}`}>{person.name}</div>
        <div className="grid grid-cols-5 border-b border-white/10 bg-black/40 text-[10px] text-center font-bold uppercase tracking-widest text-white/40">
          <div className="p-2 border-r border-white/10">Sex</div><div className="p-2 border-r border-white/10">Height</div><div className="p-2 border-r border-white/10">Weight</div><div className="p-2 border-r border-white/10">Build</div><div className="p-2">D.O.B.</div>
        </div>
        <div className="grid grid-cols-5 border-b border-white/10 text-xs text-center font-medium">
          <div className="p-3 border-r border-white/10">{person.sex}</div><div className="p-3 border-r border-white/10">{person.height}</div><div className="p-3 border-r border-white/10">{person.weight}</div><div className="p-3 border-r border-white/10">{person.build}</div><div className="p-3">{person.dob}</div>
        </div>
        <div className="p-4 md:p-6 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap flex-1 bg-white/[0.02]">{person.desc}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {poi.civilians?.length > 0 && (
        <section><h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-orange-500 pl-4 mb-6">Civilians</h3>{poi.civilians.map(c => renderTable(c, 'civilian'))}</section>
      )}
      {poi.suspects?.length > 0 && (
        <section><h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4 mb-6">Suspects</h3>{poi.suspects.map(s => renderTable(s, 'suspect'))}</section>
      )}
    </div>
  );
};

const AudioLogViewer = ({ logs }) => {
  const [activeTranscript, setActiveTranscript] = useState(null);
  if (!logs || logs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-blue-500 pl-4">Comms & Briefings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map((log, idx) => (
          <GlassCard key={idx} className="p-4 border-blue-500/20 bg-blue-900/5">
            <div className="flex items-center gap-3 mb-4">
              {log.type === '911' ? <AlertTriangle className="text-orange-500" size={20} /> : <Info className="text-blue-500" size={20} />}
              <h4 className="font-bold text-white uppercase text-sm tracking-widest">{log.title}</h4>
            </div>
            <audio controls className="w-full h-10 mb-4 rounded bg-black outline-none" preload="none"><source src={log.url} type={log.url.endsWith('ogg') ? 'audio/ogg' : 'audio/wav'} /></audio>
            <button onClick={() => setActiveTranscript(activeTranscript === idx ? null : idx)} className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white flex items-center gap-1 transition-colors">
              <FileText size={12} /> {activeTranscript === idx ? 'Hide Transcript' : 'Show Transcript'}
            </button>
            <AnimatePresence>
              {activeTranscript === idx && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 overflow-hidden">
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-xs font-mono space-y-2">
                    {log.transcript.split('\n').map((line, i) => {
                      const colonIndex = line.indexOf(':');
                      if (colonIndex !== -1) {
                        const speaker = line.substring(0, colonIndex);
                        const message = line.substring(colonIndex + 1).trim();
                        return (
                          <div key={i} className="flex flex-col md:flex-row md:gap-3 items-start p-3 rounded-lg bg-white/[0.03] border-l-2 border-white/20 hover:bg-white/[0.08] transition-colors">
                            <span className="font-bold text-blue-400 uppercase tracking-widest text-[10px] md:w-24 shrink-0 md:text-right mt-0.5">{speaker}:</span>
                            <span className="text-gray-200 text-xs md:text-sm leading-relaxed">{message}</span>
                          </div>
                        );
                      }
                      return <div key={i} className="text-gray-400 text-xs md:text-sm italic px-2">{line}</div>;
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

const MissionObjectives = ({ mapId, objectives, dbUser, userObjectives }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    if (userObjectives && userObjectives[mapId]) {
      setCheckedItems(userObjectives[mapId].checked || []);
    }
  }, [userObjectives, mapId]);

  const toggleObj = (idx) => {
    const newChecked = checkedItems.includes(idx) ? checkedItems.filter(i => i !== idx) : [...checkedItems, idx];
    setCheckedItems(newChecked);

    if (db && dbUser) {
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'mapObjectives', mapId), { checked: newChecked }).catch(console.error);
    }
  };

  if (!objectives || objectives.length === 0) return null;

  return (
    <GlassCard className="p-6 md:p-10 bg-black/40 border-white/5">
      <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-6 border-b border-white/10 pb-4">Mission Goals</h3>
      <ul className="space-y-4">
        {objectives.map((obj, i) => {
          const isChecked = checkedItems.includes(i);
          return (
            <li
              key={i}
              onClick={() => toggleObj(i)}
              className={`flex items-start gap-3 cursor-pointer group transition-all duration-300 ${isChecked ? 'opacity-50' : 'opacity-100'}`}
            >
              <div className="mt-0.5 shrink-0 text-white/40 group-hover:text-blue-400 transition-colors">
                {isChecked ? <CheckSquare size={18} className="text-green-500" /> : <Square size={18} />}
              </div>
              <span className={`font-medium text-sm md:text-base transition-all duration-300 ${isChecked ? 'text-gray-500 line-through' : 'text-white'}`}>
                {obj}
              </span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
};

const SkinSelectionModal = ({ isOpen, onClose, item, preferredSkinId, onSelectSkin }) => {
  if (!isOpen || !item || !item.skins) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex flex-col"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
        <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">
          Skin Variation // {item.name}
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {item.skins.map(skin => (
            <GlassCard
              key={skin.id}
              onClick={() => { onSelectSkin(item.id, skin.id); onClose(); }}
              className={`flex flex-col h-[220px] border cursor-pointer group transition-all ${preferredSkinId === skin.id ? 'bg-green-500/20 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-black/60 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
            >
              <div className="h-2/3 p-4 flex items-center justify-center bg-white/5">
                <img src={skin.image} alt={skin.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" style={{ filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.5))' }} />
              </div>
              <div className="h-1/3 p-3 flex flex-col justify-center text-center border-t border-white/5 relative">
                <p className="text-xs font-bold uppercase text-white truncate px-2">{skin.name}</p>
                {preferredSkinId === skin.id && <CheckSquare size={16} className="text-green-500 absolute top-2 right-2" />}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- VISUAL UI HELPERS FOR LOADOUT ---

const ItemSelectionModal = ({ isOpen, onClose, items, selectedId, onSelect, title, isWeapon = false, preferredSkins }) => {
  if (!isOpen) return null;

  const groupedItems = isWeapon ? items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {}) : { 'All Items': items };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex flex-col"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-3">
          <Edit3 className="text-blue-500" /> {title}
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12">
        {Object.entries(groupedItems).map(([groupName, groupItems]) => (
          <div key={groupName}>
            {isWeapon && <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6 border-l-2 border-blue-500 pl-3">{groupName}</h3>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {groupItems.map(item => {
                const activeSkinId = preferredSkins?.[item.id] || item.skins?.[0]?.id;
                const displayImage = item.skins?.find(s => s.id === activeSkinId)?.image || item.image;
                return (
                  <GlassCard
                    key={item.id}
                    onClick={() => { onSelect(item.id); onClose(); }}
                    className={`flex flex-col h-[200px] border cursor-pointer group transition-all ${selectedId === item.id ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-black/60 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    <div className="h-2/3 p-4 flex items-center justify-center bg-white/5">
                      <img src={displayImage} alt={item.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" style={{ filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.5))' }} />
                    </div>
                    <div className="h-1/3 p-3 flex flex-col justify-center text-center border-t border-white/5 relative">
                      <p className="text-[10px] md:text-xs font-bold uppercase text-white truncate px-2">{item.name}</p>
                      {item.slots && <p className="text-[9px] text-white/40 uppercase mt-1">{item.slots} Slots</p>}
                      {selectedId === item.id && <CheckSquare size={16} className="text-blue-500 absolute top-2 right-2" />}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ClickableItemCard = ({ label, item, onClick, displayImageOverride }) => (
  <div onClick={onClick} className="flex items-center gap-4 bg-black/40 border border-white/10 hover:border-white/30 rounded-xl p-3 cursor-pointer transition-all shadow-lg group">
    <div className="w-24 h-16 bg-white/5 rounded-lg p-2 flex items-center justify-center border border-white/5">
      {item ? <img src={displayImageOverride || item.image} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" style={{ filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.5))' }} alt={item.name} /> : <span className="text-white/20 text-xs uppercase font-bold">Kein Item</span>}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-0.5 truncate">{label}</p>
      <p className="text-sm font-bold text-white uppercase truncate">{item ? item.name : 'Nicht ausgerüstet'}</p>
    </div>
    <ChevronRight className="text-white/20 group-hover:text-white/60 transition-colors mr-2" />
  </div>
);

const VisualMultiSelectGrid = ({ items, selectedIds, preferredSkins, onToggle, className = "" }) => (
  <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 ${className}`}>
    {items.map(item => {
      const isChecked = selectedIds.includes(item.id);
      const activeSkinId = preferredSkins?.[item.id] || item.skins?.[0]?.id;
      const displayImage = item.skins?.find(s => s.id === activeSkinId)?.image || item.image;
      return (
        <div
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={`flex flex-col relative rounded-xl border cursor-pointer transition-all overflow-hidden ${isChecked ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
        >
          <div className="h-16 md:h-20 p-2 flex items-center justify-center bg-white/5 border-b border-white/5 relative">
            <img src={displayImage} alt={item.name} className="max-h-full max-w-full object-contain" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} />
            {isChecked && (
              <div className="absolute top-2 right-2 bg-[#010101] rounded border border-blue-500 shadow-lg">
                <CheckSquare size={14} className="text-blue-500 bg-blue-500/10 rounded" />
              </div>
            )}
          </div>
          <div className="p-2 md:p-3 flex items-center justify-center text-center min-h-[44px]">
            <p className={`text-[9px] md:text-[10px] font-bold uppercase leading-tight ${isChecked ? 'text-white' : 'text-white/60'}`}>{item.name}</p>
          </div>
        </div>
      );
    })}
  </div>
);

const VisualCounterGrid = ({ items, loadout, fieldObj, maxSlots, usedSlots, onChange }) => {
  const handleInc = (id) => {
    if (usedSlots < maxSlots) {
      if (fieldObj) onChange(fieldObj, { ...loadout[fieldObj], [id]: (loadout[fieldObj]?.[id] || 0) + 1 });
      else onChange(id, (loadout[id] || 0) + 1);
    }
  };
  const handleDec = (id) => {
    const current = fieldObj ? (loadout[fieldObj]?.[id] || 0) : (loadout[id] || 0);
    if (current > 0) {
      if (fieldObj) onChange(fieldObj, { ...loadout[fieldObj], [id]: current - 1 });
      else onChange(id, current - 1);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(item => {
        const val = fieldObj ? (loadout[fieldObj]?.[item.id] || 0) : (loadout[item.id] || 0);
        return (
          <div key={item.id} className="flex flex-col bg-black/40 rounded-xl border border-white/5 overflow-hidden">
            <div className="h-16 p-2 flex items-center justify-center bg-white/5 relative border-b border-white/5">
              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} />
              {val > 0 && <div className="absolute top-1 right-1 bg-green-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow-lg">{val}x</div>}
            </div>
            <div className="p-2 md:p-3 flex flex-col items-center gap-2">
              <p className="text-[9px] md:text-[10px] font-bold uppercase text-white/60 truncate w-full text-center">{item.name}</p>
              <div className="flex items-center justify-between w-full bg-black/60 rounded-xl p-1 border border-white/5">
                <button onClick={() => handleDec(item.id)} className="p-2 md:p-2.5 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors"><Minus size={14} /></button>
                <span className="text-sm font-mono font-bold text-white px-1 text-center min-w-[20px]">{val}</span>
                <button onClick={() => handleInc(item.id)} className={`p-2 md:p-2.5 rounded-lg transition-colors ${usedSlots < maxSlots ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'text-white/10'}`}><Plus size={14} /></button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MagCounter = ({ label, type, val, onInc, onDec, disabled }) => (
  <div className="flex flex-col bg-black/40 rounded-xl border border-white/5 overflow-hidden flex-1 shadow-lg">
    <div className="h-8 flex items-center justify-center bg-white/5 gap-2 border-b border-white/5">
      <div className={`w-2 h-3 rounded-t-full ${type === 'AP' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{label}</span>
    </div>
    <div className="p-2 md:p-3">
      <div className="flex items-center justify-between bg-black/60 rounded-xl p-1 border border-white/5">
        <button onClick={onDec} className="p-2 md:p-2.5 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors"><Minus size={14} /></button>
        <span className="text-sm font-mono font-bold text-white px-1 text-center min-w-[20px]">{val}</span>
        <button onClick={onInc} className={`p-2 md:p-2.5 rounded-lg transition-colors ${!disabled ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'text-white/10'}`}><Plus size={14} /></button>
      </div>
    </div>
  </div>
);

const UnifiedLoadoutEditor = ({ loadout, onChange, title, showRecommendationBtn, onLoadRecommendation, preferredSkins = {} }) => {
  const maxSlots = getArmorSlots(loadout.armor);
  const usedSlots = getUsedSlots(loadout);

  const primaries = RON_WEAPONS.filter(w => w.category === 'primary');
  const secondaries = RON_WEAPONS.filter(w => w.category === 'secondary');

  const throwablesList = RON_UTILITIES.filter(u => u.slotType === 'throwable');
  const devicesList = RON_UTILITIES.filter(u => u.slotType === 'device');
  const longTacticals = RON_UTILITIES.filter(u => u.slotType === 'long_tactical');

  const [modalState, setModalState] = useState({ isOpen: false, type: null });

  const handleMagChange = (field, delta) => {
    const newVal = (loadout[field] || 0) + delta;
    if (newVal >= 0 && (delta < 0 || usedSlots < maxSlots)) {
      onChange(field, newVal);
    }
  };

  const getSelectedItem = (list, id) => list.find(i => i.id === id);

  const activeArmorSkinId = preferredSkins?.[loadout.armor] || getSelectedItem(RON_ARMOR_OPTIONS, loadout.armor)?.skins?.[0]?.id;
  const activeArmorImage = getSelectedItem(RON_ARMOR_OPTIONS, loadout.armor)?.skins?.find(s => s.id === activeArmorSkinId)?.image || getSelectedItem(RON_ARMOR_OPTIONS, loadout.armor)?.image;

  return (
    <>
      <GlassCard className="p-6 md:p-10 bg-black/40 border-white/5 relative overflow-visible">
        {showRecommendationBtn && (
          <div className="absolute top-0 right-0 p-4 md:p-6 z-10">
            <button onClick={onLoadRecommendation} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Zap size={14} /> Empfohlen
            </button>
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-green-500 pl-4 mb-8 mt-10 md:mt-0">{title}</h3>

        <div className="mb-8 border border-white/10 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center bg-black/30 p-4 md:p-6 rounded-2xl gap-4">
          <div>
            <p className="text-xs uppercase font-black tracking-[0.2em] text-white/50 mb-1">Equipment Capacity</p>
            <p className="text-[10px] text-white/40 leading-relaxed max-w-sm">Basis-Slots werden durch die ausgerüstete Plate/Armor definiert. Headwear und Long Tacticals belegen keine Slots.</p>
          </div>
          <div className={`text-2xl md:text-3xl font-mono font-black px-6 py-3 rounded-2xl border flex items-center gap-3 ${usedSlots === maxSlots ? 'bg-orange-500/10 text-orange-500 border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'bg-green-500/10 text-green-500 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]'}`}>
            <Layers size={24} /> {usedSlots} / {maxSlots}
          </div>
        </div>

        {/* COLUMN LAYOUT OPTIMIZED FOR LARGE SCREENS (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* COL 1: WEAPONS */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Primary Weapon</h4>
              <ClickableItemCard
                label="Select Primary"
                item={getSelectedItem(primaries, loadout.primary)}
                onClick={() => setModalState({ isOpen: true, type: 'primary' })}
              />
              <div className="flex gap-3">
                <MagCounter label="AP Ammo" type="AP" val={loadout.primaryMagsAP} onDec={() => handleMagChange('primaryMagsAP', -1)} onInc={() => handleMagChange('primaryMagsAP', 1)} disabled={usedSlots >= maxSlots} />
                <MagCounter label="JHP Ammo" type="JHP" val={loadout.primaryMagsJHP} onDec={() => handleMagChange('primaryMagsJHP', -1)} onInc={() => handleMagChange('primaryMagsJHP', 1)} disabled={usedSlots >= maxSlots} />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Secondary Weapon</h4>
              <ClickableItemCard
                label="Select Secondary"
                item={getSelectedItem(secondaries, loadout.secondary)}
                onClick={() => setModalState({ isOpen: true, type: 'secondary' })}
              />
              <div className="flex gap-3">
                <MagCounter label="AP Ammo" type="AP" val={loadout.secondaryMagsAP} onDec={() => handleMagChange('secondaryMagsAP', -1)} onInc={() => handleMagChange('secondaryMagsAP', 1)} disabled={usedSlots >= maxSlots} />
                <MagCounter label="JHP Ammo" type="JHP" val={loadout.secondaryMagsJHP} onDec={() => handleMagChange('secondaryMagsJHP', -1)} onInc={() => handleMagChange('secondaryMagsJHP', 1)} disabled={usedSlots >= maxSlots} />
              </div>
            </div>
          </div>

          {/* COL 2: ARMOR & THROWABLES */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Plate / Armor</h4>
              <ClickableItemCard
                label="Select Armor"
                item={getSelectedItem(RON_ARMOR_OPTIONS, loadout.armor)}
                displayImageOverride={activeArmorImage}
                onClick={() => setModalState({ isOpen: true, type: 'armor' })}
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Throwables (Slots)</h4>
              <VisualCounterGrid items={throwablesList} loadout={loadout} fieldObj="throwables" maxSlots={maxSlots} usedSlots={usedSlots} onChange={onChange} />
            </div>
          </div>

          {/* COL 3: HEADWEAR, LONG TAC, DEVICES */}
          <div className="flex flex-col gap-6 md:gap-8 md:col-span-2 lg:col-span-1">
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Headwear (Kombinierbar)</h4>
              <VisualMultiSelectGrid items={RON_HEADWEAR_OPTIONS} selectedIds={loadout.headwear} preferredSkins={preferredSkins} onToggle={(id) => onChange('headwear', validateHeadwear(loadout.headwear, id))} />
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Long Tactical</h4>
              <ClickableItemCard
                label="Select Equipment"
                item={getSelectedItem(longTacticals, loadout.longTactical)}
                onClick={() => setModalState({ isOpen: true, type: 'long_tactical' })}
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 border-b border-white/10 pb-2">Devices (Slots)</h4>
              <VisualCounterGrid items={devicesList} loadout={loadout} fieldObj="devices" maxSlots={maxSlots} usedSlots={usedSlots} onChange={onChange} />
            </div>
          </div>

        </div>
      </GlassCard>

      {/* --- MODALS FOR SELECTION --- */}
      <AnimatePresence>
        {modalState.isOpen && modalState.type === 'primary' && (
          <ItemSelectionModal isOpen={true} onClose={() => setModalState({ isOpen: false, type: null })} items={primaries} selectedId={loadout.primary} onSelect={(id) => onChange('primary', id)} title="Primary Weapon" isWeapon={true} />
        )}
        {modalState.isOpen && modalState.type === 'secondary' && (
          <ItemSelectionModal isOpen={true} onClose={() => setModalState({ isOpen: false, type: null })} items={secondaries} selectedId={loadout.secondary} onSelect={(id) => onChange('secondary', id)} title="Secondary Weapon" isWeapon={true} />
        )}
        {modalState.isOpen && modalState.type === 'armor' && (
          <ItemSelectionModal isOpen={true} onClose={() => setModalState({ isOpen: false, type: null })} items={RON_ARMOR_OPTIONS} selectedId={loadout.armor} preferredSkins={preferredSkins} onSelect={(id) => onChange('armor', id)} title="Plate / Armor" />
        )}
        {modalState.isOpen && modalState.type === 'long_tactical' && (
          <ItemSelectionModal isOpen={true} onClose={() => setModalState({ isOpen: false, type: null })} items={longTacticals} selectedId={loadout.longTactical} onSelect={(id) => onChange('longTactical', id)} title="Long Tactical" />
        )}
      </AnimatePresence>
    </>
  );
};

const SwatOperatorUI = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-8 md:py-12">
      <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-2 text-center">Tactical Loadout</h2>
      <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-12 text-center">Operator Equipment Configuration</p>

      <div className="relative w-full max-w-4xl mx-auto min-h-[450px] md:min-h-[500px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.05] pointer-events-none z-0">
          <User size={350} strokeWidth={1} />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-4">
          <div className="w-full flex justify-center mb-8 md:mb-12">
            <GlassCard onClick={() => onSelectCategory('headwear')} className="w-48 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-black/60 hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all group">
              <HardHat size={32} className="text-white/60 group-hover:text-blue-400 transition-colors" />
              <div className="text-center"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Slot</p><p className="text-sm font-bold uppercase text-white">Headwear</p></div>
            </GlassCard>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between md:justify-center md:gap-40 lg:gap-64 px-4 items-center">
            <GlassCard onClick={() => onSelectCategory('armory')} className="w-48 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-black/60 hover:bg-white/10 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all group mb-8 md:mb-0">
              <Target size={32} className="text-white/60 group-hover:text-red-500 transition-colors" />
              <div className="text-center"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Arsenal</p><p className="text-sm font-bold uppercase text-white">Armory</p></div>
            </GlassCard>

            <GlassCard onClick={() => onSelectCategory('armor')} className="w-48 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-black/60 hover:bg-white/10 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all group mb-8 md:mb-0">
              <ShieldCheck size={32} className="text-white/60 group-hover:text-green-500 transition-colors" />
              <div className="text-center"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Protection</p><p className="text-sm font-bold uppercase text-white">Plate / Armor</p></div>
            </GlassCard>
          </div>

          <div className="w-full flex justify-center mt-8 md:mt-12">
            <GlassCard onClick={() => onSelectCategory('utilities')} className="w-48 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-black/60 hover:bg-white/10 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all group">
              <Layers size={32} className="text-white/60 group-hover:text-orange-500 transition-colors" />
              <div className="text-center"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Tactical</p><p className="text-sm font-bold uppercase text-white">Utilities</p></div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeaponGunsmith = ({ weaponId, equipped, setEquipped, activeSlot, setActiveSlot, dbUser }) => {
  const slots = [
    { id: 'Optics', icon: Crosshair, label: 'Optics' },
    { id: 'Muzzle', icon: Zap, label: 'Muzzle' },
    { id: 'Underbarrel', icon: AlignJustify, label: 'Underbarrel' },
    { id: 'Overbarrel', icon: Sun, label: 'Overbarrel' }
  ];

  const handleEquip = (slotId, attachment) => {
    let newEquipped = { ...equipped };
    const isMulti = slotId === 'Overbarrel';

    if (isMulti) {
      if (attachment === null) {
        newEquipped[slotId] = [];
      } else {
        const currentList = newEquipped[slotId] || [];
        const exists = currentList.some(a => a.id === attachment.id);
        if (exists) {
          newEquipped[slotId] = currentList.filter(a => a.id !== attachment.id);
        } else {
          newEquipped[slotId] = [...currentList, attachment];
        }
      }
    } else {
      newEquipped[slotId] = attachment;
      setActiveSlot(null);
    }

    setEquipped(newEquipped);

    if (db && dbUser) {
      const dataToSave = {
        Optics: newEquipped.Optics?.id || null,
        Muzzle: newEquipped.Muzzle?.id || null,
        Underbarrel: newEquipped.Underbarrel?.id || null,
        Overbarrel: (newEquipped.Overbarrel || []).map(a => a.id)
      };
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'attachments', weaponId), dataToSave).catch(console.error);
    }
  };

  return (
    <GlassCard className="p-6 md:p-8 bg-black/40 border-white/10">
      <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-6 border-b border-white/10 pb-4">Gunsmith // Attachments</h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 space-y-2">
          {slots.map(s => {
            const isActive = activeSlot === s.id;
            const isMulti = s.id === 'Overbarrel';
            const equippedItems = equipped[s.id];
            const hasAttachment = isMulti ? (equippedItems && equippedItems.length > 0) : !!equippedItems;

            let displayText = 'Kein Aufsatz';
            if (hasAttachment) {
              displayText = isMulti ? equippedItems.map(a => a.name).join(' + ') : equippedItems.name;
            }

            return (
              <button
                key={s.id}
                onClick={() => setActiveSlot(isActive ? null : s.id)}
                className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all ${isActive ? 'bg-red-600/10 border-red-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3 overflow-hidden w-full pr-2">
                  <s.icon size={16} className={`shrink-0 ${isActive ? 'text-red-500' : (hasAttachment ? 'text-white' : 'text-white/40')}`} />
                  <div className="text-left overflow-hidden flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{s.label}</p>
                    <p className={`text-xs md:text-sm font-bold uppercase tracking-tight truncate ${hasAttachment ? 'text-white' : 'text-white/20'}`}>
                      {displayText}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className={`shrink-0 transition-transform duration-300 ${isActive ? 'rotate-90 text-red-500' : 'text-white/20'}`} />
              </button>
            );
          })}
        </div>

        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            {activeSlot ? (
              <motion.div
                key={activeSlot}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <button
                  onClick={() => handleEquip(activeSlot, null)}
                  className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all ${(activeSlot === 'Overbarrel' ? (!equipped[activeSlot] || equipped[activeSlot].length === 0) : !equipped[activeSlot])
                      ? 'bg-white/10 border-white/30'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  <span className="font-bold text-sm text-white uppercase">Kein Aufsatz</span>
                  <span className="text-xs text-white/40">Standardkonfiguration</span>
                </button>

                {RON_ATTACHMENTS[activeSlot].map(att => {
                  const isMulti = activeSlot === 'Overbarrel';
                  const isEquipped = isMulti
                    ? (equipped[activeSlot] || []).some(a => a.id === att.id)
                    : equipped[activeSlot]?.id === att.id;

                  return (
                    <button
                      key={att.id}
                      onClick={() => handleEquip(activeSlot, att)}
                      className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${isEquipped ? 'bg-red-600/20 border-red-500/50' : 'bg-black/50 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-start gap-3">
                        {att.image && (
                          <div className="w-16 h-16 shrink-0 bg-white/5 rounded-lg border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                            <img src={att.image} alt={att.name} className="max-w-full max-h-full object-contain" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))' }} />
                          </div>
                        )}
                        <div className="flex flex-col gap-1 w-full overflow-hidden">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-sm text-white uppercase truncate">{att.name}</span>
                            {isEquipped && <CheckSquare size={14} className="text-red-500 shrink-0 ml-1" />}
                          </div>
                          <span className="text-[10px] md:text-xs text-gray-400 leading-relaxed line-clamp-3">{att.desc}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-xl bg-white/[0.02] min-h-[200px]"
              >
                <Settings size={32} className="text-white/10 mb-4 animate-[spin_10s_linear_infinite]" />
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Wähle einen Slot zur Modifikation</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
};

export default function App() {
  const [dbUser, setDbUser] = useState(null);

  // Firebase Data States
  const [userAttachments, setUserAttachments] = useState({});
  const [userMapLoadouts, setUserMapLoadouts] = useState({});
  const [userObjectives, setUserObjectives] = useState({});
  const [userBlueprints, setUserBlueprints] = useState({});
  const [globalStandardLoadout, setGlobalStandardLoadout] = useState(DEFAULT_STANDARD_LOADOUT);

  const [activeTab, setActiveTab] = useState('home');
  const [ronSubTab, setRonSubTab] = useState('maps');
  const [loadoutSubTab, setLoadoutSubTab] = useState('overview');
  const [activeDlc, setActiveDlc] = useState('base');
  const [activeWeaponCat, setActiveWeaponCat] = useState('Assault Rifles');

  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [equippedAttachments, setEquippedAttachments] = useState({ Optics: null, Muzzle: null, Underbarrel: null, Overbarrel: [] });
  const [activeAttachmentSlot, setActiveAttachmentSlot] = useState(null);

  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [activeSkinModal, setActiveSkinModal] = useState({ isOpen: false, item: null, type: null });

  const [isRonSearchOpen, setIsRonSearchOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [liveFeed, setLiveFeed] = useState([]);

  const scrollPosRef = useRef({ window: 0, ronContainer: 0 });
  const ronListRef = useRef(null);
  const lastScrollY = useRef(0);

  // Auth & Profile State
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Progression State
  const [mapProgress, setMapProgress] = useState({});
  const [tempDiff, setTempDiff] = useState('Moderate');
  const [tempRank, setTempRank] = useState('A');
  const [lastViewedMap, setLastViewedMap] = useState(null);

  // Gemini State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  // Initialisiere Firebase Auth
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        /*if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }*/
      } catch (err) {
        console.error('Auth error', err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setDbUser);
    return () => unsubscribe();
  }, []);

  // Lade Firebase Daten (Live-Synchronisation)
  useEffect(() => {
    if (!db || !dbUser) return;

    const unsubs = [];
    const collectionsList = [
      { name: 'attachments', setter: setUserAttachments },
      { name: 'mapLoadouts', setter: setUserMapLoadouts },
      { name: 'mapObjectives', setter: setUserObjectives },
      { name: 'blueprintMarkers', setter: setUserBlueprints }
    ];

    collectionsList.forEach(colInfo => {
      const q = collection(db, 'artifacts', appId, 'users', dbUser.uid, colInfo.name);
      unsubs.push(
        onSnapshot(q, (snap) => {
          const data = {};
          snap.forEach(d => data[d.id] = d.data());
          colInfo.setter(data);
        }, console.error)
      );
    });

    const standardDocRef = doc(db, 'artifacts', appId, 'users', dbUser.uid, 'globalLoadouts', 'standard');
    unsubs.push(
      onSnapshot(standardDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setGlobalStandardLoadout(docSnap.data());
        }
      })
    );

    const progressDocRef = doc(db, 'artifacts', appId, 'users', dbUser.uid, 'progress', 'maps');
    unsubs.push(
      onSnapshot(progressDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setMapProgress(docSnap.data().records || {});
        } else {
          setMapProgress({});
        }
      })
    );

    return () => unsubs.forEach(u => u());
  }, [dbUser]);

  useEffect(() => {
    if (selectedWeapon) {
      if (userAttachments[selectedWeapon.id]) {
        const saved = userAttachments[selectedWeapon.id];
        const loadedEquip = { Optics: null, Muzzle: null, Underbarrel: null, Overbarrel: [] };
        Object.keys(saved).forEach(slot => {
          if (slot === 'Overbarrel') {
            if (Array.isArray(saved[slot])) {
              loadedEquip[slot] = saved[slot].map(id => RON_ATTACHMENTS[slot]?.find(a => a.id === id)).filter(Boolean);
            } else if (saved[slot] && typeof saved[slot] === 'string') {
              const item = RON_ATTACHMENTS[slot]?.find(a => a.id === saved[slot]);
              if (item) loadedEquip[slot] = [item];
            }
          } else {
            if (saved[slot] && RON_ATTACHMENTS[slot]) {
              loadedEquip[slot] = RON_ATTACHMENTS[slot].find(a => a.id === saved[slot]) || null;
            }
          }
        });
        setEquippedAttachments(loadedEquip);
      } else {
        setEquippedAttachments({ Optics: null, Muzzle: null, Underbarrel: null, Overbarrel: [] });
      }
      setActiveAttachmentSlot(null);
    }
  }, [selectedWeapon, userAttachments]);

  useEffect(() => {
    const shuffled = [...NEWS_POOL].sort((a, b) => b.timestamp - a.timestamp);
    setLiveFeed(shuffled);
  }, []);

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
          setActiveWeaponCat(savedState.activeWeaponCat || 'Assault Rifles');

          if (savedState.selectedMapId) setSelectedMap([...RON_MAPS, ...PUBG_MAPS].find(m => m.id === savedState.selectedMapId) || null);
          if (savedState.lastViewedMapId) setLastViewedMap([...RON_MAPS, ...PUBG_MAPS].find(m => m.id === savedState.lastViewedMapId) || null);
          if (savedState.selectedArticleId) setSelectedArticle(NEWS_POOL.find(n => n.id === savedState.selectedArticleId) || null);
          if (savedState.scrollPosition) setTimeout(() => window.scrollTo(0, savedState.scrollPosition), 150);
        }
      } catch (e) { }
    } else {
      localStorage.removeItem(STORAGE_KEY_STATE);
      localStorage.removeItem(STORAGE_KEY_TIME);
    }
    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (!isRestored) return;
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify({
      activeTab, ronSubTab, activeDlc, activeWeaponCat,
      selectedMapId: selectedMap?.id || null,
      lastViewedMapId: lastViewedMap?.id || null,
      selectedArticleId: selectedArticle?.id || null,
      scrollPosition: window.scrollY
    }));
    localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
  }, [activeTab, ronSubTab, activeDlc, activeWeaponCat, selectedMap, lastViewedMap, selectedArticle, isRestored]);

  useEffect(() => {
    if (!isRestored) return;
    let timeoutId = null;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!selectedMap && !selectedArticle && !selectedWeapon) {
        if (currentScrollY > lastScrollY.current + 10) setIsScrollingDown(true);
        else if (currentScrollY < lastScrollY.current - 15) setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          try {
            const currentState = JSON.parse(localStorage.getItem(STORAGE_KEY_STATE) || '{}');
            currentState.scrollPosition = currentScrollY;
            localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(currentState));
            localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
          } catch (e) { }
          timeoutId = null;
        }, 300);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', () => localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString()));
    return () => { window.removeEventListener('scroll', handleScroll); if (timeoutId) clearTimeout(timeoutId); };
  }, [isRestored, selectedMap, selectedArticle, selectedWeapon]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'ArrowRight') {
        setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
      }
      if (e.key === 'ArrowLeft') {
        setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
      }
      if (e.key === 'Escape') {
        setLightbox({ isOpen: false, images: [], currentIndex: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen]);

  useEffect(() => {
    if (!selectedMap && !selectedArticle && !selectedWeapon) {
      let attempts = 0;
      const restoreInterval = setInterval(() => {
        if (ronListRef.current) {
          window.scrollTo({ top: scrollPosRef.current.window, behavior: 'instant' });
          ronListRef.current.scrollTop = scrollPosRef.current.ronContainer;
          if (ronListRef.current.scrollTop === scrollPosRef.current.ronContainer || ronListRef.current.scrollTop > 0) clearInterval(restoreInterval);
        }
        if (++attempts > 30) clearInterval(restoreInterval);
      }, 50);
      return () => clearInterval(restoreInterval);
    }
  }, [selectedMap, selectedArticle, selectedWeapon]);

  const handleContainerScroll = (e) => {
    if (!selectedMap && !selectedArticle && !selectedWeapon) {
      const currentScrollY = e.target.scrollTop;
      if (currentScrollY > lastScrollY.current + 5) setIsScrollingDown(true);
      else if (currentScrollY < lastScrollY.current - 5) setIsScrollingDown(false);
      lastScrollY.current = currentScrollY;
    }
  };

  const handleMapClick = (map) => {
    scrollPosRef.current = { window: window.scrollY || document.documentElement.scrollTop, ronContainer: ronListRef.current ? ronListRef.current.scrollTop : 0 };
    setSelectedMap(map); setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false); window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleWeaponClick = (weapon) => {
    scrollPosRef.current = { window: window.scrollY || document.documentElement.scrollTop, ronContainer: ronListRef.current ? ronListRef.current.scrollTop : 0 };
    setSelectedWeapon(weapon); setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleBackClick = () => {
    setSelectedMap(null);
    setSelectedWeapon(null);
    setIsScrollingDown(false);
    if (ronSubTab === 'loadout' && selectedWeapon) {
      setLoadoutSubTab('armory');
    }
  };
  const handleArticleClick = (article) => {
    scrollPosRef.current = { window: window.scrollY, ronContainer: ronListRef.current?.scrollTop || 0 };
    setSelectedArticle(article); setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false); window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleBackFromArticle = () => { setSelectedArticle(null); setIsScrollingDown(false); };
  const handleOpenMissionFromArticle = (mapId) => {
    const map = [...RON_MAPS, ...PUBG_MAPS].find(m => m.id === mapId);
    if (map) {
      scrollPosRef.current = { window: 0, ronContainer: 0 };
      setSelectedArticle(null); setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false);
      setActiveTab(map.game); setSelectedMap(map);
      if (map.game === 'ron') { setActiveDlc(map.dlc); setRonSubTab('maps'); }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };
  const handleTabSwitch = (tab) => { setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false); setActiveTab(tab); };
  const handleRonSubTabSwitch = (tab) => {
    setSearchQuery('');
    setIsRonSearchOpen(false);
    setRonSubTab(tab);
    if (tab === 'loadout') {
      setLoadoutSubTab('overview');
      setSelectedWeapon(null);
    }
  };

  const handleGlobalLoadoutChange = (field, value) => {
    let newLoadout = { ...globalStandardLoadout };
    if (field === 'throwables' || field === 'devices') {
      newLoadout[field] = value;
    } else {
      newLoadout[field] = value;
    }

    if (field === 'armor') {
      newLoadout = autoAdjustSlots(newLoadout, getArmorSlots(value));
    }
    setGlobalStandardLoadout(newLoadout);
    if (db && dbUser) {
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'globalLoadouts', 'standard'), newLoadout).catch(console.error);
    }
  };

  const handleSkinChange = (itemId, skinId) => {
    let newLoadout = { ...globalStandardLoadout };
    if (!newLoadout.preferredSkins) newLoadout.preferredSkins = {};
    newLoadout.preferredSkins[itemId] = skinId;

    setGlobalStandardLoadout(newLoadout);
    if (db && dbUser) {
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'globalLoadouts', 'standard'), newLoadout).catch(console.error);
    }
  };

  const handleMapLoadoutChange = (mapId, field, value, currentMapLoadout) => {
    let newLoadout = { ...currentMapLoadout };
    if (field === 'throwables' || field === 'devices') {
      newLoadout[field] = value;
    } else {
      newLoadout[field] = value;
    }

    if (field === 'armor') {
      newLoadout = autoAdjustSlots(newLoadout, getArmorSlots(value));
    }
    setUserMapLoadouts(prev => ({ ...prev, [mapId]: newLoadout }));
    if (db && dbUser) {
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'mapLoadouts', mapId), newLoadout).catch(console.error);
    }
  };

  const handleLoadMapRecommendation = (mapId, overrides) => {
    let newLoadout = JSON.parse(JSON.stringify(globalStandardLoadout));
    if (overrides) {
      newLoadout = { ...newLoadout, ...overrides };
    }
    newLoadout = autoAdjustSlots(newLoadout, getArmorSlots(newLoadout.armor));
    setUserMapLoadouts(prev => ({ ...prev, [mapId]: newLoadout }));
    if (db && dbUser) {
      setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'mapLoadouts', mapId), newLoadout).catch(console.error);
    }
  };

  /*const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    const fakeEmail = `${username.toLowerCase().trim()}@intactics.user`;
    try {
      if (authMode === 'register') {
        await createUserWithEmailAndPassword(auth, fakeEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, fakeEmail, password);
      }
      setUsername(''); setPassword('');
    } catch (error) {
      setAuthError('Authentifizierung fehlgeschlagen.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    await signInAnonymously(auth);
    setMapProgress({});
    setIsProfileOpen(false);
  };*/

  const saveMapProgress = async () => {
    if (!dbUser || !selectedMap) return;
    const updatedProgress = {
      ...mapProgress,
      [selectedMap.id]: { difficulty: tempDiff, rank: tempRank }
    };
    setMapProgress(updatedProgress);
    await setDoc(doc(db, 'artifacts', appId, 'users', dbUser.uid, 'progress', 'maps'), { records: updatedProgress }, { merge: true });
  };

  useEffect(() => {
    if (selectedMap) {
      if (mapProgress[selectedMap.id]) {
        setTempDiff(mapProgress[selectedMap.id].difficulty);
        setTempRank(mapProgress[selectedMap.id].rank);
      }
    }
  }, [selectedMap, mapProgress]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'FLASH': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'UPDATE': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  const renderSearchResults = () => {
    const query = searchQuery.toLowerCase();
    let resultsMaps = [], resultsWeapons = [], resultsNews = [];
    let resultsArmor = [], resultsHeadwear = [], resultsUtils = [];

    if (activeTab === 'home' || activeTab === 'ron') {
      resultsMaps = [...RON_MAPS.filter(m => m.name.toLowerCase().includes(query) || (m.codename && m.codename.toLowerCase().includes(query)) || m.situation.toLowerCase().includes(query))];
      resultsWeapons = [...RON_WEAPONS.filter(w => w.name.toLowerCase().includes(query) || w.type.toLowerCase().includes(query) || w.desc.toLowerCase().includes(query))];
      resultsArmor = RON_ARMOR_OPTIONS.filter(a => a.name.toLowerCase().includes(query) || a.desc.toLowerCase().includes(query));
      resultsHeadwear = RON_HEADWEAR_OPTIONS.filter(h => h.name.toLowerCase().includes(query) || h.desc.toLowerCase().includes(query));
      resultsUtils = RON_UTILITIES.filter(u => u.name.toLowerCase().includes(query) || u.desc.toLowerCase().includes(query));
    }
    if (activeTab === 'home' || activeTab === 'pubg') resultsMaps = [...PUBG_MAPS.filter(m => m.name.toLowerCase().includes(query) || m.info.toLowerCase().includes(query))];
    if (activeTab === 'home') resultsNews = NEWS_POOL.filter(n => n.headline.toLowerCase().includes(query) || n.fact.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));

    const totalResults = resultsMaps.length + resultsWeapons.length + resultsNews.length + resultsArmor.length + resultsHeadwear.length + resultsUtils.length;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full max-w-7xl mx-auto pb-10 pt-4">
        {resultsNews.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Intel / News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultsNews.map(news => (
                <GlassCard key={news.id} onClick={() => handleArticleClick(news)} className="p-4 cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-2 mb-2"><span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${getTypeColor(news.type)}`}>{news.type}</span></div>
                  <h4 className="font-bold text-white/90">{news.headline}</h4>
                  <p className="text-xs text-white/50 line-clamp-2 mt-1">{news.fact}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {resultsMaps.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Operations / Maps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resultsMaps.map(map => (
                <GlassCard key={map.id} onClick={() => handleMapClick(map)} className="h-[200px] cursor-pointer group">
                  <img src={map.image} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt={map.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] text-red-500 font-bold uppercase">{map.game === 'ron' ? 'Ready or Not' : 'PUBG'}</p>
                    <h4 className="text-xl font-black uppercase text-white truncate">{map.name}</h4>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {resultsWeapons.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Armory / Waffen</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resultsWeapons.map(w => (
                <GlassCard key={w.id} onClick={() => handleWeaponClick(w)} className="relative h-[200px] md:h-[250px] overflow-hidden border-white/5 bg-[#111] cursor-pointer group">
                  <div className="absolute inset-0 p-4 pt-8 md:p-8 flex items-center justify-center pointer-events-none">
                    <img src={w.image} alt={w.name} className="w-[80%] h-auto object-contain transition-transform duration-500 group-hover:scale-105" style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.8))' }} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-6 pointer-events-none">
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">{w.type}</p>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{w.name}</h3>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        {(resultsArmor.length > 0 || resultsHeadwear.length > 0 || resultsUtils.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Loadout Equipment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resultsArmor.map(a => (
                <GlassCard key={a.id} onClick={() => { handleRonSubTabSwitch('loadout'); setLoadoutSubTab('armor'); }} className="p-4 cursor-pointer hover:bg-white/10 border-green-500/20">
                  <ShieldCheck size={20} className="text-green-500 mb-2" />
                  <h4 className="font-bold text-white uppercase">{a.name}</h4>
                  <p className="text-xs text-white/50 line-clamp-2">{a.desc}</p>
                </GlassCard>
              ))}
              {resultsHeadwear.map(h => (
                <GlassCard key={h.id} onClick={() => { handleRonSubTabSwitch('loadout'); setLoadoutSubTab('headwear'); }} className="p-4 cursor-pointer hover:bg-white/10 border-blue-500/20">
                  <HardHat size={20} className="text-blue-500 mb-2" />
                  <h4 className="font-bold text-white uppercase">{h.name}</h4>
                  <p className="text-xs text-white/50 line-clamp-2">{h.desc}</p>
                </GlassCard>
              ))}
              {resultsUtils.map(u => (
                <GlassCard key={u.id} onClick={() => { handleRonSubTabSwitch('loadout'); setLoadoutSubTab('utilities'); }} className="p-4 cursor-pointer hover:bg-white/10 border-orange-500/20">
                  <Layers size={20} className="text-orange-500 mb-2" />
                  <h4 className="font-bold text-white uppercase">{u.name}</h4>
                  <p className="text-xs text-white/50 line-clamp-2">{u.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="text-center py-12">
            <AlertTriangle size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/40 font-mono uppercase tracking-widest text-sm">Keine Einträge gefunden für "{searchQuery}"</p>
          </div>
        )}
      </motion.div>
    );
  };

  const renderHome = () => {
    if (selectedArticle) {
      return (
        <motion.div {...pageTransition} className="pt-20 md:pt-24 pb-32 md:pb-20 space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <motion.button onClick={handleBackFromArticle} className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm w-fit"><ChevronLeft size={18} /> Zurück zum Feed</motion.button>
          <GlassCard className="p-8 md:p-14 border-t-4 border-t-red-600 bg-gradient-to-b from-red-900/10 to-transparent">
            <div className="flex items-center gap-4 mb-8"><span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${getTypeColor(selectedArticle.type)}`}>{selectedArticle.type}</span><span className="text-white/40 text-xs font-mono">ID: {selectedArticle.id}-CLASS</span></div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 leading-tight">{selectedArticle.headline}</h1>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 flex items-start gap-4"><Info className="text-blue-400 shrink-0 mt-1" size={24} /><div><h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">Random Fact // Intel</h4><p className="text-blue-100 font-medium italic leading-relaxed text-sm md:text-base">"{selectedArticle.fact}"</p></div></div>
            <div className="prose prose-invert max-w-none"><h3 className="text-red-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><FileText size={16} /> Volles Dossier</h3><p className="text-gray-300 text-lg leading-relaxed font-medium">{selectedArticle.content}</p></div>
            <div className="mt-12 pt-8 border-t border-white/10"><button onClick={() => handleOpenMissionFromArticle(selectedArticle.mapId)} className="w-full flex items-center justify-center gap-3 py-4 md:py-5 bg-white text-black rounded-2xl font-black italic uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"><Target size={20} /> Zum Taktischen Briefing</button></div>
          </GlassCard>
        </motion.div>
      );
    }
    return (
      <motion.div {...pageTransition} className="pt-20 md:pt-28 pb-32 md:pb-20 space-y-8 md:space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-16">
          <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-black tracking-tighter text-white select-none italic leading-none">in<span className="text-blue-500">TACTICS</span></h1>
          <div className="flex items-center gap-3 bg-white/5 px-4 md:px-6 py-2 rounded-full border border-white/10 backdrop-blur-xl"><Activity size={12} className="text-green-500 animate-pulse" /><span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/60">System Online • Ready for Deployment</span></div>
        </div>
        <GlobalSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Gesamte Datenbank durchsuchen..." />
        {searchQuery ? renderSearchResults() : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <GlassCard onClick={() => handleTabSwitch('ron')} className="p-6 md:p-10 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent"><Shield size={32} className="text-red-500 mb-4 md:mb-6" /><h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Ready or Not</h2><p className="text-white/40 text-xs md:text-sm mt-1 md:mt-2 font-medium">Tactical SWAT Simulation Data</p></GlassCard>
                <GlassCard onClick={() => handleTabSwitch('pubg')} className="p-6 md:p-10 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent"><Crosshair size={32} className="text-yellow-500 mb-4 md:mb-6" /><h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">PUBG</h2><p className="text-white/40 text-xs md:text-sm mt-1 md:mt-2 font-medium">Battle Royale Reconnaissance</p></GlassCard>
              </div>
              <GlassCard className="p-6 md:p-8 flex flex-col h-[400px]">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4"><h3 className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-black italic uppercase tracking-tighter text-white"><Zap size={18} className="text-blue-400 animate-pulse" /> Live Intel Feed</h3><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span><span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Syncing</span></div></div>
                <div className="flex-1 overflow-hidden relative"><div className="absolute inset-0 mask-image-b space-y-3 md:space-y-4"><AnimatePresence>{liveFeed.map((item) => (
                  <motion.div key={item.id + item.timestamp.getTime()} onClick={() => handleArticleClick(item)} initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="group flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer shadow-lg">
                    <div className="flex justify-between items-start"><span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${getTypeColor(item.type)}`}>{item.type}</span><span className="text-[10px] text-white/30 font-mono">{getRelativeTime(item.timestamp)}</span></div>
                    <h4 className="text-sm md:text-base font-bold text-white/90 leading-tight group-hover:text-blue-400 transition-colors">{item.headline}</h4>
                    <p className="text-xs text-white/50 italic line-clamp-1 group-hover:text-white/70"><span className="font-bold text-white/40">Fact:</span> {item.fact}</p>
                  </motion.div>
                ))}</AnimatePresence></div></div>
              </GlassCard>
            </div>
            <div className="space-y-6 md:space-y-8">
              <GlassCard className="p-6 md:p-8 bg-blue-600/5 border-blue-500/20">
                <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-blue-400 mb-4 md:mb-6">Last Viewed Intel</h3>
                {lastViewedMap ? (
                  <div className="space-y-4 md:space-y-6"><div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/10"><img src={lastViewedMap.image} className="w-full h-full object-cover" /></div><div><h4 className="text-xl md:text-2xl font-black italic uppercase text-white leading-none">{lastViewedMap.name}</h4><p className="text-white/40 text-[10px] mt-2 font-mono uppercase tracking-tighter">{lastViewedMap.game === 'ron' ? 'Operation Area' : 'Combat Zone'}</p></div><button onClick={() => handleTabSwitch(lastViewedMap.game)} className="w-full py-3 md:py-4 bg-white text-black font-black uppercase italic tracking-tighter text-xs md:text-sm rounded-xl hover:bg-blue-400 transition-colors">Return to Intel</button></div>
                ) : (
                  <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center opacity-20"><Clock size={40} className="mb-4" /><p className="text-[10px] font-black uppercase tracking-widest italic">No Recent Activity</p></div>
                )}
              </GlassCard>
              <GlassCard className="p-6 md:p-8"><h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/40 mb-4 md:mb-6">Tactical Status</h3><div className="grid grid-cols-2 gap-3 md:gap-4"><div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center"><p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Missions</p><p className="text-xl md:text-2xl font-black italic text-white">{Object.keys(mapProgress).length} / {RON_MAPS.length}</p></div><div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center"><p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Intel</p><p className="text-xl md:text-2xl font-black italic text-white">{NEWS_POOL.length}</p></div></div></GlassCard>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderReadyOrNot = () => {
    // WEAPON DETAIL VIEW
    if (selectedWeapon && activeTab === 'ron') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20 max-w-6xl mx-auto">
        <motion.button onClick={handleBackClick} className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"><ChevronLeft size={18} /> Zurück zur Armory</motion.button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-gradient-to-tr from-zinc-900 to-black border-red-500/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <img src={selectedWeapon.image} className="w-[120%] max-w-none h-auto blur-sm scale-110 object-contain" alt="" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="w-full md:w-1/2 flex justify-center">
                  <img src={selectedWeapon.image} className="w-full h-auto max-h-[250px] object-contain drop-shadow-2xl" style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.8))' }} alt={selectedWeapon.name} />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <span className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">{selectedWeapon.type}</span>
                  <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mt-1">{selectedWeapon.name}</h1>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 text-gray-300 font-medium leading-relaxed text-sm md:text-base relative z-10">
                {selectedWeapon.desc}
              </div>
            </GlassCard>

            <WeaponGunsmith
              weaponId={selectedWeapon.id}
              equipped={equippedAttachments}
              setEquipped={setEquippedAttachments}
              activeSlot={activeAttachmentSlot}
              setActiveSlot={setActiveAttachmentSlot}
              dbUser={dbUser}
            />

            <GlassCard className="p-6 md:p-10 border-blue-500/20 bg-blue-900/5">
              <div className="flex items-center gap-3 mb-6"><Shield className="text-blue-500" size={24} /><h3 className="text-blue-500 font-black uppercase tracking-widest text-[14px]">Einsatztaktik</h3></div>
              <p className="text-gray-200 leading-relaxed font-medium md:text-lg">{selectedWeapon.tactical}</p>
            </GlassCard>
          </div>
          <div className="space-y-6">
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-6">Waffen-Spezifikationen</h3>
              <div className="space-y-5">
                <div className="border-b border-white/5 pb-5"><p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Kategorie</p><p className="text-lg font-black text-white uppercase italic tracking-tight">{selectedWeapon.category === 'primary' ? 'Primärwaffe' : 'Sekundärwaffe'}</p></div>
                <div className="border-b border-white/5 pb-5"><p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Kaliber</p><p className="text-lg font-black text-white">{selectedWeapon.caliber}</p></div>
                <div className="pb-2"><p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Magazinkapazität</p><p className="text-lg font-black text-white">{selectedWeapon.capacity}</p></div>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    );

    // MAP DETAIL VIEW
    if (selectedMap && selectedMap.game === 'ron') {
      const curMapLoadout = userMapLoadouts[selectedMap.id] || globalStandardLoadout;

      return (
        <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20">
          <motion.button onClick={handleBackClick} className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"><ChevronLeft size={18} /> Zurück zur Auswahl</motion.button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="relative h-[40vh] md:h-[50vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-black">
                <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 pr-6">
                  {selectedMap.codename && <span className="bg-red-600 text-white font-black px-3 md:px-4 py-1 rounded-md text-[8px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 inline-block shadow-lg shadow-red-600/20">Operation: {selectedMap.codename}</span>}
                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none">{selectedMap.name}</h1>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <GlassCard className="p-6 md:p-10"><h3 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-3 md:mb-4">Missionsprofil</h3><p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">{selectedMap.situation}</p></GlassCard>
                <GlassCard className="p-6 md:p-10"><h3 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-3 md:mb-4">Feindlage</h3><p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">{selectedMap.suspects}</p></GlassCard>
              </div>

              <GlassCard className="p-6 md:p-10 border-blue-500/20 bg-blue-600/5">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-blue-400" size={20} />
                  <h3 className="text-xl font-black italic uppercase">Mission Status</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Difficulty</label>
                    <div className="flex gap-2">
                      {DIFFICULTIES.map(diff => (
                        <button
                          key={diff}
                          onClick={() => setTempDiff(diff)}
                          className={`flex-1 py-3 rounded-lg text-xs font-black uppercase border transition-colors ${tempDiff === diff ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 hover:bg-white/10 text-white/60'}`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Rank Achieved</label>
                    <div className="flex gap-2 flex-wrap">
                      {RANKS.map(rank => (
                        <button
                          key={rank}
                          onClick={() => setTempRank(rank)}
                          className={`flex-1 min-w-[30px] py-3 rounded-lg text-sm font-black uppercase border transition-colors ${tempRank === rank ? 'bg-blue-600 text-white border-blue-400' : 'bg-black/40 border-white/10 hover:bg-white/10 text-white/60'}`}
                        >
                          {rank}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={saveMapProgress} className="mt-6 w-full py-4 bg-white/10 hover:bg-blue-600 border border-white/10 hover:border-blue-400 rounded-xl font-black uppercase text-xs transition-all flex justify-center items-center gap-2">
                  <Save size={16} /> Update Record
                </button>
              </GlassCard>

              <MissionObjectives mapId={selectedMap.id} objectives={selectedMap.objectives} dbUser={dbUser} userObjectives={userObjectives} />

              <AudioLogViewer logs={selectedMap.audioLogs} />
              <POIViewer poi={selectedMap.poi} />
              <BlueprintViewer map={selectedMap} dbUser={dbUser} userBlueprints={userBlueprints} />
            </div>
            <div className="space-y-6 md:space-y-10">
              {selectedMap.screenshots?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4 mt-4 md:mt-0">Intel Footage</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {selectedMap.screenshots.map((img, i) => (
                      <GlassCard key={i} onClick={() => setLightbox({ isOpen: true, images: selectedMap.screenshots, currentIndex: i })} className="aspect-video relative overflow-hidden group cursor-pointer">
                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Intel" />
                        <div className="absolute inset-0 border-[2px] border-white/0 group-hover:border-red-500/50 transition-colors pointer-events-none rounded-[1.5rem] md:rounded-[2rem]"></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
              {selectedMap.media?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-blue-500 pl-4 mt-4 md:mt-0">Media Coverage</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {selectedMap.media.map((img, i) => (
                      <GlassCard key={i} onClick={() => setLightbox({ isOpen: true, images: selectedMap.media, currentIndex: i })} className="aspect-video relative overflow-hidden group cursor-pointer">
                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Media" />
                        <div className="absolute inset-0 border-[2px] border-white/0 group-hover:border-blue-500/50 transition-colors pointer-events-none rounded-[1.5rem] md:rounded-[2rem]"></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 mt-4">
              <UnifiedLoadoutEditor
                loadout={curMapLoadout}
                onChange={(field, val) => handleMapLoadoutChange(selectedMap.id, field, val, curMapLoadout)}
                title={`Tactical Loadout // ${selectedMap.codename || selectedMap.name}`}
                showRecommendationBtn={true}
                onLoadRecommendation={() => handleLoadMapRecommendation(selectedMap.id, selectedMap.recommendedOverrides)}
                preferredSkins={globalStandardLoadout.preferredSkins}
              />
            </div>
          </div>
        </motion.div>
      );
    }

    const currentMaps = RON_MAPS.filter(map => map.dlc === activeDlc);
    const currentWeapons = RON_WEAPONS.filter(w => w.type === activeWeaponCat);

    return (
      <motion.div {...pageTransition} key="ron-main" className="md:space-y-12 pt-0 md:pt-28 pb-32 md:pb-20 max-md:fixed max-md:inset-0 max-md:top-0 max-md:bottom-[68px] max-md:z-30 max-md:bg-[#010101] max-md:block max-md:p-0">

        {/* DESKTOP TOP MENU */}
        <div className="max-md:hidden relative z-20 flex flex-col items-center w-full mb-8">
          <div className="relative z-10 w-fit mx-auto mb-6 md:mb-8">
            <div className="flex p-[3px] md:p-1 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full relative shadow-2xl overflow-hidden">
              {['maps', 'loadout'].map((tab) => (
                <button key={tab} onClick={() => handleRonSubTabSwitch(tab)} className={`relative px-8 md:px-14 py-2 md:py-3.5 rounded-full font-black uppercase italic tracking-tighter text-[10px] md:text-[13px] z-10 transition-colors duration-500 ${ronSubTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                  {ronSubTab === tab && <motion.div layoutId="ron-active-sub" className="absolute inset-0 bg-[#e31e24] rounded-full -z-10 shadow-[0_0_30px_rgba(227,30,36,0.3)]" transition={springTransition} />}
                  {tab === 'maps' ? 'Operations' : 'Loadout'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full overflow-hidden max-w-7xl mx-auto">
            <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-0 snap-x">

              {/* Back Button for Loadout Sub-Tabs */}
              {ronSubTab === 'loadout' && loadoutSubTab !== 'overview' && (
                <button
                  onClick={() => setLoadoutSubTab('overview')}
                  className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-[10px] uppercase font-black shrink-0 mr-4 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              )}

              {/* DESKTOP SEARCH BAR */}
              <div className="hidden md:flex items-center shrink-0">
                {isRonSearchOpen ? (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 130, opacity: 1 }} className="flex items-center bg-white/10 rounded-full border border-white/20 px-2.5 py-1.5 mr-2">
                    <Search size={14} className="text-white/40 mr-1.5 shrink-0" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Suchen..."
                      className="bg-transparent text-white outline-none text-[11px] w-full"
                    />
                    <button onClick={() => { setIsRonSearchOpen(false); setSearchQuery(''); }} className="shrink-0 ml-1.5">
                      <X size={14} className="text-white/40 hover:text-white" />
                    </button>
                  </motion.div>
                ) : (
                  <button onClick={() => setIsRonSearchOpen(true)} className="p-1.5 text-white/40 hover:text-white transition-colors flex items-center justify-center mr-2">
                    <Search size={16} />
                  </button>
                )}
              </div>

              {/* Dynamic Sub-Tabs depending on selected mode */}
              {ronSubTab === 'maps' ? (
                [{ id: 'base', label: 'READY OR NOT' }, { id: 'home_invasion', label: 'HOME INVASION' }, { id: 'dark_waters', label: 'DARK WATERS' }, { id: 'ls_stories', label: 'LOS SUENOS STORIES' }, { id: 'boiling_point', label: 'BOILING POINT' }].map(dlc => (
                  <button key={dlc.id} onClick={() => setActiveDlc(dlc.id)} className={`relative uppercase font-black tracking-[0.1em] text-[12px] transition-all shrink-0 py-2 snap-start whitespace-nowrap ${activeDlc === dlc.id ? 'text-[#e5e5e5]' : 'text-white/40 hover:text-white/70'}`}>
                    {dlc.label}
                    {activeDlc === dlc.id && <motion.div layoutId="dlc-bar" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc2e2e]" transition={springTransition} />}
                  </button>
                ))
              ) : (ronSubTab === 'loadout' && loadoutSubTab === 'armory') ? (
                WEAPON_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveWeaponCat(cat.id)} className={`relative uppercase font-black tracking-[0.1em] text-[12px] transition-all shrink-0 py-2 snap-start whitespace-nowrap ${activeWeaponCat === cat.id ? 'text-[#e5e5e5]' : 'text-white/40 hover:text-white/70'}`}>
                    {cat.label}
                    {activeWeaponCat === cat.id && <motion.div layoutId="wep-cat-bar" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc2e2e]" transition={springTransition} />}
                  </button>
                ))
              ) : null}
            </div>
          </div>
        </div>

        {/* LIST RENDERER */}
        <div className={`max-md:absolute max-md:inset-0 relative z-10 ${searchQuery ? 'max-md:pt-8 max-md:px-4 max-md:overflow-y-auto' : ''}`}>
          <AnimatePresence mode="wait">
            {searchQuery ? (
              <div className="w-full h-full overflow-y-auto pb-32 no-scrollbar">{renderSearchResults()}</div>
            ) : (
              <motion.div key={activeDlc + activeWeaponCat + ronSubTab + loadoutSubTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} ref={ronListRef} onScroll={handleContainerScroll} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 max-md:flex max-md:flex-col max-md:overflow-y-scroll no-scrollbar ${ronSubTab === 'maps' ? 'max-md:gap-0 max-md:h-full max-md:snap-y max-md:snap-mandatory' : 'max-md:gap-4 max-md:p-4 max-md:h-full max-md:pb-32'}`}>
                {ronSubTab === 'maps' ? currentMaps.map(map => {
                  const progress = mapProgress[map.id];
                  return (
                    <div key={map.id} className="relative md:flex-1 md:hover:flex-[3] transition-all duration-700 ease-in-out overflow-hidden md:rounded-3xl group max-md:h-full max-md:w-full max-md:snap-start max-md:shrink-0">
                      <GlassCard onClick={() => handleMapClick(map)} className="h-[350px] md:h-[480px] max-md:h-full max-md:w-full max-md:rounded-none max-md:border-none max-md:shadow-none bg-black">
                        <img src={map.image} style={{ objectPosition: map.imagePosition || 'center' }} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100 md:group-hover:scale-110" alt={map.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute max-md:bottom-[110px] md:bottom-0 left-0 p-6 md:p-12 w-full">
                          <p className="text-red-600 font-mono text-[10px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 truncate">{map.codename}</p>
                          <h3 className="text-3xl md:text-3xl lg:text-4xl font-black text-white italic uppercase leading-tight tracking-tighter drop-shadow-2xl">{map.name}</h3>
                        </div>
                        {progress && (
                          <div className="absolute top-6 right-6 bg-blue-600/90 backdrop-blur-md border border-blue-400 text-white px-3 py-1.5 rounded-lg shadow-lg flex flex-col items-end z-20">
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-80">{progress.difficulty}</span>
                            <span className="text-lg font-black leading-none">{progress.rank}</span>
                          </div>
                        )}
                      </GlassCard>
                    </div>
                  );
                }) : (ronSubTab === 'loadout') ? (
                  <div className="lg:col-span-2 w-full pb-10">
                    {loadoutSubTab === 'overview' && (
                      <div className="space-y-12">
                        <SwatOperatorUI onSelectCategory={setLoadoutSubTab} />
                        <UnifiedLoadoutEditor
                          loadout={globalStandardLoadout}
                          onChange={handleGlobalLoadoutChange}
                          title="Global Standard Loadout"
                          showRecommendationBtn={false}
                          preferredSkins={globalStandardLoadout.preferredSkins}
                        />
                      </div>
                    )}

                    {loadoutSubTab === 'armory' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {currentWeapons.map(w => (
                          <GlassCard key={w.id} onClick={() => handleWeaponClick(w)} className="relative h-[200px] md:h-[250px] overflow-hidden border-white/5 bg-[#111] cursor-pointer group">
                            {/* Background Image Area */}
                            <div className="absolute inset-0 p-4 pt-8 md:p-8 flex items-center justify-center pointer-events-none">
                              <img src={w.image} alt={w.name} className="w-[80%] h-auto object-contain transition-transform duration-500 group-hover:scale-105" style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.8))' }} />
                            </div>
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none"></div>
                            {/* Text Area */}
                            <div className="absolute bottom-4 left-6 pointer-events-none">
                              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">{w.type}</p>
                              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{w.name}</h3>
                            </div>
                          </GlassCard>
                        ))}
                      </div>
                    )}

                    {loadoutSubTab === 'armor' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        <h3 className="sm:col-span-2 text-2xl font-black uppercase italic tracking-tighter border-l-4 border-green-500 pl-4 mb-4">Plate / Armor Database</h3>
                        {RON_ARMOR_OPTIONS.map(a => {
                          const currentSkinId = globalStandardLoadout.preferredSkins?.[a.id] || a.skins?.[0]?.id;
                          const currentSkinImg = a.skins?.find(s => s.id === currentSkinId)?.image || a.image;
                          return (
                            <GlassCard key={a.id} onClick={() => setActiveSkinModal({ isOpen: true, item: a, type: 'armor' })} className="p-6 border-white/5 hover:border-green-500/30 transition-colors flex flex-col justify-between cursor-pointer">
                              <div className="flex items-center justify-between mb-4">
                                <ShieldCheck size={32} className="text-green-500" />
                                {a.skins && <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/60 uppercase font-bold">{a.skins.length} Skins</span>}
                              </div>
                              <div className="flex-1 flex justify-center py-4">
                                <img src={currentSkinImg} className="h-32 object-contain" alt={a.name} style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.6))' }} />
                              </div>
                              <h4 className="text-xl font-bold uppercase text-white mb-2 text-center">{a.name}</h4>
                              <p className="text-sm text-gray-400 text-center">{a.desc}</p>
                            </GlassCard>
                          );
                        })}
                      </div>
                    )}

                    {loadoutSubTab === 'headwear' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        <h3 className="sm:col-span-2 text-2xl font-black uppercase italic tracking-tighter border-l-4 border-blue-500 pl-4 mb-4">Headwear Database</h3>
                        {RON_HEADWEAR_OPTIONS.map(h => {
                          const currentSkinId = globalStandardLoadout.preferredSkins?.[h.id] || h.skins?.[0]?.id;
                          const currentSkinImg = h.skins?.find(s => s.id === currentSkinId)?.image || h.image;
                          return (
                            <GlassCard key={h.id} onClick={() => setActiveSkinModal({ isOpen: true, item: h, type: 'headwear' })} className="p-6 border-white/5 hover:border-blue-500/30 transition-colors flex items-center gap-4 cursor-pointer">
                              <div className="w-16 h-16 shrink-0 bg-white/5 rounded-xl border border-white/10 p-2 flex items-center justify-center">
                                <img src={currentSkinImg} className="max-w-full max-h-full object-contain" alt={h.name} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">{h.type}</p>
                                <h4 className="text-lg font-bold uppercase text-white leading-tight">{h.name}</h4>
                              </div>
                              {h.skins && <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/60 uppercase font-bold shrink-0">{h.skins.length} Skins</span>}
                            </GlassCard>
                          );
                        })}
                      </div>
                    )}

                    {loadoutSubTab === 'utilities' && (
                      <div className="space-y-10 max-w-6xl mx-auto">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter border-l-4 border-orange-500 pl-4 mb-4">Tactical Utilities Database</h3>

                        {['Throwable', 'Breaching', 'Long Tactical', 'Tactical Device'].map(cat => (
                          <div key={cat} className="space-y-4">
                            <h4 className="text-lg font-bold uppercase text-white/50 tracking-widest border-b border-white/10 pb-2">{cat}s</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {RON_UTILITIES.filter(u => u.category === cat).map(u => (
                                <GlassCard key={u.id} className="p-6 border-white/5 hover:border-orange-500/30 transition-colors flex flex-col h-full">
                                  <div className="flex items-center gap-3 mb-3">
                                    {cat === 'Throwable' && <Zap size={24} className="text-orange-500 shrink-0" />}
                                    {cat === 'Breaching' && <Target size={24} className="text-orange-500 shrink-0" />}
                                    {cat === 'Long Tactical' && <Eye size={24} className="text-orange-500 shrink-0" />}
                                    {cat === 'Tactical Device' && <Settings size={24} className="text-orange-500 shrink-0" />}
                                    <h5 className="text-lg font-bold uppercase text-white leading-tight">{u.name}</h5>
                                  </div>
                                  <p className="text-sm text-gray-400 flex-1">{u.desc}</p>
                                </GlassCard>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- MOBILE SEARCH BAR OVERLAY (Fixed Top) --- */}
        <AnimatePresence>
          {isRonSearchOpen && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-4 left-4 right-4 z-[9999] md:hidden"
            >
              <div className="flex items-center bg-zinc-900 border border-white/20 rounded-full px-4 py-3 shadow-2xl">
                <Search size={18} className="text-white/40 mr-3 shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Gesamte Datenbank durchsuchen..."
                  className="bg-transparent text-white outline-none text-sm w-full"
                />
                <button onClick={() => { setIsRonSearchOpen(false); setSearchQuery(''); }} className="ml-3 shrink-0">
                  <X size={18} className="text-white/40 hover:text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE BOTTOM MENU */}
        <motion.div animate={{ y: isScrollingDown ? 200 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="md:hidden fixed bottom-[68px] left-0 right-0 flex flex-col gap-2 px-3 pt-8 pb-2 bg-gradient-to-t from-[#010101] via-[#010101] to-transparent z-40 pointer-events-none">
          <div className="pointer-events-auto flex flex-col gap-2">
            <div className="flex overflow-x-auto no-scrollbar gap-2 py-1 items-center">
              <div className="shrink-0 flex items-center">
                <button onClick={() => setIsRonSearchOpen(true)} className="p-1.5 bg-[#111111] border border-transparent rounded-full text-white/50 hover:text-white transition-colors flex items-center justify-center mr-1"><Search size={12} /></button>
              </div>

              {/* Mobile Back Button for Loadout sub-tabs */}
              {!searchQuery && ronSubTab === 'loadout' && loadoutSubTab !== 'overview' && (
                <button
                  onClick={() => setLoadoutSubTab('overview')}
                  className="px-3 py-1.5 rounded-full whitespace-nowrap text-[9px] font-black uppercase border border-white/30 text-white shrink-0 mr-2 flex items-center gap-1"
                >
                  <ChevronLeft size={12} /> BACK
                </button>
              )}

              {!searchQuery && (ronSubTab === 'maps' ? (
                [{ id: 'base', label: 'READY OR NOT' }, { id: 'home_invasion', label: 'HOME INVASION' }, { id: 'dark_waters', label: 'DARK WATERS' }, { id: 'ls_stories', label: 'LOS SUENOS STORIES' }, { id: 'boiling_point', label: 'BOILING POINT' }].map(dlc => (
                  <button key={dlc.id} onClick={() => setActiveDlc(dlc.id)} className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[9px] font-black uppercase border transition-all shrink-0 ${activeDlc === dlc.id ? 'border-[#e31e24] text-white bg-transparent' : 'border-transparent bg-[#111111] text-white/50'}`}>{dlc.label}</button>
                ))
              ) : (ronSubTab === 'loadout' && loadoutSubTab === 'armory') ? (
                WEAPON_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveWeaponCat(cat.id)} className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[9px] font-black uppercase border transition-all shrink-0 ${activeWeaponCat === cat.id ? 'border-[#e31e24] text-white bg-transparent' : 'border-transparent bg-[#111111] text-white/50'}`}>{cat.label}</button>
                ))
              ) : null)}
            </div>

            {!searchQuery && (
              <div className="flex gap-2">
                {['maps', 'loadout'].map((tab) => (
                  <button key={tab} onClick={() => handleRonSubTabSwitch(tab)} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${ronSubTab === tab ? 'bg-[#e31e24] text-white border-white shadow-lg' : 'bg-[#111111] text-white/50 border-transparent'}`}>
                    {tab === 'maps' ? 'Operations' : 'Loadout'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderPubg = () => {
    if (selectedMap && selectedMap.game === 'pubg') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20">
        <motion.button onClick={handleBackClick} className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"><ChevronLeft size={18} /> Zurück zur Auswahl</motion.button>
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
            <GlassCard className="p-6 md:p-10"><h3 className="text-yellow-500 font-black uppercase text-[10px] tracking-widest mb-3 md:mb-4">Übersicht</h3><p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium">{selectedMap.info}</p></GlassCard>
            <GlassCard className="p-6 md:p-10 border-yellow-500/20"><div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4"><Lock size={16} className="text-yellow-500" /><h3 className="text-yellow-500 font-black uppercase text-[10px] tracking-widest">Map Secrets</h3></div><p className="text-gray-200 text-sm md:text-lg leading-relaxed font-medium mb-4">{selectedMap.secrets}</p><div className="p-4 md:p-6 bg-black/40 rounded-xl md:rounded-2xl border border-white/10"><p className="text-xs md:text-sm text-white/60 italic leading-relaxed">{selectedMap.locations}</p></div></GlassCard>
          </div>
        </div>
      </motion.div>
    );

    return (
      <motion.div {...pageTransition} className="pt-20 md:pt-28 space-y-8 md:space-y-12 pb-32 md:pb-20">
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Battlegrounds</h2>
        <GlobalSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="PUBG durchsuchen..." />
        {searchQuery ? renderSearchResults() : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {PUBG_MAPS.map(map => (
              <GlassCard key={map.id} onClick={() => handleMapClick(map)} className="h-[350px] md:h-[480px]">
                <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={map.name} />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                  <span className="bg-yellow-500 text-black font-black text-[8px] md:text-[10px] px-3 py-1 rounded uppercase tracking-[0.2em]">{map.size}</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase mt-3 md:mt-4 tracking-tighter leading-none">{map.name}</h3>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#010101] font-sans text-white overflow-x-hidden selection:bg-blue-600/40">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeTab === 'ron' ? (
            <motion.div key="bg-ron" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 overflow-hidden">
              <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-y-0 left-0 w-1/3 bg-blue-600/20 blur-[120px] -translate-x-1/2" />
              <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} className="absolute inset-y-0 right-0 w-1/3 bg-red-600/20 blur-[120px] translate-x-1/2" />
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
        <header className="fixed md:top-8 max-md:bottom-0 left-0 right-0 z-50 flex justify-center md:px-6 max-md:h-[68px] pointer-events-none">
          <motion.nav initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#050505] md:bg-black/20 backdrop-blur-3xl border-t md:border border-white/10 max-md:rounded-none md:rounded-full p-0 flex items-center shadow-2xl w-full md:w-auto pointer-events-auto max-md:h-full">
            <div className="flex relative w-full md:w-auto px-2 md:px-0 h-full">
              <DynamicNavItem id="home" icon={Home} label="Home" activeTab={activeTab} setActiveTab={handleTabSwitch} />
              <DynamicNavItem id="ron" icon={Shield} label="RoN" activeTab={activeTab} setActiveTab={handleTabSwitch} />
              <DynamicNavItem id="pubg" icon={Crosshair} label="PUBG" activeTab={activeTab} setActiveTab={handleTabSwitch} />
            </div>
            <div className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all md:hidden`}></div>
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
          Tactical Repository // inTACTICS v4.0.0
          <div className="w-full py-8 md:py-10 text-center text-white/10 text-[8px] copyright">
            <h3>© Copyright</h3>
            <p className="py-8 md:py-10">Ready or Not is a trademark of <a href="https://voidinteractive.net/" target="_blank" rel="noopener noreferrer">VOID Interactive</a>. This is a fan-made project.</p>
            <div className="py-8 md:py-3 credits">
              <p>Site development and design by <strong>FRNZ</strong></p>
              <p style={{ marginTop: "15px" }}>© 2026 Ready or Not Maps</p>
            </div>
            <p className="last-updated"><strong>Last Updated:</strong> March 2026</p>
          </div>
        </footer>

        {/* LIGHTBOX & PROFILE MODALS */}
        <AnimatePresence>
          {/*{isProfileOpen && (
            /<ProfileModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              user={dbUser}
              authMode={authMode}
              setAuthMode={setAuthMode}
              //handleAuth={handleAuth}
              username={username} setUsername={setUsername}
              password={password} setPassword={setPassword}
              authError={authError}
              //handleLogout={handleLogout}
              mapProgress={mapProgress}
              setActiveTab={setActiveTab}
            />
          )}*/}
          {activeSkinModal.isOpen && (
            <SkinSelectionModal
              isOpen={true}
              item={activeSkinModal.item}
              preferredSkinId={globalStandardLoadout.preferredSkins?.[activeSkinModal.item.id]}
              onSelectSkin={handleSkinChange}
              onClose={() => setActiveSkinModal({ isOpen: false, item: null, type: null })}
            />
          )}

          {lightbox.isOpen && lightbox.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12 cursor-default"
              onClick={() => setLightbox({ isOpen: false, images: [], currentIndex: 0 })}
            >
              <button
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-red-500/80 hover:text-white rounded-full text-white/70 transition-colors z-[110]"
                onClick={(e) => { e.stopPropagation(); setLightbox({ isOpen: false, images: [], currentIndex: 0 }); }}
              >
                <X size={24} />
              </button>

              {/* Navigation Paginators */}
              {lightbox.images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
                    onClick={(e) => { e.stopPropagation(); setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length })); }}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
                    onClick={(e) => { e.stopPropagation(); setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length })); }}
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <motion.img
                key={lightbox.currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={lightbox.images[lightbox.currentIndex]}
                className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                alt="Fullscreen Intel"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Counter UI */}
              {lightbox.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur rounded-full text-white/70 font-mono text-xs z-[110]">
                  {lightbox.currentIndex + 1} / {lightbox.images.length}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
          body { overscroll-behavior-y: none; }
        }
      `}} />
    </div>
  );
}