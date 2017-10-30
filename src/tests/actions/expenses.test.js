import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import database from '../../firebase/firebase';

import expenses from '../fixtures/expenses';


const createMockStore = configMockStore([thunk]);

test('should setup remove expense action object', () => {
  const id = 'abcd1234';
  const action = removeExpense(id);

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });

});

test('should setup edit expense action object', () => {
  const id = 'abcd1234';
  const note = 'New note value.';
  const action = editExpense(id, {note});

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates: {note}
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[0]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

test('should add expesne to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       amount: 0,
//       createdAt: 0,
//       note: ''
//     }
//   })
// });