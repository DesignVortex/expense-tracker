import React from 'react';
import { Wallet, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const WalletCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-modern flex-between"
            style={{ padding: 'var(--spacing-md) var(--spacing-lg)' }}
        >
            <div className="flex-center gap-4">
                <div className="flex-center" style={{
                    background: '#F3F4F6',
                    borderRadius: '12px',
                    width: '40px',
                    height: '40px'
                }}>
                    <Wallet size={20} color="#1F2937" />
                </div>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>Spending Wallet</span>
            </div>

            <div className="flex-center gap-2">
                <span style={{ fontWeight: 600 }}>₹5,631.22</span>
                <ChevronRight size={20} color="var(--color-text-secondary)" />
            </div>
        </motion.div>
    );
};
