import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.patch('/api/users/reset-password', {
                token,
                newPassword
            });
            alert(response.data.message);
            navigate('/login'); // Redirect to login page after successful password reset
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
