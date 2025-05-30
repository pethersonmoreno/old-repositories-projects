import createUseSharedCollectionStateSubscriberHook from '../hookFactories/createUseSharedCollectionStateSubscriberHook';

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
