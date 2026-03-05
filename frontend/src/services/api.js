import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request if available
api.interceptors.request.use(
    (config) => {
        const stored = localStorage.getItem('taskmanager_user');
        if (stored) {
            const { token } = JSON.parse(stored);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 globally - clear storage and reload
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('taskmanager_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
