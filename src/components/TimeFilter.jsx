import React from 'react';

export const TimeFilter = ({ activeFilter = 'This month', onChange, options }) => {
    const filters = options || ['Today', 'This week', 'This month', 'This year', 'Specific Date', 'Date Range'];

    return (
        <div className="flex-between hide-scrollbar" style={{ marginBottom: '1.5rem', overflowX: 'auto', gap: '0.5rem' }}>
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onChange?.(filter)}
                    style={{
                        backgroundColor: activeFilter === filter ? 'var(--pill-active)' : 'var(--pill-inactive)',
                        color: activeFilter === filter ? '#fff' : 'var(--text-main)',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.5rem 1rem',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};
