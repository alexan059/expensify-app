export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const sortByDate = () => ({
  type: 'SORT_BY',
  sortBy: 'date'
});

export const sortByAmount = () => ({
  type: 'SORT_BY',
  sortBy: 'amount'
});

export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});