import React from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SuccessPopup = ({ isOpen, amount, category, onAddMore, onHome }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '320px',
                    textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
            >
                {/* Icon */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#ECFDF5', // Light green
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #10B981', // Emerald 500
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Check size={20} color="#10B981" strokeWidth={3} />
                    </div>
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    color: '#000'
                }}>
                    Bas Itna Hi? 😔
                </h3>

                {/* Subtitle */}
                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    fontSize: '1rem'
                }}>
                    ₹{Number(amount).toLocaleString()} gone for {category}.
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onAddMore}
                        style={{
                            flex: 1,
                            backgroundColor: '#1F2937', // Gray 800/Blackish
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Add aur
                    </button>

                    <button
                        onClick={onHome}
                        style={{
                            flex: 1,
                            backgroundColor: '#F3E8FF', // Light Purple
                            color: '#000',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Go to home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
