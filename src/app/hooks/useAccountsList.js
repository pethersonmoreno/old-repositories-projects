import createUseSharedCollectionStateSubscriberHook from './factories/createUseSharedCollectionStateSubscriberHook';

const {
  getState,
  useState: useAccountsList,
  unsubscribeOnUnmount: unsubscribeAccountsList,
} = createUseSharedCollectionStateSubscriberHook('accounts');

export {
  getState,
  unsubscribeAccountsList,
};

export default useAccountsList;
