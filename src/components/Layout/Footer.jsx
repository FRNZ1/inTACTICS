import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="relative bg-black pt-24 pb-12 overflow-hidden">
            {/* Dekorativer Hintergrund-Effekt */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                                <Shield size={18} className="text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase">Ready or Not Maps</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            Ein inoffizieller taktischer Guide für Ready or Not.
                            Diese Anwendung dient der Planung und Übersicht der verfügbaren Missionen
                            und Einsatzgebiete.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Ressourcen</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://voidinteractive.net/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 text-sm transition-colors flex items-center gap-2">
                                    Void Interactive <ExternalLink size={14} />
                                </a>
                            </li>
                            <li>
                                <a href="https://store.steampowered.com/app/1144200/Ready_or_Not/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 text-sm transition-colors flex items-center gap-2">
                                    Steam Store <ExternalLink size={14} />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Informationen</h4>
                        <div className="text-gray-500 text-sm space-y-2">
                            <p>Development and Design by <strong>FRNZ</strong></p>
                            <p className="text-xs opacity-50 pt-2">© 2026 Ready or Not Maps</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        Last Updated: March 2026
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Privacy Policy</span>
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};