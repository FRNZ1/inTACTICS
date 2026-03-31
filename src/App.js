import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle } from 'lucide-react';

// --- DATA MOCKS ---

const RON_MAPS = [
  // ==========================================
  // --- BASE GAME (READY OR NOT) ---
  // ==========================================
  {
    id: 'ron_gas',
    game: 'ron',
    dlc: 'base',
    name: '4U Gas Station',
    codename: 'Thank You, Come Again',
    imagePosition: '45%',
    image: 'https://readyormaps.com/maps/1_4U_gas/4U_Gas_Station_preview.webp',
    situation: 'Ein lokaler Drogenring überfällt eine Tankstelle und nimmt Zivilisten als Geiseln.',
    suspects: 'Desorganisierte Kriminelle, meist bewaffnet mit Pistolen und Schrotflinten. Geringe Panzerung.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: ['https://images.steamusercontent.com/ugc/2523778827659601613/1C290698DF614012E3FCB7B8DDCB485652BE9376/']
  },
  {
    id: 'ron_23mb',
    game: 'ron',
    dlc: 'base',
    name: 'San Uriel Condominiums',
    codename: '23 Megabytes a Second',
    image: 'https://readyormaps.com/maps/2_23_mb/23_Megabytes_a_Second_preview.webp',
    situation: 'Ein angebliches Swatting bei einem Streamer entpuppt sich als illegale Server-Operation (CP).',
    suspects: 'Private Sicherheitskräfte und bewaffnete Bewohner. Unerwartet hoher Widerstand.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_twisted',
    game: 'ron',
    dlc: 'base',
    name: '213 Park Homes',
    codename: 'Twisted Nerve',
    image: 'https://readyormaps.com/maps/3_213_park/213_Park_preview.webp',
    situation: 'Durchsuchungsbefehl bei einem vermuteten Meth-Labor in einem heruntergekommenen Vorort.',
    suspects: 'Junkies und Dealer. Unberechenbar, oft unter Drogeneinfluss. Gefahr durch versteckte Sprengfallen (Booby Traps).',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_spider',
    game: 'ron',
    dlc: 'base',
    name: 'Brixley Talent Time',
    codename: 'The Spider',
    image: 'https://readyormaps.com/maps/4_brixley_talent/brixley_talent_preview.webp',
    situation: 'Razzia in einer scheinbaren Talentagentur, die in die Produktion von illegalem Material verwickelt ist.',
    suspects: 'Bewaffnete Wachleute. Gut organisiert, nutzen die verwinkelten Räumlichkeiten zu ihrem Vorteil.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_lethal',
    game: 'ron',
    dlc: 'base',
    name: 'Sullivan\'s Slope',
    codename: 'A Lethal Obsession',
    image: 'https://readyormaps.com/maps/5_sullivans_slope/Sullivans%20slope_preview.webp',
    situation: 'Zugriff auf das abgelegene Grundstück eines flüchtigen Regierungsgegners und Bombenbauers.',
    suspects: 'Einsamer Wolf, aber extrem gefährlich. Das gesamte Gelände ist massiv mit tödlichen Sprengfallen präpariert.',
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_ides',
    game: 'ron',
    dlc: 'base',
    name: 'Brisa Cove',
    codename: 'Ides of March',
    image: 'https://readyormaps.com/maps/6_brisa_cove/brisa_cove_preview.webp',
    situation: 'Eine linksradikale Veteranen-Gruppierung (The Left Behind) hat sich in Luxusapartments verschanzt.',
    suspects: 'Militärisch ausgebildet, schwere Körperpanzerung, automatische Waffen und tödliche Sprengfallen.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_sinuous',
    game: 'ron',
    dlc: 'base',
    name: 'Mindjot Data Center',
    codename: 'Sinuous Trail',
    image: 'https://readyormaps.com/maps/7_mindjot/mindjot_preview.webp',
    situation: 'Stürmung eines Rechenzentrums, das illegale Inhalte (CP) für ein Kartell hostet.',
    suspects: 'Söldner der privaten Sicherheitsfirma Mindjot. Hochgradig ausgerüstet und koordiniert.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_ends',
    game: 'ron',
    dlc: 'base',
    name: 'Kawayu Beach',
    codename: 'Ends of the Earth',
    image: 'https://readyormaps.com/maps/8_kawayu_beach/kawayu_beach_preview.webp',
    situation: 'Zugriff auf ein Strandhaus, aus dem eine Familie illegalen Waffenhandel betreibt.',
    suspects: 'Familienmitglieder und Käufer. Unberechenbar aufgrund von Verzweiflung, teilweise unbewaffnete Zivilisten im Haus.',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_greased',
    game: 'ron',
    dlc: 'base',
    name: 'Los Suenos Postal Service',
    codename: 'Greased Palms',
    image: 'https://readyormaps.com/maps/9_los_suenos_postal/los_suenos_postal_preview.webp',
    situation: 'Das Postverteilzentrum dient als Umschlagplatz für illegale Waffen durch korrupte FISA-Agenten.',
    suspects: 'Abtrünnige Bundesagenten und Kartellmitglieder. Taktisch überlegen und schwer bewaffnet.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_valley',
    game: 'ron',
    dlc: 'base',
    name: 'Voll Health House',
    codename: 'Valley of the Dolls',
    image: 'https://readyormaps.com/maps/10_voll_health_house/voll_health_house_preview.webp',
    situation: 'Infiltration der Luxusvilla von Amos Voll, dem mutmaßlichen Kopf eines gigantischen CP-Rings.',
    suspects: 'Amos Volls private Sicherheitsfirma (Bolton Security). Sehr aufmerksam, bewaffnet mit Maschinenpistolen.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_elephant',
    game: 'ron',
    dlc: 'base',
    name: 'Watt Community College',
    codename: 'Elephant',
    imagePosition: '82%',
    image: 'https://readyormaps.com/maps/11_watt_college/watt_college_previre.webp',
    situation: 'Active Shooter (Amoklauf) an der örtlichen Universität. Massenpanik und tickende Sprengsätze.',
    suspects: 'Mehrere jugendliche Täter. Keine Rüstung, aber unberechenbar und auf maximalen Schaden aus. Höchster Zeitdruck.',
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_rust',
    game: 'ron',
    dlc: 'base',
    name: 'Costa Vino Border Reserve',
    codename: 'Rust Belt',
    imagePosition: 'left',
    image: 'https://readyormaps.com/maps/12_costa_vino/costa_vino_preview.webp',
    situation: 'Razzia in einem unterirdischen Tunnelsystem an der Grenze, genutzt für Menschen- und Drogenschmuggel.',
    suspects: 'Kartellmitglieder in extrem unübersichtlichen, dunklen Höhlen. Nachtsicht (NVG) dringend erforderlich.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_sins',
    game: 'ron',
    dlc: 'base',
    name: 'Clemente Hotel',
    codename: 'Sins Of The Father',
    image: 'https://readyormaps.com/maps/13_clemente_hotel/clemente_hotel_preview.webp',
    situation: 'Attentat im Gange. Das Hotel wurde von gut organisierten Angreifern gestürmt, um eine Zielperson auszuschalten.',
    suspects: 'Schwer bewaffnete Söldner in den oberen Stockwerken. Enge Hotelkorridore erschweren den Zugriff.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_neon',
    game: 'ron',
    dlc: 'base',
    name: 'Neon Nightclub',
    codename: 'Neon Tomb',
    imagePosition: '90%',
    image: 'https://readyormaps.com/maps/14_neon_nightclub/neon_nightclub_preview.webp',
    situation: 'Terroranschlag (Die Hand) in einem überfüllten Nachtclub. Katastrophale Opferzahlen.',
    suspects: 'Terroristen mit Sturmgewehren und Sprengstoffwesten. Lärm und Stroboskoplicht behindern die Kommunikation massiv.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_buy',
    game: 'ron',
    dlc: 'base',
    name: 'Ceasar\'s Cars Dealership',
    codename: 'Buy Cheap, Buy Twice',
    image: 'https://readyormaps.com/maps/15_ceasars_cars_dealership/ceasars_cars_dealership_preview.webp',
    situation: 'Ein vermeintliches Autohaus fungiert als Verteilerzentrum für den illegalen Waffenhandel.',
    suspects: 'Syndikatsmitglieder. Große, offene Ausstellungsräume mit weiten Sichtlinien (Scharfschützengefahr).',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_carriers',
    game: 'ron',
    dlc: 'base',
    name: 'Cherryessa Farm',
    codename: 'Carriers of the vine',
    image: 'https://readyormaps.com/maps/16_cherryessa_farm/cherryessa_farm_preview.webp',
    situation: 'Untersuchung eines abgelegenen Kult-Anwesens nach Berichten über mehrfachen Mord und illegale Bestattungen.',
    suspects: 'Fanatische Kultmitglieder. Tragen oft unbemerkt Körperpanzerung unter ihren Roben und sind extrem feindselig.',
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_relapse',
    game: 'ron',
    dlc: 'base',
    name: 'Coastal Grove Medical Center',
    codename: 'Relapse',
    image: 'https://readyormaps.com/maps/17_medical_center/medical_center_preview.webp',
    situation: 'Die Terrorgruppe "Die Hand" hat ein Krankenhaus übernommen, um einen dort behandelten Anführer zu befreien.',
    suspects: 'Schwerst bewaffnete Terroristen in einem Gebäude voller wehrloser Patienten und Ärzte.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_hide',
    game: 'ron',
    dlc: 'base',
    name: 'Port Hokan',
    codename: 'Hide And Seek',
    image: 'https://readyormaps.com/maps/18_port/port_preview.webp',
    situation: 'Razzia im Hafen bei strömendem Regen. Zentrum eines massiven Menschenhandelsrings.',
    suspects: 'Organisierte Kriminalität, Wachleute zwischen Container-Labyrinthen. Hohe Gefahr für Hinterhalte im Dunkeln.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },

  // ==========================================
  // --- HOME INVASION DLC ---
  // ==========================================
  {
    id: 'ron_dorms',
    game: 'ron',
    dlc: 'home_invasion',
    name: 'Greenside Dormitories',
    codename: 'Dorms',
    image: 'https://readyormaps.com/maps/19_greenside_dormitories/greenside_dormitories_preview.webp',
    situation: 'Razzia in Studentenwohnheimen nach Hinweisen auf illegale Drogen- und Waffenproduktion.',
    suspects: 'Studentische Netzwerke vermischt mit lokalen Dealern. Unübersichtliche Gänge, viele Zimmertüren.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_narcos',
    game: 'ron',
    dlc: 'home_invasion',
    name: '25 Hope Street 213 Park',
    codename: 'Narcos',
    image: 'https://readyormaps.com/maps/20_25_hope_street/25_hope_street_preview.webp',
    situation: 'Schwere Auseinandersetzung in einer abgeschotteten Nachbarschaft. Starkes Kartell-Aufkommen.',
    suspects: 'Kartell-Vollstrecker. Extrem gewaltbereit, schwer bewaffnet, kennen das Gelände perfekt.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_lawmaker',
    game: 'ron',
    dlc: 'home_invasion',
    name: '155 Playa Vista Lane',
    codename: 'Lawmaker',
    image: 'https://readyormaps.com/maps/21_155_playa_vista_lane/155_playa_vista_lane_preview.webp',
    situation: 'Einbruch und Geiselnahme in einer hochpreisigen Villa am Strand (Colina Beach).',
    suspects: 'Professionelle Eindringlinge mit taktischer Ausrüstung. Gezielte Operation.',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },

  // ==========================================
  // --- DARK WATERS DLC ---
  // ==========================================
  {
    id: 'ron_mirage',
    game: 'ron',
    dlc: 'dark_waters',
    name: 'The Seraglio',
    codename: 'Mirage at Sea',
    image: 'https://readyormaps.com/maps/22_Seraglio/Seraglio_preview.webp',
    situation: 'Maritime Operation auf einem verdächtigen Frachtschiff. Verdacht auf internationalen Schmuggel.',
    suspects: 'Internationale Söldner, extrem enge Gänge (CQB), automatische Waffen.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_leviathan',
    game: 'ron',
    dlc: 'dark_waters',
    name: 'HeavyWell A-101 Rig',
    codename: 'Leviathan',
    image: 'https://readyormaps.com/maps/23_HeavyWell_Rig/HeavyWell_A-101_Rig_preview.webp',
    situation: 'Zugriff auf eine abgelegene Ölbohrinsel bei extremen Wetterbedingungen.',
    suspects: 'Hochgerüstete paramilitärische Kräfte. Nutzung von Nachtsicht und schweren Westen.',
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_triad',
    game: 'ron',
    dlc: 'dark_waters',
    name: 'The Elysian',
    codename: '3 Letter Triad',
    image: 'https://readyormaps.com/maps/24_elysian/elysian_preview.webp',
    situation: 'Razzia in einem Luxuskomplex, der als Tarnung für Operationen der Triaden dient.',
    suspects: 'Organisierte Kriminalität (Triaden). Skrupellos, Maschinenpistolen, zivile Präsenz wahrscheinlich.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },

  // ==========================================
  // --- LOS SUENOS STORIES DLC ---
  // ==========================================
  {
    id: 'ron_hunger',
    game: 'ron',
    dlc: 'ls_stories',
    name: 'Chico\'s Mexican Resturant',
    codename: 'Hunger Strike',
    image: 'https://readyormaps.com/maps/25_chicos_mexican_resturant/chicos_mexican_resturant_preview.webp',
    situation: 'Eskalierende Gewalt und Schusswechsel in einem belebten Restaurant.',
    suspects: 'Gangmitglieder. Hitziges Gefecht auf engem Raum mit vielen unbeteiligten Zivilisten.',
    tacticalMap: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_stolen_valor',
    game: 'ron',
    dlc: 'ls_stories',
    name: 'Edgeware Apartments',
    codename: 'Stolen Valor',
    image: 'https://readyormaps.com/maps/26_edgeware_apartments/edgeware_apartments_preview.webp',
    situation: 'Verdächtige haben sich nach einer Verfolgungsjagd in einem Apartmentkomplex verschanzt.',
    suspects: 'Militante Verdächtige. Gefahr von Sprengfallen (IEDs) an Türen und in Fluren.',
    tacticalMap: 'https://images.unsplash.com/photo-1584985223403-d6cbfec25ba7?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },

  // ==========================================
  // --- BOILING POINT DLC ---
  // ==========================================
  {
    id: 'ron_no_good',
    game: 'ron',
    dlc: 'boiling_point',
    name: 'Los Suenos Pier',
    codename: 'No Good Deed',
    image: 'https://readyormaps.com/maps/27_pier/pier_preview.webp',
    situation: 'Unterbrechung eines massiven Waffendeals am städtischen Pier bei Nacht.',
    suspects: 'Schmuggler und Käufer. Weite Sichtlinien bedeuten akute Scharfschützen-Gefahr.',
    tacticalMap: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_all_gods',
    game: 'ron',
    dlc: 'boiling_point',
    name: 'Unitytrust Bank',
    codename: 'All Gods Burn',
    image: 'https://readyormaps.com/maps/28_bank/bank_preview.webp',
    situation: 'Schwer bewaffneter Banküberfall mit laufender Geiselnahme. Der Tresorraum wird aufgeschweißt.',
    suspects: 'Professionelle Bankräuber. Level IV Körperpanzerung, leichte Maschinengewehre (LMGs), Gasmasken.',
    tacticalMap: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  },
  {
    id: 'ron_new_america',
    game: 'ron',
    dlc: 'boiling_point',
    name: 'Los Suenos City Hall',
    codename: 'A New America',
    image: 'https://readyormaps.com/maps/29_city_hall/city_hall_preview.webp',
    situation: 'Großangelegter Terroranschlag auf das Rathaus und das Archivgebäude.',
    suspects: 'Inländische Terrorzellen. Extrem hoch motiviert, Nutzung von Sprengstoff (C4), Geiseln als Schutzschilde.',
    tacticalMap: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    screenshots: []
  }
];

const RON_WEAPONS = [
  { id: 'w_m4a1', name: 'M4A1', type: 'Sturmgewehr', caliber: '5.56x45mm', desc: 'Zuverlässiges, starkes Standard-Sturmgewehr.' },
  { id: 'w_mp5', name: 'MP5A3', type: 'Maschinenpistole', caliber: '9x19mm', desc: 'Klassische MP. Ideal für enge Räume (CQB).' },
  { id: 'w_mcx', name: 'MCX', type: 'Sturmgewehr', caliber: '.300 Blackout', desc: 'Exzellent für Einsätze mit Schalldämpfer. Hohe Stoppwirkung.' },
  { id: 'w_sa58', name: 'SA-58 OSW', type: 'Sturmgewehr', caliber: '7.62x51mm', desc: 'Massive Durchschlagskraft, schwerer Rückstoß. Zerstört Deckungen mühelos.' }
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

// Erweiteter News-Pool mit den neuen Base Game Maps
const NEWS_POOL = [
  {
    id: 'n1', mapId: 'ron_elephant', type: 'CRITICAL',
    headline: 'Watt Community College: Active Shooter gemeldet',
    fact: 'Die Verdächtigen haben selbstgebaute Sprengsätze in der Bibliothek und Cafeteria platziert. Höchster Zeitdruck.',
    content: 'Code 3! Mehrere Notrufe vom Campus des Watt Community College bestätigen einen Amoklauf ("Elephant"). Die Verdächtigen sind jung, agieren extrem aggressiv und schießen wahllos auf fliehende Studenten. Ersteingreifende Kräfte melden IEDs (Sprengsätze) mit Zeitzündern. Das SWAT-Team muss Zivilisten ignorieren und direkt auf die Bedrohung vorrücken, um weitere Opfer zu verhindern.'
  },
  {
    id: 'n2', mapId: 'ron_neon', type: 'FLASH',
    headline: 'Neon Nightclub: Terroranschlag von "Die Hand"',
    fact: 'Berichte über Selbstmordattentäter mit Sprengstoffwesten (Suicide Vests). Mindestabstand einhalten!',
    content: 'Katastrophe im Club Neon Tomb. Die Terrororganisation "Die Hand" hat das Gebäude gestürmt. Lärmende Musik, Stroboskoplichter und hunderte Leichen erschweren die Orientierung enorm. Täter nutzen die Dunkelheit und tragen schwere Waffen. Wenn ein Verdächtiger einen Zünder in der Hand hält, ist ein sofortiger, finaler Rettungsschuss authorisiert.'
  },
  {
    id: 'n3', mapId: 'ron_ides', type: 'UPDATE',
    headline: 'Brisa Cove: Schwer bewaffnete Veteranen verbarrikadiert',
    fact: 'Die Gruppe "The Left Behind" trägt Level-IV-Panzerwesten, die Standard-Pistolenmunition komplett absorbieren.',
    content: 'Einsatz Ides of March: Die Täter in den Brisa Cove Apartments sind ehemalige Militärs. Sie haben Stolperdrähte an fast allen Türen angebracht. Spiegeln (Mirrorgun) ist Pflicht! Frontale Feuergefechte sind tödlich, da die Feinde mit SA-58 Sturmgewehren schießen, die Wände durchschlagen. C2-Sprengladungen und schweres Tränengas (CS Gas) werden für den Zugriff empfohlen.'
  },
  {
    id: 'n4', mapId: 'ron_valley', type: 'INFO',
    headline: 'Voll Health House: Razzia gegen Amos Voll',
    fact: 'Bolton Security, eine private Söldnertruppe, bewacht das Anwesen und wird ohne Warnung das Feuer auf LSPD SWAT eröffnen.',
    content: 'Die Operation Valley of the Dolls zielt auf Amos Voll, den Kopf eines gigantischen illegalen Netzwerks. Die Villa ist ein Labyrinth aus Luxusräumen, Kinosälen und versteckten Kellergewölben. Erwarten Sie bewaffneten Widerstand von hochbezahlten Sicherheitskräften. Beweissicherung von Festplatten und Laptops hat neben der Verhaftung von Voll oberste Priorität.'
  },
  {
    id: 'n5', mapId: 'ron_carriers', type: 'CRITICAL',
    headline: 'Cherryessa Farm: Kultisten zeigen extreme Feindseligkeit',
    fact: 'Die weiblichen Kultmitglieder verbergen ballistische Westen und Schrotflinten unter ihren langen Roben.',
    content: 'Was als Untersuchung illegaler Bestattungen begann ("Carriers of the vine"), ist eskaliert. Die Sekte auf der Cherryessa Farm verteidigt ihr Territorium fanatisch. Das Gelände ist weitläufig und schlecht beleuchtet. Verdächtige täuschen oft eine Aufgabe vor, nur um im letzten Moment eine Waffe zu ziehen. Absolute Wachsamkeit ist geboten.'
  },
  {
    id: 'n6', mapId: 'ron_all_gods', type: 'UPDATE',
    headline: 'Unitytrust Bank: Scharfschützen auf dem Dach gesichtet',
    fact: 'Die Bankräuber nutzen thermische Tarnnetze, um sich vor LSPD Helikoptern zu verbergen.',
    content: 'Die Situation an der Unitytrust Bank ("All Gods Burn") eskaliert weiter. Erste TOC-Berichte bestätigen den Einsatz von Level IV Panzerungen. Frontalzugriffe sind wirkungslos. Die Täter haben zudem Sprengladungen an den Haupteingängen angebracht. Blendgranaten sind zwingend erforderlich.'
  },
  {
    id: 'n7', mapId: 'ron_lethal', type: 'CRITICAL',
    headline: 'Sullivan\'s Slope: Höchste Sprengfallen-Warnung',
    fact: 'Der Verdächtige hat das gesamte Haus und den Gartenbereich mit versteckten Drahtfallen (Stolperdrähten) versehen.',
    content: 'Operation Lethal Obsession: Wir rücken gegen einen flüchtigen Bombenbauer vor. Kein Raum darf ohne vorherige Spiegelung (Mirrorgun) oder vorsichtiges Spalt-Öffnen betreten werden. Die Sprengfallen töten das gesamte Team im Umkreis von 5 Metern. Der Verdächtige ist extrem feindselig und wird durch Wände schießen.'
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

const getRelativeTime = (date) => {
  const diff = Math.floor((new Date() - date) / 1000 / 60); // in Minuten
  if (diff < 1) return "Gerade eben";
  if (diff < 60) return `vor ${diff} Min.`;
  return "vor über 1 Std.";
};

// --- CONSTANTS ---
const SESSION_TIMEOUT = 10 * 60 * 1000;
const STORAGE_KEY_STATE = 'inTactics_app_state_v3';
const STORAGE_KEY_TIME = 'inTactics_last_active_v3';

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

    // Update feed every 15 minutes (15 * 60 * 1000 ms)
    const intervalId = setInterval(() => {
      setLiveFeed(currentFeed => {
        const currentIds = currentFeed.map(i => i.id);
        const availablePool = NEWS_POOL.filter(i => !currentIds.includes(i.id));

        if (availablePool.length === 0) return currentFeed; // Failsafe

        const nextItem = availablePool[Math.floor(Math.random() * availablePool.length)];
        const newItemWithTime = { ...nextItem, timestamp: new Date() };

        // Add to top, remove oldest
        return [newItemWithTime, ...currentFeed.slice(0, 2)];
      });
    }, 15 * 60 * 1000);

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
                            {getRelativeTime(item.timestamp)}
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
                  <p className="text-xl md:text-2xl font-black italic text-white">{RON_MAPS.length + PUBG_MAPS.length}</p>
                </div>
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Intel</p>
                  <p className="text-xl md:text-2xl font-black italic text-white">{NEWS_POOL.length}</p>
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
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none">{selectedMap.name}</h1>
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
            {selectedMap.screenshots && selectedMap.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4 mt-4 md:mt-0">Intel Footage</h3>
                {selectedMap.screenshots.map((img, i) => (
                  <GlassCard key={i} className="aspect-video relative overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Intel" />
                    <div className="absolute inset-0 border-[2px] border-white/0 group-hover:border-red-500/50 transition-colors pointer-events-none rounded-[1.5rem] md:rounded-[2rem]"></div>
                  </GlassCard>
                ))}
              </div>
            )}
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
            <div className="w-full overflow-hidden">
              <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-0 border-b border-white/5 snap-x pb-2">
                {[
                  { id: 'base', label: 'READY OR NOT' },
                  { id: 'home_invasion', label: 'HOME INVASION' },
                  { id: 'dark_waters', label: 'DARK WATERS' },
                  { id: 'ls_stories', label: 'LOS SUENOS STORIES' },
                  { id: 'boiling_point', label: 'BOILING POINT' }
                ].map(dlc => (
                  <button
                    key={dlc.id}
                    onClick={() => setActiveDlc(dlc.id)}
                    className={`relative uppercase font-black italic tracking-[0.2em] md:tracking-[0.25em] text-[9px] md:text-[10px] transition-all shrink-0 py-4 snap-start whitespace-nowrap ${activeDlc === dlc.id ? 'text-white' : 'text-white/20 hover:text-white/50'}`}
                  >
                    {dlc.label}
                    {activeDlc === dlc.id && (
                      <motion.div layoutId="dlc-bar" className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]" transition={springTransition} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDlc + ronSubTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            /* - md:grid... : PC - normales Gitter.
               - max-md:flex... : Handy - vertikale Liste.
               - max-md:h-[calc(100vh-160px)] : Höhenbegrenzung auf fast ganzen Bildschirm.
               - max-md:overflow-y-scroll : Scrollen innerhalb des Containers.
               - snap-y snap-mandatory : "Einrasten" beim Scrollen.
            */
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 
            max-md:flex max-md:flex-col max-md:h-[calc(100vh-160px)] max-md:overflow-y-scroll 
            max-md:snap-y max-md:snap-mandatory no-scrollbar"
          >

            {ronSubTab === 'maps' ? currentMaps.map(map => (
              <div
                key={map.id}
                className="relative md:flex-1 md:hover:flex-[3] transition-all duration-700 ease-in-out overflow-hidden rounded-3xl group max-md:min-h-full max-md:snap-start"
              >
                <GlassCard
                  onClick={() => setSelectedMap(map)}
                  className="h-[350px] md:h-[480px] max-md:h-full"
                >
                  <img
                    src={map.image}
                    style={{ objectPosition: map.imagePosition || 'center' }} // Nutzt den Wert aus den Daten oder 'center' als Fallback
                    className="absolute inset-0 w-full h-full object-cover 
                    transition-all duration-700 scale-100 group-hover:scale-110"
                    alt={map.name}
                  />
                {/* Dynamischer Blaulicht-Effekt beim Hover (nur PC) 
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-500/10 blur-2xl" />
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-red-500/10 blur-2xl" />
                </div>*/}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                  <p className="text-red-600 font-mono text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 truncate">{map.codename}</p>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white italic uppercase leading-tight tracking-tighter">{map.name}</h3>

                </div>
              </GlassCard>
              </div>
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
            <motion.div key="bg-ron" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 overflow-hidden">
              {/* Linke Seite Blau */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-y-0 left-0 w-1/3 bg-blue-600/20 blur-[120px] -translate-x-1/2"
              />
              {/* Rechte Seite Rot */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                className="absolute inset-y-0 right-0 w-1/3 bg-red-600/20 blur-[120px] translate-x-1/2"
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
          Tactical Repository // inTACTICS v3.0

          <div className="w-full py-8 md:py-10 text-center text-white/10 text-[8px]  copyright">
            <h3>© Copyright</h3>
            <p className="py-8 md:py-10">
              Ready or Not is a trademark of{" "}
              <a
                href="https://voidinteractive.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                VOID Interactive
              </a>
              . This is a fan-made project.
            </p>

            <div className="py-8 md:py-3 credits">
              <p>Site development and design by <strong>FRNZ</strong></p>
              {/*<p>Part blueprints development and design by <strong>Relict_UA</strong></p> 
              <p>Part blueprints development and design by <strong>eNex and Daan</strong></p>*/}

              {/*<p>
                <a
                  href="http://steamcommunity.com/sharedfiles/filedetails/?id=3137562299"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ready or Not blueprints Steam Guide
                </a>
              </p>*/}


              <p style={{ marginTop: "15px" }}>© 2026 Ready or Not Maps</p>
            </div>

            <p className="last-updated">
              <strong>Last Updated:</strong> March 2026
            </p>
          </div>
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
        .map-container {
          display: flex;
          gap: 1.5rem;
          width: 100%;
          transition: all 0.5s ease;
          }

      .map-card-wrapper {
  flex: 1; /* Alle Karten sind gleich groß */
  transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  min-width: 100px;
}

.map-card-wrapper:hover {
  flex: 3; /* Die Karte unter der Maus wird 3x so breit */
}

      `}} />
    </div>
  );
}