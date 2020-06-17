import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import PeopleList from '../list';
import PersonForm from '../form';
import useSubscribePeopleFirestore from '../../hooks/useSubscribePeopleFirestore';
import AppContentWithMenuButton from '../../../../common/AppContentWithMenuButton';

// eslint-disable-next-line react/prop-types
const PeopleRouterController = ({ match, ...otherProps }) => {
  useSubscribePeopleFirestore();
  const routes = [
    { path: match.path, exact: true, component: PeopleList },
    { path: `${match.path}/edit/:id`, exact: true, component: PersonForm },
    { path: `${match.path}/new`, exact: true, component: PersonForm },
    { component: NotFound }
  ];
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AppContentWithMenuButton {...otherProps} title="People">
      <SwitchRouterRoutes routes={routes} />
    </AppContentWithMenuButton>
  );
};

PeopleRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default PeopleRouterController;
