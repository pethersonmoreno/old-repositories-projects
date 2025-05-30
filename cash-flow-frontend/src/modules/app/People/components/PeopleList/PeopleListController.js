import React from 'react';
import PropTypes from 'prop-types';
import { getState } from '../../../../auth/hooks/useAuthState';
import api from '../../../../utils/api/people';
import PeopleListView from './PeopleListView';
import usePeopleList from '../../../../utils/hooks/usePeopleList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';

const PeopleListController = ({ match, history }) => {
  const [list] = usePeopleList();
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    const { token } = getState();
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <PeopleListView
      add={goAdd}
      edit={goEdit}
      remove={deleteRegistry}
      list={list}
    />
  );
};

PeopleListController.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default PeopleListController;
