import React, { useEffect } from 'react';
import AuthenticatedRouter from './routers/AuthenticatedRouter';
import PageTemplate from './templates/PageTemplate';
import withAuthorization from './hoc/withAuthorization';
import { unsubscribePeopleList } from './hooks/usePeopleList';
import { unsubscribeAccountsList } from './hooks/useAccountsList';
import { unsubscribeCashFlowDescriptionsList } from './hooks/useCashFlowDescriptionsList';
import { unsubscribeCashFlowsList } from './hooks/useCashFlowsList';

const AppAuthenticated = () => {
  useEffect(() => () => {
    unsubscribePeopleList();
    unsubscribeAccountsList();
    unsubscribeCashFlowDescriptionsList();
    unsubscribeCashFlowsList();
  }, []);
  return (
    <PageTemplate>
      <AuthenticatedRouter />
    </PageTemplate>
  );
};

export default withAuthorization({ authenticated: true, isValidEmail: true }, '/')(AppAuthenticated);
