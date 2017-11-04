import React from 'react';
import {connect} from 'react-redux';
import {setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';


export class ExpenseListFilters extends React.Component {
  state = {
    focused: null
  };

  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (focused) => this.setState(() => ({focused}));

  onTextChange = (event) => {
    this.props.setTextFilter(event.target.value);
  };

  onSortChange = (event) => {
    if (event.target.value === 'date') {
      this.props.sortByDate();
    } else if (event.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
        <div className="content-container">
          <div className="input-group">
            <div className="input-group__item">
              <input type="text"
                     className="text-input"
                     value={this.props.filters.text}
                     placeholder="Search Expenses"
                     onChange={this.onTextChange}
              />
            </div>
            <div className="input-group__item">
              <select value={this.props.filters.sortBy}
                      className="select"
                      onChange={this.onSortChange}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            <div className="input-group__item">
              <DateRangePicker
                  startDate={this.props.filters.startDate}
                  endDate={this.props.filters.endDate}
                  onDatesChange={this.onDatesChange}
                  focusedInput={this.state.focused}
                  onFocusChange={this.onFocusChange}
                  showClearDates={true}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
              />
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);