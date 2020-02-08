import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../../utils/api/accounts';
import useAccountsList from '../../../../utils/hooks/useAccountsList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import AccountsListView from './AccountsListView';
import { useToken } from '../../../../auth/selectors/selectorsAuth';

const AccountsListController = ({ match, history }) => {
  const token = useToken();
  const [list] = useAccountsList();
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <AccountsListView
      add={goAdd}
      edit={goEdit}
      remove={deleteRegistry}
      list={list}
    />
  );
};

AccountsListController.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountsListController;
