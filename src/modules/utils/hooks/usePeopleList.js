import { usePeopleList } from '../../app/People/selectors/selectorsPeople';

export default () => {
  const list = usePeopleList();
  return [list];
};
