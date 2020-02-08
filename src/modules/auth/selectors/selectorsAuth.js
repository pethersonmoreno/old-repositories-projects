import { useSelector } from 'react-redux';

export const useToken = () => useSelector(state => state.auth.token);
export const useLoading = () => useSelector(state => state.auth.loading);
export const useAuthState = () => useSelector(state => state.auth);
