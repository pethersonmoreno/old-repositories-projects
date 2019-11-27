/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import {
  useRegistry
} from './hooks';
import './CashFlowForm.scss';
import CashFlowExpenseForm from './CashFlowExpenseForm';
import CashFlowIncomeForm from './CashFlowIncomeForm';


const CashFlowForm = ({ match: { params: { id } }, history }) => {
  const [registry, loading] = useRegistry(id);
  if (loading) {
    return null;
  }
  if (!registry) {
    return (<span>Not Found</span>);
  }
  if (registry.inOut) {
    return (
      <CashFlowExpenseForm
        cashFlow={registry}
        history={history}
      />
    );
  }
  return (
    <CashFlowIncomeForm
      cashFlow={registry}
      history={history}
    />
  );
};
CashFlowForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};


export default CashFlowForm;
