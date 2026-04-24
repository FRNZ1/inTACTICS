export const RON_WEAPONS = [
    // --- ASSAULT RIFLES ---
    {
        id: 'w_m4a1', category: 'primary', name: 'M4A1', type: 'Assault Rifle', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/7/7f/M4A1.png/320px-M4A1.png',
        desc: 'Das M4A1 ist ein vollautomatisches Sturmgewehr, das sich durch hohe Modularität auszeichnet.',
        tactical: 'Extrem vielseitig. Ideal für Einsätze mit gemischten Distanzen.'
    },
    {
        id: 'w_mk18', category: 'primary', name: 'MK18', type: 'Assault Rifle', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/4/4b/MK18.png/320px-MK18.png',
        desc: 'Eine kompaktere Version des M4A1, entwickelt für den Nahkampf (CQB).',
        tactical: 'Viel führiger in extrem engen Umgebungen als das Standard M4A1.'
    },
    {
        id: 'w_arn180', category: 'primary', name: 'ARN-180', type: 'Assault Rifle', caliber: '.300 Blackout', capacity: '30 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/7/7b/ARN-180.png/320px-ARN-180.png?dc189c',
        desc: 'Ein modernes, kompaktes Sturmgewehr für spezielle Ballistik optimiert.',
        tactical: 'Die .300 Blackout Munition macht diese Waffe perfekt für Schalldämpfer-Einsätze.'
    },

    { id: 'arwc', cat: 'primary', name: 'ARWC', type: 'Assault Rifle' },
    { id: 'f90', cat: 'primary', name: 'F90', type: 'Assault Rifle' },
    { id: 'ga416', cat: 'primary', name: 'GA416', type: 'Assault Rifle' },
    { id: 'lvar', cat: 'primary', name: 'LVAR', type: 'Assault Rifle' },
    { id: 'mcx', cat: 'primary', name: 'MCX', type: 'Assault Rifle' },
    { id: 'mk16', cat: 'primary', name: 'MK16', type: 'Assault Rifle' },
    { id: 'slr47', cat: 'primary', name: 'SLR47', type: 'Assault Rifle' },
    { id: 'sr16', cat: 'primary', name: 'SR-16', type: 'Assault Rifle' },

    {
        id: 'w_sa58', category: 'primary', name: 'SA-58 OSW', type: 'Assault Rifle', caliber: '7.62x51mm NATO', capacity: '20 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/b/ba/SA-58.png/320px-SA-58.png',
        desc: 'Eine moderne, gekürzte Version des klassischen FAL. Sehr schwer und enorm kraftvoll.',
        tactical: 'Zerstört Holztüren und durchschlägt schwere Deckungen mit Leichtigkeit.'
    },
    {
        id: 'w_g36c', category: 'primary', name: 'G36C', type: 'Assault Rifle', caliber: '5.56x45mm NATO', capacity: '30 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/9/91/G36C.png/320px-G36C.png',
        desc: 'Kompaktes deutsches Sturmgewehr aus Polymer, sehr leicht und zuverlässig.',
        tactical: 'Gut kontrollierbarer Rückstoß, besonders bei Feuerstößen.'
    },

    // --- Battle Rifle  ---
    { id: 'g3a3', cat: 'primary', name: 'G3A3', type: 'Battle Rifle' },
    { id: 'ga51', cat: 'primary', name: 'GA51', type: 'Battle Rifle' },
    { id: 'm14s16', cat: 'primary', name: 'M14S-16', type: 'Battle Rifle' },
    { id: 'mk17', cat: 'primary', name: 'MK17', type: 'Battle Rifle' },
    { id: 'rtwc65', cat: 'primary', name: 'RTWC-6.5', type: 'Battle Rifle' },
    { id: 'sa58osw', cat: 'primary', name: 'SA-58 OSW', type: 'Battle Rifle' },

    // --- PDW ---
    { id: 'dm4pdw', cat: 'primary', name: 'DM4PDW', type: 'PDW' },
    { id: 'mp7', cat: 'primary', name: 'MP7', type: 'PDW' },
    { id: 'p90', cat: 'primary', name: 'P90', type: 'PDW' },
    { id: 'raiderx', cat: 'primary', name: 'RAIDER X P320', type: 'PDW' },

    // --- SUBMACHINE GUNS ---
    { id: 'mp510mm', cat: 'primary', name: 'MP5/10MM', type: 'Submachine Gun' },
    { id: 'mp5a2', cat: 'primary', name: 'MP5A2', type: 'Submachine Gun' },

    {
        id: 'w_mp5a3', category: 'primary', name: 'MP5A3', type: 'Submachine Gun', caliber: '9x19mm Parabellum', capacity: '30 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/2/23/MP5A3.png/320px-MP5A3.png',
        desc: 'Die klassische SWAT-Maschinenpistole, berühmt für ihr Rollenverschluss-System.',
        tactical: 'Die erste Wahl für Geiselsituationen ohne gepanzerte Feinde.'
    },

    { id: 'mp5sd6', cat: 'primary', name: 'MP5SD6', type: 'Submachine Gun' },
    { id: 'mp9', cat: 'primary', name: 'MP9', type: 'Submachine Gun' },
    { id: 'spc9', cat: 'primary', name: 'SPC9', type: 'Submachine Gun' },
    { id: 'ump9', cat: 'primary', name: 'UMP-9', type: 'Submachine Gun' },

    {
        id: 'w_mpx', category: 'primary', name: 'MPX', type: 'Submachine Gun', caliber: '9x19mm Parabellum', capacity: '30 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/e/ef/MPX.png/320px-MPX.png',
        desc: 'Moderne Maschinenpistole mit AR-15 ähnlichen Bedienelementen.',
        tactical: 'Sehr schnelle Feuerrate und extrem wenig Rückstoß.'
    },
    {
        id: 'w_ump45', category: 'primary', name: 'UMP-45', type: 'Submachine Gun', caliber: '.45 ACP', capacity: '25 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/d/d7/UMP-45.png/320px-UMP-45.png',
        desc: 'Eine leichte Maschinenpistole mit großem Kaliber.',
        tactical: 'Hohe Stoppwirkung gegen ungeschützte Ziele.'
    },

    // --- SHOTGUNS ---
    {
        id: 'w_870cqb', category: 'primary', name: '870 CQB', type: 'Shotgun', caliber: '12 Gauge', capacity: '7 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/6/64/870_CQB.png/320px-870_CQB.png',
        desc: 'Eine klassische, taktische Pump-Action Schrotflinte.',
        tactical: 'Verheerend auf nächste Distanz. Nachladen dauert lange.'
    },

    { id: 'b1301', cat: 'primary', name: 'B1301', type: 'Shotgun' },
    { id: 'm1014', cat: 'primary', name: 'M1014', type: 'Shotgun' },
    { id: 'supernova', cat: 'primary', name: 'SUPERNOVA', type: 'Shotgun' },

    // --- Launcher ---
    { id: 'm32a1flash', cat: 'primary', name: 'M32A1 FLASH', type: 'Launcher' },
    { id: 'm32a1gas', cat: 'primary', name: 'M32A1 GAS', type: 'Launcher' },

    // --- LESS-THAN-LETHAL ---
    {
        id: 'w_beanbag', category: 'primary', name: 'Beanbag Shotgun', type: 'Less-Lethal', caliber: '12 Gauge', capacity: '7 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/2/22/Beanbag_Shotgun.png/320px-Beanbag_Shotgun.png',
        desc: 'Verschießt nicht-tödliche Beanbag-Geschosse.',
        tactical: 'Achtung: Kopfschüsse sind tödlich! Auf Beine zielen.'
    },
    { id: 'vpl25', cat: 'primary', name: 'VPL-25', type: 'Less-Lethal' },
    { id: 'tpl', cat: 'primary', name: 'TPL', type: 'Less-Lethal' },

    // --- PISTOLS ---
    {
        id: 'w_g19', category: 'secondary', name: 'G19', type: 'Pistol', caliber: '9x19mm Parabellum', capacity: '15 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/7/77/G19.png/320px-G19.png',
        desc: 'Eine kompakte, leichte und extrem zuverlässige Dienstpistole.',
        tactical: 'Die beste Allround-Seitenwaffe im Spiel.'
    },
    {
        id: 'w_m45a1', category: 'secondary', name: 'M45A1', type: 'Pistol', caliber: '.45 ACP', capacity: '7 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/6/6c/M45A1.png/320px-M45A1.png',
        desc: 'Eine moderne, taktische Variante der legendären 1911er Plattform.',
        tactical: 'Hoher Schaden pro Schuss. Geringe Kapazität.'
    },
    {
        id: 'w_57usg', category: 'secondary', name: 'Five-seveN', type: 'Pistol', caliber: '5.7x28mm', capacity: '20 Schuss',
        image: 'https://readyornot.wiki.gg/images/thumb/2/23/Five_seveN.png/320px-Five_seveN.png',
        desc: 'Verschießt ein kleines, pfeilschnelles Kaliber.',
        tactical: 'Waffe der Wahl gegen schwer gepanzerte Ziele.'
    },

    { id: '509', cat: 'secondary', name: '509', type: 'Pistol' },
    { id: 'b92x', cat: 'secondary', name: 'B92X', type: 'Pistol' },
    { id: 'g18c', cat: 'secondary', name: 'G18-C', type: 'Pistol' },
    { id: 'm11compact', cat: 'secondary', name: 'M11 COMPACT', type: 'Pistol' },
    { id: 'mkv', cat: 'secondary', name: 'MK-V', type: 'Pistol' },
    { id: 's2011p', cat: 'secondary', name: 'S2011-P', type: 'Pistol' },
    { id: 'tle1911', cat: 'secondary', name: 'TLE 1911', type: 'Pistol' },
    { id: 'usp45', cat: 'secondary', name: 'USP45', type: 'Pistol' },
    { id: '357magnum', cat: 'secondary', name: '.357 MAGNUM', type: 'Pistol' },
    { id: 'trpl', cat: 'secondary', name: 'TRPL', type: 'Pistol-Less-Lethal' }

];