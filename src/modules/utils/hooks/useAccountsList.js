import { useAccountsList } from '../../app/Accounts/selectors/selectorsAccounts';

export default () => {
  const list = useAccountsList();
  return [list];
};
