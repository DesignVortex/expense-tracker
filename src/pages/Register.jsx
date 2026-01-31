import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        house_name: '',
        phone_number: '',
        pin: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.name || !formData.house_name || !formData.phone_number || !formData.pin) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (formData.pin.length < 4) {
            setError('PIN must be at least 4 digits');
            setLoading(false);
            return;
        }

        const { success, error: regError } = await register(formData);

        if (success) {
            navigate('/');
        } else {
            setError(regError || 'Failed to register');
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
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                    <img src="/assets/logo.png" alt="Expense Flow" style={{ height: '1.8rem', objectFit: 'contain' }} />
                </div>
                <h1 className="text-2xl font-bold text-center" style={{ marginBottom: '0.5rem' }}>Create Account</h1>
                <p className="text-center text-secondary" style={{ marginBottom: '2rem' }}>Join your household expense tracker</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            placeholder="Ex. John Doe"
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.4rem' }}>House Name</label>
                        <input
                            type="text"
                            name="house_name"
                            value={formData.house_name}
                            onChange={handleChange}
                            className="input"
                            placeholder="Ex. Dream Villa"
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.4rem' }}>Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="input"
                            placeholder="Ex. 9876543210"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.4rem' }}>Login PIN</label>
                        <input
                            type="password"
                            inputMode="numeric"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            className="input"
                            placeholder="Create a 4-6 digit PIN"
                            maxLength={6}
                        />
                    </div>

                    {error && <p style={{ color: 'var(--expense)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
                </p>
            </motion.div>
        </div>
    );
};
