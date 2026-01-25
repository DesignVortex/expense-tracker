import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: isDark ? '#FFD700' : '#FDB813',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {isDark ? <Moon /> : <Sun />}
        </motion.button>
    );
};
