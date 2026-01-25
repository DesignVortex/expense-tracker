import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Login = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (pin.length < 4) {
            setError('PIN must be at least 4 digits');
            setLoading(false);
            return;
        }

        const { success, error: loginError } = await login(pin);

        if (success) {
            navigate('/');
        } else {
            setError(loginError || 'Failed to login');
        }
        setLoading(false);
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem', background: 'var(--bg-color)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: '400px', background: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}
            >
                <h1 className="text-2xl font-bold text-center" style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
                <p className="text-center text-secondary" style={{ marginBottom: '2rem' }}>Enter your PIN to continue</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Login PIN</label>
                        <input
                            type="password"
                            inputMode="numeric"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="input"
                            placeholder="Enter PIN"
                            style={{ width: '100%', fontSize: '1.2rem', letterSpacing: '0.2rem', textAlign: 'center' }}
                            maxLength={6}
                        />
                    </div>

                    {error && <p style={{ color: 'var(--expense)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

                    <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                        <Link to="/forgot-pin" style={{ color: 'var(--primary)', fontSize: '0.875rem', textDecoration: 'none' }}>Forgot PIN?</Link>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    New user? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};
