import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';


export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt:props.expense ? moment(props.expense.createdAt) : moment(),
      focused: false,
      error: ''
    };
  }

  onDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState(() => ({description}));
  };

  onNoteChange = (event) => {
    const note = event.target.value;
    this.setState(() => ({note}));
  };

  onAmountChange = (event) => {
    const amount = event.target.value;

    // Regex101.com
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  };

  onFocusChange = ({focused}) => this.setState(() => ({focused}));

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({error: 'Please provide description and amount.'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
        <div>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit}>
            <input type="text"
                   placeholder="Description"
                   autoFocus
                   onChange={this.onDescriptionChange}
                   value={this.state.description}
            />
            <input type="text"
                   onChange={this.onAmountChange}
                   value={this.state.amount}
                   placeholder="Amount"
            />
            <SingleDatePicker date={this.state.createdAt}
                              onDateChange={this.onDateChange}
                              focused={this.state.focused}
                              onFocusChange={this.onFocusChange}
                              numberOfMonths={1}
                              isOutsideRange={() => false}
            />
            <textarea onChange={this.onNoteChange}
                      value={this.state.note}
                      placeholder="Add a note for your expense (optional)"
            >
            </textarea>
            <button>Add Expense</button>
          </form>
        </div>
    );
  }
}