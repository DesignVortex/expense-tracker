import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Lock, Check } from 'lucide-react';

export const ForgotPin = () => {
    const [step, setStep] = useState(1); // 1: Phone, 2: New PIN
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifiedUser, setVerifiedUser] = useState(null);
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { verifyUser, resetPin } = useAuth();
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { success, user, error: verifyError } = await verifyUser(phoneNumber);

        if (success && user) {
            setVerifiedUser(user);
            setStep(2);
        } else {
            setError(verifyError || 'User not found with this phone number');
        }
        setLoading(false);
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');

        if (newPin.length < 4 || newPin.length > 6) {
            setError('PIN must be 4-6 digits');
            return;
        }

        if (newPin !== confirmPin) {
            setError('PINs do not match');
            return;
        }

        setLoading(true);
        const { success, error: resetError } = await resetPin(verifiedUser.id, newPin);

        if (success) {
            alert('PIN reset successful! Please login.');
            navigate('/login');
        } else {
            setError(resetError || 'Failed to reset PIN');
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
                <div style={{ marginBottom: '1.5rem' }}>
                    <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
                        <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Login
                    </Link>
                    <h1 className="text-2xl font-bold">Reset PIN</h1>
                    <p className="text-secondary">{step === 1 ? 'Enter your registered phone number' : `Reset PIN for ${verifiedUser?.name}`}</p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleVerify}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="input"
                                    placeholder="Enter Phone Number"
                                    style={{ width: '100%', paddingLeft: '3rem' }}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p style={{ color: 'var(--expense)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify Number'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleReset}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>New PIN</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={newPin}
                                    onChange={(e) => setNewPin(e.target.value)}
                                    className="input"
                                    placeholder="4-6 digits"
                                    maxLength={6}
                                    style={{ width: '100%', paddingLeft: '3rem' }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm PIN</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={confirmPin}
                                    onChange={(e) => setConfirmPin(e.target.value)}
                                    className="input"
                                    placeholder="Confirm new PIN"
                                    maxLength={6}
                                    style={{ width: '100%', paddingLeft: '3rem' }}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p style={{ color: 'var(--expense)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            disabled={loading}
                        >
                            <Check size={20} /> {loading ? 'Resetting...' : 'Reset PIN'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};
