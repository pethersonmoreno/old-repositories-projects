import { useSelector } from 'react-redux';

export const useAccountsList = () => useSelector(state => state.accounts);
export const useAccount = id => useSelector(state => state.accounts.find(item => item.id === id));
