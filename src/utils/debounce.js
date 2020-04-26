const debounce = (fn, ms, immediate) => {
  let timeout;
  return function(...args) {
    const context = this;
    let later = function() {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
    if (callNow) {
      fn.apply(context, args);
    }
  };
};

export default debounce;
