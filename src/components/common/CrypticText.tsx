import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CrypticTextProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const CrypticText: React.FC<CrypticTextProps> = ({
    text,
    className = '',
    duration = 1000,
    delay = 0
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (inView && !isFinished) {
            const startTimeout = setTimeout(() => {
                const startTime = Date.now();

                intervalRef.current = window.setInterval(() => {
                    const elapsedTime = Date.now() - startTime;

                    if (elapsedTime >= duration) {
                        setDisplayText(text);
                        setIsFinished(true);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                    } else {
                        const newText = text.split('').map((char) => {
                            if (char === ' ') return ' ';
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        }).join('');

                        setDisplayText(newText);
                    }
                }, 50);
            }, delay);

            return () => {
                clearTimeout(startTimeout);
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }
    }, [inView, text, duration, delay, isFinished]);

    useEffect(() => {
        if (!inView && !isFinished) {
            setDisplayText(text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
        }
    }, [text, inView, isFinished]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
};

export default CrypticText;
