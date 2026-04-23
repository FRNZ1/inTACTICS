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
            { name: 'Roof', url: 'https://static.wikia.nocookie.net/ready-or-not/images/2/28/4U_Gas_Station_Map.png/revision/latest?cb=20241012143721' }
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
                    desc: "Sharla was our initial point of contact inside the building before police arrived on-scene. She found a hiding place and called 911 immediately after spotting one of the gunmen.\n\nRescue of this civilian is imperative. Specifically, her eyewitness account of the events that transpired before police arrival will help put the suspects behind bars for good."
                }
            ],
            suspects: [
                {
                    name: 'Andre Williams',
                    image: 'https://static.wikia.nocookie.net/ready-or-not/images/a/a4/Andre_Williams.png/revision/latest/scale-to-width-down/350?cb=20241012142502',
                    sex: 'Male', height: "6'-3\"", weight: '165lb', build: 'Medium', dob: '05/20/2005',
                    desc: "Attends 213 Mission High School in his final year. Following an incident at the school, Andre was placed under house arrest at his grandmothers house while an investigation took place."
                }
            ]
        },
        media: [
            'https://static.wikia.nocookie.net/ready-or-not/images/5/56/Onlooker_Photograph.png/revision/latest/scale-to-width-down/1000?cb=20241012150241',
            'https://static.wikia.nocookie.net/ready-or-not/images/8/82/Media_Coverage.png/revision/latest/scale-to-width-down/1000?cb=20241012150247'
        ],
        screenshots: ['https://images.steamusercontent.com/ugc/2523778827659601613/1C290698DF614012E3FCB7B8DDCB485652BE9376/'],
        recommendedLoadout: {
            primary: 'w_mp5a3',
            primaryAttachments: { Optics: 'opt_micro', Muzzle: 'muz_socom', Underbarrel: 'ub_angled', Overbarrel: 'ob_flash' },
            secondary: 'w_taser',
            armor: 'light',
            headwear: ['gasmask', 'ballistic'],
            mags: 4,
            throwable: 'cs_gas',
            throwableCount: 3
        }
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