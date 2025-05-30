import createUseSharedCollectionStateSubscriberHook from '../hookFactories/createUseSharedCollectionStateSubscriberHook';

const {
  getState,
  useState: useCashFlowsList,
  unsubscribeOnUnmount: unsubscribeCashFlowsList,
} = createUseSharedCollectionStateSubscriberHook('cashFlows');

export {
  getState,
  unsubscribeCashFlowsList,
};

export default useCashFlowsList;
