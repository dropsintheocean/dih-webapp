import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';

class DateFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            active: false
        };
    }

    toggleDatePicker() {
        this.setState({
            visible: !this.state.visible,
            active: !this.state.active
        });
    }

    createButtonClasses() {
        const classes = ['ui', 'icon', 'dropdown', 'button'];
        if (this.state.visible) classes.push('visible');
        if (this.state.active) classes.push('active');
        if (this.props.date) classes.push('grey');
        return classes;
    }

    createMenuClasses() {
        const classes = ['menu'];
        if (this.state.visible) classes.push('visible');
        return classes;
    }

    clearDate(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onChange(null);
    }

    render() {
        const { date, datePrefix } = this.props;

        let label = `${this.props.datePrefix} date`;
        if (date) label = `${datePrefix}: ${date.format('YYYY-MM-DD')}`;

        return (
            <div
                className={this.createButtonClasses().join(' ')}
                onClick={e => this.toggleDatePicker(e)}
            >
                <i className="calendar icon"></i>&nbsp;
                {label}
                {date && <i className="close icon" onClick={e => this.clearDate(e)} />}
                <div className={this.createMenuClasses().join(' ')}>
                    <DatePicker
                        inline
                        maxDate={this.props.maxDate}
                        minDate={this.props.minDate}
                        onChange={this.props.onChange}
                        selected={date}
                    />
                </div>
            </div>
        );
    }
}

DateFilter.propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    datePrefix: PropTypes.string
};

export default DateFilter;
