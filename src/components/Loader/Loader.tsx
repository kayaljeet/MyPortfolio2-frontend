import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataContext } from '../../contexts/DataContext';

const Loader: React.FC = () => {
    const { loadingSteps, allDataLoaded, setReady } = useDataContext();
    const [showButton, setShowButton] = useState(false);
    const [showDoneText, setShowDoneText] = useState(false);
    const allStepsVisible = loadingSteps.every(step => step.visible);

    useEffect(() => {
        if (allDataLoaded && allStepsVisible) {
            // Wait 0.3s before showing DONE text
            setTimeout(() => setShowDoneText(true), 300);
            // Show button after DONE text appears
            setTimeout(() => setShowButton(true), 600);
        }
    }, [allDataLoaded, allStepsVisible]);

    const handleStart = () => {
        setReady(true);
    };

    const filledSegments = loadingSteps.filter(step => step.visible).length;
    const totalSegments = 4; // Match the number of API calls

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4">
            {/* Google Font Link */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

            <div className="flex flex-col items-center gap-8 sm:gap-12 w-full max-w-[600px]">
                {/* LOADING/DONE Text - 8-bit Retro Style */}
                <motion.h1
                    className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-widest text-white text-center"
                    style={{
                        fontFamily: "'Press Start 2P', cursive",
                        textShadow: '4px 4px 0px rgba(255, 255, 255, 0.2)',
                        letterSpacing: '0.2em'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {showDoneText ? 'DONE' : 'LOADING'}
                    {!showDoneText && (
                        <span className="inline-flex ml-2">
                            {[0, 1, 2].map((index) => (
                                <motion.span
                                    key={index}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: index * 0.3,
                                    }}
                                >
                                    .
                                </motion.span>
                            ))}
                        </span>
                    )}
                </motion.h1>

                {/* Progress Bar Container - Retro Style */}
                <div className="relative w-full max-w-[500px]">
                    {/* Outer Border - Neon Green */}
                    <div className="relative border-2 sm:border-4 border-[#00FF00] bg-black p-1 sm:p-2 rounded-sm">
                        {/* Inner Container */}
                        <div className="relative h-8 sm:h-12 bg-black flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2">
                            {/* Progress Segments - One per API call */}
                            {Array.from({ length: totalSegments }).map((_, index) => {
                                const segmentFilled = index < filledSegments;

                                return (
                                    <motion.div
                                        key={index}
                                        className="flex-1 h-6 sm:h-8 border border-[#00FF00]/30"
                                        initial={{ backgroundColor: 'rgba(0, 255, 0, 0)' }}
                                        animate={{
                                            backgroundColor: segmentFilled ? '#00FF00' : 'rgba(0, 255, 0, 0)',
                                        }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            boxShadow: segmentFilled ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none'
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Loading Steps Text - Fixed Height Container */}
                    <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2 min-h-[120px] sm:min-h-[140px]">
                        <AnimatePresence>
                            {loadingSteps.map((step, index) => (
                                step.visible && (
                                    <motion.div
                                        key={step.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[#00FF00] text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2"
                                        style={{ fontFamily: "'Press Start 2P', cursive" }}
                                    >
                                        <span className="text-white">{'>'}</span>
                                        <span className="truncate">{step.name}</span>
                                        <span className="text-white flex-shrink-0">... ✓</span>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Start Button - Fixed Height Container */}
                <div className="min-h-[60px] sm:min-h-[80px] flex items-center justify-center">
                    <AnimatePresence>
                        {showButton && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleStart}
                                className="relative px-8 sm:px-12 py-3 sm:py-4 bg-black border-2 sm:border-4 border-[#00FF00] text-[#00FF00] text-lg sm:text-2xl font-bold tracking-widest hover:bg-[#00FF00] hover:text-black transition-all duration-300"
                                style={{
                                    fontFamily: "'Press Start 2P', cursive",
                                    boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                START
                                <motion.div
                                    className="absolute inset-0 border-2 sm:border-4 border-[#00FF00]"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Loader;
