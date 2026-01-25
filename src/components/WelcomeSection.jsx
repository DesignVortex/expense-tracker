import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export const WelcomeSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#F3EFE9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                }}>
                    🏠
                </div>
                <div>
                    <p className="text-sm text-secondary">Welcome</p>
                    <h2 className="text-lg font-bold">{user?.house_name || 'My House'}</h2>
                </div>
            </div>

            <button
                onClick={() => navigate('/profile')}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex'
                }}>
                <Settings />
            </button>
        </div>
    );
};
