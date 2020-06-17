import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import AccountsList from '../AccountsList';
import AccountForm from '../AccountForm';
import useSubscribePeopleFirestore from '../../../../utils/hooks/useSubscribePeopleFirestore';
import useSubscribeAccountsFirestore from '../../hooks/useSubscribeAccountsFirestore';

const AccountsRouterController = ({ match, ...otherProps }) => {
  useSubscribePeopleFirestore();
  useSubscribeAccountsFirestore();
  const routes = [
    { path: match.path, exact: true, component: AccountsList },
    { path: `${match.path}/edit/:id`, exact: true, component: AccountForm },
    { path: `${match.path}/new`, exact: true, component: AccountForm },
    { component: NotFound }
  ];
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SwitchRouterRoutes {...otherProps} routes={routes} />
  );
};

AccountsRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default AccountsRouterController;
