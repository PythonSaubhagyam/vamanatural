// utils/debounce.js
import debounce from 'lodash.debounce';

// Custom debounce function that returns a debounced version of the provided function
export const CustomDebounce = (func, delay, options) => {
  return debounce(func, delay, { leading: true, ...options });
};
