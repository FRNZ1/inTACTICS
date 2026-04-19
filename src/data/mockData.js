// ============================================================================
// 📁 DATEI: src/data/mockData.js
// ============================================================================

export const RON_MAPS = [
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

export const WEAPON_CATEGORIES = [
    { id: 'Assault Rifles', label: 'Assault Rifles' },
    { id: 'Submachine Guns', label: 'Submachine Guns' },
    { id: 'Shotguns', label: 'Shotguns' },
    { id: 'Pistols', label: 'Pistols' },
    { id: 'Less-Than-Lethal', label: 'Less-Than-Lethal' }
];

export const RON_WEAPONS = [
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

export const PUBG_MAPS = [
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

export const NEWS_POOL = [
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