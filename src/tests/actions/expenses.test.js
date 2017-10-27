import {addExpense, editExpense, removeExpense} from '../../actions/expenses';
import uuid from 'uuid';
import moment from 'moment';

test('should setup remove expense action object', () => {
  const id = uuid();
  const action = removeExpense(id);

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });

});

test('should setup edit expense action object', () => {
  const id = uuid();
  const note = 'New note value.';
  const action = editExpense(id, {note});

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates: {note}
  })
});

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: moment(),
    note: 'Last rent for this year.'
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      amount: 0,
      createdAt: 0,
      note: ''
    }
  })
});