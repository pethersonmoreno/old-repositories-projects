import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import PeopleList from '../PeopleList';
import PersonForm from '../PersonForm';
import useSetPageTitle from '../../../../appCover/hooks/useSetPageTitle';

const PeopleRouterController = ({ match }) => {
  useSetPageTitle('People');
  const routes = [
    { path: match.path, exact: true, component: PeopleList },
    { path: `${match.path}/edit/:id`, exact: true, component: PersonForm },
    { path: `${match.path}/new`, exact: true, component: PersonForm },
    { component: NotFound }
  ];
  return (
    <SwitchRouterRoutes routes={routes} />
  );
};

PeopleRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default PeopleRouterController;
