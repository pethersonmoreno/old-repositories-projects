const mapField = field => {
  if (
    field.toDate
      && field.seconds !== undefined
      && field.nanoseconds !== undefined
  ) {
    return field.toDate();
  }
  return field;
};
const mapDocumentToData = doc => {
  const docData = doc.data();
  const data = Object.keys(docData).reduce((acc, key) => {
    acc[key] = mapField(docData[key]);
    return acc;
  }, {});
  return {
    id: doc.id,
    ...data
  };
};

export default mapDocumentToData;
