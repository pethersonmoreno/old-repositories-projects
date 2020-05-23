import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../../utils/api/people';
import PeopleListView from './PeopleListView';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import { useToken } from '../../../../auth/selectors/selectorsAuth';
import * as actions from '../../actions/actionsPeople';

const PeopleListController = ({ match, history }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const list = useSelector(state => state.people);
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    try {
      await api.delete(token, registry.id);
      dispatch(actions.removePerson(registry.id));
    } catch (error) {
      // eslint-disable-next-line no-alert
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
