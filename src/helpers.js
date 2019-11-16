export const reorderArray = (array, fromIndex, toIndex) => {
  if (
    !(fromIndex >= 0 && fromIndex < array.length) ||
    !(toIndex >= 0 && toIndex < array.length)
  ) {
    return array;
  }

  const arrayCopy = [...array];
  const [item] = arrayCopy.splice(fromIndex, 1);
  arrayCopy.splice(toIndex, 0, item);
  return arrayCopy;
};

export const buildRequestWrapper = (setIsLoading = () => {}, setError = () => {}) => {
  const wrapper = (callback, errorMessage) => async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callback(...args);
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };
  return wrapper;
};
