import React from 'react';
import { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { SummaryCard } from '../components/SummaryCard';
import { TransactionList } from '../components/TransactionList';
import { ExpenseForm } from '../components/ExpenseForm';
import { Stats } from '../components/Stats';
import { TimeFilter } from '../components/TimeFilter';
import { WelcomeSection } from '../components/WelcomeSection';
import { useExpenses } from '../hooks/useExpenses';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
    // Debug logging
    console.log('Dashboard Component Rendering');

    const [activeTab, setActiveTab] = useState('home');
    const [timeFilter, setTimeFilter] = useState('This month');
    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
    const [customDate, setCustomDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dateRange, setDateRange] = useState({
        start: format(new Date(), 'yyyy-MM-dd'),
        end: format(new Date(), 'yyyy-MM-dd')
    });

    const { user } = useAuth();

    const filterConfig = useMemo(() => {
        if (activeTab === 'stats') {
            return { type: 'month', value: selectedMonth };
        }
        if (timeFilter === 'Specific Date') {
            return { type: 'specific_date', value: customDate };
        }
        if (timeFilter === 'Date Range') {
            return { type: 'date_range', value: dateRange };
        }
        return { type: 'preset', value: timeFilter };
    }, [activeTab, timeFilter, selectedMonth, customDate, dateRange]);

    const { expenses, loading, addExpense, deleteExpense, getTotal } = useExpenses(filterConfig);

    const handleAddComplete = (expense) => {
        addExpense(expense);
    };

    const renderDateInputs = () => {
        if (timeFilter === 'Specific Date') {
            return (
                <div style={{ marginBottom: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px' }}>
                    <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Select Date</label>
                    <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="input"
                    />
                </div>
            );
        }
        if (timeFilter === 'Date Range') {
            return (
                <div style={{ marginBottom: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px' }}>
                    <div className="flex-between" style={{ gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>From</label>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                className="input"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>To</label>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                className="input"
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    const HOME_FILTERS = ['Today', 'This week', 'This month', 'This year'];
    const ALL_FILTERS = ['Today', 'This week', 'This month', 'This year', 'Specific Date', 'Date Range'];

    const months = [
        { value: '01', label: 'January' }, { value: '02', label: 'February' },
        { value: '03', label: 'March' }, { value: '04', label: 'April' },
        { value: '05', label: 'May' }, { value: '06', label: 'June' },
        { value: '07', label: 'July' }, { value: '08', label: 'August' },
        { value: '09', label: 'September' }, { value: '10', label: 'October' },
        { value: '11', label: 'November' }, { value: '12', label: 'December' }
    ];
    const years = ['2024', '2025', '2026', '2027'];

    return (
        <Layout>
            <Header />

            <main style={{ flex: 1 }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'home' && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <WelcomeSection />

                            <TimeFilter
                                activeFilter={timeFilter}
                                onChange={setTimeFilter}
                                options={HOME_FILTERS}
                            />

                            <SummaryCard total={getTotal()} />

                            <TransactionList
                                expenses={expenses}
                                onDelete={deleteExpense}
                                isRecentView={true}
                                onViewAll={() => {
                                    setActiveTab('all-transactions');
                                }}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'all-transactions' && (
                        <motion.div
                            key="all-transactions"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <button
                                    onClick={() => {
                                        setActiveTab('home');
                                        if (['Specific Date', 'Date Range'].includes(timeFilter)) {
                                            setTimeFilter('This month');
                                        }
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0 0.5rem 0 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#000'
                                    }}
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ marginBottom: '0.25rem' }}>All Transactions</h2>
                                    <p className="text-sm text-secondary">Find out all transactions.</p>
                                </div>
                            </div>

                            <TimeFilter
                                activeFilter={timeFilter}
                                onChange={setTimeFilter}
                                options={ALL_FILTERS}
                            />
                            {renderDateInputs()}

                            <TransactionList
                                expenses={expenses}
                                onDelete={deleteExpense}
                                isRecentView={false}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'stats' && (
                        <motion.div
                            key="stats"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <select
                                        className="input"
                                        value={selectedMonth.split('-')[0]}
                                        onChange={(e) => {
                                            const newYear = e.target.value;
                                            const currentMonth = selectedMonth.split('-')[1];
                                            setSelectedMonth(`${newYear}-${currentMonth}`);
                                        }}
                                        style={{ appearance: 'none', paddingRight: '2rem' }}
                                    >
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>
                                        ▼
                                    </div>
                                </div>

                                <div style={{ flex: 1, position: 'relative' }}>
                                    <select
                                        className="input"
                                        value={selectedMonth.split('-')[1]}
                                        onChange={(e) => {
                                            const newMonth = e.target.value;
                                            const currentYear = selectedMonth.split('-')[0];
                                            setSelectedMonth(`${currentYear}-${newMonth}`);
                                        }}
                                        style={{ appearance: 'none', paddingRight: '2rem' }}
                                    >
                                        {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>
                                    <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <Stats expenses={expenses} />
                        </motion.div>
                    )}

                    {activeTab === 'wallet' && (
                        <motion.div
                            key="wallet"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex-center"
                            style={{ height: '50vh' }}
                        >
                            <p style={{ color: 'var(--text-secondary)' }}>Wallet Feature Coming Soon</p>
                        </motion.div>
                    )}

                    {activeTab === 'add' && (
                        <motion.div
                            key="add"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ExpenseForm
                                onAdd={handleAddComplete}
                                onCancel={() => setActiveTab('home')}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </Layout>
    );
};
