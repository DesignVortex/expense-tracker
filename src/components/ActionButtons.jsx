import React from 'react';
import { Send, CreditCard, Smartphone, Lightbulb } from 'lucide-react';

export const ActionButtons = () => {
    const actions = [
        { id: 'send', icon: <Send size={24} />, label: 'Send' },
        { id: 'pay', icon: <CreditCard size={24} />, label: 'Pay' },
        { id: 'recharge', icon: <Smartphone size={24} />, label: 'Recharge' },
        { id: 'bill', icon: <Lightbulb size={24} />, label: 'Bill' },
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            padding: '0 0.5rem'
        }}>
            {actions.map((action) => (
                <button key={action.id} className="btn" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    boxShadow: 'none',
                    padding: 0
                }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'var(--card-bg)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text)',
                        fontSize: '1.2rem',
                        boxShadow: 'var(--card-shadow)',
                        border: '1px solid var(--card-border)'
                    }}>
                        {action.icon}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        {action.label}
                    </span>
                </button>
            ))}
        </div>
    );
};
