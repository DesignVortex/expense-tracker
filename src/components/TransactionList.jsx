import React, { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { categoryData } from '../lib/categories';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

const getCategoryDetails = (categoryName) => {
    for (const cat of categoryData.categories) {
        if (cat.name === categoryName) return cat;
        // Check subcategories
        const sub = cat.subcategories?.find(s => s.name === categoryName);
        if (sub) return sub;
    }
    // Fallback
    return { icon: 'HelpCircle', color: '#9CA3AF' };
};

const TransactionItem = ({ expense }) => {
    const { icon, color } = getCategoryDetails(expense.category);
    const IconComponent = LucideIcons[icon] || LucideIcons.HelpCircle;

    return (
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    minWidth: '42px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: `${color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    color: color
                }}>
                    <IconComponent size={20} />
                </div>
                <div>
                    <p className="font-bold" style={{ fontSize: '1rem' }}>{expense.description}</p>
                    <p className="text-xs text-secondary">{expense.category}</p>
                </div>
            </div>
            <p className="font-bold">₹ {expense.amount}</p>
        </div>
    );
};

export const TransactionList = ({ expenses, isRecentView = false, onViewAll }) => {
    // Group expenses by date
    const groupedExpenses = useMemo(() => {
        const groups = {};
        expenses.forEach(expense => {
            const dateKey = expense.date.split('T')[0];
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(expense);
        });
        return groups;
    }, [expenses]);

    // Derived sorted dates
    let sortedDates = Object.keys(groupedExpenses).sort((a, b) => new Date(b) - new Date(a));

    // If Recent View (Home), filter to ONLY show Today's data
    if (isRecentView) {
        const todayKey = format(new Date(), 'yyyy-MM-dd');
        sortedDates = sortedDates.filter(date => date === todayKey);
    }

    if (expenses.length === 0 && !isRecentView) {
        return (
            <div className="text-center" style={{ padding: '2rem', color: '#9CA3AF' }}>
                <p>No expenses for this period</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header only works for Recent View context usually, or we adapt it */}
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <h3 className="text-lg font-bold">{isRecentView ? 'Recent Expense' : 'All Expenses'}</h3>
                {isRecentView && (
                    <button
                        onClick={onViewAll}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#3B82F6',
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                        }}
                    >
                        View all
                    </button>
                )}
            </div>

            {isRecentView && sortedDates.length === 0 ? (
                <p className="text-sm text-secondary" style={{ fontStyle: 'italic', padding: '1rem' }}>No expenses today</p>
            ) : (
                sortedDates.map(date => {
                    const dayExpenses = groupedExpenses[date];
                    const dayTotal = dayExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

                    let dateLabel = format(parseISO(date), 'dd MMM, yyyy');
                    if (isToday(parseISO(date))) dateLabel = `Today - ${dateLabel}`;
                    else if (isYesterday(parseISO(date))) dateLabel = `Yesterday - ${dateLabel}`;

                    return (
                        <div key={date} style={{
                            marginBottom: '1.5rem',
                            backgroundColor: '#fff',
                            borderRadius: '24px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
                        }}>
                            {/* Header Row inside Card */}
                            <div className="flex-between" style={{
                                marginBottom: '1rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid #F3F4F6'
                            }}>
                                <p className="font-bold" style={{ fontSize: '1rem' }}>{dateLabel}</p>
                                <p className="font-bold" style={{ fontSize: '1rem' }}>₹ {dayTotal}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {dayExpenses.map((expense) => (
                                    <TransactionItem key={expense.id} expense={expense} />
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
