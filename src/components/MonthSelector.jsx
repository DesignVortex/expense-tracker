import React from 'react';
import { motion } from 'framer-motion';

export const MonthSelector = ({ selectedMonth, onChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
            style={{ marginBottom: '1rem' }}
        >
            <label className="font-bold" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Viewing for:
            </label>
            <input
                type="month"
                value={selectedMonth}
                onChange={(e) => onChange(e.target.value)}
                className="input"
                style={{ width: 'auto', padding: '0.5rem', background: 'var(--card-bg)' }}
            />
        </motion.div>
    );
};
