import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useToken } from '../../../auth/selectors/selectorsAuth';
import api from '../../../utils/api/cashFlows';
import getMessageFromError from '../../../utils/helpers/getMessageFromError';
import * as actions from '../actions/actionsCashFlows';

const prepareSaveCashFlow = token => ({
  accountId,
  inOut,
  value,
  dateTime,
  cashFlowDescriptionId,
}, history, oldRegistry) => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const registry = {
        accountId,
        inOut,
        value: parseFloat(value),
        dateTime: moment(new Date(dateTime)).toDate(),
        cashFlowDescriptionId,
      };
      if (oldRegistry) {
        await api.replace(token, oldRegistry.id, registry);
        dispatch(actions.updateCashFlow({ ...registry, id: oldRegistry.id }));
      } else {
        const { id: newId } = await api.add(token, registry);
        dispatch(actions.addCashFlow({ ...registry, id: newId }));
      }
      history.push('/cashFlows');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(getMessageFromError(error));
    }
  };
};
const useSaveCashFlow = () => {
  const token = useToken();
  const saveCashFlow = prepareSaveCashFlow(token);
  return saveCashFlow;
};

export default useSaveCashFlow;
