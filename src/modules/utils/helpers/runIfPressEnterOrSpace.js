const runIfPressEnterOrSpace = funcToRun => event => {
  if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
    event.preventDefault();
    funcToRun();
  }
};

export default runIfPressEnterOrSpace;
