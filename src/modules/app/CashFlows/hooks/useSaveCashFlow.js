import moment from 'moment';
import { useToken } from '../../../auth/selectors/selectorsAuth';
import api from '../../../utils/api/cashFlows';
import getMessageFromError from '../../../utils/helpers/getMessageFromError';

const prepareSaveCashFlow = token => ({
  accountId,
  inOut,
  value,
  dateTime,
  cashFlowDescriptionId,
}, history, oldRegistry) => async () => {
  try {
    const registry = {
      accountId,
      inOut,
      value,
      dateTime: moment(new Date(dateTime)).toDate(),
      cashFlowDescriptionId,
    };
    if (oldRegistry) {
      await api.replace(token, oldRegistry.id, registry);
    } else {
      await api.add(token, registry);
    }
    history.push('/cashFlows');
  } catch (error) {
    alert(getMessageFromError(error));
  }
};
const useSaveCashFlow = () => {
  const token = useToken();
  const saveCashFlow = prepareSaveCashFlow(token);
  return saveCashFlow;
};

export default useSaveCashFlow;
