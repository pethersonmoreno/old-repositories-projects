import { useSelector } from 'react-redux';

export const usePeopleList = () => useSelector(state => state.people);
export const usePerson = personId => useSelector(state => state.people.find(person => person.id === personId));
