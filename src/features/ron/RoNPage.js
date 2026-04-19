import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MapGrid from './maps/MapGrid';
import WeaponList from './loadout/WeaponList';
import { RON_MAPS, RON_WEAPONS } from '../../data/ronData';

const RoNPage = ({ activeSubTab }) => {
    const [selectedMap, setSelectedMap] = useState(null);

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <motion.div {...pageTransition} key={activeSubTab}>
            {activeSubTab === 'maps' && (
                <MapGrid
                    maps={RON_MAPS}
                    selectedMap={selectedMap}
                    setSelectedMap={setSelectedMap}
                />
            )}
            {activeSubTab === 'loadout' && (
                <WeaponList weapons={RON_WEAPONS} />
            )}
            {/* Tactics etc. */}
        </motion.div>
    );
};

export default RoNPage;