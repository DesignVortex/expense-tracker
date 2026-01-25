import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArrowLeft, User, Home, Phone, LogOut, Edit2, Check, X, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile = () => {
    const { user, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        house_name: user?.house_name || '',
        phone_number: user?.phone_number || '',
        pin: user?.pin || ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Basic validation
        if (formData.pin && (formData.pin.length < 4 || formData.pin.length > 6)) {
            setMessage({ type: 'error', text: 'PIN must be 4-6 digits' });
            setLoading(false);
            return;
        }

        const { success, error } = await updateProfile(formData);

        if (success) {
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: error || 'Failed to update profile' });
        }
        setLoading(false);
    };

    return (
        <Layout>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#000'
                        }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Profile</h1>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setFormData({
                                name: user?.name,
                                house_name: user?.house_name,
                                phone_number: user?.phone_number,
                                pin: user?.pin
                            });
                            setIsEditing(true);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                    >
                        <Edit2 size={20} />
                    </button>
                )}
            </div>

            <main style={{ flex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: '#fff',
                        borderRadius: '24px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        color: 'var(--primary)'
                    }}>
                        <User size={40} />
                    </div>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}
                            placeholder="Your Name"
                        />
                    ) : (
                        <h2 className="text-xl font-bold" style={{ marginBottom: '0.25rem' }}>{user?.name || 'User'}</h2>
                    )}

                    <p className="text-secondary">{user?.house_name || 'Home'}</p>
                </motion.div>

                {message.text && (
                    <p style={{
                        textAlign: 'center',
                        marginBottom: '1rem',
                        color: message.type === 'error' ? 'var(--expense)' : 'var(--income)'
                    }}>
                        {message.text}
                    </p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
                        <div style={{ background: '#f5f5f5', padding: '0.8rem', borderRadius: '12px' }}>
                            <Home size={20} className="text-secondary" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p className="text-sm text-secondary">House Name</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="house_name"
                                    value={formData.house_name}
                                    onChange={handleChange}
                                    className="input"
                                    style={{ width: '100%', marginTop: '0.2rem' }}
                                    placeholder="House Name"
                                />
                            ) : (
                                <p className="font-medium">{user?.house_name}</p>
                            )}
                        </div>
                    </div>

                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
                        <div style={{ background: '#f5f5f5', padding: '0.8rem', borderRadius: '12px' }}>
                            <Phone size={20} className="text-secondary" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p className="text-sm text-secondary">Phone Number</p>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="input"
                                    style={{ width: '100%', marginTop: '0.2rem' }}
                                    placeholder="Phone Number"
                                />
                            ) : (
                                <p className="font-medium">{user?.phone_number}</p>
                            )}
                        </div>
                    </div>

                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
                        <div style={{ background: '#f5f5f5', padding: '0.8rem', borderRadius: '12px' }}>
                            <Lock size={20} className="text-secondary" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p className="text-sm text-secondary">Login PIN</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    name="pin"
                                    maxLength={6}
                                    value={formData.pin}
                                    onChange={handleChange}
                                    className="input"
                                    style={{ width: '100%', marginTop: '0.2rem' }}
                                    placeholder="Update PIN (4-6 digits)"
                                />
                            ) : (
                                <p className="font-medium">••••</p>
                            )}
                        </div>
                    </div>

                    {isEditing ? (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="btn"
                                style={{ flex: 1, background: '#f5f5f5', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <X size={20} /> Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="btn btn-primary"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                disabled={loading}
                            >
                                <Check size={20} /> {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.2rem',
                                width: '100%',
                                textAlign: 'left',
                                color: 'var(--expense)',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: '1rem'
                            }}
                        >
                            <div style={{ background: '#FFF5F5', padding: '0.8rem', borderRadius: '12px' }}>
                                <LogOut size={20} color="var(--expense)" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p className="font-medium">Logout</p>
                            </div>
                        </button>
                    )}
                </motion.div>
            </main>
        </Layout>
    );
};
