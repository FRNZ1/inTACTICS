import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle, Search, Play, Pause, ZoomIn, ZoomOut, Layers, CheckSquare, Square, MapPin, Skull, Undo, Redo, Maximize, Minimize, ChevronRight, Sun, AlignJustify } from 'lucide-react';

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
    objectives: [
      'Bring Order to Chaos',
      'Rescue all of the Civilians',
      'Arrest 3 Suspects',
      'Report Status to TOC'
    ],
    blueprints: [
      { name: 'Ground Floor', url: 'https://static.wikia.nocookie.net/ready-or-not/images/2/28/4U_Gas_Station_Map.png/revision/latest?cb=20241012143721' },
      { name: 'Roof', url: 'https://static.wikia.nocookie.net/ready-or-not/images/2/28/4U_Gas_Station_Map.png/revision/latest?cb=20241012143721' } // Platzhalter für 2. Etage zum Demonstrieren
    ],
    audioLogs: [
      {
        title: "Sharla's 911 Call",
        type: '911',
        url: 'https://static.wikia.nocookie.net/ready-or-not/images/8/86/Sharla%27s_911_Call.wav/revision/latest?cb=20241012142358',
        transcript: "Operator: 911, what is your emergency?\nSharla: There are men with guns! Please help! They just came in shooting, my daughter is in there somewhere! Please!"
      },
      {
        title: "Mudasir's 911 Call",
        type: '911',
        url: 'https://static.wikia.nocookie.net/ready-or-not/images/d/d9/Mudasir%27s_911_Call.wav/revision/latest?cb=20241012142413',
        transcript: "Operator: 911, what is your emergency?\nMudasir: Yes, hello, I am the manager at the 4U Gas Station. Some men have entered the store with weapons. They are robbing us!"
      },
      {
        title: "Mission Brief",
        type: 'briefing',
        url: 'https://static.wikia.nocookie.net/ready-or-not/images/9/9c/Gas_Briefing_01.ogg/revision/latest?cb=20250708065448',
        transcript: "Listen up. We've got a situation at the 4U Gas Station on rust belt. Multiple armed suspects have taken hostages. They are likely local meth heads, unorganized but dangerous. Move in, secure the perimeter, and bring order to chaos. Watch your corners."
      }
    ],
    poi: {
      civilians: [
        {
          name: 'Sharla Leighton',
          image: 'https://static.wikia.nocookie.net/ready-or-not/images/2/2d/Sharla_Leighton.png/revision/latest/scale-to-width-down/350?cb=20241012142512',
          sex: 'Female', height: "5'-6\"", weight: '130lb', build: 'Small', dob: '04/11/1998',
          desc: "Sharla was our initial point of contact inside the building before police arrived on-scene. She found a hiding place and called 911 immediately after spotting one of the gunmen.\n\nRescue of this civilian is imperative. Specifically, her eyewitness account of the events that transpired before police arrival will help put the suspects behind bars for good.\n\nSharla's child, Cristal, is also inside the building. To our knowledge they are not close to one another, proximally."
        }
      ],
      suspects: [
        {
          name: 'Andre Williams',
          image: 'https://static.wikia.nocookie.net/ready-or-not/images/a/a4/Andre_Williams.png/revision/latest/scale-to-width-down/350?cb=20241012142502',
          sex: 'Male', height: "6'-3\"", weight: '165lb', build: 'Medium', dob: '05/20/2005',
          desc: "Attends 213 Mission High School in his final year. Following an incident at the school, Andre was placed under house arrest at his grandmothers house in the Dawson Gardens Projects while an investigation took place. Charges have since been dropped.\n\nOn January 30, Andre was engaged in a gunfight between himself and a rival gang during the shooting of a rap video for an underground media organization titled \"808 SUENOS\"."
        }
      ]
    },
    media: [
      'https://static.wikia.nocookie.net/ready-or-not/images/5/56/Onlooker_Photograph.png/revision/latest/scale-to-width-down/1000?cb=20241012150241',
      'https://static.wikia.nocookie.net/ready-or-not/images/8/82/Media_Coverage.png/revision/latest/scale-to-width-down/1000?cb=20241012150247'
    ],
    screenshots: ['https://images.steamusercontent.com/ugc/2523778827659601613/1C290698DF614012E3FCB7B8DDCB485652BE9376/']
  },
  {
    id: 'ron_23mb', game: 'ron', dlc: 'base', name: 'San Uriel Condominiums', codename: '23 Megabytes a Second',
    image: 'https://readyormaps.com/maps/2_23_mb/23_Megabytes_a_Second_preview.webp',
    situation: 'Ein angebliches Swatting bei einem Streamer entpuppt sich als illegale Server-Operation (CP).',
    suspects: 'Private Sicherheitskräfte und bewaffnete Bewohner. Unerwartet hoher Widerstand.'
  },
  {
    id: 'ron_twisted', game: 'ron', dlc: 'base', name: '213 Park Homes', codename: 'Twisted Nerve',
    image: 'https://readyormaps.com/maps/3_213_park/213_Park_preview.webp',
    situation: 'Durchsuchungsbefehl bei einem vermuteten Meth-Labor in einem heruntergekommenen Vorort.',
    suspects: 'Junkies und Dealer. Unberechenbar, oft unter Drogeneinfluss. Gefahr durch versteckte Sprengfallen.'
  },
  {
    id: 'ron_spider', game: 'ron', dlc: 'base', name: 'Brixley Talent Time', codename: 'The Spider',
    image: 'https://readyormaps.com/maps/4_brixley_talent/brixley_talent_preview.webp',
    situation: 'Razzia in einer scheinbaren Talentagentur, die in die Produktion von illegalem Material verwickelt ist.',
    suspects: 'Bewaffnete Wachleute. Gut organisiert, nutzen die verwinkelten Räumlichkeiten zu ihrem Vorteil.'
  },
  {
    id: 'ron_lethal', game: 'ron', dlc: 'base', name: 'Sullivan\'s Slope', codename: 'A Lethal Obsession',
    image: 'https://readyormaps.com/maps/5_sullivans_slope/Sullivans%20slope_preview.webp',
    situation: 'Zugriff auf das abgelegene Grundstück eines flüchtigen Regierungsgegners und Bombenbauers.',
    suspects: 'Einsamer Wolf, aber extrem gefährlich. Das gesamte Gelände ist massiv mit tödlichen Sprengfallen präpariert.'
  },
  {
    id: 'ron_ides', game: 'ron', dlc: 'base', name: 'Brisa Cove', codename: 'Ides of March',
    image: 'https://readyormaps.com/maps/6_brisa_cove/brisa_cove_preview.webp',
    situation: 'Eine linksradikale Veteranen-Gruppierung (The Left Behind) hat sich in Luxusapartments verschanzt.',
    suspects: 'Militärisch ausgebildet, schwere Körperpanzerung, automatische Waffen und tödliche Sprengfallen.'
  },
  {
    id: 'ron_sinuous', game: 'ron', dlc: 'base', name: 'Mindjot Data Center', codename: 'Sinuous Trail',
    image: 'https://readyormaps.com/maps/7_mindjot/mindjot_preview.webp',
    situation: 'Stürmung eines Rechenzentrums, das illegale Inhalte (CP) für ein Kartell hostet.',
    suspects: 'Söldner der privaten Sicherheitsfirma Mindjot. Hochgradig ausgerüstet und koordiniert.'
  },
  {
    id: 'ron_ends', game: 'ron', dlc: 'base', name: 'Kawayu Beach', codename: 'Ends of the Earth',
    image: 'https://readyormaps.com/maps/8_kawayu_beach/kawayu_beach_preview.webp',
    situation: 'Zugriff auf ein Strandhaus, aus dem eine Familie illegalen Waffenhandel betreibt.',
    suspects: 'Familienmitglieder und Käufer. Unberechenbar aufgrund von Verzweiflung, teilweise unbewaffnete Zivilisten im Haus.'
  },
  {
    id: 'ron_greased', game: 'ron', dlc: 'base', name: 'Los Suenos Postal Service', codename: 'Greased Palms',
    image: 'https://readyormaps.com/maps/9_los_suenos_postal/los_suenos_postal_preview.webp',
    situation: 'Das Postverteilzentrum dient als Umschlagplatz für illegale Waffen durch korrupte FISA-Agenten.',
    suspects: 'Abtrünnige Bundesagenten und Kartellmitglieder. Taktisch überlegen und schwer bewaffnet.'
  },
  {
    id: 'ron_valley', game: 'ron', dlc: 'base', name: 'Voll Health House', codename: 'Valley of the Dolls',
    image: 'https://readyormaps.com/maps/10_voll_health_house/voll_health_house_preview.webp',
    situation: 'Infiltration der Luxusvilla von Amos Voll, dem mutmaßlichen Kopf eines gigantischen CP-Rings.',
    suspects: 'Amos Volls private Sicherheitsfirma (Bolton Security). Sehr aufmerksam, bewaffnet mit Maschinenpistolen.'
  },
  {
    id: 'ron_elephant', game: 'ron', dlc: 'base', name: 'Watt Community College', codename: 'Elephant',
    imagePosition: '82%',
    image: 'https://readyormaps.com/maps/11_watt_college/watt_college_previre.webp',
    situation: 'Active Shooter (Amoklauf) an der örtlichen Universität. Massenpanik und tickende Sprengsätze.',
    suspects: 'Mehrere jugendliche Täter. Keine Rüstung, aber unberechenbar und auf maximalen Schaden aus. Höchster Zeitdruck.'
  },
  {
    id: 'ron_rust', game: 'ron', dlc: 'base', name: 'Costa Vino Border Reserve', codename: 'Rust Belt',
    imagePosition: 'left',
    image: 'https://readyormaps.com/maps/12_costa_vino/costa_vino_preview.webp',
    situation: 'Razzia in einem unterirdischen Tunnelsystem an der Grenze, genutzt für Menschen- und Drogenschmuggel.',
    suspects: 'Kartellmitglieder in extrem unübersichtlichen, dunklen Höhlen. Nachtsicht (NVG) dringend erforderlich.'
  },
  {
    id: 'ron_sins', game: 'ron', dlc: 'base', name: 'Clemente Hotel', codename: 'Sins Of The Father',
    image: 'https://readyormaps.com/maps/13_clemente_hotel/clemente_hotel_preview.webp',
    situation: 'Attentat im Gange. Das Hotel wurde von gut organisierten Angreifern gestürmt, um eine Zielperson auszuschalten.',
    suspects: 'Schwer bewaffnete Söldner in den oberen Stockwerken. Enge Hotelkorridore erschweren den Zugriff.'
  },
  {
    id: 'ron_neon', game: 'ron', dlc: 'base', name: 'Neon Nightclub', codename: 'Neon Tomb',
    imagePosition: '90%',
    image: 'https://readyormaps.com/maps/14_neon_nightclub/neon_nightclub_preview.webp',
    situation: 'Terroranschlag (Die Hand) in einem überfüllten Nachtclub. Katastrophale Opferzahlen.',
    suspects: 'Terroristen mit Sturmgewehren und Sprengstoffwesten. Lärm und Stroboskoplicht behindern die Kommunikation massiv.'
  },
  {
    id: 'ron_buy', game: 'ron', dlc: 'base', name: 'Ceasar\'s Cars Dealership', codename: 'Buy Cheap, Buy Twice',
    image: 'https://readyormaps.com/maps/15_ceasars_cars_dealership/ceasars_cars_dealership_preview.webp',
    situation: 'Ein vermeintliches Autohaus fungiert als Verteilerzentrum für den illegalen Waffenhandel.',
    suspects: 'Syndikatsmitglieder. Große, offene Ausstellungsräume mit weiten Sichtlinien (Scharfschützengefahr).'
  },
  {
    id: 'ron_carriers', game: 'ron', dlc: 'base', name: 'Cherryessa Farm', codename: 'Carriers of the vine',
    image: 'https://readyormaps.com/maps/16_cherryessa_farm/cherryessa_farm_preview.webp',
    situation: 'Untersuchung eines abgelegenen Kult-Anwesens nach Berichten über mehrfachen Mord und illegale Bestattungen.',
    suspects: 'Fanatische Kultmitglieder. Tragen oft unbemerkt Körperpanzerung unter ihren Roben und sind extrem feindselig.'
  },
  {
    id: 'ron_relapse', game: 'ron', dlc: 'base', name: 'Coastal Grove Medical Center', codename: 'Relapse',
    image: 'https://readyormaps.com/maps/17_medical_center/medical_center_preview.webp',
    situation: 'Die Terrorgruppe "Die Hand" hat ein Krankenhaus übernommen, um einen dort behandelten Anführer zu befreien.',
    suspects: 'Schwerst bewaffnete Terroristen in einem Gebäude voller wehrloser Patienten und Ärzte.'
  },
  {
    id: 'ron_hide', game: 'ron', dlc: 'base', name: 'Port Hokan', codename: 'Hide And Seek',
    image: 'https://readyormaps.com/maps/18_port/port_preview.webp',
    situation: 'Razzia im Hafen bei strömendem Regen. Zentrum eines massiven Menschenhandelsrings.',
    suspects: 'Organisierte Kriminalität, Wachleute zwischen Container-Labyrinthen. Hohe Gefahr für Hinterhalte im Dunkeln.'
  },

  // ==========================================
  // --- HOME INVASION DLC ---
  // ==========================================
  {
    id: 'ron_dorms', game: 'ron', dlc: 'home_invasion', name: 'Greenside Dormitories', codename: 'Dorms',
    image: 'https://readyormaps.com/maps/19_greenside_dormitories/greenside_dormitories_preview.webp',
    situation: 'Razzia in Studentenwohnheimen nach Hinweisen auf illegale Drogen- und Waffenproduktion.',
    suspects: 'Studentische Netzwerke vermischt mit lokalen Dealern. Unübersichtliche Gänge, viele Zimmertüren.'
  },
  {
    id: 'ron_narcos', game: 'ron', dlc: 'home_invasion', name: '25 Hope Street 213 Park', codename: 'Narcos',
    image: 'https://readyormaps.com/maps/20_25_hope_street/25_hope_street_preview.webp',
    situation: 'Schwere Auseinandersetzung in einer abgeschotteten Nachbarschaft. Starkes Kartell-Aufkommen.',
    suspects: 'Kartell-Vollstrecker. Extrem gewaltbereit, schwer bewaffnet, kennen das Gelände perfekt.'
  },
  {
    id: 'ron_lawmaker', game: 'ron', dlc: 'home_invasion', name: '155 Playa Vista Lane', codename: 'Lawmaker',
    image: 'https://readyormaps.com/maps/21_155_playa_vista_lane/155_playa_vista_lane_preview.webp',
    situation: 'Einbruch und Geiselnahme in einer hochpreisigen Villa am Strand (Colina Beach).',
    suspects: 'Professionelle Eindringlinge mit taktischer Ausrüstung. Gezielte Operation.'
  },

  // ==========================================
  // --- DARK WATERS DLC ---
  // ==========================================
  {
    id: 'ron_mirage', game: 'ron', dlc: 'dark_waters', name: 'The Seraglio', codename: 'Mirage at Sea',
    image: 'https://readyormaps.com/maps/22_Seraglio/Seraglio_preview.webp',
    situation: 'Maritime Operation auf einem verdächtigen Frachtschiff. Verdacht auf internationalen Schmuggel.',
    suspects: 'Internationale Söldner, extrem enge Gänge (CQB), automatische Waffen.'
  },
  {
    id: 'ron_leviathan', game: 'ron', dlc: 'dark_waters', name: 'HeavyWell A-101 Rig', codename: 'Leviathan',
    image: 'https://readyormaps.com/maps/23_HeavyWell_Rig/HeavyWell_A-101_Rig_preview.webp',
    situation: 'Zugriff auf eine abgelegene Ölbohrinsel bei extremen Wetterbedingungen.',
    suspects: 'Hochgerüstete paramilitärische Kräfte. Nutzung von Nachtsicht und schweren Westen.'
  },
  {
    id: 'ron_triad', game: 'ron', dlc: 'dark_waters', name: 'The Elysian', codename: '3 Letter Triad',
    image: 'https://readyormaps.com/maps/24_elysian/elysian_preview.webp',
    situation: 'Razzia in einem Luxuskomplex, der als Tarnung für Operationen der Triaden.',
    suspects: 'Organisierte Kriminalität (Triaden). Skrupellos, Maschinenpistolen, zivile Präsenz wahrscheinlich.'
  },

  // ==========================================
  // --- LOS SUENOS STORIES DLC ---
  // ==========================================
  {
    id: 'ron_hunger', game: 'ron', dlc: 'ls_stories', name: 'Chico\'s Mexican Resturant', codename: 'Hunger Strike',
    image: 'https://readyormaps.com/maps/25_chicos_mexican_resturant/chicos_mexican_resturant_preview.webp',
    situation: 'Eskalierende Gewalt und Schusswechsel in einem belebten Restaurant.',
    suspects: 'Gangmitglieder. Hitziges Gefecht auf engem Raum mit vielen unbeteiligten Zivilisten.'
  },
  {
    id: 'ron_stolen_valor', game: 'ron', dlc: 'ls_stories', name: 'Edgeware Apartments', codename: 'Stolen Valor',
    image: 'https://readyormaps.com/maps/26_edgeware_apartments/edgeware_apartments_preview.webp',
    situation: 'Verdächtige haben sich nach einer Verfolgungsjagd in einem Apartmentkomplex verschanzt.',
    suspects: 'Militante Verdächtige. Gefahr von Sprengfallen (IEDs) an Türen und in Fluren.'
  },

  // ==========================================
  // --- BOILING POINT DLC ---
  // ==========================================
  {
    id: 'ron_no_good', game: 'ron', dlc: 'boiling_point', name: 'Los Suenos Pier', codename: 'No Good Deed',
    image: 'https://readyormaps.com/maps/27_pier/pier_preview.webp',
    situation: 'Unterbrechung eines massiven Waffendeals am städtischen Pier bei Nacht.',
    suspects: 'Schmuggler und Käufer. Weite Sichtlinien bedeuten akute Scharfschützen-Gefahr.'
  },
  {
    id: 'ron_all_gods', game: 'ron', dlc: 'boiling_point', name: 'Unitytrust Bank', codename: 'All Gods Burn',
    image: 'https://readyormaps.com/maps/28_bank/bank_preview.webp',
    situation: 'Schwer bewaffneter Banküberfall mit laufender Geiselnahme. Der Tresorraum wird aufgeschweißt.',
    suspects: 'Professionelle Bankräuber. Level IV Körperpanzerung, leichte Maschinengewehre (LMGs), Gasmasken.'
  },
  {
    id: 'ron_new_america', game: 'ron', dlc: 'boiling_point', name: 'Los Suenos City Hall', codename: 'A New America',
    image: 'https://readyormaps.com/maps/29_city_hall/city_hall_preview.webp',
    situation: 'Großangelegter Terroranschlag auf das Rathaus und das Archivgebäude.',
    suspects: 'Inländische Terrorzellen. Extrem hoch motiviert, Nutzung von Sprengstoff (C4), Geiseln als Schutzschilde.'
  }
];

// Kategorien basierend auf der Ingame-Einteilung
const WEAPON_CATEGORIES = [
  { id: 'Assault Rifles', label: 'Assault Rifles' },
  { id: 'Submachine Guns', label: 'Submachine Guns' },
  { id: 'Shotguns', label: 'Shotguns' },
  { id: 'Pistols', label: 'Pistols' },
  { id: 'Less-Than-Lethal', label: 'Less-Than-Lethal' }
];

const RON_WEAPONS = [
  // --- ASSAULT RIFLES ---
  {
    id: 'w_m4a1', category: 'primary', name: 'M4A1', type: 'Assault Rifles', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/7/7f/M4A1.png/320px-M4A1.png',
    desc: 'Das M4A1 ist ein vollautomatisches Sturmgewehr, das sich durch hohe Modularität auszeichnet. Es ist der Standard für viele SWAT Einheiten.',
    tactical: 'Extrem vielseitig. Ideal für Einsätze mit gemischten Distanzen. Dank der 5.56mm Munition gute Rüstungsdurchdringung, allerdings besteht bei ungepanzerten Zielen die Gefahr von Durchschüssen (Overpenetration), was Geiseln hinter den Wänden gefährden kann.'
  },
  {
    id: 'w_mk18', category: 'primary', name: 'MK18', type: 'Assault Rifles', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/4/4b/MK18.png/320px-MK18.png',
    desc: 'Eine kompaktere Version des M4A1, entwickelt für den Nahkampf (CQB).',
    tactical: 'Durch den kürzeren Lauf ist sie in extrem engen Umgebungen (wie Wohnungen in Brisa Cove) viel führiger als das Standard M4A1. Minimal geringere Reichweite, aber überragend in Innenräumen.'
  },
  {
    id: 'w_arn180', category: 'primary', name: 'ARN-180', type: 'Assault Rifles', caliber: '.300 Blackout', capacity: '30 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/7/7b/ARN-180.png/320px-ARN-180.png?dc189c',
    desc: 'Ein modernes, kompaktes Sturmgewehr für spezielle Ballistik optimiert.',
    tactical: 'Die .300 Blackout Munition macht diese Waffe perfekt für Schalldämpfer-Einsätze. Hervorragende Stoppwirkung im CQB ohne übermäßige Durchschlagskraft, was sie in Häusern sehr sicher macht.'
  },
  {
    id: 'w_sa58', category: 'primary', name: 'SA-58 OSW', type: 'Assault Rifles', caliber: '7.62x51mm NATO', capacity: '20 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/b/ba/SA-58.png/320px-SA-58.png',
    desc: 'Eine moderne, gekürzte Version des klassischen FAL. Sehr schwer und enorm kraftvoll.',
    tactical: 'Zerstört Holztüren und durchschlägt schwere Deckungen mit Leichtigkeit. Die absolut beste Wahl gegen Suspects mit schwerer Körperpanzerung. Achtung: Der Rückstoß ist enorm hoch.'
  },
  {
    id: 'w_g36c', category: 'primary', name: 'G36C', type: 'Assault Rifles', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/9/91/G36C.png/320px-G36C.png',
    desc: 'Kompaktes deutsches Sturmgewehr aus Polymer, sehr leicht und zuverlässig.',
    tactical: 'Gut kontrollierbarer Rückstoß, besonders bei Feuerstößen. Eine ausgezeichnete Alternative zum M4A1 für Spieler, die ein klares Sichtbild bevorzugen.'
  },

  // --- SUBMACHINE GUNS ---
  {
    id: 'w_mp5a3', category: 'primary', name: 'MP5A3', type: 'Submachine Guns', caliber: '9x19mm Parabellum', capacity: '30 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/2/23/MP5A3.png/320px-MP5A3.png',
    desc: 'Die klassische SWAT-Maschinenpistole, berühmt für ihr Rollenverschluss-System.',
    tactical: 'Die erste Wahl für Geiselsituationen ohne gepanzerte Feinde. Extrem geringer Rückstoß erlaubt sehr präzise Schüsse. Die geringere Durchschlagskraft minimiert Kollateralschäden extrem.'
  },
  {
    id: 'w_mpx', category: 'primary', name: 'MPX', type: 'Submachine Guns', caliber: '9x19mm Parabellum', capacity: '30 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/e/ef/MPX.png/320px-MPX.png',
    desc: 'Moderne Maschinenpistole mit AR-15 ähnlichen Bedienelementen.',
    tactical: 'Sehr schnelle Feuerrate und extrem wenig Rückstoß. Ideal für schnelle Raumstürmungen, bei denen die Feinde keine Kevlar-Westen tragen.'
  },
  {
    id: 'w_ump45', category: 'primary', name: 'UMP-45', type: 'Submachine Guns', caliber: '.45 ACP', capacity: '25 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/d/d7/UMP-45.png/320px-UMP-45.png',
    desc: 'Eine leichte Maschinenpistole mit großem Kaliber, aber vergleichsweise langsamer Feuerrate.',
    tactical: 'Hohe Stoppwirkung gegen ungeschützte Ziele. Gut kontrollierbar dank der langsamen Feuerrate. Etwas schwächer gegen militärische Schutzwesten.'
  },
  {
    id: 'w_p90', category: 'primary', name: 'P90', type: 'Submachine Guns', caliber: '5.7x28mm', capacity: '50 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/e/e4/P90.png/320px-P90.png',
    desc: 'Bullpup-Maschinenpistole mit massivem Magazin und panzerbrechender Munition.',
    tactical: 'Das 50-Schuss Magazin erlaubt es, mehrere Gegner ohne Nachladen zu bekämpfen. Die 5.7mm Munition durchschlägt auch leichte Körperpanzerung besser als herkömmliche 9mm SMGs.'
  },

  // --- SHOTGUNS ---
  {
    id: 'w_870cqb', category: 'primary', name: '870 CQB', type: 'Shotguns', caliber: '12 Gauge', capacity: '7 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/6/64/870_CQB.png/320px-870_CQB.png',
    desc: 'Eine klassische, taktische Pump-Action Schrotflinte, optimiert für den Nahkampf.',
    tactical: 'Verheerend auf nächste Distanz. Ideal um ungeschützte Verdächtige sofort zu neutralisieren. Vorsicht: Nachladen dauert extrem lange (einzelne Patronen).'
  },
  {
    id: 'w_m4super90', category: 'primary', name: 'M1014', type: 'Shotguns', caliber: '12 Gauge', capacity: '7 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/4/4e/M1014.png/320px-M1014.png',
    desc: 'Eine halbautomatische Kampfflinte für schnelle Schussfolgen.',
    tactical: 'Bietet die gleiche Zerstörungskraft wie die 870 CQB, schießt jedoch deutlich schneller. Hervorragend, wenn man in einem Raum direkt auf mehrere Gegner trifft.'
  },

  // --- PISTOLS ---
  {
    id: 'w_g19', category: 'secondary', name: 'G19', type: 'Pistols', caliber: '9x19mm Parabellum', capacity: '15 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/7/77/G19.png/320px-G19.png',
    desc: 'Eine kompakte, leichte und extrem zuverlässige Dienstpistole aus Polymer.',
    tactical: 'Die beste Allround-Seitenwaffe im Spiel. Ausreichend Munition, sehr moderater Rückstoß und schnelle Nachladezeit. Perfekt als Backup, wenn das Magazin der Primärwaffe leer ist.'
  },
  {
    id: 'w_m45a1', category: 'secondary', name: 'M45A1', type: 'Pistols', caliber: '.45 ACP', capacity: '7 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/6/6c/M45A1.png/320px-M45A1.png',
    desc: 'Eine moderne, taktische Variante der legendären 1911er Plattform.',
    tactical: 'Hoher Schaden pro Schuss. Ideal für präzises Einzelfeuer und stark gegen ungepanzerte Ziele, aber die sehr geringe Magazinkapazität verzeiht keine Fehler in Stresssituationen.'
  },
  {
    id: 'w_57usg', category: 'secondary', name: 'Five-seveN', type: 'Pistols', caliber: '5.7x28mm', capacity: '20 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/2/23/Five_seveN.png/320px-Five_seveN.png',
    desc: 'Eine Spezialpistole, die ein sehr kleines, pfeilschnelles Kaliber verschießt, ähnlich dem von Sturmgewehren.',
    tactical: 'Die Waffe der Wahl gegen schwer gepanzerte Ziele, wenn auf die Seitenwaffe gewechselt werden muss. Besitzt zudem das größte Magazin aller Pistolen.'
  },
  {
    id: 'w_usp45', category: 'secondary', name: 'USP45', type: 'Pistols', caliber: '.45 ACP', capacity: '12 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/1/18/USP45.png/320px-USP45.png',
    desc: 'Großkalibrige, deutsche Dienstpistole. Äußerst robust.',
    tactical: 'Ein hervorragender Kompromiss aus der Stoppwirkung einer .45er und einer akzeptablen Magazinkapazität von 12 Schuss.'
  },
  {
    id: 'w_357mag', category: 'secondary', name: '.357 Magnum', type: 'Pistols', caliber: '.357 Magnum', capacity: '6 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/2/28/.357_Magnum.png/320px-.357_Magnum.png',
    desc: 'Ein klassischer Revolver, der eine immense kinetische Energie ins Ziel bringt.',
    tactical: 'Ein Schuss, ein Treffer. Durchschlägt fast jede Deckung im Spiel. Das langsame Nachladen machen den Revolver jedoch zu einer Waffe für absolute Profis.'
  },

  // --- LESS-THAN-LETHAL ---
  {
    id: 'w_beanbag', category: 'primary', name: 'Beanbag Shotgun', type: 'Less-Than-Lethal', caliber: '12 Gauge (Beanbag)', capacity: '7 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/2/22/Beanbag_Shotgun.png/320px-Beanbag_Shotgun.png',
    desc: 'Verschießt nicht-tödliche Beanbag-Geschosse, um Verdächtige auf Distanz handlungsunfähig zu machen.',
    tactical: 'Achtung: Kopfschüsse sind auch hiermit tödlich! Immer auf den Torso oder die Beine zielen. Perfekt, um den S-Rank zu erreichen.'
  },
  {
    id: 'w_taser', category: 'secondary', name: 'Taser', type: 'Less-Than-Lethal', caliber: 'Elektroschock', capacity: '1 Schuss',
    image: 'https://readyornot.wiki.gg/images/thumb/7/75/Taser.png/320px-Taser.png',
    desc: 'Ein Distanz-Elektroimpulsgerät. Neutralisiert Verdächtige sofort auf kurze Distanz.',
    tactical: 'Die Nachladezeit ist sehr hoch und die Reichweite stark limitiert. Nur verwenden, wenn man ausreichende Deckung oder Backup durch das Team hat.'
  }
];

const RON_ATTACHMENTS = {
  Optics: [
    { id: 'opt_srs', name: 'SRS', desc: 'Geschlossenes Red Dot Visier. Bietet ein weites Sichtfeld und klare Zielerfassung.' },
    { id: 'opt_holo', name: 'Holo (EXPS3)', desc: 'Holographisches Visier. Perfekt für den Nahkampf (CQB) mit großem Absehen.' },
    { id: 'opt_micro', name: 'Micro T2', desc: 'Kompaktes Rotpunktvisier. Nimmt extrem wenig Platz auf der Schiene ein.' },
    { id: 'opt_m5b', name: 'M5B', desc: 'Kompaktes Red Dot mit minimalem Rahmen.' },
    { id: 'opt_atakr', name: 'ATAK-R', desc: 'Variables Zielfernrohr (1-4x). Ideal für längere Distanzen, z.B. auf Brisa Cove.' },
    { id: 'opt_sdr', name: 'SDR', desc: 'Combat-Visier mit fester Vergrößerung. Ein guter Mittelweg.' }
  ],
  Muzzle: [
    { id: 'muz_socom', name: 'SOCOM556 (Suppressor)', desc: 'Schalldämpfer. Reduziert den Mündungsknall drastisch, verringert aber leicht die Führigkeit.' },
    { id: 'muz_osprey', name: 'Osprey (Suppressor)', desc: 'Rechteckiger Schalldämpfer für Pistolen und Maschinenpistolen. Sehr leise.' },
    { id: 'muz_comp', name: 'Compensator', desc: 'Leitet Gase nach oben ab, um den vertikalen Rückstoß bei Dauerfeuer zu verringern.' },
    { id: 'muz_flash', name: 'Flash Hider', desc: 'Eliminiert den Mündungsblitz komplett. Verhindert Blendung bei Nutzung von Nachtsicht.' }
  ],
  Underbarrel: [
    { id: 'ub_vert', name: 'Vertical Grip', desc: 'Klassischer Sturmgriff. Maximale Reduzierung des vertikalen Rückstoßes.' },
    { id: 'ub_angled', name: 'Angled Grip', desc: 'Abgewinkelter Griff. Verbessert die ADS-Zeit (Aim Down Sights) erheblich.' },
    { id: 'ub_combat', name: 'Combat Grip', desc: 'Ein Hybridgriff für ausgewogene Rückstoßkontrolle und Handhabung.' }
  ],
  Overbarrel: [
    { id: 'ob_flash', name: 'Flashlight', desc: 'Helle Weißlicht-Taschenlampe. Blendet Verdächtige leicht und leuchtet dunkle Ecken aus.' },
    { id: 'ob_laser', name: 'Laser Pointer', desc: 'Roter Laser. Zeigt exakt dorthin, wo der Schuss landet. Gut für Hüftfeuer.' },
    { id: 'ob_peq', name: 'PEQ-15', desc: 'IR-Laser und IR-Strahler. Unsichtbar für das bloße Auge, nur mit NVG (Nachtsicht) sichtbar.' },
    { id: 'ob_mawl', name: 'MAWL', desc: 'Fortschrittlicher Laser/Illuminator. Bessere Ergonomie als der PEQ-15.' }
  ]
};

const PUBG_MAPS = [
  {
    id: 'pubg_erangel', game: 'pubg', name: 'Erangel', size: '8x8 km',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800',
    info: 'Die originale Battle Royale Karte. Eine russisch angehauchte Insel.',
    secrets: 'Geheime Kellerräume befinden sich unter bestimmten Gebäuden.',
    locations: 'Typische Keller-Standorte: Rozhok, südlich von Yasnaya Polyana.'
  }
];

const NEWS_POOL = [
  {
    id: 'n1', mapId: 'ron_elephant', type: 'CRITICAL', headline: 'Watt Community College: Active Shooter gemeldet',
    fact: 'Die Verdächtigen haben selbstgebaute Sprengsätze platziert. Höchster Zeitdruck.',
    content: 'Code 3! Mehrere Notrufe bestätigen einen Amoklauf. Ersteingreifende Kräfte melden IEDs. Das SWAT-Team muss Zivilisten ignorieren und direkt auf die Bedrohung vorrücken.'
  },
  {
    id: 'n2', mapId: 'ron_neon', type: 'FLASH', headline: 'Neon Nightclub: Terroranschlag von "Die Hand"',
    fact: 'Berichte über Selbstmordattentäter mit Sprengstoffwesten. Mindestabstand einhalten!',
    content: 'Katastrophe im Club Neon Tomb. Täter nutzen die Dunkelheit. Wenn ein Verdächtiger einen Zünder hält, ist ein finaler Rettungsschuss authorisiert.'
  },
  {
    id: 'n3', mapId: 'ron_ides', type: 'UPDATE', headline: 'Brisa Cove: Schwer bewaffnete Veteranen verbarrikadiert',
    fact: 'Die Gruppe "The Left Behind" trägt Level-IV-Panzerwesten, die Standardmunition absorbieren.',
    content: 'Sie haben Stolperdrähte an fast allen Türen angebracht. Spiegeln ist Pflicht! Frontale Feuergefechte sind tödlich.'
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
  type: "spring", stiffness: 450, damping: 35
};

const getRelativeTime = (date) => {
  const diff = Math.floor((new Date() - date) / 1000 / 60);
  if (diff < 1) return "Gerade eben";
  if (diff < 60) return `vor ${diff} Min.`;
  return "vor über 1 Std.";
};

// --- CONSTANTS ---
const SESSION_TIMEOUT = 10 * 60 * 1000;
const STORAGE_KEY_STATE = 'inTactics_app_state_v7';
const STORAGE_KEY_TIME = 'inTactics_last_active_v7';

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
      className="relative flex-1 md:flex-none px-4 md:px-8 py-4 md:py-3 rounded-full flex md:flex-row items-center justify-center gap-2 group outline-none z-10"
    >
      {isActive && (
        <motion.div layoutId="nav-active-pill" className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-xl md:rounded-full" transition={springTransition} />
      )}
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

const BlueprintViewer = ({ blueprints }) => {
  const [activeFloor, setActiveFloor] = useState(0);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [activePlan, setActivePlan] = useState('Plan A');
  const [markerType, setMarkerType] = useState('move');
  const [markersData, setMarkersData] = useState({});

  const dragStart = useRef(null);

  if (!blueprints || blueprints.length === 0) return null;

  const currentFloorKey = `${activePlan}_${activeFloor}`;
  const floorData = markersData[currentFloorKey] || { past: [], present: [], future: [] };
  const currentMarkers = floorData.present;

  const canUndo = floorData.past.length > 0;
  const canRedo = floorData.future.length > 0;

  const handlePointerDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!isFullscreen || !dragStart.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    // Setzt nur einen Punkt, wenn nicht gezogen (ge-pannt) wurde (< 5px Abweichung)
    if (Math.sqrt(dx * dx + dy * dy) < 5) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMarkersData(prev => {
        const fd = prev[currentFloorKey] || { past: [], present: [], future: [] };
        return {
          ...prev,
          [currentFloorKey]: {
            past: [...fd.past, fd.present],
            present: [...fd.present, { x, y, type: markerType }],
            future: []
          }
        };
      });
    }
    dragStart.current = null;
  };

  const undo = () => {
    setMarkersData(prev => {
      const fd = prev[currentFloorKey];
      if (!fd || fd.past.length === 0) return prev;
      const newPast = [...fd.past];
      const newPresent = newPast.pop();
      return {
        ...prev,
        [currentFloorKey]: { past: newPast, present: newPresent, future: [fd.present, ...fd.future] }
      };
    });
  };

  const redo = () => {
    setMarkersData(prev => {
      const fd = prev[currentFloorKey];
      if (!fd || fd.future.length === 0) return prev;
      const newFuture = [...fd.future];
      const newPresent = newFuture.shift();
      return {
        ...prev,
        [currentFloorKey]: { past: [...fd.past, fd.present], present: newPresent, future: newFuture }
      };
    });
  };

  const clearMarkers = () => {
    setMarkersData(prev => {
      const fd = prev[currentFloorKey];
      if (!fd || fd.present.length === 0) return prev;
      return {
        ...prev,
        [currentFloorKey]: { past: [...fd.past, fd.present], present: [], future: [] }
      };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentFloorKey]);

  const renderMarkerIcon = (type) => {
    switch (type) {
      case 'breach': return <Target size={20} className="text-red-500 drop-shadow-md" />;
      case 'suspect': return <Skull size={20} className="text-orange-500 drop-shadow-md" />;
      case 'hold': return <Shield size={20} className="text-blue-500 drop-shadow-md" />;
      case 'move': default: return <MapPin size={20} className="text-green-500 drop-shadow-md" />;
    }
  };

  const renderMapArea = (interactive) => (
    <div className="absolute inset-0 overflow-auto no-scrollbar touch-pan-x touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="min-w-full min-h-full flex items-center justify-center p-4">
        <motion.div
          animate={{ scale: scale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative origin-center max-w-4xl w-full select-none"
        >
          <img
            src={blueprints[activeFloor].url}
            className="w-full h-auto pointer-events-none"
            style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            alt="Tactical Map"
            draggable={false}
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
            {currentMarkers.map((m, i) => {
              if (i === 0) return null;
              const prev = currentMarkers[i - 1];
              return (
                <line
                  key={`line-${i}`}
                  x1={`${prev.x}%`} y1={`${prev.y}%`}
                  x2={`${m.x}%`} y2={`${m.y}%`}
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
                />
              );
            })}
          </svg>

          {currentMarkers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              {renderMarkerIcon(m.type)}
            </motion.div>
          ))}

          {interactive && (
            <div
              className="absolute inset-0 z-30 cursor-crosshair touch-none"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            ></div>
          )}
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4">Tactical Blueprint</h3>

        {blueprints.length > 1 && (
          <div className="flex gap-2 bg-black/50 p-1 rounded-lg border border-white/10">
            {blueprints.map((bp, idx) => (
              <button key={idx} onClick={() => { setActiveFloor(idx); setScale(1); }} className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${activeFloor === idx ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white'}`}>
                {bp.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <GlassCard className="relative bg-[#0a0a0a] border-red-500/20 overflow-hidden h-[400px] md:h-[600px] group">
        {renderMapArea(false)}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-40 pointer-events-none">
          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-black uppercase tracking-widest shadow-2xl pointer-events-auto transition-transform hover:scale-105"
          >
            <Maximize size={18} /> Route Planen
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-30">
          <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-3 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20"><ZoomIn size={20} /></button>
          <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} className="p-3 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20"><ZoomOut size={20} /></button>
        </div>
      </GlassCard>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col"
          >
            {/* Fullscreen Planner Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl z-[110] shadow-2xl overflow-x-auto max-w-[95vw]">

              <select
                value={activePlan}
                onChange={(e) => setActivePlan(e.target.value)}
                className="bg-white/10 border border-white/10 text-white text-[10px] md:text-xs font-bold uppercase rounded px-2 md:px-3 py-1.5 outline-none hover:bg-white/20 cursor-pointer shrink-0"
              >
                <option className="bg-black text-white" value="Plan A">Plan A (Main)</option>
                <option className="bg-black text-white" value="Plan B">Plan B (Alt)</option>
                <option className="bg-black text-white" value="Plan C">Plan C (Dynamic)</option>
              </select>

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />

              {/* Etagen-Switcher im Fullscreen-Modus */}
              {blueprints.length > 1 && (
                <>
                  <div className="flex gap-1 shrink-0">
                    {blueprints.map((bp, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setActiveFloor(idx); setScale(1); }}
                        className={`px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase rounded transition-colors ${activeFloor === idx ? 'bg-red-600 text-white shadow-inner' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                      >
                        {bp.name}
                      </button>
                    ))}
                  </div>
                  <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />
                </>
              )}

              {[
                { id: 'move', icon: MapPin, color: 'text-green-500' },
                { id: 'breach', icon: Target, color: 'text-red-500' },
                { id: 'hold', icon: Shield, color: 'text-blue-500' },
                { id: 'suspect', icon: Skull, color: 'text-orange-500' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMarkerType(m.id)}
                  className={`flex items-center shrink-0 p-2 rounded-lg transition-all ${markerType === m.id ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
                  title={m.id.toUpperCase()}
                >
                  <m.icon size={16} className={m.color} />
                </button>
              ))}

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />

              <button onClick={undo} disabled={!canUndo} className={`p-2 rounded-lg transition-all shrink-0 ${canUndo ? 'text-white hover:bg-white/20' : 'text-white/20 cursor-not-allowed'}`} title="Rückgängig (Ctrl+Z)">
                <Undo size={16} />
              </button>
              <button onClick={redo} disabled={!canRedo} className={`p-2 rounded-lg transition-all shrink-0 ${canRedo ? 'text-white hover:bg-white/20' : 'text-white/20 cursor-not-allowed'}`} title="Wiederholen (Ctrl+Shift+Z)">
                <Redo size={16} />
              </button>

              <div className="h-6 w-px bg-white/20 mx-1 shrink-0" />

              <button onClick={clearMarkers} className="p-2 rounded-lg text-red-500 hover:bg-red-500/20 transition-all shrink-0" title="Route löschen">
                <X size={16} />
              </button>
            </div>

            <button onClick={() => setIsFullscreen(false)} className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-white/20 text-white rounded-full z-[110] transition-colors border border-white/10">
              <Minimize size={20} />
            </button>

            {renderMapArea(true)}

            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[110]">
              <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-4 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20"><ZoomIn size={24} /></button>
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

// --- NEW COMPONENT: MISSION OBJECTIVES ---
const MissionObjectives = ({ objectives }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleObj = (idx) => {
    setCheckedItems(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
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

// --- NEW COMPONENT: WEAPON GUNSMITH ---
const WeaponGunsmith = ({ equipped, setEquipped, activeSlot, setActiveSlot }) => {
  const slots = [
    { id: 'Optics', icon: Crosshair, label: 'Optics' },
    { id: 'Muzzle', icon: Zap, label: 'Muzzle' },
    { id: 'Underbarrel', icon: AlignJustify, label: 'Underbarrel' },
    { id: 'Overbarrel', icon: Sun, label: 'Overbarrel' }
  ];

  const handleEquip = (slotId, attachment) => {
    setEquipped(prev => ({ ...prev, [slotId]: attachment }));
    setActiveSlot(null);
  };

  return (
    <GlassCard className="p-6 md:p-8 bg-black/40 border-white/10">
      <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-6 border-b border-white/10 pb-4">Gunsmith // Attachments</h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 space-y-2">
          {slots.map(s => {
            const isActive = activeSlot === s.id;
            const hasAttachment = equipped[s.id];
            return (
              <button
                key={s.id}
                onClick={() => setActiveSlot(isActive ? null : s.id)}
                className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all ${isActive ? 'bg-red-600/10 border-red-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3">
                  <s.icon size={16} className={isActive ? 'text-red-500' : (hasAttachment ? 'text-white' : 'text-white/40')} />
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{s.label}</p>
                    <p className={`text-xs md:text-sm font-bold uppercase tracking-tight ${hasAttachment ? 'text-white' : 'text-white/20'}`}>
                      {hasAttachment ? hasAttachment.name : 'Kein Aufsatz'}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? 'rotate-90 text-red-500' : 'text-white/20'}`} />
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
                  className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all ${!equipped[activeSlot] ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                >
                  <span className="font-bold text-sm text-white uppercase">Kein Aufsatz</span>
                  <span className="text-xs text-white/40">Standardkonfiguration</span>
                </button>

                {RON_ATTACHMENTS[activeSlot].map(att => {
                  const isEquipped = equipped[activeSlot]?.id === att.id;
                  return (
                    <button
                      key={att.id}
                      onClick={() => handleEquip(activeSlot, att)}
                      className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${isEquipped ? 'bg-red-600/20 border-red-500/50' : 'bg-black/50 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-white uppercase">{att.name}</span>
                        {isEquipped && <CheckSquare size={14} className="text-red-500" />}
                      </div>
                      <span className="text-xs text-gray-400 leading-relaxed">{att.desc}</span>
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

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ronSubTab, setRonSubTab] = useState('maps');
  const [activeDlc, setActiveDlc] = useState('base');
  const [activeWeaponCat, setActiveWeaponCat] = useState('Assault Rifles'); // NEU: Weapon Category State

  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // GUNSMITH STATE
  const [equippedAttachments, setEquippedAttachments] = useState({ Optics: null, Muzzle: null, Underbarrel: null, Overbarrel: null });
  const [activeAttachmentSlot, setActiveAttachmentSlot] = useState(null);

  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });

  const [isRonSearchOpen, setIsRonSearchOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [liveFeed, setLiveFeed] = useState([]);

  const scrollPosRef = useRef({ window: 0, ronContainer: 0 });
  const ronListRef = useRef(null);
  const lastScrollY = useRef(0);

  // Live Feed Logic
  useEffect(() => {
    const shuffled = [...NEWS_POOL].sort(() => 0.5 - Math.random());
    setLiveFeed(shuffled.slice(0, 3).map(item => ({ ...item, timestamp: new Date() })));
    const intervalId = setInterval(() => {
      setLiveFeed(currentFeed => {
        const currentIds = currentFeed.map(i => i.id);
        const availablePool = NEWS_POOL.filter(i => !currentIds.includes(i.id));
        if (availablePool.length === 0) return currentFeed;
        return [{ ...availablePool[Math.floor(Math.random() * availablePool.length)], timestamp: new Date() }, ...currentFeed.slice(0, 2)];
      });
    }, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // State Persistence Logic
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
      selectedMapId: selectedMap?.id || null, selectedArticleId: selectedArticle?.id || null,
      scrollPosition: window.scrollY
    }));
    localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
  }, [activeTab, ronSubTab, activeDlc, activeWeaponCat, selectedMap, selectedArticle, isRestored]);

  // Window Scroll & Container Scroll Logic
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

  // Lightbox Keyboard Navigation Logic
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

  // Handlers
  const handleMapClick = (map) => {
    scrollPosRef.current = { window: window.scrollY || document.documentElement.scrollTop, ronContainer: ronListRef.current ? ronListRef.current.scrollTop : 0 };
    setSelectedMap(map); setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false); window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleWeaponClick = (weapon) => {
    scrollPosRef.current = { window: window.scrollY || document.documentElement.scrollTop, ronContainer: ronListRef.current ? ronListRef.current.scrollTop : 0 };
    setSelectedWeapon(weapon); setSearchQuery(''); setIsRonSearchOpen(false); setIsScrollingDown(false);
    setEquippedAttachments({ Optics: null, Muzzle: null, Underbarrel: null, Overbarrel: null }); setActiveAttachmentSlot(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleBackClick = () => { setSelectedMap(null); setSelectedWeapon(null); setIsScrollingDown(false); };
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
  const handleRonSubTabSwitch = (tab) => { setSearchQuery(''); setIsRonSearchOpen(false); setRonSubTab(tab); };

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
    if (activeTab === 'home' || activeTab === 'ron') {
      resultsMaps = [...resultsMaps, ...RON_MAPS.filter(m => m.name.toLowerCase().includes(query) || (m.codename && m.codename.toLowerCase().includes(query)) || m.situation.toLowerCase().includes(query))];
      resultsWeapons = [...resultsWeapons, ...RON_WEAPONS.filter(w => w.name.toLowerCase().includes(query) || w.type.toLowerCase().includes(query) || w.desc.toLowerCase().includes(query))];
    }
    if (activeTab === 'home' || activeTab === 'pubg') resultsMaps = [...resultsMaps, ...PUBG_MAPS.filter(m => m.name.toLowerCase().includes(query) || m.info.toLowerCase().includes(query))];
    if (activeTab === 'home') resultsNews = NEWS_POOL.filter(n => n.headline.toLowerCase().includes(query) || n.fact.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));

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
        {resultsMaps.length === 0 && resultsNews.length === 0 && resultsWeapons.length === 0 && (
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
                {selectedMap ? (
                  <div className="space-y-4 md:space-y-6"><div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/10"><img src={selectedMap.image} className="w-full h-full object-cover" /></div><div><h4 className="text-xl md:text-2xl font-black italic uppercase text-white leading-none">{selectedMap.name}</h4><p className="text-white/40 text-[10px] mt-2 font-mono uppercase tracking-tighter">{selectedMap.game === 'ron' ? 'Operation Area' : 'Combat Zone'}</p></div><button onClick={() => handleTabSwitch(selectedMap.game)} className="w-full py-3 md:py-4 bg-white text-black font-black uppercase italic tracking-tighter text-xs md:text-sm rounded-xl hover:bg-blue-400 transition-colors">Return to Intel</button></div>
                ) : (
                  <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center opacity-20"><Clock size={40} className="mb-4" /><p className="text-[10px] font-black uppercase tracking-widest italic">No Recent Activity</p></div>
                )}
              </GlassCard>
              <GlassCard className="p-6 md:p-8"><h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/40 mb-4 md:mb-6">Tactical Status</h3><div className="grid grid-cols-2 gap-3 md:gap-4"><div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center"><p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Maps</p><p className="text-xl md:text-2xl font-black italic text-white">{RON_MAPS.length + PUBG_MAPS.length}</p></div><div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 text-center"><p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase mb-1">Intel</p><p className="text-xl md:text-2xl font-black italic text-white">{NEWS_POOL.length}</p></div></div></GlassCard>
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
              equipped={equippedAttachments}
              setEquipped={setEquippedAttachments}
              activeSlot={activeAttachmentSlot}
              setActiveSlot={setActiveAttachmentSlot}
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
    if (selectedMap && selectedMap.game === 'ron') return (
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

            {/* Missionsziele interaktiv gemacht */}
            <MissionObjectives objectives={selectedMap.objectives} />

            <AudioLogViewer logs={selectedMap.audioLogs} />
            <POIViewer poi={selectedMap.poi} />
            <BlueprintViewer blueprints={selectedMap.blueprints} />
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
        </div>
      </motion.div>
    );

    const currentMaps = RON_MAPS.filter(map => map.dlc === activeDlc);
    const currentWeapons = RON_WEAPONS.filter(w => w.type === activeWeaponCat);

    return (
      <motion.div {...pageTransition} key="ron-main" className="md:space-y-12 pt-0 md:pt-28 pb-32 md:pb-20 max-md:fixed max-md:inset-0 max-md:top-0 max-md:bottom-[68px] max-md:z-30 max-md:bg-[#010101] max-md:block max-md:p-0">

        {/* DESKTOP TOP MENU */}
        <div className="max-md:hidden relative z-20 flex flex-col items-center w-full mb-8">
          <div className="relative z-10 w-fit mx-auto mb-6 md:mb-8">
            <div className="flex p-[3px] md:p-1 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full relative shadow-2xl overflow-hidden">
              {['maps', 'weapons'].map((tab) => (
                <button key={tab} onClick={() => handleRonSubTabSwitch(tab)} className={`relative px-8 md:px-14 py-2 md:py-3.5 rounded-full font-black uppercase italic tracking-tighter text-[10px] md:text-[13px] z-10 transition-colors duration-500 ${ronSubTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                  {ronSubTab === tab && <motion.div layoutId="ron-active-sub" className="absolute inset-0 bg-[#e31e24] rounded-full -z-10 shadow-[0_0_30px_rgba(227,30,36,0.3)]" transition={springTransition} />}
                  {tab === 'maps' ? 'Operations' : 'Armory'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full overflow-hidden max-w-7xl mx-auto">
            <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-0 snap-x">
              <div className="hidden md:flex items-center shrink-0">
                {isRonSearchOpen ? (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 130, opacity: 1 }} className="flex items-center bg-white/10 rounded-full border border-white/20 px-2.5 py-1.5 mr-2">
                    <Search size={14} className="text-white/40 mr-1.5 shrink-0" /><input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Suchen..." className="bg-transparent text-white outline-none text-[11px] w-full" /><button onClick={() => { setIsRonSearchOpen(false); setSearchQuery(''); }} className="shrink-0 ml-1.5"><X size={14} className="text-white/40 hover:text-white" /></button>
                  </motion.div>
                ) : (
                  <button onClick={() => setIsRonSearchOpen(true)} className="p-1.5 text-white/40 hover:text-white transition-colors flex items-center justify-center mr-2"><Search size={16} /></button>
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
              ) : (
                WEAPON_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveWeaponCat(cat.id)} className={`relative uppercase font-black tracking-[0.1em] text-[12px] transition-all shrink-0 py-2 snap-start whitespace-nowrap ${activeWeaponCat === cat.id ? 'text-[#e5e5e5]' : 'text-white/40 hover:text-white/70'}`}>
                    {cat.label}
                    {activeWeaponCat === cat.id && <motion.div layoutId="wep-cat-bar" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc2e2e]" transition={springTransition} />}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* LIST RENDERER */}
        <div className={`max-md:absolute max-md:inset-0 relative z-10 ${searchQuery ? 'max-md:pt-8 max-md:px-4 max-md:overflow-y-auto' : ''}`}>
          <AnimatePresence mode="wait">
            {searchQuery ? (
              <div className="w-full h-full overflow-y-auto pb-32 no-scrollbar">{renderSearchResults()}</div>
            ) : (
              <motion.div key={activeDlc + activeWeaponCat + ronSubTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} ref={ronListRef} onScroll={handleContainerScroll} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 max-md:flex max-md:flex-col max-md:overflow-y-scroll no-scrollbar ${ronSubTab === 'maps' ? 'max-md:gap-0 max-md:h-full max-md:snap-y max-md:snap-mandatory' : 'max-md:gap-4 max-md:p-4 max-md:h-full max-md:pb-32'}`}>
                {ronSubTab === 'maps' ? currentMaps.map(map => (
                  <div key={map.id} className="relative md:flex-1 md:hover:flex-[3] transition-all duration-700 ease-in-out overflow-hidden md:rounded-3xl group max-md:h-full max-md:w-full max-md:snap-start max-md:shrink-0">
                    <GlassCard onClick={() => handleMapClick(map)} className="h-[350px] md:h-[480px] max-md:h-full max-md:w-full max-md:rounded-none max-md:border-none max-md:shadow-none bg-black">
                      <img src={map.image} style={{ objectPosition: map.imagePosition || 'center' }} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100 md:group-hover:scale-110" alt={map.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute max-md:bottom-[110px] md:bottom-0 left-0 p-6 md:p-12 w-full">
                        <p className="text-red-600 font-mono text-[10px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 truncate">{map.codename}</p>
                        <h3 className="text-3xl md:text-3xl lg:text-4xl font-black text-white italic uppercase leading-tight tracking-tighter drop-shadow-2xl">{map.name}</h3>
                      </div>
                    </GlassCard>
                  </div>
                )) : (
                  <div className="lg:col-span-2 w-full pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE BOTTOM MENU */}
        <motion.div animate={{ y: isScrollingDown ? 200 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="md:hidden fixed bottom-[68px] left-0 right-0 flex flex-col gap-2 px-3 pt-8 pb-2 bg-gradient-to-t from-[#010101] via-[#010101] to-transparent z-40 pointer-events-none">
          <div className="pointer-events-auto flex flex-col gap-2">
            <div className="flex overflow-x-auto no-scrollbar gap-2 py-1 items-center">
              <div className="shrink-0 flex items-center">
                {isRonSearchOpen ? (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 100, opacity: 1 }} className="flex items-center bg-[#111111] rounded-full border border-white/20 px-2 py-1.5 mr-1">
                    <Search size={12} className="text-white/40 mr-1.5 shrink-0" /><input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Suchen..." className="bg-transparent text-white outline-none text-[10px] w-full" /><button onClick={() => { setIsRonSearchOpen(false); setSearchQuery(''); }} className="shrink-0 ml-1"><X size={12} className="text-white/40 hover:text-white" /></button>
                  </motion.div>
                ) : (
                  <button onClick={() => setIsRonSearchOpen(true)} className="p-1.5 bg-[#111111] border border-transparent rounded-full text-white/50 hover:text-white transition-colors flex items-center justify-center mr-1"><Search size={12} /></button>
                )}
              </div>

              {!searchQuery && (ronSubTab === 'maps' ? (
                [{ id: 'base', label: 'READY OR NOT' }, { id: 'home_invasion', label: 'HOME INVASION' }, { id: 'dark_waters', label: 'DARK WATERS' }, { id: 'ls_stories', label: 'LOS SUENOS STORIES' }, { id: 'boiling_point', label: 'BOILING POINT' }].map(dlc => (
                  <button key={dlc.id} onClick={() => setActiveDlc(dlc.id)} className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[9px] font-black uppercase border transition-all shrink-0 ${activeDlc === dlc.id ? 'border-[#e31e24] text-white bg-transparent' : 'border-transparent bg-[#111111] text-white/50'}`}>{dlc.label}</button>
                ))
              ) : (
                WEAPON_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveWeaponCat(cat.id)} className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[9px] font-black uppercase border transition-all shrink-0 ${activeWeaponCat === cat.id ? 'border-[#e31e24] text-white bg-transparent' : 'border-transparent bg-[#111111] text-white/50'}`}>{cat.label}</button>
                ))
              ))}
            </div>

            {!searchQuery && (
              <div className="flex gap-2">
                {['maps', 'weapons'].map((tab) => (
                  <button key={tab} onClick={() => handleRonSubTabSwitch(tab)} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${ronSubTab === tab ? 'bg-[#e31e24] text-white border-white shadow-lg' : 'bg-[#111111] text-white/50 border-transparent'}`}>
                    {tab === 'maps' ? 'Operations' : 'Armory'}
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
    // Basic Structure for PUBG remains untouched, keeping original functionality.
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
          Tactical Repository // inTACTICS v3.3.0
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

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
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