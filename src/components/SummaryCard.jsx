import React from 'react';

export const SummaryCard = ({ total }) => {
    return (
        <div className="card-yellow">
            <p className="text-sm text-secondary" style={{ marginBottom: '0.5rem' }}>Total Expense</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                ₹ {total.toLocaleString()}
            </h2>
        </div>
    );
};
