export const detectLongTasks = (): PerformanceObserver => {
  const observer = new PerformanceObserver((list) => {
    console.warn('Long Task detected! 🚩️', list.getEntries());
  });

  observer.observe({
    entryTypes: ['longtask'],
  });

  return observer;
};
