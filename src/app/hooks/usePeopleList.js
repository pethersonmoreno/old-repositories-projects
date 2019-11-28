import createUseSharedCollectionStateSubscriberHook from './factories/createUseSharedCollectionStateSubscriberHook';

const {
  getState,
  useState: usePeopleList,
  unsubscribeOnUnmount: unsubscribePeopleList,
} = createUseSharedCollectionStateSubscriberHook('people');

export {
  getState,
  unsubscribePeopleList,
};

export default usePeopleList;
