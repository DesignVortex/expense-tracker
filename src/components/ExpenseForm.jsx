import React, { useState } from 'react';
import { categoryData } from '../lib/categories';
import { Calendar, IndianRupee, ChevronDown } from 'lucide-react';
import { SuccessPopup } from './SuccessPopup';

export const ExpenseForm = ({ onAdd, onCancel }) => {
    // Flatten subcategories to find the default
    const firstCategory = categoryData.categories[0].subcategories[0].name;

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); // Empty initially to show placeholder

    // Popup State
    const [showSuccess, setShowSuccess] = useState(false);
    const [lastAdded, setLastAdded] = useState({ amount: '', category: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        const expenseData = {
            amount,
            description,
            category: category || firstCategory, // Fallback if user didn't select
            date
        };

        onAdd(expenseData);
        setLastAdded({ amount, category: category || firstCategory });
        setShowSuccess(true);

        // Reset Form
        setAmount('');
        setDescription('');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div style={{ padding: '0 0.5rem' }}>
            {/* Title Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 className="text-xl font-bold" style={{ marginBottom: '0.5rem' }}>Add a new expense</h2>
                <p className="text-sm text-secondary">It's a good habit to keep track of your expenditure.</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Date Input */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Date</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.9rem',
                                paddingRight: '2.5rem',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                fontSize: '1rem',
                                color: '#374151',
                                fontFamily: 'var(--font-family)',
                                outline: 'none',
                                appearance: 'none'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                        }}>
                            <Calendar size={20} color="#111827" />
                        </div>
                    </div>
                </div>

                {/* Amount Input */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Amount</label>
                    <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                        <div style={{
                            padding: '0 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRight: '1px solid #E5E7EB',
                            background: '#FFFFFF'
                        }}>
                            <IndianRupee size={18} color="#6B7280" />
                        </div>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="3500"
                            required
                            style={{
                                flex: 1,
                                padding: '0.9rem',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                color: '#111827',
                                fontFamily: 'var(--font-family)'
                            }}
                        />
                    </div>
                </div>

                {/* Description Input */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter expense details"
                        style={{
                            width: '100%',
                            padding: '0.9rem',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            fontSize: '1rem',
                            color: '#111827',
                            fontFamily: 'var(--font-family)',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Category Input */}
                <div style={{ marginBottom: '2rem' }}>
                    <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Select category</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.9rem',
                                paddingRight: '2.5rem',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                fontSize: '1rem',
                                color: category ? '#111827' : '#9CA3AF',
                                fontFamily: 'var(--font-family)',
                                outline: 'none',
                                appearance: 'none',
                                backgroundColor: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="" disabled>Select category</option>
                            {categoryData.categories.map((group) => (
                                <optgroup key={group.id} label={group.name}>
                                    {group.subcategories.map((sub) => (
                                        <option key={sub.id} value={sub.name} style={{ color: '#111827' }}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <div style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                        }}>
                            <ChevronDown size={20} color="#111827" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        background: '#1F2937', // Dark black/grey
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    Add Expense
                </button>
            </form>

            <SuccessPopup
                isOpen={showSuccess}
                amount={lastAdded.amount}
                category={lastAdded.category}
                onAddMore={() => setShowSuccess(false)}
                onHome={onCancel}
            />
        </div>
    );
};
