import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({});
});

test('should set login state', () => {
  const uid = 'abcd1234';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer(undefined, action);

  expect(state).toEqual({uid});
});

test('should set logout state', () => {
  const action = {type: 'LOGOUT'};
  const state = authReducer({uid: 'abcd1234'}, action);
  expect(state).toEqual({});
});