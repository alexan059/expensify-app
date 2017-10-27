import React from 'react';
import {shallow} from 'enzyme';

import {ExpensesSummary} from '../../components/ExpensesSummary';


test('should correctly render expenses summary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={1000} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render expenses summary with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={10023520} />);
  expect(wrapper).toMatchSnapshot();
});