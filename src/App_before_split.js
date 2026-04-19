import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Crosshair, Map as MapIcon, Shield, Eye, EyeOff, ChevronLeft, Target, Settings, Info, Lock, Menu, X, Activity, Zap, Clock, FileText, ExternalLink, AlertTriangle, Search, Play, Pause, ZoomIn, ZoomOut, Layers } from 'lucide-react';

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
    id: 'ron_23mb',
    game: 'ron',
    dlc: 'base',
    name: 'San Uriel Condominiums',
    codename: '23 Megabytes a Second',
    image: 'https://readyormaps.com/maps/2_23_mb/23_Megabytes_a_Second_preview.webp',
    situation: 'Ein angebliches Swatting bei einem Streamer entpuppt sich als illegale Server-Operation (CP).',
    suspects: 'Private Sicherheitskräfte und bewaffnete Bewohner. Unerwartet hoher Widerstand.',
    blueprints: [], audioLogs: [], poi: { civilians: [], suspects: [] }, media: [], screenshots: []
  },
  {
    id: 'ron_twisted',
    game: 'ron',
    dlc: 'base',
    name: '213 Park Homes',
    codename: 'Twisted Nerve',
    image: 'https://readyormaps.com/maps/3_213_park/213_Park_preview.webp',
    situation: 'Durchsuchungsbefehl bei einem vermuteten Meth-Labor in einem heruntergekommenen Vorort.',
    suspects: 'Junkies und Dealer. Unberechenbar, oft unter Drogeneinfluss. Gefahr durch versteckte Sprengfallen.',
    blueprints: [], audioLogs: [], poi: { civilians: [], suspects: [] }, media: [], screenshots: []
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
    situation: 'Razzia in einem Luxuskomplex, der als Tarnung für Operationen der Triaden.',
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
  // --- PRIMARY WEAPONS ---
  {
    id: 'w_m4a1', category: 'primary', name: 'M4A1', type: 'Assault Rifle', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
    desc: 'Das M4A1 ist ein vollautomatisches Sturmgewehr, das sich durch hohe Modularität auszeichnet. Es ist der Standard für viele SWAT Einheiten.',
    tactical: 'Extrem vielseitig. Ideal für Einsätze mit gemischten Distanzen. Dank der 5.56mm Munition gute Rüstungsdurchdringung, allerdings besteht bei ungepanzerten Zielen die Gefahr von Durchschüssen (Overpenetration), was Geiseln hinter den Wänden gefährden kann.'
  },
  {
    id: 'w_mk18', category: 'primary', name: 'MK18', type: 'Assault Rifle', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
    desc: 'Eine kompaktere Version des M4A1, entwickelt für den Nahkampf (CQB).',
    tactical: 'Durch den kürzeren Lauf ist sie in extrem engen Umgebungen (wie Wohnungen in Brisa Cove) viel führiger als das Standard M4A1. Minimal geringere Reichweite, aber überragend in Innenräumen.'
  },
  {
    id: 'w_arn180', category: 'primary', name: 'ARN-180', type: 'Assault Rifle', caliber: '.300 Blackout', capacity: '30 Schuss',
    desc: 'Ein modernes, kompaktes Sturmgewehr für spezielle Ballistik optimiert.',
    tactical: 'Die .300 Blackout Munition macht diese Waffe perfekt für Schalldämpfer-Einsätze. Hervorragende Stoppwirkung im CQB ohne übermäßige Durchschlagskraft, was sie in Häusern sehr sicher macht.'
  },
  {
    id: 'w_sa58', category: 'primary', name: 'SA-58 OSW', type: 'Assault Rifle', caliber: '7.62x51mm NATO', capacity: '20 Schuss',
    desc: 'Eine moderne, gekürzte Version des klassischen FAL. Sehr schwer und enorm kraftvoll.',
    tactical: 'Zerstört Holztüren und durchschlägt schwere Deckungen mit Leichtigkeit. Die absolut beste Wahl gegen Suspects mit schwerer Körperpanzerung. Achtung: Der Rückstoß ist enorm hoch.'
  },
  {
    id: 'w_g36c', category: 'primary', name: 'G36C', type: 'Assault Rifle', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
    desc: 'Kompaktes deutsches Sturmgewehr aus Polymer, sehr leicht und zuverlässig.',
    tactical: 'Gut kontrollierbarer Rückstoß, besonders bei Feuerstößen. Eine ausgezeichnete Alternative zum M4A1 für Spieler, die ein klares Sichtbild bevorzugen.'
  },
  {
    id: 'w_mp5a3', category: 'primary', name: 'MP5A3', type: 'Submachine Gun', caliber: '9x19mm Parabellum', capacity: '30 Schuss',
    desc: 'Die klassische SWAT-Maschinenpistole, berühmt für ihr Rollenverschluss-System.',
    tactical: 'Die erste Wahl für Geiselsituationen ohne gepanzerte Feinde. Extrem geringer Rückstoß erlaubt sehr präzise Schüsse. Die geringere Durchschlagskraft minimiert Kollateralschäden extrem.'
  },
  {
    id: 'w_mpx', category: 'primary', name: 'MPX', type: 'Submachine Gun', caliber: '9x19mm Parabellum', capacity: '30 Schuss',
    desc: 'Moderne Maschinenpistole mit AR-15 ähnlichen Bedienelementen.',
    tactical: 'Sehr schnelle Feuerrate und extrem wenig Rückstoß. Ideal für schnelle Raumstürmungen, bei denen die Feinde keine Kevlar-Westen tragen.'
  },
  {
    id: 'w_ump45', category: 'primary', name: 'UMP-45', type: 'Submachine Gun', caliber: '.45 ACP', capacity: '25 Schuss',
    desc: 'Eine leichte Maschinenpistole mit großem Kaliber, aber vergleichsweise langsamer Feuerrate.',
    tactical: 'Hohe Stoppwirkung gegen ungeschützte Ziele. Gut kontrollierbar dank der langsamen Feuerrate. Etwas schwächer gegen militärische Schutzwesten.'
  },
  {
    id: 'w_p90', category: 'primary', name: 'P90', type: 'Submachine Gun', caliber: '5.7x28mm', capacity: '50 Schuss',
    desc: 'Bullpup-Maschinenpistole mit massivem Magazin und panzerbrechender Munition.',
    tactical: 'Das 50-Schuss Magazin erlaubt es, mehrere Gegner ohne Nachladen zu bekämpfen. Die 5.7mm Munition durchschlägt auch leichte Körperpanzerung besser als herkömmliche 9mm SMGs.'
  },
  {
    id: 'w_870cqb', category: 'primary', name: '870 CQB', type: 'Shotgun', caliber: '12 Gauge', capacity: '7 Schuss',
    desc: 'Eine klassische, taktische Pump-Action Schrotflinte, optimiert für den Nahkampf.',
    tactical: 'Verheerend auf nächste Distanz. Ideal um ungeschützte Verdächtige sofort zu neutralisieren. Vorsicht: Nachladen dauert extrem lange (einzelne Patronen).'
  },
  {
    id: 'w_m4super90', category: 'primary', name: 'M4 Super 90', type: 'Shotgun', caliber: '12 Gauge', capacity: '7 Schuss',
    desc: 'Eine halbautomatische Kampfflinte für schnelle Schussfolgen.',
    tactical: 'Bietet die gleiche Zerstörungskraft wie die 870 CQB, schießt jedoch deutlich schneller. Hervorragend, wenn man in einem Raum direkt auf mehrere Gegner trifft.'
  },

  // --- SECONDARY WEAPONS ---
  {
    id: 'w_g19', category: 'secondary', name: 'G19', type: 'Pistol', caliber: '9x19mm Parabellum', capacity: '15 Schuss',
    desc: 'Eine kompakte, leichte und extrem zuverlässige Dienstpistole aus Polymer.',
    tactical: 'Die beste Allround-Seitenwaffe im Spiel. Ausreichend Munition, sehr moderater Rückstoß und schnelle Nachladezeit. Perfekt als Backup, wenn das Magazin der Primärwaffe leer ist.'
  },
  {
    id: 'w_m45a1', category: 'secondary', name: 'M45A1', type: 'Pistol', caliber: '.45 ACP', capacity: '7 Schuss',
    desc: 'Eine moderne, taktische Variante der legendären 1911er Plattform.',
    tactical: 'Hoher Schaden pro Schuss. Ideal für präzises Einzelfeuer und stark gegen ungepanzerte Ziele, aber die sehr geringe Magazinkapazität verzeiht keine Fehler in Stresssituationen.'
  },
  {
    id: 'w_57usg', category: 'secondary', name: '5.7 USG', type: 'Pistol', caliber: '5.7x28mm', capacity: '20 Schuss',
    desc: 'Eine Spezialpistole, die ein sehr kleines, pfeilschnelles Kaliber verschießt, ähnlich dem von Sturmgewehren.',
    tactical: 'Die Waffe der Wahl gegen schwer gepanzerte Ziele, wenn auf die Seitenwaffe gewechselt werden muss. Besitzt zudem das größte Magazin aller Pistolen.'
  },
  {
    id: 'w_usp45', category: 'secondary', name: 'USP45', type: 'Pistol', caliber: '.45 ACP', capacity: '12 Schuss',
    desc: 'Großkalibrige, deutsche Dienstpistole. Äußerst robust.',
    tactical: 'Ein hervorragender Kompromiss aus der Stoppwirkung einer .45er und einer akzeptablen Magazinkapazität von 12 Schuss.'
  },
  {
    id: 'w_357mag', category: 'secondary', name: '.357 Magnum', type: 'Revolver', caliber: '.357 Magnum', capacity: '6 Schuss',
    desc: 'Ein klassischer Revolver, der eine immense kinetische Energie ins Ziel bringt.',
    tactical: 'Ein Schuss, ein Treffer. Durchschlägt fast jede Deckung im Spiel. Das langsame Nachladen machen den Revolver jedoch zu einer Waffe für absolute Profis.'
  }
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
    content: 'Einsatz Ides of March: Die Täter in Brisa Cove Apartments sind ehemalige Militärs. Sie haben Stolperdrähte an fast allen Türen angebracht. Spiegeln (Mirrorgun) ist Pflicht! Frontale Feuergefechte sind tödlich, da die Feinde mit SA-58 Sturmgewehren schießen, die Wände durchschlagen. C2-Sprengladungen und schweres Tränengas (CS Gas) werden für den Zugriff empfohlen.'
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
  const diff = Math.floor((new Date() - date) / 1000 / 60);
  if (diff < 1) return "Gerade eben";
  if (diff < 60) return `vor ${diff} Min.`;
  return "vor über 1 Std.";
};

// --- CONSTANTS ---
const SESSION_TIMEOUT = 10 * 60 * 1000;
const STORAGE_KEY_STATE = 'inTactics_app_state_v6';
const STORAGE_KEY_TIME = 'inTactics_last_active_v6';

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

// Neu: Blueprint Viewer Komponente
const BlueprintViewer = ({ blueprints }) => {
  const [activeFloor, setActiveFloor] = useState(0);
  const [scale, setScale] = useState(1);

  if (!blueprints || blueprints.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4">Tactical Blueprint</h3>

        {blueprints.length > 1 && (
          <div className="flex gap-2 bg-black/50 p-1 rounded-lg border border-white/10">
            {blueprints.map((bp, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveFloor(idx); setScale(1); }}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${activeFloor === idx ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white'}`}
              >
                {bp.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <GlassCard className="relative bg-[#0a0a0a] border-red-500/20 overflow-hidden h-[400px] md:h-[600px]">
        {/* Interactive Map Area */}
        <div className="absolute inset-0 overflow-auto no-scrollbar cursor-move touch-pan-x touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="min-w-full min-h-full flex items-center justify-center p-4">
            <motion.img
              src={blueprints[activeFloor].url}
              animate={{ scale: scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-none origin-center"
              style={{ width: '100%', height: 'auto', filter: 'invert(1) hue-rotate(180deg)' }}
              alt="Tactical Map"
            />
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-3 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors shadow-xl">
            <ZoomIn size={20} />
          </button>
          <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} className="p-3 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors shadow-xl">
            <ZoomOut size={20} />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-red-600/80 text-white text-[10px] px-3 py-1.5 rounded font-mono uppercase tracking-widest animate-pulse">Top Secret</span>
        </div>
      </GlassCard>
    </div>
  );
};

// Neu: POI Viewer (Suspects / Civilians)
const POIViewer = ({ poi }) => {
  if (!poi || (!poi.suspects?.length && !poi.civilians?.length)) return null;

  const renderTable = (person, type) => (
    <div key={person.name} className="flex flex-col md:flex-row bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden mb-6">
      {/* Left: Image */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
        <div className="h-10 border-b border-white/10 flex items-center justify-center font-black uppercase text-[10px] tracking-widest text-white/40 bg-black/40">
          Image
        </div>
        <div className="flex-1 p-2 flex items-center justify-center bg-black/20">
          <img src={person.image} alt={person.name} className="max-h-[250px] object-contain rounded" />
        </div>
      </div>

      {/* Right: Details */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        <div className="h-10 border-b border-white/10 flex items-center justify-center font-black uppercase text-[10px] tracking-widest text-white/40 bg-black/40">
          Name
        </div>
        <div className={`p-3 border-b border-white/10 text-lg font-black ${type === 'suspect' ? 'text-red-500' : 'text-orange-500'}`}>
          {person.name}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 border-b border-white/10 bg-black/40 text-[10px] text-center font-bold uppercase tracking-widest text-white/40">
          <div className="p-2 border-r border-white/10">Sex</div>
          <div className="p-2 border-r border-white/10">Height</div>
          <div className="p-2 border-r border-white/10">Weight</div>
          <div className="p-2 border-r border-white/10">Build</div>
          <div className="p-2">D.O.B.</div>
        </div>
        <div className="grid grid-cols-5 border-b border-white/10 text-xs text-center font-medium">
          <div className="p-3 border-r border-white/10">{person.sex}</div>
          <div className="p-3 border-r border-white/10">{person.height}</div>
          <div className="p-3 border-r border-white/10">{person.weight}</div>
          <div className="p-3 border-r border-white/10">{person.build}</div>
          <div className="p-3">{person.dob}</div>
        </div>

        {/* Description */}
        <div className="p-4 md:p-6 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap flex-1 bg-white/[0.02]">
          {person.desc}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {poi.civilians?.length > 0 && (
        <section>
          <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-orange-500 pl-4 mb-6">Civilians</h3>
          {poi.civilians.map(c => renderTable(c, 'civilian'))}
        </section>
      )}
      {poi.suspects?.length > 0 && (
        <section>
          <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-red-600 pl-4 mb-6">Suspects</h3>
          {poi.suspects.map(s => renderTable(s, 'suspect'))}
        </section>
      )}
    </div>
  );
};

// Neu: Audio Player für Calls & Briefings
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

            <audio controls className="w-full h-10 mb-4 rounded bg-black outline-none" preload="none">
              <source src={log.url} type={log.url.endsWith('ogg') ? 'audio/ogg' : 'audio/wav'} />
              Your browser does not support the audio element.
            </audio>

            <button
              onClick={() => setActiveTranscript(activeTranscript === idx ? null : idx)}
              className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white flex items-center gap-1 transition-colors"
            >
              <FileText size={12} /> {activeTranscript === idx ? 'Hide Transcript' : 'Show Transcript'}
            </button>

            <AnimatePresence>
              {activeTranscript === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 p-3 bg-black/50 border border-white/5 rounded text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-hidden"
                >
                  {log.transcript}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ronSubTab, setRonSubTab] = useState('maps');
  const [activeDlc, setActiveDlc] = useState('base');
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [isRonSearchOpen, setIsRonSearchOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const [isRestored, setIsRestored] = useState(false);
  const [liveFeed, setLiveFeed] = useState([]);

  // Refs for precise scroll persistence
  const scrollPosRef = useRef({ window: 0, ronContainer: 0 });
  const ronListRef = useRef(null);
  const lastScrollY = useRef(0);

  // --- LIVE FEED LOGIC ---
  useEffect(() => {
    const shuffled = [...NEWS_POOL].sort(() => 0.5 - Math.random());
    setLiveFeed(shuffled.slice(0, 3).map(item => ({ ...item, timestamp: new Date() })));

    const intervalId = setInterval(() => {
      setLiveFeed(currentFeed => {
        const currentIds = currentFeed.map(i => i.id);
        const availablePool = NEWS_POOL.filter(i => !currentIds.includes(i.id));

        if (availablePool.length === 0) return currentFeed;

        const nextItem = availablePool[Math.floor(Math.random() * availablePool.length)];
        const newItemWithTime = { ...nextItem, timestamp: new Date() };

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

  // Window scroll logic 
  useEffect(() => {
    if (!isRestored) return;

    let timeoutId = null;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!selectedMap && !selectedArticle && !selectedWeapon) {
        if (currentScrollY > lastScrollY.current + 10) {
          setIsScrollingDown(true);
        } else if (currentScrollY < lastScrollY.current - 15) {
          setIsScrollingDown(false);
        }
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
    const handleClick = () => localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isRestored, selectedMap, selectedArticle, selectedWeapon]);

  // DER PIXELGENAUE SCROLL-RESTORER (Läuft wenn man "Zurück zur Auswahl" klickt)
  useEffect(() => {
    if (!selectedMap && !selectedArticle && !selectedWeapon) {
      let attempts = 0;
      const restoreInterval = setInterval(() => {
        if (ronListRef.current) {
          window.scrollTo({ top: scrollPosRef.current.window, behavior: 'instant' });
          ronListRef.current.scrollTop = scrollPosRef.current.ronContainer;

          if (ronListRef.current.scrollTop === scrollPosRef.current.ronContainer || ronListRef.current.scrollTop > 0) {
            clearInterval(restoreInterval);
          }
        }
        attempts++;
        if (attempts > 30) clearInterval(restoreInterval);
      }, 50);
      return () => clearInterval(restoreInterval);
    }
  }, [selectedMap, selectedArticle, selectedWeapon]);


  // Mobile Container Scroll Logic 
  const handleContainerScroll = (e) => {
    if (!selectedMap && !selectedArticle && !selectedWeapon) {
      const currentScrollY = e.target.scrollTop;

      if (currentScrollY > lastScrollY.current + 5) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;
    }
  };

  // --- ACTIONS & HANDLERS ---
  const handleMapClick = (map) => {
    scrollPosRef.current = {
      window: window.scrollY || document.documentElement.scrollTop,
      ronContainer: ronListRef.current ? ronListRef.current.scrollTop : 0
    };
    setSelectedMap(map);
    setSearchQuery('');
    setIsRonSearchOpen(false);
    setIsScrollingDown(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleWeaponClick = (weapon) => {
    scrollPosRef.current = {
      window: window.scrollY || document.documentElement.scrollTop,
      ronContainer: ronListRef.current ? ronListRef.current.scrollTop : 0
    };
    setSelectedWeapon(weapon);
    setSearchQuery('');
    setIsRonSearchOpen(false);
    setIsScrollingDown(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackClick = () => {
    setSelectedMap(null);
    setSelectedWeapon(null);
    setIsScrollingDown(false);
  };

  const handleArticleClick = (article) => {
    scrollPosRef.current = {
      window: window.scrollY,
      ronContainer: ronListRef.current?.scrollTop || 0
    };
    setSelectedArticle(article);
    setSearchQuery('');
    setIsRonSearchOpen(false);
    setIsScrollingDown(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
    setIsScrollingDown(false);
  };

  const handleOpenMissionFromArticle = (mapId) => {
    const allMaps = [...RON_MAPS, ...PUBG_MAPS];
    const map = allMaps.find(m => m.id === mapId);
    if (map) {
      scrollPosRef.current = { window: 0, ronContainer: 0 };
      setSelectedArticle(null);
      setSearchQuery('');
      setIsRonSearchOpen(false);
      setIsScrollingDown(false);
      setActiveTab(map.game);
      setSelectedMap(map);
      if (map.game === 'ron') {
        setActiveDlc(map.dlc);
        setRonSubTab('maps');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleTabSwitch = (tab) => {
    setSearchQuery('');
    setIsRonSearchOpen(false);
    setIsScrollingDown(false);
    setActiveTab(tab);
  };

  const handleRonSubTabSwitch = (tab) => {
    setSearchQuery('');
    setIsRonSearchOpen(false);
    setRonSubTab(tab);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'FLASH': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'UPDATE': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  // --- SUCHERGEBNISSE RENDERER ---
  const renderSearchResults = () => {
    const query = searchQuery.toLowerCase();
    let resultsMaps = [];
    let resultsWeapons = [];
    let resultsNews = [];

    if (activeTab === 'home' || activeTab === 'ron') {
      resultsMaps = [...resultsMaps, ...RON_MAPS.filter(m => m.name.toLowerCase().includes(query) || (m.codename && m.codename.toLowerCase().includes(query)) || m.situation.toLowerCase().includes(query))];
      resultsWeapons = [...resultsWeapons, ...RON_WEAPONS.filter(w => w.name.toLowerCase().includes(query) || w.type.toLowerCase().includes(query) || w.desc.toLowerCase().includes(query))];
    }
    if (activeTab === 'home' || activeTab === 'pubg') {
      resultsMaps = [...resultsMaps, ...PUBG_MAPS.filter(m => m.name.toLowerCase().includes(query) || m.info.toLowerCase().includes(query))];
    }
    if (activeTab === 'home') {
      resultsNews = NEWS_POOL.filter(n => n.headline.toLowerCase().includes(query) || n.fact.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full max-w-7xl mx-auto pb-10 pt-4">
        {resultsNews.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Intel / News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultsNews.map(news => (
                <GlassCard key={news.id} onClick={() => handleArticleClick(news)} className="p-4 cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${getTypeColor(news.type)}`}>{news.type}</span>
                  </div>
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
                <GlassCard key={w.id} onClick={() => handleWeaponClick(w)} className="p-4 cursor-pointer hover:bg-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{w.name}</h4>
                    <span className="text-[8px] uppercase bg-red-600/30 text-red-400 px-2 py-1 rounded">{w.type}</span>
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2">{w.desc}</p>
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

  // --- RENDER FUNCTIONS ---

  const renderHome = () => {
    if (selectedArticle) {
      return (
        <motion.div {...pageTransition}
          className="pt-20 md:pt-24 pb-32 md:pb-20 space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={handleBackFromArticle}
            className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 
            px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all 
            text-xs md:text-sm w-fit"
          >
            <ChevronLeft size={18} /> Zurück zum Feed
          </motion.button>

          <GlassCard
            className="p-8 md:p-14 border-t-4 border-t-red-600 bg-gradient-to-b from-red-900/10 to-transparent">
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

        <GlobalSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Gesamte Datenbank durchsuchen..." />

        {searchQuery ? renderSearchResults() : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <GlassCard onClick={() => handleTabSwitch('ron')}
                  className="p-6 md:p-10 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
                  <Shield size={32} className="text-red-500 mb-4 md:mb-6" />
                  <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Ready or Not</h2>
                  <p className="text-white/40 text-xs md:text-sm mt-1 md:mt-2 font-medium">Tactical SWAT Simulation Data</p>
                </GlassCard>
                <GlassCard onClick={() => handleTabSwitch('pubg')} className="p-6 md:p-10 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
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
                          onClick={() => handleArticleClick(item)}
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
                      onClick={() => handleTabSwitch(selectedMap.game)}
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
        )}
      </motion.div>
    );
  };

  const renderReadyOrNot = () => {
    // --- WEAPON DETAIL VIEW ---
    if (selectedWeapon && activeTab === 'ron') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20 max-w-6xl mx-auto">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={handleBackClick}
          className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"
        >
          <ChevronLeft size={18} /> Zurück zur Armory
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-gradient-to-tr from-zinc-900 to-black border-red-500/20">
              <div className="absolute top-8 right-8 opacity-[0.03]">
                <Target size={200} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4 relative z-10">{selectedWeapon.name}</h1>
              <span className="bg-red-600/30 text-red-400 text-[10px] md:text-xs font-black px-3 py-1.5 rounded uppercase tracking-widest border border-red-500/10 relative z-10">
                {selectedWeapon.type}
              </span>

              <div className="mt-10 pt-8 border-t border-white/10 text-gray-300 font-medium leading-relaxed text-sm md:text-base relative z-10">
                {selectedWeapon.desc}
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-10 border-blue-500/20 bg-blue-900/5">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-blue-500" size={24} />
                <h3 className="text-blue-500 font-black uppercase tracking-widest text-[14px]">Einsatztaktik</h3>
              </div>
              <p className="text-gray-200 leading-relaxed font-medium md:text-lg">{selectedWeapon.tactical}</p>
            </GlassCard>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-6">Waffen-Spezifikationen</h3>

              <div className="space-y-5">
                <div className="border-b border-white/5 pb-5">
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Kategorie</p>
                  <p className="text-lg font-black text-white uppercase italic tracking-tight">{selectedWeapon.category === 'primary' ? 'Primärwaffe' : 'Sekundärwaffe'}</p>
                </div>
                <div className="border-b border-white/5 pb-5">
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Kaliber</p>
                  <p className="text-lg font-black text-white">{selectedWeapon.caliber}</p>
                </div>
                <div className="pb-2">
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Magazinkapazität</p>
                  <p className="text-lg font-black text-white">{selectedWeapon.capacity}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    );

    // --- MAP DETAIL VIEW ---
    if (selectedMap && selectedMap.game === 'ron') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={handleBackClick}
          className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 px-4 md:px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 transition-all text-xs md:text-sm"
        >
          <ChevronLeft size={18} /> Zurück zur Auswahl
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">

          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Header Image */}
            <div className="relative h-[40vh] md:h-[50vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img src={selectedMap.image} className="w-full h-full object-cover" alt={selectedMap.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 pr-6">
                {selectedMap.codename && (
                  <span className="bg-red-600 text-white font-black px-3 md:px-4 py-1 rounded-md text-[8px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 inline-block shadow-lg shadow-red-600/20">
                    Operation: {selectedMap.codename}
                  </span>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none">{selectedMap.name}</h1>
              </div>
            </div>

            {/* Briefing Sections */}
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

            {/* Mission Objectives */}
            {selectedMap.objectives?.length > 0 && (
              <GlassCard className="p-6 md:p-10 bg-black/40 border-white/5">
                <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-6 border-b border-white/10 pb-4">Mission Goals</h3>
                <ul className="space-y-3">
                  {selectedMap.objectives.map((obj, i) => (
                    <li key={i} className="flex items-center gap-3 text-white font-medium">
                      <div className="w-4 h-4 rounded border border-white/30 bg-black/50 shrink-0"></div>
                      {obj}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Audio Logs / Transcripts */}
            <AudioLogViewer logs={selectedMap.audioLogs} />

            {/* Persons of Interest (Suspects & Civilians) */}
            <POIViewer poi={selectedMap.poi} />

            {/* Blueprint Zoom Viewer */}
            <BlueprintViewer blueprints={selectedMap.blueprints} />

          </div>

          <div className="space-y-6 md:space-y-10">
            {/* Screenshots / Intel Footage */}
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

            {/* Media Coverage */}
            {selectedMap.media && selectedMap.media.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter border-l-4 border-blue-500 pl-4 mt-4 md:mt-0">Media Coverage</h3>
                {selectedMap.media.map((img, i) => (
                  <GlassCard key={i} className="aspect-video relative overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Media" />
                    <div className="absolute inset-0 border-[2px] border-white/0 group-hover:border-blue-500/50 transition-colors pointer-events-none rounded-[1.5rem] md:rounded-[2rem]"></div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );

    const currentMaps = RON_MAPS.filter(map => map.dlc === activeDlc);
    const mainWeapons = RON_WEAPONS.filter(w => w.category === 'primary');
    const secondaryWeapons = RON_WEAPONS.filter(w => w.category === 'secondary');

    return (
      <motion.div {...pageTransition} key="ron-main"
        className="md:space-y-12 pt-0 md:pt-28 pb-32 md:pb-20 max-md:fixed max-md:inset-0 max-md:top-0 max-md:bottom-[68px] max-md:z-30 max-md:bg-[#010101] max-md:block max-md:p-0">

        {/* --- DESKTOP TOP MENU (Am Handy ausgeblendet, Normaler Flow ohne Auto-Hide/Blur) --- */}
        <div className="max-md:hidden relative z-20 flex flex-col items-center w-full mb-8">
          <div className="relative z-10 w-fit mx-auto mb-6 md:mb-8">
            <div className="flex p-[3px] md:p-1 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full relative shadow-2xl overflow-hidden">
              {['maps', 'weapons'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleRonSubTabSwitch(tab)}
                  className={`relative px-8 md:px-14 py-2 md:py-3.5 rounded-full font-black uppercase italic tracking-tighter text-[10px] md:text-[13px] z-10 transition-colors duration-500 ${ronSubTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  {ronSubTab === tab && (
                    <motion.div layoutId="ron-active-sub" className="absolute inset-0 bg-[#e31e24] rounded-full -z-10 shadow-[0_0_30px_rgba(227,30,36,0.3)]" transition={springTransition} />
                  )}
                  {tab === 'maps' ? 'Operations' : 'Armory'}
                </button>
              ))}
            </div>
          </div>

          {ronSubTab === 'maps' && (
            <div className="relative z-10 w-full overflow-hidden max-w-7xl mx-auto">
              <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-0 snap-x">

                {/* Desktop Search Icon/Input */}
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
                    <button
                      onClick={() => setIsRonSearchOpen(true)}
                      className="p-1.5 text-white/40 hover:text-white transition-colors flex items-center justify-center mr-2"
                    >
                      <Search size={16} />
                    </button>
                  )}
                </div>

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
                    className={`relative uppercase font-black tracking-[0.1em] text-[12px] transition-all shrink-0 py-2 snap-start whitespace-nowrap ${activeDlc === dlc.id ? 'text-[#e5e5e5]' : 'text-white/40 hover:text-white/70'}`}
                  >
                    {dlc.label}
                    {activeDlc === dlc.id && (
                      <motion.div
                        layoutId="dlc-bar"
                        // Genau wie im Screenshot: einfacher, gedeckter roter strich. Ohne glow.
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc2e2e]"
                        transition={springTransition}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- MAPS / WEAPONS BEREICH ODER SUCH-ERGEBNISSE --- */}
        <div className={`max-md:absolute max-md:inset-0 relative z-10 ${searchQuery ? 'max-md:pt-8 max-md:px-4 max-md:overflow-y-auto' : ''}`}>
          <AnimatePresence mode="wait">
            {searchQuery ? (
              <div className="w-full h-full overflow-y-auto pb-32 no-scrollbar">
                {renderSearchResults()}
              </div>
            ) : (
              <motion.div
                key={activeDlc + ronSubTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={ronListRef}
                onScroll={handleContainerScroll}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 max-md:flex max-md:flex-col max-md:overflow-y-scroll no-scrollbar ${ronSubTab === 'maps'
                  ? 'max-md:gap-0 max-md:h-full max-md:snap-y max-md:snap-mandatory'
                  : 'max-md:gap-4 max-md:p-4 max-md:h-full max-md:pb-32'
                  }`}
              >
                {ronSubTab === 'maps' ? currentMaps.map(map => (
                  <div
                    key={map.id}
                    className="relative md:flex-1 md:hover:flex-[3] transition-all duration-700 ease-in-out overflow-hidden md:rounded-3xl group max-md:h-full max-md:w-full max-md:snap-start max-md:shrink-0"
                  >
                    <GlassCard
                      onClick={() => handleMapClick(map)}
                      className="h-[350px] md:h-[480px] max-md:h-full max-md:w-full max-md:rounded-none max-md:border-none max-md:shadow-none bg-black"
                    >
                      <img
                        src={map.image}
                        style={{ objectPosition: map.imagePosition || 'center' }}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100 md:group-hover:scale-110"
                        alt={map.name}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                      <div className="absolute max-md:bottom-[110px] md:bottom-0 left-0 p-6 md:p-12 w-full">
                        <p className="text-red-600 font-mono text-[10px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 truncate">{map.codename}</p>
                        <h3 className="text-3xl md:text-3xl lg:text-4xl font-black text-white italic uppercase leading-tight tracking-tighter drop-shadow-2xl">{map.name}</h3>
                      </div>
                    </GlassCard>
                  </div>
                )) : (
                  <div className="lg:col-span-2 space-y-12 w-full pb-10">
                    <section>
                      <h3 className="text-lg md:text-xl font-black uppercase text-white/50 tracking-[0.2em] mb-4 md:mb-6 border-b border-white/10 pb-4">Primärwaffen</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {mainWeapons.map(w => (
                          <GlassCard key={w.id} onClick={() => handleWeaponClick(w)} className="p-6 md:p-8 border-red-500/20 bg-white/[0.03] cursor-pointer hover:bg-white/[0.06]">
                            <h4 className="text-xl font-black text-white italic uppercase mb-2 tracking-tighter">{w.name}</h4>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="bg-red-600/30 text-red-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-red-500/10">{w.type}</span>
                            </div>
                            <p className="text-gray-300 text-xs font-medium leading-relaxed line-clamp-3">{w.desc}</p>
                          </GlassCard>
                        ))}
                      </div>
                    </section>
                    <section>
                      <h3 className="text-lg md:text-xl font-black uppercase text-white/50 tracking-[0.2em] mb-4 md:mb-6 border-b border-white/10 pb-4">Sekundärwaffen</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {secondaryWeapons.map(w => (
                          <GlassCard key={w.id} onClick={() => handleWeaponClick(w)} className="p-6 md:p-8 border-blue-500/20 bg-white/[0.03] cursor-pointer hover:bg-white/[0.06]">
                            <h4 className="text-xl font-black text-white italic uppercase mb-2 tracking-tighter">{w.name}</h4>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="bg-blue-600/30 text-blue-400 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest border border-blue-500/10">{w.type}</span>
                            </div>
                            <p className="text-gray-300 text-xs font-medium leading-relaxed line-clamp-3">{w.desc}</p>
                          </GlassCard>
                        ))}
                      </div>
                    </section>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- MOBILE BOTTOM MENU (Nur am Handy sichtbar / Auto-Hides on Scroll / Liegt exakt an der MainNav an) --- */}
        <motion.div
          animate={{ y: isScrollingDown ? 200 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden fixed bottom-[68px] left-0 right-0 flex flex-col gap-2 px-3 pt-8 pb-2 bg-gradient-to-t from-[#010101] via-[#010101] to-transparent z-40 pointer-events-none"
        >
          {/* Innerer Wrapper, der Klicks wieder zulässt */}
          <div className="pointer-events-auto flex flex-col gap-2">

            {/* DLC Auswahl inkl. Mobile Search GANZ LINKS */}
            {ronSubTab === 'maps' && (
              <div className="flex overflow-x-auto no-scrollbar gap-2 py-1 items-center">

                {/* Mobile Search Icon / Field - GANZ LINKS NEBEN READY OR NOT */}
                <div className="shrink-0 flex items-center">
                  {isRonSearchOpen ? (
                    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 100, opacity: 1 }} className="flex items-center bg-[#111111] rounded-full border border-white/20 px-2 py-1.5 mr-1">
                      <Search size={12} className="text-white/40 mr-1.5 shrink-0" />
                      <input
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Suchen..."
                        className="bg-transparent text-white outline-none text-[10px] w-full"
                      />
                      <button onClick={() => { setIsRonSearchOpen(false); setSearchQuery(''); }} className="shrink-0 ml-1">
                        <X size={12} className="text-white/40 hover:text-white" />
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setIsRonSearchOpen(true)}
                      className="p-1.5 bg-[#111111] border border-transparent rounded-full text-white/50 hover:text-white transition-colors flex items-center justify-center mr-1"
                    >
                      <Search size={12} />
                    </button>
                  )}
                </div>

                {!searchQuery && [
                  { id: 'base', label: 'READY OR NOT' },
                  { id: 'home_invasion', label: 'HOME INVASION' },
                  { id: 'dark_waters', label: 'DARK WATERS' },
                  { id: 'ls_stories', label: 'LOS SUENOS STORIES' },
                  { id: 'boiling_point', label: 'BOILING POINT' }
                ].map(dlc => (
                  <button
                    key={dlc.id}
                    onClick={() => setActiveDlc(dlc.id)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[9px] font-black uppercase border transition-all shrink-0 ${activeDlc === dlc.id
                      ? 'border-[#e31e24] text-white bg-transparent' // Design passend zum Screenshot (Active)
                      : 'border-transparent bg-[#111111] text-white/50' // Design passend zum Screenshot (Inactive)
                      }`}
                  >
                    {dlc.label}
                  </button>
                ))}
              </div>
            )}

            {/* Operations & Armory */}
            {!searchQuery && (
              <div className="flex gap-2">
                {['maps', 'weapons'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleRonSubTabSwitch(tab)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${ronSubTab === tab
                      ? 'bg-[#e31e24] text-white border-white shadow-lg'
                      : 'bg-[#111111] text-white/50 border-transparent'
                      }`}
                  >
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
    if (selectedMap && selectedMap.game === 'pubg') return (
      <motion.div {...pageTransition} className="space-y-6 md:space-y-8 pt-20 md:pt-24 pb-32 md:pb-20">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={handleBackClick}
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
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-y-0 left-0 w-1/3 bg-blue-600/20 blur-[120px] -translate-x-1/2"
              />
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2] }}
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

        {/* HAUPT-NAVIGATION - Am Handy immer GANZ unten über allem drüber (z-50) & feste Höhe für Anschluss! */}
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
          Tactical Repository // inTACTICS v3.2.5

          <div className="w-full py-8 md:py-10 text-center text-white/10 text-[8px] copyright">
            <h3>© Copyright</h3>
            <p className="py-8 md:py-10">
              Ready or Not is a trademark of{" "}
              <a href="https://voidinteractive.net/" target="_blank" rel="noopener noreferrer">VOID Interactive</a>. This is a fan-made project.
            </p>

            <div className="py-8 md:py-3 credits">
              <p>Site development and design by <strong>FRNZ</strong></p>
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
          /* Optional: Wenn du echtes App-Feeling willst, verhindert das den Bounce-Effekt beim Scrollen auf iOS */
          body { overscroll-behavior-y: none; }
        }

        .map-container { display: flex; gap: 1.5rem; width: 100%; transition: all 0.5s ease; }
        .map-card-wrapper { flex: 1; transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1); min-width: 100px; }
        .map-card-wrapper:hover { flex: 3; }
      `}} />
    </div>
  );
}