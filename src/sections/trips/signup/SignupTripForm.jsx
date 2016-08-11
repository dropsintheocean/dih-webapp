import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import Form from '../../../commons/Form';
import Button from '../../../commons/Button';
import TextField from '../../../commons/Form/TextField';
import DateField from '../../../commons/Form/DateField';
import SelectField from '../../../commons/Form/SelectField';

const fields = ['destinationId', 'notes', 'startDate', 'endDate'];

let selectedDestination;

const validate = values => { // eslint-disable-line
    const errors = {};
    if (!values.startDate) errors.startDate = 'Required';
    if (values.endDate && values.startDate > values.endDate) {
        errors.endDate = 'Must be a date after the start date';
    }
    return errors;
};

function SignupTripForm(props) {
    const {
        fields: { destinationId, notes, startDate, endDate },
        handleSubmit,
        errorMessage,
        successMessage,
        isFetching
    } = props;


    let dateFields = '';
    const renderDateFields = () => {
        const maxDate = (selectedDestination && selectedDestination.endDate) ?
                moment(selectedDestination.endDate) : null;
        dateFields = (
            <div>
                <DateField
                    label="Date you wish to start your trip"
                    minDate={moment()}
                    maxDate={maxDate || moment(endDate.value)}
                    placeholder="YYYY-MM-DD"
                >
                    {startDate}
                </DateField>
                <DateField
                    label="Date you wish to end your trip (optional)"
                    minDate={moment(startDate.value) || moment()}
                    maxDate={maxDate}
                    placeholder="YYYY-MM-DD"
                >
                    {endDate}
                </DateField>
            </div>
        );
    };

    renderDateFields();
    return (
        <div>
            <div className="ui message">
                For more information about our <strong>destinations</strong>,
                click <a href="http://www.drapenihavet.no/en/our-work/">here</a>.
                If you're unsure of how long you'll want to stay, just leave
                the <strong>Date you wish to end your trip</strong> field open
            </div>
            <Form
                id="signUpTripForm"
                errorMessage={errorMessage}
                successMessage={successMessage}
                handleSubmit={handleSubmit}
            >
                <SelectField
                    label="Destination"
                    icon="marker"
                    values={props.destinations}
                    nullValue="No destination preference"
                    placeholder="Select a destination"
                    allowNullValue
                    valueLabel="name"
                    valueKey="id"
                    onInput={(event) => {
                        const destId = parseInt(event.target.value, 10);
                        selectedDestination = props.destinations.filter(e => e.id === destId)[0];
                        renderDateFields(); // Updates date limits based on destination
                    }}
                >
                    {destinationId}
                </SelectField>
                {dateFields}
                <TextField type="text" rows={3} label="Additional information / questions">
                    {notes}
                </TextField>
                <Button
                    type="submit"
                    color="primary"
                    fluid
                    disabled={isFetching}
                    loading={isFetching}
                    id="submit"
                >
                    Sign up
                </Button>
            </Form>
        </div>
    );
}

SignupTripForm.propTypes = {
    destinations: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool
};

export default reduxForm({
    form: 'SignupTripForm',
    fields,
    validate
})(SignupTripForm);
