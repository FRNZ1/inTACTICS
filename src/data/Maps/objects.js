import React, { useState } from 'react';
import { MapPin, Search, ChevronUp, Circle, Crosshair, Flag } from 'lucide-react';

const TacticalBlueprint = () => {
    // State für die Sichtbarkeit der Objectives und Marker
    const [showObjectives, setShowObjectives] = useState(false);

    // Beispieldaten basierend auf deinen Screenshots
    const objectives = [
        {
            id: 1,
            type: 'main',
            title: 'Find Cristal Leighton',
            description: 'Locate the civilian, Cristal Leighton; a minor hiding somewhere at the crime scene',
            floor: 'Ground Floor',
            x: 38, // Prozentuale Position auf der X-Achse der Karte
            y: 35, // Prozentuale Position auf der Y-Achse der Karte
            color: 'bg-orange-500',
            icon: <MapPin size={16} className="text-white" />
        },
        {
            id: 2,
            type: 'main',
            title: 'Find the Store Manager',
            description: 'Locate the civilian, responsible for the initial call to dispatch, who has since been unresponsive',
            floor: 'Ground Floor',
            x: 55,
            y: 45,
            color: 'bg-orange-500',
            icon: <MapPin size={16} className="text-white" />
        }
    ];

    const softObjectives = [
        {
            id: 3,
            type: 'soft',
            title: 'Report Incapacitated Veteran',
            description: 'Locate a downed civilian, a veteran, killed on scene by the suspects',
            floor: 'Ground Floor',
            x: 62,
            y: 28,
            color: 'bg-purple-700',
            icon: <Search size={16} className="text-white" />
        }
    ];

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-slate-200 font-sans p-4">

            {/* Top Bar / Controls */}
            <div className="flex justify-between items-center mb-4 p-4 bg-slate-800 rounded-lg shadow-md border border-slate-700">
                <h1 className="text-xl font-bold tracking-wider text-white">TACTICAL BLUEPRINT</h1>
                <button
                    onClick={() => setShowObjectives(!showObjectives)}
                    className={`px-6 py-2 rounded-md font-semibold transition-all flex items-center gap-2 ${showObjectives
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        }`}
                >
                    <Crosshair size={18} />
                    {showObjectives ? 'Ziele & Infos ausblenden' : 'Ziele auf Karte markieren'}
                </button>
            </div>

            <div className="flex flex-1 gap-4 overflow-hidden">

                {/* Left Side: Map Area (Simulated Blueprint) */}
                <div className="relative flex-1 bg-[#001830] rounded-lg border border-slate-700 overflow-hidden shadow-inner flex justify-center items-center">
                    {/* Placeholder for the actual map image */}
                    <div className="absolute inset-4 border-2 border-white/10 rounded blueprint-grid opacity-20"></div>

                    <div className="text-slate-500 text-sm absolute bottom-4 left-4 z-0">
                        Map View: 4U GAS STATION (Ground Floor)
                    </div>

                    {/* Sticky Markers - Nur sichtbar wenn Button aktiv */}
                    {showObjectives && (
                        <>
                            {/* Main Objectives */}
                            {objectives.map((obj) => (
                                <div
                                    key={`marker-${obj.id}`}
                                    className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                                    style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                                >
                                    <div className={`p-2 rounded-full ${obj.color} shadow-lg ring-2 ring-black/50 transition-transform group-hover:scale-110`}>
                                        {obj.icon}
                                    </div>
                                </div>
                            ))}

                            {/* Soft Objectives */}
                            {softObjectives.map((obj) => (
                                <div
                                    key={`marker-${obj.id}`}
                                    className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                                    style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                                >
                                    <div className={`p-2 rounded-full ${obj.color} shadow-[0_0_15px_rgba(126,34,206,0.6)] ring-2 ring-purple-400 transition-transform group-hover:scale-110`}>
                                        {obj.icon}
                                    </div>
                                </div>
                            ))}

                            {/* Example Static Marker (Spawn/Entry point) */}
                            <div className="absolute left-[60%] bottom-[15%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="p-2 rounded-full bg-green-800 ring-2 ring-black/50 shadow-lg">
                                    <Flag size={16} className="text-white" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Side: Objectives Panel - Nur sichtbar wenn Button aktiv */}
                {showObjectives && (
                    <div className="w-96 bg-[#0a0a0f] rounded-lg border border-slate-800 flex flex-col overflow-hidden shadow-xl animate-in slide-in-from-right-8 duration-300">

                        {/* Header */}
                        <div className="p-4 bg-[#111118] border-b border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-purple-900/50 p-1 rounded">
                                    <Crosshair size={18} className="text-purple-400" />
                                </div>
                                <h2 className="font-bold text-sm tracking-widest text-slate-200">OBJECTIVES (0/5)</h2>
                            </div>
                            <button className="p-1 hover:bg-slate-800 rounded">
                                <ChevronUp size={18} className="text-slate-400" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">

                            {/* Main Objectives */}
                            {objectives.map(obj => (
                                <div key={`panel-${obj.id}`} className="p-3 bg-[#13131a] rounded border border-transparent hover:border-slate-800 transition-colors">
                                    <div className="flex gap-3">
                                        <Circle size={20} className="text-slate-600 shrink-0 mt-1" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-slate-200 text-sm">{obj.title}</h3>
                                                <button className="flex items-center gap-1 text-xs px-2 py-1 bg-[#1a1a24] hover:bg-purple-900/40 text-purple-400 rounded border border-purple-900/30 transition-colors">
                                                    <Crosshair size={12} />
                                                    SHOW
                                                </button>
                                            </div>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-3">
                                                {obj.description}
                                            </p>
                                            <div className="inline-block px-2 py-0.5 rounded bg-purple-900/20 text-purple-400 text-[10px] font-medium tracking-wider">
                                                {obj.floor}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Soft Objectives Section Header */}
                            <div className="pt-4 pb-2 px-2 flex justify-between items-center mt-2 border-t border-slate-800/50">
                                <div className="flex items-center gap-2 text-purple-400">
                                    <Search size={16} />
                                    <h2 className="font-bold text-sm tracking-widest">SOFT OBJECTIVES</h2>
                                </div>
                                <button className="p-1 hover:bg-slate-800 rounded">
                                    <ChevronUp size={18} className="text-slate-400" />
                                </button>
                            </div>

                            {/* Soft Objectives List */}
                            {softObjectives.map(obj => (
                                <div key={`panel-${obj.id}`} className="p-3 bg-[#13131a] rounded border border-transparent hover:border-slate-800 transition-colors">
                                    <div className="flex gap-3">
                                        <Circle size={20} className="text-slate-600 shrink-0 mt-1" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-slate-200 text-sm">{obj.title}</h3>
                                                <button className="flex items-center gap-1 text-xs px-2 py-1 bg-[#1a1a24] hover:bg-purple-900/40 text-purple-400 rounded border border-purple-900/30 transition-colors">
                                                    <Crosshair size={12} />
                                                    SHOW
                                                </button>
                                            </div>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-3">
                                                {obj.description}
                                            </p>
                                            <div className="inline-block px-2 py-0.5 rounded bg-purple-900/20 text-purple-400 text-[10px] font-medium tracking-wider">
                                                {obj.floor}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </div>

            {/* Optional: Add custom CSS for the blueprint grid effect in your global styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .blueprint-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0f;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a35;
          border-radius: 10px;
        }
      `}} />
        </div>
    );
};

export default TacticalBlueprint;