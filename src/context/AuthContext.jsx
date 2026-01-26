import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for persisted user session (simple mechanism for this custom auth)
        const storedUser = localStorage.getItem('expense_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem('expense_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (pin) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('pin', pin)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    throw new Error('Invalid PIN');
                }
                throw error;
            }

            if (data) {
                setUser(data);
                localStorage.setItem('expense_user', JSON.stringify(data));
                return { success: true };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            // Enforce unique phone number or pin if possible, but basic insert for now
            // Checking if pin exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('id')
                .eq('pin', userData.pin)
                .single();

            if (existingUser) {
                return { success: false, error: 'PIN already exists. Please choose another.' };
            }

            // check for phone number
            const { data: existingPhone } = await supabase
                .from('users')
                .select('id')
                .eq('phone_number', userData.phone_number)
                .single();

            if (existingPhone) {
                return { success: false, error: 'Phone number already registered' };
            }

            const { data, error } = await supabase
                .from('users')
                .insert([userData])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setUser(data);
                localStorage.setItem('expense_user', JSON.stringify(data));
                return { success: true };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    };

    const updateProfile = async (updates) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .update(updates)
                .eq('id', user.id)
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setUser(data);
                localStorage.setItem('expense_user', JSON.stringify(data));
                return { success: true };
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    };

    const verifyUser = async (phoneNumber) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('phone_number', phoneNumber)
                .single();

            if (error) throw error;
            return { success: true, user: data };
        } catch (error) {
            console.error('Verify user error:', error);
            return { success: false, error: 'User not found' };
        }
    };

    const resetPin = async (userId, newPin) => {
        try {
            const { error } = await supabase
                .from('users')
                .update({ pin: newPin })
                .eq('id', userId);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Reset PIN error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('expense_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, verifyUser, resetPin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
