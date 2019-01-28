export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    return serializedState !== null ? JSON.parse(serializedState) : undefined;
  }
  catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  }
  catch (error) { // eslint-disable-line
  }
};