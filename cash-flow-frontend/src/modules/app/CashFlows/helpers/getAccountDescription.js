const getAccountDescription = (peopleList, account) => {
  const person = peopleList.find(p => p.id === account.personId);
  if (person) {
    return `${account.description} (${person.name})`;
  }
  return account.description;
};

export default getAccountDescription;
