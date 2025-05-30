import getAccountDescription from './getAccountDescription';

const getAccountsFulDescriptionList = (
  accountsList, peopleList
) => accountsList.map(account => ({
  label: getAccountDescription(peopleList, account),
  value: account.id,
}));

export default getAccountsFulDescriptionList;
