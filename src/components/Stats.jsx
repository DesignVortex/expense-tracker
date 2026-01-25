import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { categoryData } from '../lib/categories';

const getCategoryColor = (categoryName) => {
    for (const cat of categoryData.categories) {
        if (cat.name === categoryName) return cat.color;
        const sub = cat.subcategories?.find(s => s.name === categoryName);
        if (sub) return sub.color;
    }
    return '#9CA3AF'; // Default gray
};

export const Stats = ({ expenses }) => {
    // Calculate total from visible expenses (assuming expenses passed are already filtered if needed, or total raw)
    const totalExpense = expenses?.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0) || 0;

    // Aggregate expenses by category
    const data = (expenses || []).reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += parseFloat(curr.amount);
        } else {
            acc.push({
                name: curr.category,
                value: parseFloat(curr.amount),
                color: getCategoryColor(curr.category)
            });
        }
        return acc;
    }, []);

    // Sort by value desc
    data.sort((a, b) => b.value - a.value);

    return (
        <div className="stats-container" style={{ padding: '0 0.5rem 100px 0.5rem' }}>
            {/* Header Text */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 className="text-xl font-bold" style={{ marginBottom: '0.5rem' }}>Expense analysis</h2>
                <p className="text-sm text-secondary">Analysis helps you to save more for future.</p>
            </div>

            {/* Donut Chart with Centered Text */}
            <div style={{
                width: '100%',
                height: 280,
                marginBottom: '2rem',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ position: 'absolute', textAlign: 'center', zIndex: 0 }}>
                    <p className="text-sm text-secondary" style={{ marginBottom: '0.25rem' }}>Total Expense</p>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>₹ {totalExpense.toLocaleString()}</h1>
                </div>

                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={115}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Category List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.map((item) => (
                    <div key={item.name} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 1.25rem',
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: item.color,
                            }} />
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1F2937' }}>{item.name}</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>₹ {item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
