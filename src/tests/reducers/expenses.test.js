import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});


test('should add expense', () => {
  const expense = {
    id: '4',
    description: 'Car',
    amount: 2500000,
    note: '',
    createdAt: moment(0).add(2, 'days').valueOf()
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const note = 'This is a note';
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      note
    }
  };

  const state = expensesReducer(expenses, action);

  expect(state[1].note).toBe(note);
});

test('should not edit expense if expense not found', () => {
  const note = 'This is a note';
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      note
    }
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});