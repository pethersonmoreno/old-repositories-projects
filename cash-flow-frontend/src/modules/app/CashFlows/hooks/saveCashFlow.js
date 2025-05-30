import moment from 'moment';
import { getState } from '../../../auth/hooks/useAuthState';
import api from '../../../utils/api/cashFlows';
import getMessageFromError from '../../../utils/helpers/getMessageFromError';

const saveCashFlow = ({
  accountId,
  inOut,
  value,
  dateTime,
  cashFlowDescriptionId,
}, history, oldRegistry) => async () => {
  const { token } = getState();
  try {
    const registry = {
      accountId,
      inOut,
      value,
      dateTime: moment(dateTime).toDate(),
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

export default saveCashFlow;
