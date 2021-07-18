export const getComparisonsFromLocalStorage = () => {
  try {
    const serializedComparisons = localStorage.getItem('comparisons');
    if (serializedComparisons === null) {
      return undefined;
    }
    return JSON.parse(serializedComparisons);
  } catch (err) {
    return undefined;
  }
};

export const saveComparisonsToLocalStorage = comparisons => {
  try {
    const serializedComparisons = JSON.stringify(comparisons);
    localStorage.setItem('comparisons', serializedComparisons);
  } catch (err) {
    // console.log(err);
  }
};
