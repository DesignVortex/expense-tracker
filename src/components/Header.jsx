import React from 'react';


export const Header = () => {
    // Use today's date formatted as DD/MM/YYYY
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }); // e.g. 23/01/2026

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {/* Top Row: App Name + Date Pill */}
            <div className="flex-between">
                <h1 className="text-xl font-bold" style={{ color: '#000' }}>Expense Flow</h1>
                <div style={{
                    backgroundColor: 'var(--accent-green-pill)',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 600
                }}>
                    {dateStr}
                </div>
            </div>
        </div>
    );
};
