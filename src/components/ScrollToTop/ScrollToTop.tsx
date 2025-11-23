import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{
                            scale: 1.1,
                            y: -5,
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 rounded-full bg-black border-2 border-[#00FF00] transition-all duration-300 hover:bg-neutral-900"
                        style={{
                            boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
                        }}
                        aria-label="Scroll to top"
                    >
                        {/* 8-bit Pixelated Up Arrow */}
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 0, 0.5))' }}
                        >
                            {/* Arrow head pointing up */}
                            <rect x="11" y="4" width="2" height="2" fill="#00FF00" />

                            <rect x="9" y="6" width="2" height="2" fill="#00FF00" />
                            <rect x="11" y="6" width="2" height="2" fill="#00FF00" />
                            <rect x="13" y="6" width="2" height="2" fill="#00FF00" />

                            <rect x="7" y="8" width="2" height="2" fill="#00FF00" />
                            <rect x="9" y="8" width="2" height="2" fill="#00FF00" />
                            <rect x="11" y="8" width="2" height="2" fill="#00FF00" />
                            <rect x="13" y="8" width="2" height="2" fill="#00FF00" />
                            <rect x="15" y="8" width="2" height="2" fill="#00FF00" />

                            {/* Pixelated arrow shaft */}
                            <rect x="11" y="10" width="2" height="2" fill="#00FF00" />
                            <rect x="11" y="12" width="2" height="2" fill="#00FF00" />
                            <rect x="11" y="14" width="2" height="2" fill="#00FF00" />
                            <rect x="11" y="16" width="2" height="2" fill="#00FF00" />
                            <rect x="11" y="18" width="2" height="2" fill="#00FF00" />
                        </svg>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
