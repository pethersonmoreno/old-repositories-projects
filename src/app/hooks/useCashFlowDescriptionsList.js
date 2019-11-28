import createUseSharedCollectionStateSubscriberHook from './factories/createUseSharedCollectionStateSubscriberHook';

const {
  getState,
  useState: useCashFlowDescriptionsList,
  unsubscribeOnUnmount: unsubscribeCashFlowDescriptionsList,
} = createUseSharedCollectionStateSubscriberHook('cashFlowDescriptions');

export {
  getState,
  unsubscribeCashFlowDescriptionsList,
};

export default useCashFlowDescriptionsList;
