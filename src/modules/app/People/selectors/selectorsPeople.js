import { useSelector } from 'react-redux';

export const usePeopleList = () => useSelector(state => state.people);
export const usePerson = id => useSelector(state => state.people.find(item => item.id === id));
