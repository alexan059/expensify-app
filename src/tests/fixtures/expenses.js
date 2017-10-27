import moment from 'moment';

const expenses = [{
  id: '1',
  description: 'Rent',
  amount: 105000,
  note: '',
  createdAt: moment(0).valueOf()
}, {
  id: '2',
  description: 'Coffee',
  amount: 750,
  note: '',
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'Gas bill',
  amount: 9955,
  note: '',
  createdAt: moment(0).add(4, 'days').valueOf()
}];

export default expenses;