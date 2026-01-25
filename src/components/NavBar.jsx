import React from 'react';
import { House, Plus, PieChart, Sparkles } from 'lucide-react';

export const NavBar = ({ activeTab, onTabChange }) => {
    const navItems = [
        { id: 'home', icon: <House size={24} /> },
        { id: 'add', icon: <Plus size={28} /> },
        { id: 'stats', icon: <PieChart size={24} /> },
        { id: 'wallet', icon: <Sparkles size={24} /> },
    ];

    return (
        <nav className="floating-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === item.id ? 'var(--text-main)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: activeTab === item.id ? 1 : 0.6,
                        transition: 'all 0.2s ease'
                    }}
                >
                    {item.icon}
                </button>
            ))}
        </nav>
    );
};
