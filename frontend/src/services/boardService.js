import api from './api';

export const getBoards = () => api.get('/boards');
export const createBoard = (data) => api.post('/boards', data);
export const deleteBoard = (id) => api.delete(`/boards/${id}`);
