import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
    startOfMonth, endOfMonth,
    startOfWeek, endOfWeek,
    startOfYear, endOfYear,
    startOfDay, endOfDay,
    format
} from 'date-fns';

export const useExpenses = (filter) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchExpenses();
        }
    }, [filter, user]);

    const getRangeFromFilter = () => {
        const now = new Date();
        let start, end;

        if (filter.type === 'month') {
            const date = new Date(filter.value);
            start = startOfMonth(date);
            end = endOfMonth(date);
        } else if (filter.type === 'specific_date') {
            const date = new Date(filter.value);
            start = startOfDay(date);
            end = endOfDay(date);
        } else if (filter.type === 'date_range') {
            start = startOfDay(new Date(filter.value.start));
            end = endOfDay(new Date(filter.value.end));
        } else if (filter.type === 'preset') {
            switch (filter.value) {
                case 'Today':
                    start = startOfDay(now);
                    end = endOfDay(now);
                    break;
                case 'This week':
                    start = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
                    end = endOfWeek(now, { weekStartsOn: 1 });
                    break;
                case 'This month':
                    start = startOfMonth(now);
                    end = endOfMonth(now);
                    break;
                case 'This year':
                    start = startOfYear(now);
                    end = endOfYear(now);
                    break;
                default: // Default to this month
                    start = startOfMonth(now);
                    end = endOfMonth(now);
            }
        } else {
            // Default fallback
            start = startOfMonth(now);
            end = endOfMonth(now);
        }

        return { start, end };
    };

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const { start, end } = getRangeFromFilter();

            const { data, error } = await supabase
                .from('expenses')
                .select('*')
                .eq('user_id', user.id)
                .gte('date', start.toISOString())
                .lte('date', end.toISOString())
                .order('date', { ascending: false }); // Order by transaction date

            if (error) throw error;
            setExpenses(data || []);
        } catch (error) {
            console.error('Error fetching expenses:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addExpense = async (expense) => {
        try {
            const newExpense = {
                amount: parseFloat(expense.amount),
                description: expense.description,
                category: expense.category,
                date: expense.date ? new Date(expense.date).toISOString() : new Date().toISOString(),
                user_id: user.id
            };

            const { data, error } = await supabase
                .from('expenses')
                .insert([newExpense])
                .select();

            if (error) throw error;

            if (data) {
                // We re-fetch to ensure order and filtering are correct
                fetchExpenses();
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            if (error.code === '42501' || error.message.includes('row-level security')) {
                alert('DB Permission Error. Run: alter table expenses disable row level security;');
            } else {
                alert('Error saving expense: ' + error.message);
            }
        }
    };

    const deleteExpense = async (id) => {
        try {
            const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setExpenses(prev => prev.filter(exp => exp.id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error.message);
        }
    };

    const getTotal = () => {
        return expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    };

    return {
        expenses,
        loading,
        addExpense,
        deleteExpense,
        getTotal
    };
};
